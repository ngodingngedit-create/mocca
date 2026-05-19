<template>
  <div class="shop-page-wrapper">
    <!-- Header Spacing to sit perfectly below sticky header -->
    <div class="shop-page-container">
      <!-- Main Title Section -->
      <div class="shop-title-section">
        <h1 class="shop-main-title">{{ t('shopTitle') }}</h1>
        
      </div>

      <!-- Controls: Filters & Search -->
      <div class="shop-controls">
        <!-- Search Bar -->
        <div class="shop-search-bar" :class="{ 'mobile-visible': isSearchOpen }">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            v-model="localSearchQuery" 
            type="text" 
            :placeholder="currentLang === 'id' ? 'Cari merchandise...' : 'Search merchandise...'" 
            class="shop-search-input"
          />
        </div>

        <!-- Category Filters -->
        <div class="category-filters">
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            class="filter-btn" 
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ currentLang === 'id' ? cat.nameId : cat.nameEn }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="no-results-card">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <p class="no-results-text">{{ currentLang === 'id' ? 'Tidak ada produk yang cocok.' : 'No products match.' }}</p>
      </div>

      <!-- Product Grid (4x3 Grid layout on desktop) -->
      <div v-else class="shop-products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="handleCardClick(product, $event)"
        >
          <!-- Product image container -->
          <div class="product-image-container">
            <img :src="product.image" :alt="product.titleEn" class="product-image" />
            <!-- Centered View Details Overlay Button -->
            <div class="product-card-overlay">
              <button class="view-details-btn" @click.stop="openModal(product)">
                {{ t('viewDetails') }}
              </button>
            </div>
          </div>

          <!-- Product Details Info Row -->
          <div class="product-info-wrapper">
            <!-- Name -->
            <h3 class="product-title">{{ getProductTitle(product) }}</h3>
            
            <!-- Price (aligned right, below name) -->
            <div class="product-price-row">
              <span class="product-price">{{ formatPrice(product.price) }}</span>
            </div>
            
            <!-- Colors (aligned left) -->
            <div class="product-colors-row">
              <div class="color-swatches">
                <span 
                  v-for="color in product.colors" 
                  :key="color"
                  :class="['swatch', `swatch-${color}`, { active: selectedColors[product.id] === color }]" 
                  @click.stop="selectedColors[product.id] = color"
                  :title="color"
                ></span>
              </div>
            </div>

            <!-- Compact Quantity Selector (aligned right, below colors) -->
            <div class="product-actions-row">
              <div class="card-qty-selector">
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], -1)" 
                  :disabled="getQty(product.id, selectedColors[product.id]) === 0"
                  aria-label="Decrease quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="card-qty-value" :class="{ 'is-zero': getQty(product.id, selectedColors[product.id]) === 0 }">
                  {{ getQty(product.id, selectedColors[product.id]) }}
                </span>
                <button 
                  class="card-qty-btn" 
                  @click.stop="changeQty(product, selectedColors[product.id], 1)"
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Modal Window Overlay -->
    <ProductModal 
      v-if="activeModalProduct" 
      :isOpen="isModalOpen" 
      :product="activeModalProduct" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ProductModal from './ProductModal.vue';
import { addToCart, updateQuantity, getItemQuantity, currentLang, isSearchOpen, searchQuery } from '../store/cart.js';

const isModalOpen = ref(false);
const activeModalProduct = ref(null);
const activeCategory = ref('all');
const localSearchQuery = ref(searchQuery.value);

watch(searchQuery, (newVal) => {
  localSearchQuery.value = newVal;
});

watch(localSearchQuery, (newVal) => {
  searchQuery.value = newVal;
});

const categories = [
  { id: 'all', nameId: 'Semua', nameEn: 'All' },
  { id: 'apparel', nameId: 'Pakaian', nameEn: 'Apparel' },
  { id: 'accessories', nameId: 'Aksesoris', nameEn: 'Accessories' },
  { id: 'home', nameId: 'Kebutuhan Harian', nameEn: 'Home & Living' },
  { id: 'bundles', nameId: 'Bundling', nameEn: 'Bundles' }
];

const openModal = (product) => {
  activeModalProduct.value = product;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleCardClick = (product, event) => {
  // Prevent modal opening when clicking on quantity selector or swatches
  if (
    event.target.closest('.card-qty-selector') || 
    event.target.closest('.color-swatches') || 
    event.target.closest('.swatch') ||
    event.target.closest('.card-qty-btn')
  ) {
    return;
  }
  openModal(product);
};

// Expanded catalog products (12 items)
const products = [
  {
    id: 'tee', category: 'apparel',
    titleEn: 'Mocca Group Tee', titleId: 'Kaos Mocca Group',
    price: 199000, image: '/mocca_group_tee.png',
    colors: ['cream', 'black']
  },
  {
    id: 'tote', category: 'accessories',
    titleEn: 'Mocca Logo Tote Bag', titleId: 'Tas Kanvas Mocca Logo',
    price: 149000, image: '/mocca_tote_bag.png',
    colors: ['green', 'cream', 'black']
  },
  {
    id: 'mug', category: 'home',
    titleEn: 'Mocca Enamel Mug', titleId: 'Cangkir Enamel Mocca',
    price: 119000, image: '/mocca_enamel_mug.png',
    colors: ['cream']
  },
  {
    id: 'cap', category: 'accessories',
    titleEn: 'Mocca Logo Cap', titleId: 'Topi Mocca Logo',
    price: 179000, image: '/mocca_logo_cap.png',
    colors: ['beige', 'black']
  },
  {
    id: 'sticker', category: 'accessories',
    titleEn: 'Mocca Sticker Pack', titleId: 'Paket Stiker Mocca',
    price: 49000, image: '/mocca_sticker_pack.png',
    colors: ['cream']
  },
  {
    id: 'keychain', category: 'accessories',
    titleEn: 'Mocca Keychain', titleId: 'Gantungan Kunci Mocca',
    price: 59000, image: '/mocca_keychain.png',
    colors: ['cream']
  },
  {
    id: 'hoodie', category: 'apparel',
    titleEn: 'Mocca Classic Hoodie', titleId: 'Jaket Hoodie Mocca',
    price: 349000, image: '/mocca_col_apparel.png',
    colors: ['black', 'cream']
  },
  {
    id: 'notebook', category: 'home',
    titleEn: 'Mocca Daily Notebook', titleId: 'Buku Catatan Mocca',
    price: 89000, image: '/mocca_col_everyday.png',
    colors: ['beige']
  },
  {
    id: 'tumbler', category: 'home',
    titleEn: 'Mocca Tumbler', titleId: 'Tumbler Mocca',
    price: 159000, image: '/mocca_col_accessories.png',
    colors: ['black', 'cream']
  },
  {
    id: 'poster', category: 'accessories',
    titleEn: 'Mocca Poster Set', titleId: 'Set Poster Mocca',
    price: 99000, image: '/album_art.png',
    colors: ['cream']
  },
  {
    id: 'pin', category: 'accessories',
    titleEn: 'Mocca Signature Pin', titleId: 'Pin Logo Mocca',
    price: 39000, image: '/mocca_keychain.png',
    colors: ['beige']
  },
  {
    id: 'bundle', category: 'bundles',
    titleEn: 'Mocca Ultimate Bundle', titleId: 'Paket Mocca Lengkap',
    price: 499000, image: '/mocca_collage.png',
    colors: ['cream']
  }
];

// Swatch selection state for each item
const selectedColors = ref({
  tee: 'cream', tote: 'green', mug: 'cream', cap: 'beige',
  sticker: 'cream', keychain: 'cream', hoodie: 'black', notebook: 'beige',
  tumbler: 'black', poster: 'cream', pin: 'beige', bundle: 'cream'
});

const filteredProducts = computed(() => {
  let result = products;
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.category === activeCategory.value);
  }
  if (localSearchQuery.value) {
    const q = localSearchQuery.value.toLowerCase();
    result = result.filter(p => 
      p.titleEn.toLowerCase().includes(q) || 
      p.titleId.toLowerCase().includes(q)
    );
  }
  return result;
});

const getProductTitle = (product) => {
  return currentLang.value === 'id' ? product.titleId : product.titleEn;
};

// Quantity handlers
const getQty = (productId, color) => {
  return getItemQuantity(productId, color);
};

const changeQty = (product, color, delta) => {
  const currentQty = getQty(product.id, color);
  if (currentQty === 0 && delta > 0) {
    addToCart(product, color);
  } else {
    updateQuantity(product.id, color, delta);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};

// Translates for shop view
const translations = {
  id: {
    shopTitle: 'Toko',
    viewDetails: 'Lihat Detail',
  },
  en: {
    shopTitle: 'Shop',
    viewDetails: 'View Details',
  }
};

const t = (key) => {
  return translations[currentLang.value]?.[key] || translations.id[key];
};
</script>

<style scoped>
.shop-page-wrapper {
  background-color: #F5F2ED; /* Warm minimalist cream backdrop */
  width: 100%;
  min-height: 100vh;
  transition: var(--transition-smooth);
}

.shop-page-container {
  max-width: 1440px; /* Slightly wider to accommodate 4 columns beautifully */
  margin: 0 auto;
  padding: 3rem 4rem 6rem 4rem;
}

/* Beautiful Title styling in elegant serif typography */
.shop-title-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;
}

.shop-main-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.title-divider-wrapper {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 320px;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(59, 35, 20, 0.15);
}

.divider-spark {
  font-size: 1rem;
  color: rgba(59, 35, 20, 0.4);
  transform: translateY(-1px);
}

/* Controls: Filters & Search */
.shop-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.5rem;
  gap: 1.75rem;
}

.category-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  right: 350px;
}

.filter-btn {
  background: transparent;
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 8px;
  padding: 0.45rem 1.35rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.filter-btn:hover {
  border-color: var(--color-mocca-dark);
}

.filter-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.shop-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* Made longer as requested */
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--color-mocca-muted);
}

.shop-search-input {
  width: 100%;
  padding: 0.85rem 1.25rem 0.85rem 3rem; /* Slightly larger padding */
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 25px;
  background-color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.95rem; /* Larger text */
  color: var(--color-mocca-dark);
  outline: none;
  transition: var(--transition-smooth);
}

.shop-search-input:focus {
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
}

/* Empty State */
.no-results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--color-bg-light);
  border-radius: 12px;
  border: 1px dashed var(--color-mocca-border);
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  color: var(--color-mocca-muted);
  margin-bottom: 1rem;
}

.no-results-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
}

/* Grid Layout: 4 Columns on Desktop */
.shop-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem; /* Slightly tighter gap for smaller cards */
}

/* Clean, thin outline product card */
.product-card {
  background-color: var(--color-bg-light);
  border: 1px solid rgba(59, 35, 20, 0.12); /* Thin chocolate outline */
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.02);
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-mocca-dark); /* Accent brown outline on hover */
  box-shadow: 0 12px 30px rgba(59, 35, 20, 0.06);
}

/* High-quality lifestyle photography showcase */
.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #FAF8F5;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(59, 35, 20, 0.06);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.04);
}

/* Hover Details Overlay Button */
.product-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(59, 35, 20, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}

.view-details-btn {
  background-color: var(--color-bg-light);
  color: var(--color-mocca-dark);
  border: 1px solid var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.1);
  transform: translateY(10px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .view-details-btn {
  transform: translateY(0);
}

.view-details-btn:hover {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
}

/* Card details styling - customized for 4 column smaller layout */
.product-info-wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  font-family: var(--font-body);
  font-size: 0.9rem; /* Smaller font for smaller card */
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin-bottom: 0.4rem;
}

/* Price below title, right aligned */
.product-price-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}

.product-price {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600; /* Semi-bold */
  color: var(--color-mocca-dark);
}

/* Colors left aligned */
.product-colors-row {
  display: flex;
  margin-bottom: 0.75rem;
}

.color-swatches {
  display: flex;
  gap: 0.35rem;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: var(--transition-smooth);
  position: relative;
}

.swatch:hover {
  transform: scale(1.15);
}

.swatch.active {
  box-shadow: 0 0 0 2px var(--color-mocca-dark);
}

/* Qty button below colors, right aligned */
.product-actions-row {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

/* Swatch Color Hex codes */
.swatch-cream { background-color: #FDFBF7; }
.swatch-black { background-color: #212121; }
.swatch-green { background-color: #2D4C3A; }
.swatch-beige { background-color: #E6DCD2; }

/* Quantity Selector Component */
.card-qty-selector {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-mocca-dark);
  height: 32px; /* Slightly taller for better touch target */
}

.card-qty-btn {
  background: none;
  border: none;
  padding: 0 0.65rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  cursor: pointer;
  opacity: 0.8;
  transition: var(--transition-smooth);
}

.card-qty-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
}

.card-qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-icon {
  width: 12px;
  height: 12px;
}

.card-qty-value {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: #FFFFFF;
  min-width: 1.5rem;
  text-align: center;
  transition: color 0.3s ease;
}

.card-qty-value.is-zero {
  color: rgba(255, 255, 255, 0.6);
}


/* Responsive adjustments */
@media (max-width: 1200px) {
  .shop-products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 Columns */
  }
}

@media (max-width: 900px) {
  .shop-products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 Columns */
  }
  .product-card-overlay {
    display: none !important; /* Mobile disables hover details overlay */
  }
  .shop-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .shop-search-bar {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .shop-search-bar {
    display: none;
  }
  .shop-search-bar.mobile-visible {
    display: flex;
  }
}

@media (max-width: 600px) {
  .shop-page-container {
    padding: 1.5rem 1.25rem 4rem 1.25rem;
  }
  .shop-main-title {
    font-size: 2.2rem;
  }
  .shop-title-section {
    margin-bottom: 1.5rem;
  }
  .shop-controls {
    margin-bottom: 2rem;
    gap: 1rem;
    align-items: center;
  }
  .category-filters {
    right: 0;
    width: 100vw;
    margin-left: -1.25rem;
    padding: 0 1.25rem;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
  }
  .category-filters::-webkit-scrollbar {
    display: none;
  }
  .filter-btn {
    padding: 0.35rem 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .shop-search-bar {
    max-width: 90%;
    margin: 0 auto;
  }
  .shop-products-grid {
    grid-template-columns: 1fr; /* 1 Column */
  }
}
</style>
