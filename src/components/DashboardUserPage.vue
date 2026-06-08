<template>
  <div class="dashboard-page-wrapper">
    <div class="dashboard-container">
      <div class="breadcrumb">
        <a href="#" @click.prevent="goToHome" class="breadcrumb-link">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Dashboard Transaksi' : 'Transaction Dashboard' }}</span>
      </div>

      <div class="dashboard-header-row">
        <h2 class="dashboard-title">Riwayat Transaksi</h2>
        <button class="btn-logout" @click="handleLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Keluar
        </button>
      </div>

      <div class="dashboard-card">
        <div class="filter-controls-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" v-model="searchQuery" placeholder="Cari nomor invoice..." class="input-search" />
          </div>
          
          <div class="filter-select-wrapper">
            <svg class="filter-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <select v-model="filterStatus" class="input-select">
              <option value="">Semua Status</option>
              <option v-for="st in availableStatuses" :key="st" :value="st">{{ st }}</option>
            </select>
            <svg class="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          Memuat data transaksi...
        </div>
        <div v-else-if="transactions.length === 0" class="empty-state">
          Belum ada transaksi saat ini.
        </div>
        <div v-else class="table-responsive">
          <table class="transaction-table">
            <thead>
              <tr>
                <th class="col-no">No.</th>
                <th class="col-sortable" @click="sortTable('invoice_no')">
                  Invoice <span v-if="sortKey==='invoice_no'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                </th>
                <th class="col-sortable" @click="sortTable('created_at')">
                  Tanggal <span v-if="sortKey==='created_at'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                </th>
                <th class="col-sortable" @click="sortTable('grandtotal')">
                  Total Bayar <span v-if="sortKey==='grandtotal'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                </th>
                <th class="col-sortable" @click="sortTable('status')">
                  Status <span v-if="sortKey==='status'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in processedTransactions" :key="item.id || index">
                <td>{{ (currentPageNum - 1) * itemsPerPage + index + 1 }}</td>
                <td class="font-bold">{{ item.invoice_no || '-' }}</td>
                <td class="text-muted">{{ formatDate(item.created_at) }}</td>
                <td class="font-bold">{{ formatCurrency(item.grandtotal || item.total_price) }}</td>
                <td>
                  <span class="status-badge" :style="{ backgroundColor: getStatusColor(item.status || item.payment_status) }">
                    {{ item.status || item.payment_status || '-' }}
                  </span>
                </td>
              </tr>
              <tr v-if="processedTransactions.length === 0">
                <td colspan="5" class="empty-state">Tidak ada transaksi yang cocok dengan filter.</td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="pagination-wrapper">
            <span class="pagination-info">Menampilkan halaman {{ currentPageNum }} dari {{ totalPages || 1 }} (Total: {{ filteredLength }})</span>
            <div class="pagination-controls">
              <button @click="currentPageNum > 1 ? currentPageNum-- : null" :disabled="currentPageNum === 1" class="btn-page">Sebelumnya</button>
              <button @click="currentPageNum < totalPages ? currentPageNum++ : null" :disabled="currentPageNum === totalPages || totalPages === 0" class="btn-page">Selanjutnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { currentLang, currentPage, isLoggedIn } from '../store/cart.js';

const loading = ref(false);
const transactions = ref([]);

const searchQuery = ref('');
const filterStatus = ref('');
const sortKey = ref('created_at');
const sortOrder = ref('desc');
const currentPageNum = ref(1);
const itemsPerPage = 10;

const goToHome = () => {
  currentPage.value = 'home';
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_email');
  isLoggedIn.value = false;
  currentPage.value = 'login';
};

const fetchTransactions = async () => {
  loading.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
    const response = await fetch(`${apiUrl}/api/order-product`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    const result = await response.json();
    
    // Asumsi data transaksi ada di result.data atau result
    const dataArray = result.data?.data || result.data || result;
    if (Array.isArray(dataArray)) {
      transactions.value = dataArray;
    } else {
      transactions.value = [];
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!localStorage.getItem('token')) {
    currentPage.value = 'login';
    return;
  }
  fetchTransactions();
});

const availableStatuses = computed(() => {
  const statuses = new Set();
  transactions.value.forEach(t => {
    const s = t.status || t.payment_status || '';
    if (s) statuses.add(s);
  });
  return Array.from(statuses);
});

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const processedTransactions = computed(() => {
  let list = [...transactions.value];
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(item => {
      const inv = (item.invoice_no || '').toLowerCase();
      return inv.includes(q);
    });
  }
  
  if (filterStatus.value) {
    list = list.filter(item => {
      const status = item.status || item.payment_status || '';
      return status === filterStatus.value;
    });
  }
  
  if (sortKey.value) {
    list.sort((a, b) => {
      let valA = a[sortKey.value] || '';
      let valB = b[sortKey.value] || '';
      
      if (sortKey.value === 'grandtotal') {
        valA = Number(a.grandtotal || a.total_price || 0);
        valB = Number(b.grandtotal || b.total_price || 0);
      } else if (sortKey.value === 'status') {
        valA = a.status || a.payment_status || '';
        valB = b.status || b.payment_status || '';
      }
      
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  const start = (currentPageNum.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return list.slice(start, end);
});

const filteredLength = computed(() => {
  let list = [...transactions.value];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(item => (item.invoice_no || '').toLowerCase().includes(q));
  }
  if (filterStatus.value) {
    list = list.filter(item => (item.status || item.payment_status || '') === filterStatus.value);
  }
  return list.length;
});

const totalPages = computed(() => Math.ceil(filteredLength.value / itemsPerPage));

watch([searchQuery, filterStatus], () => { currentPageNum.value = 1; });

const formatCurrency = (val) => {
  if (!val) return 'Rp 0';
  return 'Rp ' + Number(val).toLocaleString('id-ID');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('success') || s.includes('paid') || s.includes('selesai')) return '#2E7D32';
  if (s.includes('pending') || s.includes('unpaid') || s.includes('menunggu')) return '#F57F17';
  if (s.includes('fail') || s.includes('cancel') || s.includes('batal')) return '#D32F2F';
  return '#8C7355'; // default mocca color
};
</script>

<style scoped>
.dashboard-page-wrapper {
  background-color: var(--color-bg-cream);
  min-height: calc(100vh - 140px);
  padding: 2rem 1.5rem;
  font-family: var(--font-body);
}

.dashboard-container {
  max-width: 1000px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}
.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
}
.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}
.breadcrumb-separator {
  color: #ccc;
}
.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 600;
}

.dashboard-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.dashboard-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--color-mocca-dark);
  margin: 0;
}
.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
  border: 1px solid rgba(211, 47, 47, 0.3);
  color: #D32F2F;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-logout:hover {
  background-color: rgba(211, 47, 47, 0.05);
}

.dashboard-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(140, 115, 85, 0.1);
  padding: 1.5rem;
}

.filter-controls-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: #FAFAFA;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(140, 115, 85, 0.1);
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 250px;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-mocca-muted);
}
.input-search {
  width: 100%;
  padding: 0.65rem 1rem 0.65rem 2.5rem;
  border: 1px solid rgba(140, 115, 85, 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
}
.input-search:focus {
  border-color: var(--color-mocca-dark);
}

.filter-select-wrapper {
  position: relative;
}
.filter-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-mocca-muted);
  pointer-events: none;
}
.input-select {
  appearance: none;
  padding: 0.65rem 2.5rem;
  border: 1px solid rgba(140, 115, 85, 0.2);
  border-radius: 8px;
  background-color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
}
.dropdown-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-mocca-muted);
  pointer-events: none;
}

.table-responsive {
  overflow-x: auto;
}
.transaction-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}
.transaction-table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  border-bottom: 2px solid rgba(140, 115, 85, 0.1);
}
.col-sortable {
  cursor: pointer;
  user-select: none;
}
.col-sortable:hover {
  color: var(--color-mocca-dark);
}
.transaction-table td {
  padding: 1rem;
  font-size: 0.85rem;
  border-bottom: 1px solid rgba(140, 115, 85, 0.05);
  color: var(--color-mocca-dark);
}
.font-bold {
  font-weight: bold;
}
.text-muted {
  color: var(--color-mocca-muted);
}
.status-badge {
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: capitalize;
  display: inline-block;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--color-mocca-muted);
  font-size: 0.9rem;
}

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(140, 115, 85, 0.1);
}
.pagination-info {
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}
.pagination-controls {
  display: flex;
  gap: 0.5rem;
}
.btn-page {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: 1px solid rgba(140, 115, 85, 0.2);
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  color: var(--color-mocca-dark);
}
.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .dashboard-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
