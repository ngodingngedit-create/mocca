<template>
  <div class="profile-page-wrapper">
    <div class="profile-container">
      <div class="breadcrumb">
        <a href="#" @click.prevent="goToHome" class="breadcrumb-link">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Dashboard Transaksi' : 'Transaction Dashboard' }}</span>
      </div>

      <!-- Two-Column Grid Layout -->
      <div class="profile-grid">
        
        <!-- ================= LEFT COLUMN: SIDEBAR NAVIGATION ================= -->
        <aside class="profile-sidebar">
          
          <!-- User Header Panel -->
          <div class="user-sidebar-header">
            <div class="avatar-circle-wrapper">
              <!-- Hand-drawn style vector sketch of the Mocca band in circle -->
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="band-sketch-svg">
                <circle cx="60" cy="60" r="54" fill="#FAF6F0" stroke="#E6DFD5" stroke-width="1"/>
                <line x1="20" y1="80" x2="100" y2="80" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="30" y1="80" x2="30" y2="95" stroke="#55331C" stroke-width="1.5"/>
                <line x1="90" y1="80" x2="90" y2="95" stroke="#55331C" stroke-width="1.5"/>
                <circle cx="40" cy="48" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M40 55 C35 60, 35 78, 38 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="53" cy="44" r="7.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M53 51.5 C48 57, 48 78, 52 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="67" cy="46" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M67 53 C64 58, 62 78, 65 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="80" cy="49" r="6.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M80 55.5 C76 60, 75 78, 78 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M38 80 L38 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M42 80 L42 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M50 80 L50 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M54 80 L54 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M64 80 L64 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M68 80 L68 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M76 80 L76 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M80 80 L80 90" stroke="#55331C" stroke-width="1.5"/>
              </svg>
            </div>
            
            <div class="user-text-info">
              <h3 class="user-fullname">{{ userName }}</h3>
              <span class="user-email-text">{{ userEmail }}</span>
            </div>
          </div>

          <nav class="sidebar-menu" style="border-bottom: 1px solid rgba(90, 60, 40, 0.08); padding-bottom: 1rem; margin-bottom: 0.5rem;">
            <button class="menu-link-btn" :class="{ active: activeTab === 'product' }" @click="activeTab = 'product'">
              <span class="menu-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </span>
              <span class="menu-label-text">Riwayat Transaksi Produk</span>
            </button>
            <button class="menu-link-btn" :class="{ active: activeTab === 'event' }" @click="activeTab = 'event'">
              <span class="menu-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </span>
              <span class="menu-label-text">Riwayat Transaksi Event</span>
            </button>
          </nav>

          <!-- Vertical Menu Navigation -->
          <nav class="sidebar-menu">
            <!-- Logout Button -->
            <button class="menu-link-btn logout-btn" @click="handleLogout">
              <span class="menu-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </span>
              <span class="menu-label-text">{{ currentLang === 'id' ? 'Keluar' : 'Logout' }}</span>
            </button>
          </nav>
        </aside>

        <!-- ================= RIGHT COLUMN: SETTINGS PANEL ================= -->
        <main class="settings-panel">
          <div class="tab-content-container">
            <h4 class="section-title-inside" style="margin-bottom: 1rem; font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-mocca-dark);">
              {{ activeTab === 'product' ? 'Riwayat Transaksi Produk' : 'Riwayat Transaksi Event' }}
            </h4>
            
            <div class="orders-list">
              <div class="filter-controls-container" style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; background-color: #faf9f6; padding: 1rem; border-radius: 12px; border: 1px solid rgba(140, 115, 85, 0.15);">
                <div class="search-input-wrapper" style="position: relative; flex: 1; min-width: 250px;">
                  <svg style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #8c7355; opacity: 0.6;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" v-model="searchQuery" placeholder="Cari nomor invoice..." class="input-field-mocca" style="width: 100%; padding: 0.65rem 1rem 0.65rem 2.75rem; border: 1px solid rgba(140, 115, 85, 0.2); border-radius: 8px; background-color: white; font-size: 0.875rem; color: #4a3b2c; outline: none; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02);" onfocus="this.style.borderColor='#8C7355'; this.style.boxShadow='0 0 0 3px rgba(140, 115, 85, 0.1)'" onblur="this.style.borderColor='rgba(140, 115, 85, 0.2)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.02)'" />
                </div>
                
                <div class="filter-select-wrapper" style="position: relative; display: flex; align-items: center;">
                  <svg style="position: absolute; left: 1rem; color: #8c7355; opacity: 0.6; pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  <select v-model="filterStatus" class="input-field-mocca select-mocca" style="appearance: none; padding: 0.65rem 2.5rem 0.65rem 2.5rem; border: 1px solid rgba(140, 115, 85, 0.2); border-radius: 8px; cursor: pointer; background-color: white; font-size: 0.875rem; font-weight: 500; color: #4a3b2c; outline: none; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02);" onfocus="this.style.borderColor='#8C7355'" onblur="this.style.borderColor='rgba(140, 115, 85, 0.2)'">
                    <option value="">Semua Status</option>
                    <option v-for="st in availableStatuses" :key="st" :value="st">{{ st }}</option>
                  </select>
                  <svg style="position: absolute; right: 1rem; color: #8c7355; opacity: 0.6; pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div v-if="loading" class="text-center py-4" style="text-align: center; padding: 1rem 0;">
                Memuat data transaksi...
              </div>
              <div v-else-if="transactions.length === 0" class="text-center py-4 text-stone-500" style="text-align: center; padding: 1rem 0; color: #78716c;">
                Belum ada transaksi saat ini.
              </div>
              <div v-else class="overflow-x-auto" style="overflow-x: auto;">
                <table class="w-full text-left border-collapse mt-4" style="width: 100%; min-width: 800px; text-align: left; border-collapse: collapse; margin-top: 1rem;">
                  <thead>
                    <tr class="border-b border-stone-200" style="border-bottom: 2px solid #E6DFD5;">
                      <th class="p-3 text-sm font-bold" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark);">No.</th>
                      <th class="p-3 text-sm font-bold cursor-pointer hover:bg-stone-100" @click="sortTable('invoice_no')" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); cursor: pointer;">
                        Invoice <span v-if="sortKey==='invoice_no'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th class="p-3 text-sm font-bold cursor-pointer hover:bg-stone-100" @click="sortTable('created_at')" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); cursor: pointer;">
                        Tanggal <span v-if="sortKey==='created_at'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th class="p-3 text-sm font-bold cursor-pointer hover:bg-stone-100" @click="sortTable('grandtotal')" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); cursor: pointer;">
                        Total Bayar <span v-if="sortKey==='grandtotal'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                      </th>
                      <th class="p-3 text-sm font-bold cursor-pointer hover:bg-stone-100" @click="sortTable('status')" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); cursor: pointer;">
                        Status <span v-if="sortKey==='status'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in processedTransactions" :key="item.id || index" class="hover:bg-stone-50" style="border-bottom: 1px solid rgba(90, 60, 40, 0.1); transition: background-color 0.2s;">
                      <td class="p-3 text-sm" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark);">{{ (currentPageNum - 1) * itemsPerPage + index + 1 }}</td>
                      <td class="p-3 text-sm" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); font-weight: 500;">{{ item.invoice_no || item.invoice || '-' }}</td>
                      <td class="p-3 text-sm" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-muted);">{{ formatDate(item.created_at) }}</td>
                      <td class="p-3 text-sm font-bold" style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-mocca-dark); font-weight: bold;">{{ formatCurrency(item.grandtotal || item.total_price) }}</td>
                      <td class="p-3 text-sm" style="padding: 0.75rem; font-size: 0.875rem;">
                        <span class="px-2 py-1 text-xs rounded-full font-bold" :style="{ backgroundColor: getStatusColor(item.status || item.payment_status) }" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 9999px; font-weight: bold; color: #fff;">
                          {{ item.status || item.payment_status || '-' }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="processedTransactions.length === 0">
                      <td colspan="5" class="p-3 text-sm text-center" style="padding: 1rem; text-align: center; color: var(--color-mocca-muted);">Tidak ada transaksi yang cocok dengan filter.</td>
                    </tr>
                  </tbody>
                </table>

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-4" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
                  <span style="font-size: 0.85rem; color: var(--color-mocca-muted);">Menampilkan halaman {{ currentPageNum }} dari {{ totalPages || 1 }} (Total: {{ filteredLength }})</span>
                  <div style="display: flex; gap: 0.5rem;">
                    <button @click="currentPageNum > 1 ? currentPageNum-- : null" :disabled="currentPageNum === 1" style="padding: 0.4rem 0.75rem; font-size: 0.85rem; border-radius: 6px; border: 1px solid var(--color-mocca-border); background-color: white; cursor: pointer; color: var(--color-mocca-dark);" :style="currentPageNum === 1 ? 'opacity: 0.5; cursor: not-allowed;' : ''">Sebelumnya</button>
                    <button @click="currentPageNum < totalPages ? currentPageNum++ : null" :disabled="currentPageNum === totalPages || totalPages === 0" style="padding: 0.4rem 0.75rem; font-size: 0.85rem; border-radius: 6px; border: 1px solid var(--color-mocca-border); background-color: white; cursor: pointer; color: var(--color-mocca-dark);" :style="(currentPageNum === totalPages || totalPages === 0) ? 'opacity: 0.5; cursor: not-allowed;' : ''">Selanjutnya</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { currentLang, currentPage, isLoggedIn } from '../store/cart.js';

const userName = ref(localStorage.getItem('user_name') || 'Pengguna');
const userEmail = ref(localStorage.getItem('user_email') || 'pengguna@email.com');

const activeTab = ref('product');
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
  transactions.value = [];
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
    const endpoint = activeTab.value === 'product' ? '/api/order-product' : '/api/transaction-list-by-user';
    const response = await fetch(`${apiUrl}${endpoint}`, {
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

watch(activeTab, () => {
  searchQuery.value = '';
  filterStatus.value = '';
  currentPageNum.value = 1;
  fetchTransactions();
});

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
      const inv = (item.invoice_no || item.invoice || '').toLowerCase();
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
    list = list.filter(item => (item.invoice_no || item.invoice || '').toLowerCase().includes(q));
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
/* ================= PAGE CONTAINER STYLING ================= */
.profile-page-wrapper {
  background-color: #F5F2ED;
  min-height: calc(100vh - 140px);
  padding: 2.5rem 1.5rem;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb nav */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 2rem;
  color: var(--color-mocca-muted);
}
.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}
.breadcrumb-separator {
  opacity: 0.5;
}
.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* ================= TWO-COLUMN GRID LAYOUT ================= */
.profile-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.75rem;
  align-items: start;
}

/* ================= LEFT COLUMN: SIDEBAR ================= */
.profile-sidebar {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
}

/* User Header Inside Sidebar */
.user-sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(90, 60, 40, 0.08);
}
.avatar-circle-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1.5px dashed var(--color-mocca-border);
  padding: 3px;
  background-color: #FAF8F5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.band-sketch-svg {
  width: 100%;
  height: 100%;
}
.user-fullname {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
}
.user-email-text {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  word-break: break-all;
  margin-bottom: 0.75rem;
  display: block;
}

/* Sidebar Menu Navigation */
.sidebar-menu {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.menu-link-btn {
  background: none;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0.95rem;
  border-radius: 8px;
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
}
.menu-link-btn:hover {
  background-color: #FDFBF7;
  color: var(--color-mocca-dark);
  transform: translateX(2px);
}
.menu-link-btn.active {
  background-color: #F6EDE0;
  color: var(--color-mocca-dark);
  font-weight: 600;
}
.menu-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}
.menu-link-btn.active .menu-icon-wrapper {
  opacity: 1;
}
.logout-btn {
  color: #C05646;
}
.logout-btn:hover {
  background-color: #FDF3F1;
  color: #D9534F;
}

/* ================= RIGHT COLUMN: SETTINGS PANEL ================= */
.settings-panel {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 25px rgba(59, 35, 20, 0.02);
  min-height: 580px;
  display: flex;
  flex-direction: column;
}
.tab-content-container {
  flex-grow: 1;
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
