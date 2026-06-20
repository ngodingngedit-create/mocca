<template>
  <div class="live-report-wrapper">
    <div class="live-report-container">
      <div class="breadcrumb">
        <a href="#" @click.prevent="goToHome" class="breadcrumb-link">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Laporan Langsung' : 'Live Report' }}</span>
      </div>

      <main class="report-panel">
        <div class="header-section">
          <h2 class="report-title">{{ currentLang === 'id' ? 'Transaksi Kreator' : 'Creator Transactions' }}</h2>
          <span class="report-subtitle">Slug: <span class="slug-tag">{{ slug }}</span></span>
        </div>

        <div class="filter-controls-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" v-model="searchQuery" :placeholder="currentLang === 'id' ? 'Cari nomor invoice atau pembeli...' : 'Search invoice or buyer...'" class="input-field-mocca" />
          </div>
          
          <div class="filter-select-wrapper">
            <svg class="filter-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <select v-model="filterStatus" class="input-field-mocca select-mocca">
              <option value="">{{ currentLang === 'id' ? 'Semua Status' : 'All Statuses' }}</option>
              <option v-for="st in availableStatuses" :key="st" :value="st">{{ st }}</option>
            </select>
            <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <span>{{ currentLang === 'id' ? 'Memuat data transaksi...' : 'Loading transactions...' }}</span>
        </div>
        <div v-else-if="transactions.length === 0" class="empty-state">
          <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p>{{ currentLang === 'id' ? 'Belum ada transaksi untuk kreator ini.' : 'No transactions for this creator yet.' }}</p>
        </div>
        <div v-else class="table-container">
          <table class="report-table">
            <thead>
              <tr>
                <th>No.</th>
                <th @click="sortTable('invoice_no')" class="sortable">
                  <div class="th-content">
                    Invoice <span class="sort-icon" v-if="sortKey==='invoice_no'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                  </div>
                </th>
                <th @click="sortTable('created_at')" class="sortable">
                  <div class="th-content">
                    {{ currentLang === 'id' ? 'Tanggal' : 'Date' }} <span class="sort-icon" v-if="sortKey==='created_at'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                  </div>
                </th>
                <th @click="sortTable('customer_name')" class="sortable">
                  <div class="th-content">
                    {{ currentLang === 'id' ? 'Pembeli' : 'Buyer' }} <span class="sort-icon" v-if="sortKey==='customer_name'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                  </div>
                </th>
                <th @click="sortTable('grandtotal')" class="sortable">
                  <div class="th-content">
                    Total <span class="sort-icon" v-if="sortKey==='grandtotal'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                  </div>
                </th>
                <th @click="sortTable('status')" class="sortable">
                  <div class="th-content">
                    Status <span class="sort-icon" v-if="sortKey==='status'">{{ sortOrder==='asc' ? '↑' : '↓' }}</span>
                  </div>
                </th>
                <th>Manifest</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in processedTransactions" :key="item.id || index" class="table-row">
                <td class="text-center text-muted">{{ (currentPageNum - 1) * itemsPerPage + index + 1 }}</td>
                <td class="font-medium invoice-col">{{ item.invoice_no || item.invoice || '-' }}</td>
                <td class="text-muted">{{ formatDate(item.created_at) }}</td>
                <td>{{ item.customer?.name || item.customer_name || item.name || item.user_name || '-' }}</td>
                <td class="font-bold price-col">{{ formatCurrency(item.grandtotal || item.total_price) }}</td>
                <td>
                  <span class="status-badge" :style="{ backgroundColor: getStatusColor(item.status || item.payment_status) }">
                    {{ item.status || item.payment_status || '-' }}
                  </span>
                </td>
                <td>
                  {{ item.latest_manifest?.status_name || (currentLang === 'id' ? 'Menunggu Penjual' : 'Waiting for Seller') }}
                </td>
                <td class="text-center">
                  <button class="action-btn" @click="viewDetail(item)" :title="currentLang === 'id' ? 'Lihat Detail' : 'View Detail'">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button v-if="!isItemExpired(item)" class="action-btn" @click="printResi(item)" :title="currentLang === 'id' ? 'Cetak Resi' : 'Print Receipt'">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9"></polyline>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                      <rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="processedTransactions.length === 0">
                <td colspan="8" class="text-center py-8 text-muted">
                  {{ currentLang === 'id' ? 'Tidak ada transaksi yang cocok dengan pencarian/filter.' : 'No transactions match the search/filter.' }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="pagination-container">
            <span class="pagination-info">
              {{ currentLang === 'id' ? 'Menampilkan halaman' : 'Showing page' }} <span class="font-medium">{{ currentPageNum }}</span> {{ currentLang === 'id' ? 'dari' : 'of' }} <span class="font-medium">{{ totalPages || 1 }}</span> (Total: {{ filteredLength }})
            </span>
            <div class="pagination-actions">
              <button @click="currentPageNum > 1 ? currentPageNum-- : null" :disabled="currentPageNum === 1" class="page-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                {{ currentLang === 'id' ? 'Sebelumnya' : 'Prev' }}
              </button>
              <button @click="currentPageNum < totalPages ? currentPageNum++ : null" :disabled="currentPageNum === totalPages || totalPages === 0" class="page-btn">
                {{ currentLang === 'id' ? 'Selanjutnya' : 'Next' }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Detail Modal -->
      <Transition name="fade">
        <div v-if="showDetailModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content receipt-modal">
            <div class="modal-header">
              <h3 class="modal-title">{{ currentLang === 'id' ? 'Detail Transaksi' : 'Transaction Detail' }}</h3>
              <button class="close-btn" @click="closeModal">&times;</button>
            </div>
            
            <div class="modal-body" v-if="selectedTransaction">
              <div class="receipt-header">
                <div class="receipt-brand">MOCCA</div>
                <div class="receipt-invoice">{{ selectedTransaction.invoice_no || selectedTransaction.invoice }}</div>
                <div class="receipt-date">{{ formatDate(selectedTransaction.created_at) }}</div>
                <div class="receipt-status-wrapper">
                  <span class="status-badge" :style="{ backgroundColor: getStatusColor(selectedTransaction.status || selectedTransaction.payment_status) }">
                    {{ selectedTransaction.status || selectedTransaction.payment_status || '-' }}
                  </span>
                </div>
              </div>
              
              <div class="receipt-section">
                <h4 class="section-title">{{ currentLang === 'id' ? 'Info Pengiriman' : 'Shipping Info' }}</h4>
                <div class="info-grid">
                  <div class="info-group">
                    <label>{{ currentLang === 'id' ? 'Penerima' : 'Receiver' }}</label>
                    <p class="font-medium">{{ selectedTransaction.shipping_address?.nama_penerima || selectedTransaction.customer?.name || selectedTransaction.customer_name || '-' }}</p>
                  </div>
                  <div class="info-group">
                    <label>{{ currentLang === 'id' ? 'Telepon' : 'Phone' }}</label>
                    <p>{{ selectedTransaction.shipping_address?.phone || selectedTransaction.customer?.phone || '-' }}</p>
                  </div>
                  <div class="info-group full-width">
                    <label>{{ currentLang === 'id' ? 'Alamat' : 'Address' }}</label>
                    <p class="address-text">{{ selectedTransaction.shipping_address?.address_detail || '-' }}</p>
                  </div>
                </div>
              </div>

              <div class="receipt-section">
                <h4 class="section-title">{{ currentLang === 'id' ? 'Kurir & Resi' : 'Courier & Manifest' }}</h4>
                <div class="info-grid">
                  <div class="info-group">
                    <label>{{ currentLang === 'id' ? 'Kurir' : 'Courier' }}</label>
                    <p class="font-medium">{{ selectedTransaction.courier?.main || '-' }} - {{ selectedTransaction.courier?.type || '-' }}</p>
                  </div>
                  <div class="info-group">
                    <label>Manifest</label>
                    <p>{{ selectedTransaction.latest_manifest?.status_name || (currentLang === 'id' ? 'Menunggu Penjual' : 'Waiting for Seller') }}</p>
                  </div>
                </div>
              </div>

              <div class="receipt-section">
                <h4 class="section-title">{{ currentLang === 'id' ? 'Detail Produk' : 'Product Details' }}</h4>
                <div class="product-list">
                  <div v-for="(prod, i) in (selectedTransaction.items || [])" :key="i" class="product-item">
                    <div class="prod-img-placeholder">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8C7355" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                    </div>
                    <div class="prod-details">
                      <div class="prod-name">{{ prod.product_name || prod.name }}</div>
                      <div class="prod-variant" v-if="prod.variant_name">{{ prod.variant_name }}</div>
                      <div class="prod-price-qty">
                        <span>{{ prod.qty }}x</span>
                        <span>{{ formatCurrency(prod.price) }}</span>
                      </div>
                    </div>
                    <div class="prod-subtotal font-medium">
                      {{ formatCurrency(prod.subtotal || (prod.qty * prod.price)) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="receipt-section summary-section">
                <div class="summary-row">
                  <span>{{ currentLang === 'id' ? 'Total Harga' : 'Total Price' }}</span>
                  <span>{{ formatCurrency(selectedTransaction.total_price) }}</span>
                </div>
                <div class="summary-row">
                  <span>{{ currentLang === 'id' ? 'Ongkos Kirim' : 'Delivery Fee' }}</span>
                  <span>{{ formatCurrency(selectedTransaction.delivery_price || selectedTransaction.courier?.price || 0) }}</span>
                </div>
                <div class="summary-row">
                  <span>{{ currentLang === 'id' ? 'Biaya Admin' : 'Admin Fee' }}</span>
                  <span>{{ formatCurrency(selectedTransaction.admin_fee || 0) }}</span>
                </div>
                <div class="summary-row grandtotal-row">
                  <span>Total Bayar</span>
                  <span>{{ formatCurrency(selectedTransaction.grandtotal || selectedTransaction.total_price) }}</span>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="btn-mocca-secondary w-full" @click="closeModal">{{ currentLang === 'id' ? 'Tutup' : 'Close' }}</button>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { currentLang, currentPage, isLiveReport, liveReportSlug } from '../store/cart.js';

const slug = ref('');
const loading = ref(false);
const transactions = ref([]);

const searchQuery = ref('');
const filterStatus = ref('');
const sortKey = ref('created_at');
const sortOrder = ref('desc');
const currentPageNum = ref(1);
const itemsPerPage = 10;

const showDetailModal = ref(false);
const selectedTransaction = ref(null);

const viewDetail = (item) => {
  selectedTransaction.value = item;
  showDetailModal.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  showDetailModal.value = false;
  selectedTransaction.value = null;
  document.body.style.overflow = '';
};

const goToHome = () => {
  currentPage.value = 'home';
};

const fetchTransactions = async () => {
  if (!slug.value) return;
  
  loading.value = true;
  transactions.value = [];
  try {
    const slugMapping = {
      'mocca': '226f7ddac1',
      'wearmula': 'WEAR-dad8b6'
    };
    
    // Normalize and map the slug. If it's in the mapping, use the mapped ID, otherwise use the slug itself.
    const normalizedSlug = slug.value.toLowerCase().trim();
    const actualApiSlug = slugMapping[normalizedSlug] || slug.value;

    const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
    const endpoint = `/api/order-product/creator/${actualApiSlug}/transactions`;
    const response = await fetch(`${apiUrl}${endpoint}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.json();
    
    let dataArray = [];
    if (result.data && Array.isArray(result.data.transactions)) {
      dataArray = result.data.transactions;
    } else if (Array.isArray(result.data?.data)) {
      dataArray = result.data.data;
    } else if (Array.isArray(result.data)) {
      dataArray = result.data;
    } else if (Array.isArray(result)) {
      dataArray = result;
    }

    transactions.value = dataArray;
  } catch (error) {
    console.error('Error fetching creator transactions:', error);
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Sync slug from store
watch(liveReportSlug, (newVal) => {
  if (newVal) {
    slug.value = newVal;
    fetchTransactions();
  }
}, { immediate: true });

onMounted(() => {
  if (liveReportSlug.value) {
    slug.value = liveReportSlug.value;
    fetchTransactions();
  }
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
      const buyer = (item.customer?.name || item.customer_name || item.name || item.user_name || '').toLowerCase();
      return inv.includes(q) || buyer.includes(q);
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
      } else if (sortKey.value === 'customer_name') {
        valA = (a.customer?.name || a.customer_name || a.name || a.user_name || '').toLowerCase();
        valB = (b.customer?.name || b.customer_name || b.name || b.user_name || '').toLowerCase();
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
    list = list.filter(item => {
      const inv = (item.invoice_no || item.invoice || '').toLowerCase();
      const buyer = (item.customer?.name || item.customer_name || item.name || item.user_name || '').toLowerCase();
      return inv.includes(q) || buyer.includes(q);
    });
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
  if (s.includes('success') || s.includes('paid') || s.includes('selesai') || s.includes('verified')) return '#2E7D32'; // Green
  if (s.includes('pending') || s.includes('unpaid') || s.includes('menunggu')) return '#F57F17'; // Yellow
  if (s.includes('fail') || s.includes('cancel') || s.includes('batal') || s.includes('expired')) return '#6c757d'; // Gray
  return '#8C7355'; // default mocca color
};

const isItemExpired = (item) => {
  if (!item) return false;
  const s = (item.status || item.payment_status || '').toLowerCase();
  return s.includes('fail') || s.includes('cancel') || s.includes('batal') || s.includes('expired');
};

const printResi = async (t) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
  let courierName = t.shipping_method?.toUpperCase() || (t.latest_manifest?.courier_name ? t.latest_manifest.courier_name.toUpperCase() : 'JNE');
  let courierService = t.shipping_service || 'reg';
  let trackingNumber = t.latest_manifest?.waybill || 'KLTRX-' + (t.invoice_no || '').replace(/[^A-Z0-9]/ig, '').substring(0, 10).toUpperCase();
  let deliveryPrice = parseInt(t.shipping_cost || t.shipping_price || 9000); 

  try {
      const response = await fetch(`${apiUrl}/api/order-product-invoice/${t.invoice_no}`);
      const result = await response.json();
      if (result.status && result.data) {
          const detailData = result.data.order || result.data;
          
          if(detailData.shipping_method) courierName = detailData.shipping_method.toUpperCase();
          if(detailData.shipping_service) courierService = detailData.shipping_service;
          
          if(detailData.latest_manifest && detailData.latest_manifest.waybill) {
              trackingNumber = detailData.latest_manifest.waybill;
          }
          if(detailData.tracking_number) {
              trackingNumber = detailData.tracking_number;
          } else if(detailData.awb) {
              trackingNumber = detailData.awb;
          }
          
          if (result.data.courier) {
              if (result.data.courier.main) courierName = result.data.courier.main.toUpperCase();
              if (result.data.courier.courier_company) courierName = result.data.courier.courier_company.toUpperCase();
              if (result.data.courier.courier_type) courierService = result.data.courier.courier_type;
              
              const cTracking = result.data.courier.tracking_number;
              if (cTracking && cTracking !== null) trackingNumber = cTracking;
          }
          
          if (result.data.manifest && Array.isArray(result.data.manifest) && result.data.manifest.length > 0) {
              const mTrack = result.data.manifest[0].tracking_number;
              if (mTrack && mTrack !== null) trackingNumber = mTrack;
          }
          
          if(detailData.delivery_price) deliveryPrice = parseInt(detailData.delivery_price);
      }
  } catch (err) {
      console.error('Failed to fetch detailed invoice for resi print', err);
  }

  const referenceNumber = t.invoice_no || '-';
  const receiverName = t.shipping_address?.nama_penerima || t.customer?.name || t.customer_name || 'Guest';
  const receiverPhone = t.shipping_address?.phone || t.customer?.phone || '-';
  
  const senderName = 'mocca';
  const senderPhone = '-'; 
  
  let receiverFullAddress = '';
  if (t.shipping_address) {
    const parts = [
      t.shipping_address.address_detail,
      t.shipping_address.city_name || t.shipping_address.city,
      t.shipping_address.province_name || t.shipping_address.province,
      t.shipping_address.zipcode || t.shipping_address.zip_code
    ];
    receiverFullAddress = parts.filter(Boolean).filter(p => p !== '-').join(', ');
  } else {
    receiverFullAddress = '-';
  }

  const senderAddress = '-';
  
  const productItems = (t.items || []).map(i => {
      let name = i.product_name || i.name;
      if (i.variant_name) name += ` [${i.variant_name}]`;
      return `${i.qty}x ${name}`;
  }).join(' | ');
  
  const orderNotes = t.order_notes || 'mocca transaction';

  const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resi Pengiriman - ${trackingNumber}</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
          }
          @media print {
            @page {
              size: A6 portrait;
              margin: 0.5cm;
            }
            body {
              background: white;
              padding: 0;
              margin: 0;
            }
            .resi-container {
              box-shadow: none;
              border: 2px solid #000 !important;
              max-height: 98vh;
              page-break-inside: avoid;
            }
          }
          .resi-container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border: 2px solid #000;
            padding: 10px;
            font-size: 11px;
            line-height: 1.2;
          }
          .header {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
          }
          .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: #000;
          }
          .tracking-number {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin: 8px 0;
            padding: 6px;
            border: 2px solid #000;
            background-color: #f9f9f9;
          }
          .qr-code-container {
            text-align: center;
            margin: 10px 0;
            padding: 10px;
            border: 2px solid #000;
          }
          .qr-code-img {
            width: 100px;
            height: 100px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            padding: 6px 0;
            border-bottom: 1px solid #000;
          }
          .address-section {
            margin: 10px 0;
            border: 2px solid #000;
          }
          .address-box {
            padding: 6px;
          }
          .address-box:first-child {
            border-bottom: 2px solid #000;
          }
          .address-label {
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 4px;
          }
          .product-info {
            margin: 10px 0;
            padding: 8px;
            border: 2px solid #000;
          }
        </style>
      </head>
      <body>
        <div class="resi-container">
          <div class="header">
            <h1>${courierName}</h1>
          </div>
          <div class="tracking-number">
            Resi: ${trackingNumber}
          </div>
          <div class="qr-code-container">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(referenceNumber)}" class="qr-code-img" />
            <div>${referenceNumber}</div>
          </div>
          <div class="info-row">
            <span>Ongkir: Rp ${deliveryPrice.toLocaleString('id-ID')}</span>
            <span>Layanan: ${courierService}</span>
          </div>
          <div class="address-section">
            <div class="address-box">
              <div class="address-label">Penerima:</div>
              <div><strong>${receiverName}</strong></div>
              <div>${receiverPhone}</div>
              <div>${receiverFullAddress}</div>
            </div>
            <div class="address-box">
              <div class="address-label">Pengirim:</div>
              <div><strong>${senderName}</strong></div>
              <div>${senderPhone}</div>
            </div>
          </div>
          <div class="product-info">
            <strong>Barang:</strong><br>
            ${productItems}
          </div>
        </div>
        \x3Cscript>
            window.onload = function() { window.print(); };
        \x3C/script>
      </body>
      </html>
  `;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(html);
  printWindow.document.close();
};
</script>

<style scoped>
.live-report-wrapper {
  background-color: var(--color-bg-cream, #F5F2ED);
  min-height: calc(100vh - 80px);
  padding: 2.5rem 1.5rem;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.live-report-container {
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
  color: var(--color-mocca-muted, #8C7355);
}
.breadcrumb-link {
  color: var(--color-mocca-muted, #8C7355);
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb-link:hover {
  color: var(--color-mocca-dark, #4A3B2C);
}
.breadcrumb-separator {
  opacity: 0.5;
}
.breadcrumb-current {
  color: var(--color-mocca-dark, #4A3B2C);
  font-weight: 500;
}

/* Report Panel */
.report-panel {
  background-color: #FFFFFF;
  border: 1px solid rgba(140, 115, 85, 0.12);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(59, 35, 20, 0.04);
  min-height: 500px;
}

.header-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(140, 115, 85, 0.1);
  padding-bottom: 1.5rem;
}

.report-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-mocca-dark, #4A3B2C);
  margin: 0 0 0.5rem 0;
}

.report-subtitle {
  font-size: 0.95rem;
  color: var(--color-mocca-muted, #8C7355);
}

.slug-tag {
  background-color: #F6EDE0;
  color: #4A3B2C;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  font-family: monospace;
  letter-spacing: 0.5px;
}

/* Filters */
.filter-controls-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  background-color: #FAF9F6;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(140, 115, 85, 0.15);
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
  color: #8C7355;
  opacity: 0.6;
}
.input-field-mocca {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid rgba(140, 115, 85, 0.2);
  border-radius: 8px;
  background-color: white;
  font-size: 0.9rem;
  color: #4A3B2C;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  font-family: inherit;
}
.input-field-mocca:focus {
  border-color: #8C7355;
  box-shadow: 0 0 0 3px rgba(140, 115, 85, 0.1);
}

.filter-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
}
.filter-icon {
  position: absolute;
  left: 1rem;
  color: #8C7355;
  opacity: 0.6;
  pointer-events: none;
}
.chevron-icon {
  position: absolute;
  right: 1rem;
  color: #8C7355;
  opacity: 0.6;
  pointer-events: none;
}
.select-mocca {
  appearance: none;
  padding: 0.75rem 2.5rem;
  cursor: pointer;
  font-weight: 500;
}

/* States */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: var(--color-mocca-muted, #8C7355);
  text-align: center;
  background: #FAF9F6;
  border-radius: 12px;
  border: 1px dashed rgba(140, 115, 85, 0.2);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(140, 115, 85, 0.2);
  border-top-color: #8C7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.empty-icon {
  opacity: 0.5;
  margin-bottom: 1rem;
}

/* Table */
.table-container {
  overflow-x: auto;
  background: white;
  border: 1px solid rgba(140, 115, 85, 0.12);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.report-table {
  width: 100%;
  min-width: 900px;
  text-align: left;
  border-collapse: collapse;
}

.report-table th {
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-mocca-muted, #8C7355);
  background-color: #FAF9F6;
  border-bottom: 2px solid rgba(140, 115, 85, 0.1);
  font-weight: 700;
}

.report-table th.sortable {
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
}
.report-table th.sortable:hover {
  background-color: #F6EDE0;
  color: var(--color-mocca-dark, #4A3B2C);
}
.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.sort-icon {
  color: var(--color-mocca-dark, #4A3B2C);
  font-weight: bold;
}

.table-row {
  border-bottom: 1px solid rgba(140, 115, 85, 0.08);
  transition: all 0.2s ease;
}
.table-row:hover {
  background-color: #FDFBF7;
  transform: scale(1.001);
  box-shadow: inset 4px 0 0 #8C7355;
}

.report-table td {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: var(--color-mocca-dark, #4A3B2C);
  vertical-align: middle;
}

.text-center { text-align: center; }
.text-muted { color: var(--color-mocca-muted, #8C7355); }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.invoice-col {
  color: #4A3B2C;
  letter-spacing: 0.5px;
}
.price-col {
  color: #55331C;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 700;
  color: #fff;
  display: inline-block;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: #FAF9F6;
  border-top: 1px solid rgba(140, 115, 85, 0.12);
}

.pagination-info {
  font-size: 0.85rem;
  color: var(--color-mocca-muted, #8C7355);
}

.pagination-actions {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid rgba(140, 115, 85, 0.2);
  background-color: white;
  color: var(--color-mocca-dark, #4A3B2C);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.page-btn:hover:not(:disabled) {
  background-color: #F6EDE0;
  border-color: #8C7355;
  color: #4A3B2C;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .report-panel {
    padding: 1.5rem;
  }
  .filter-controls-container {
    flex-direction: column;
  }
  .search-input-wrapper, .filter-select-wrapper {
    width: 100%;
  }
  .pagination-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

/* Modal CSS */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.modal-content.receipt-modal {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px dashed rgba(140, 115, 85, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FAF9F6;
}

.modal-title {
  margin: 0;
  font-family: var(--font-heading);
  color: #4A3B2C;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8C7355;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #D32F2F;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.receipt-header {
  text-align: center;
  margin-bottom: 2rem;
}
.receipt-brand {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #4A3B2C;
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}
.receipt-invoice {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: #8C7355;
  margin-bottom: 0.25rem;
}
.receipt-date {
  font-size: 0.85rem;
  color: #A09383;
  margin-bottom: 1rem;
}

.receipt-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed rgba(140, 115, 85, 0.2);
}
.receipt-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 0.95rem;
  color: #4A3B2C;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info-group.full-width {
  grid-column: span 2;
}
.info-group label {
  font-size: 0.75rem;
  color: #A09383;
  text-transform: uppercase;
}
.info-group p {
  margin: 0;
  font-size: 0.9rem;
  color: #4A3B2C;
}
.address-text {
  line-height: 1.4;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.prod-img-placeholder {
  width: 48px;
  height: 48px;
  background-color: #F5F2ED;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.prod-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.prod-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4A3B2C;
}
.prod-variant {
  font-size: 0.8rem;
  color: #8C7355;
}
.prod-price-qty {
  font-size: 0.85rem;
  color: #A09383;
  display: flex;
  gap: 0.5rem;
}
.prod-subtotal {
  font-size: 0.95rem;
  color: #4A3B2C;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #8C7355;
}
.grandtotal-row {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(140, 115, 85, 0.2);
  font-size: 1.1rem;
  font-weight: 700;
  color: #4A3B2C;
}

.modal-footer {
  padding: 1.25rem;
  background-color: #FAF9F6;
  border-top: 1px dashed rgba(140, 115, 85, 0.2);
}

.btn-mocca-secondary {
  background-color: transparent;
  border: 1px solid #8C7355;
  color: #8C7355;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 0.95rem;
}
.btn-mocca-secondary:hover {
  background-color: #F6EDE0;
  color: #4A3B2C;
}
.w-full {
  width: 100%;
}

.action-btn {
  background: none;
  border: none;
  color: #8C7355;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.action-btn:hover {
  background-color: #F6EDE0;
  color: #4A3B2C;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
