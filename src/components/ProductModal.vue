<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-backdrop" @click="close">
      <div class="modal-container" @click.stop>
        <!-- Close button top-right -->
        <button class="close-modal-btn" @click="close" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="close-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="modal-main-content">
          <!-- Left Columns: Images Section -->
          <div class="modal-images-column">
            <!-- 1. Vertical Thumbnail Column -->
            <div class="thumbnails-sidebar">
              <button 
                v-for="(thumb, idx) in productData.thumbnails" 
                :key="idx" 
                :class="['thumb-btn', { active: activeImageIndex === idx }]"
                @click="activeImageIndex = idx"
              >
                <img :src="thumb" :alt="`${productTitle} thumb ${idx}`" class="thumb-img" />
              </button>
            </div>

            <!-- 2. Main Product Display frame -->
            <div class="main-display-frame">
              <img :src="productData.thumbnails[activeImageIndex]" :alt="productTitle" class="main-display-img" />
            </div>
          </div>

          <!-- Right Column: Info Panel -->
          <div class="modal-info-column">
            <!-- Title Header -->
            <div class="info-header">
              <span class="info-tag">Official Merch • Limited Collection</span>
              <h2 class="info-title">{{ productTitle }}</h2>
              
              <!-- Rating and Wishlist row -->
              <div class="info-meta-row">
                <div class="rating-group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star-icon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <span class="rating-val">4.9 <span class="reviews-count">(120 reviews)</span></span>
                </div>
                <button :class="['wishlist-btn', { active: isWishlisted }]" @click="toggleWishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.8" class="heart-icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span class="wishlist-text">{{ isWishlisted ? 'Wishlisted' : 'Add to wishlist' }}</span>
                </button>
              </div>
            </div>

            <!-- Description -->
            <div class="product-description" v-html="productData.description"></div>

            <!-- Feature Bar Grid -->
            <div class="feature-bar">
              <div v-for="(feat, idx) in productData.features" :key="idx" class="feature-item">
                <div class="feature-icon" v-html="feat.icon"></div>
                <span class="feature-label">{{ feat.label }}</span>
              </div>
            </div>



            <!-- Size selection -->
            <div class="selection-section">
              <span class="selection-title">Varian</span>
              <div class="selection-options sizes-row">
                <button 
                  v-for="sz in productData.sizes" 
                  :key="sz"
                  :class="['size-selector-btn', { active: selectedSize === sz }]"
                  @click="selectedSize = sz"
                >
                  {{ sz }}
                </button>
              </div>
              <!-- Stock Info -->
              <div v-if="productData.variants" class="stock-indicator">
                <span v-if="isCurrentSoldOut" class="stock-badge sold-out">Stok Habis</span>
                <span v-else class="stock-badge available">
                  {{ currentStockCount !== null ? `Sisa stok: ${currentStockCount}` : 'Tersedia' }}
                </span>
              </div>
            </div>

            <!-- Size Chart (Visible only for apparel) -->
            <div v-if="productData && productData.sizes && productData.sizes.length > 1" class="size-chart-container">
              <h3 class="size-chart-title">Size Chart (cm)</h3>
              <div class="size-chart-img-wrapper">
                <img src="/assets/sizechartmocca.png" alt="Mocca Size Chart" class="size-chart-img" />
              </div>
              <div class="table-scroll-wrapper">
                <table class="size-chart-table">
                  <thead>
                    <tr>
                      <th>SIZE</th>
                      <th>LENGTH</th>
                      <th>WIDTH</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>S</td><td>68-69</td><td>45-47</td></tr>
                    <tr><td>M</td><td>73-75</td><td>52-53</td></tr>
                    <tr><td>L</td><td>76-78</td><td>54-57</td></tr>
                    <tr><td>XL</td><td>78-81</td><td>58-61</td></tr>
                    <tr><td>XXL</td><td>81-83</td><td>62-64</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Price and Quantity add to cart action panel -->
            <div class="checkout-control-section">
              <div class="modal-price-row">
                <span class="price-label">Price</span>
                <span class="price-val">{{ formatPrice(product.price) }}</span>
              </div>

              <div class="actions-row">
                <div class="modal-qty-adjuster">
                  <button class="adjust-btn" @click="changeModalQty(-1)" :disabled="qty === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="adj-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <span class="qty-num">{{ qty }}</span>
                  <button class="adjust-btn" @click="changeModalQty(1)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="adj-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>

                <button class="add-to-cart-outline-btn" @click="handleAddToCart" :disabled="isCurrentSoldOut">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="bag-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  Add to Cart
                </button>
                <button class="buy-now-solid-btn" @click="handleBuyNow" :disabled="isCurrentSoldOut">Buy Now</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Feature Bar Grid -->
        <div class="bottom-trust-features">
          <div class="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <div class="trust-text">
              <span class="trust-title">Estimasi Pengiriman</span>
              <span class="trust-desc">2-4 Hari Kerja</span>
            </div>
          </div>
          <div class="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <div class="trust-text">
              <span class="trust-title">Stok Tersedia</span>
              <span class="trust-desc">Tersedia</span>
            </div>
          </div>
          <div class="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <div class="trust-text">
              <span class="trust-title">Garansi Original</span>
              <span class="trust-desc">100% Asli</span>
            </div>
          </div>
          <div class="trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trust-icon"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            <div class="trust-text">
              <span class="trust-title">Inspired by</span>
              <span class="trust-desc">Mocca's warm tunes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Interactive toast -->
  <Transition name="toast-fade">
    <div v-if="toastActive" class="checkout-toast">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>{{ toastMessage }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { addToCart, updateQuantity, getItemQuantity, currentPage, currentLang, checkedCheckoutItems } from '../store/cart.js';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  product: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['close']);

const productTitle = computed(() => {
  if (!props.product) return '';
  return props.product.title || (currentLang.value === 'id' ? props.product.titleId : props.product.titleEn) || '';
});

const activeImageIndex = ref(0);
const selectedColor = ref('');
const selectedSize = ref('');
const qty = ref(1);
const isWishlisted = ref(false);
const toastActive = ref(false);
const toastMessage = ref('');

// Product specifications metadata
const productsMetadata = {
  tee: {
    description: 'Kaos premium berbahan cotton combed lembut dengan ilustrasi eksklusif Mocca. Nyaman dipakai harian dengan desain minimalis yang hangat dan timeless.',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    thumbnails: [
      '/mocca_group_tee.png', 
      '/mocca_col_apparel.png', 
      '/mocca_group_tee.png', 
      '/mocca_group_tee.png'
    ],
    features: [
      { label: '100% Cotton Combed 24s', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 2a4 4 0 0 0-4 4c0 .8.2 1.5.7 2.1L3.2 13.5a1.5 1.5 0 0 0 0 2.1l1.4 1.4a1.5 1.5 0 0 0 2.1 0l5.3-5.5c.6.5 1.3.7 2.1.7a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"/></svg>' },
      { label: 'Regular Fit Unisex', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M20.37 4.65a2 2 0 0 0-1.87-1.35H5.5a2 2 0 0 0-1.87 1.35L2 10.65v8.7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.7z"/></svg>' },
      { label: 'Sablon Premium', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-3.08-3.08a2 2 0 0 0-2.83 0L9 18"></path></svg>' },
      { label: 'Comfortable & Breathable', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M2 22c5.5-5.5 6-12 6-12s6.5-.5 12 5.5m0-13.5c-5.5 5.5-6 12-6 12s-6.5.5-12-5.5"/></svg>' }
    ]
  },
  tote: {
    description: 'Tote bag kanvas premium dengan sablon logo Mocca. Cocok untuk membawa perlengkapan harian Anda secara stylish dan ramah lingkungan.',
    sizes: ['One Size'],
    defaultSize: 'One Size',
    thumbnails: [
      '/mocca_tote_bag.png', 
      '/mocca_col_accessories.png', 
      '/mocca_tote_bag.png', 
      '/mocca_tote_bag.png'
    ],
    features: [
      { label: 'Premium Canvas 12oz', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>' },
      { label: 'Spacious Compartment', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>' },
      { label: 'Sablon Plastisol', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"/></svg>' },
      { label: 'Durable & Water Resistant', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
    ]
  },
  mug: {
    description: 'Cangkir enamel klasik tahan panas dengan aksen rim hitam elegan. Sempurna menemani waktu minum kopi hangat sambil mendengarkan alunan lagu Mocca.',
    sizes: ['350ml'],
    defaultSize: '350ml',
    thumbnails: [
      '/mocca_enamel_mug.png', 
      '/mocca_col_everyday.png', 
      '/mocca_enamel_mug.png', 
      '/mocca_enamel_mug.png'
    ],
    features: [
      { label: 'High Quality Enamel', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M17 8h1a4 4 0 1 1 0 8h-1M5 8h12v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/></svg>' },
      { label: 'Heat Resistant', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>' },
      { label: 'Classic Vintage Rim', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse></svg>' },
      { label: 'Eco-Friendly & Safe', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
    ]
  },
  cap: {
    description: 'Topi baseball bergaya kasual dengan bordir logo Mocca di bagian depan. Dilengkapi pengatur ukuran logam kuningan premium di belakang.',
    sizes: ['Adjustable'],
    defaultSize: 'Adjustable',
    thumbnails: [
      '/mocca_logo_cap.png', 
      '/mocca_col_accessories.png', 
      '/mocca_logo_cap.png', 
      '/mocca_logo_cap.png'
    ],
    features: [
      { label: '100% Cotton Twill', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>' },
      { label: 'Adjustable Brass Strap', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="9"></circle><path d="M12 17v-5"/></svg>' },
      { label: 'High-Density Embroidery', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>' },
      { label: 'UV Protection Visor', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>' }
    ]
  }
};

const fetchedProductDetails = ref(null);
const isLoadingDetails = ref(false);

// Compute dynamic metadata based on product id or fetched data
const productData = computed(() => {
  if (fetchedProductDetails.value) {
    const d = fetchedProductDetails.value;
    
    const variants = d.productVarian || d.product_varian || [];
    const sizes = variants.map(v => v.varian_name);
    const defaultSize = sizes.length > 0 ? sizes[0] : 'One Size';
    const thumbnails = d.product_image && d.product_image.length > 0 
      ? d.product_image.map(img => img.image_url) 
      : (props.product?.image ? [props.product.image] : ['/mocca_group_tee.png']);

    const plainDesc = d.description || 'Official merchandise Mocca.';

    return {
      description: plainDesc,
      sizes: sizes.length > 0 ? sizes : ['One Size'],
      defaultSize: defaultSize,
      thumbnails: thumbnails,
      variants: variants,
      features: [
        { label: 'Official Merchandise Mocca', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="f-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"/></svg>' }
      ]
    };
  }
  
  const meta = productsMetadata[props.product?.id] || productsMetadata.tee;
  return {
    ...meta,
    thumbnails: props.product?.image ? [props.product.image] : meta.thumbnails
  };
});

const currentVariant = computed(() => {
  if (productData.value && productData.value.variants) {
    return productData.value.variants.find(v => v.varian_name === selectedSize.value);
  }
  return null;
});

const currentStockCount = computed(() => {
  if (currentVariant.value && currentVariant.value.stock_summary) {
    return currentVariant.value.stock_summary.sisa_stock;
  }
  return null;
});

const isCurrentSoldOut = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.is_soldout === 1 || currentStockCount.value === 0;
  }
  return false;
});

watch(isCurrentSoldOut, (soldOut) => {
  if (soldOut) {
    qty.value = 0;
  } else if (qty.value === 0) {
    qty.value = 1;
  }
});

// Watch for product data changes to reset selected size if needed
watch(productData, (newMeta) => {
  if (!selectedSize.value || !newMeta.sizes.includes(selectedSize.value)) {
    selectedSize.value = newMeta.defaultSize;
  }
});

// Watch for product changes to reset selectors and fetch details
watch(() => props.product, async (newVal) => {
  if (newVal && newVal.id) {
    activeImageIndex.value = 0;
    selectedColor.value = newVal.colors ? newVal.colors[0] : 'cream';
    isWishlisted.value = false;
    fetchedProductDetails.value = null;
    qty.value = getItemQuantity(newVal.id, selectedColor.value) || 1;

    if (newVal.slug) {
      isLoadingDetails.value = true;
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://api.kolektix.com';
        const response = await fetch(`${apiUrl}/api/product/${newVal.slug}`);
        const resJson = await response.json();
        if (resJson.data) {
          fetchedProductDetails.value = resJson.data;
          // Ensure default variant is selected immediately after fetch
          const variants = resJson.data.productVarian || resJson.data.product_varian || [];
          if (variants.length > 0) {
            selectedSize.value = variants[0].varian_name;
          } else {
            selectedSize.value = 'One Size';
          }
        }
      } catch(e) {
        console.error('Failed to fetch product details', e);
      } finally {
        isLoadingDetails.value = false;
      }
    } else {
      const meta = productData.value;
      selectedSize.value = meta.defaultSize;
    }
  }
}, { immediate: true });

// Watch selected color changes to update quantity to match current cart count
watch(selectedColor, (newColor) => {
  if (props.product && props.product.id && newColor) {
    qty.value = getItemQuantity(props.product.id, newColor) || 1;
  }
});

const close = () => {
  emit('close');
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
  triggerToast(isWishlisted.value ? 'Added to wishlist!' : 'Removed from wishlist.');
};

const changeModalQty = (delta) => {
  if (isCurrentSoldOut.value) return;
  qty.value = Math.max(0, qty.value + delta); // Allow quantity down to 0!
};

const handleAddToCart = () => {
  const variantId = currentVariant.value ? currentVariant.value.id : (props.product.variant_id || null);
  const p = {
    id: props.product.id,
    title: productTitle.value,
    price: props.product.price,
    image: props.product.image,
    variant_id: variantId,
    has_store_location: fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || null, admin_fee: fetchedProductDetails.value?.admin_fee || props.product?.admin_fee || 0
  };
  
  const variantVal = selectedSize.value || '-';
  
  // Calculate difference between desired quantity and current cart count
  const currentCartQty = getItemQuantity(p.id, variantVal);
  const diff = qty.value - currentCartQty;
  
  if (currentCartQty === 0 && qty.value > 0) {
    addToCart(p, variantVal, qty.value);
  } else if (diff !== 0) {
    updateQuantity(p.id, variantVal, diff);
  }
  
  if (qty.value === 0) {
    triggerToast('Item removed from Cart');
  } else {
    triggerToast(`Cart updated to ${qty.value} item(s)!`);
  }
  
  setTimeout(() => {
    close();
  }, 800);
};

const handleBuyNow = () => {
  if (isCurrentSoldOut.value) return;
  
  const productPrice = props.product.price || 0;
  const currentPrice = currentVariant.value ? parseInt(currentVariant.value.price) : productPrice;
  const variantId = currentVariant.value ? currentVariant.value.id : (props.product.variant_id || null);

  const storeLocation = fetchedProductDetails.value?.has_store_location || props.product?.has_store_location || null;

  checkedCheckoutItems.value = [{
    id: props.product.id,
    name: productTitle.value,
    price: currentPrice,
    qty: Math.max(1, qty.value),
    color: selectedColor.value,
    size: selectedSize.value || '-',
    image: props.product.image,
    note: '',
    variant_id: variantId,
    store_location: storeLocation,
    admin_fee: fetchedProductDetails.value?.admin_fee || props.product?.admin_fee || 0
  }];
  
  triggerToast(currentLang.value === 'id' ? 'Mengarahkan ke halaman checkout...' : 'Directing to checkout page...');
  setTimeout(() => {
    close();
    currentPage.value = 'payment';
  }, 800);
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2000);
};

const formatPrice = (price) => {
  if (!price) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 10, 10, 0.55);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-container {
  background-color: var(--color-bg-light);
  width: 960px;
  max-width: 95vw;
  max-height: 90vh;
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalScaleUp 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid var(--color-mocca-border);
}

@keyframes modalScaleUp {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-modal-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-dark);
  opacity: 0.6;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  z-index: 10;
}

.close-modal-btn:hover {
  opacity: 1;
  background-color: rgba(59, 35, 20, 0.05);
}

.close-icon {
  width: 20px;
  height: 20px;
}

/* Modal Inner Columns */
.modal-main-content {
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 480px;
  overflow: hidden;
}

/* Left Image Column */
.modal-images-column {
  width: 52%;
  padding: 2.5rem;
  display: flex;
  gap: 1.25rem;
  background-color: #FAF6F0; /* Soft warm cream */
  border-right: 1px solid var(--color-mocca-border);
  overflow-y: auto;
}

/* 1. Thumbnails column */
.thumbnails-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

.thumb-btn {
  width: 68px;
  height: 68px;
  border-radius: 6px;
  overflow: hidden;
  border: 1.5px solid transparent;
  background-color: var(--color-bg-light);
  cursor: pointer;
  padding: 0;
  transition: var(--transition-smooth);
}

.thumb-btn.active,
.thumb-btn:hover {
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 2. Main Frame display */
.main-display-frame {
  flex-grow: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
}

.main-display-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

/* Right Info Column */
.modal-info-column {
  width: 48%;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.info-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.info-tag {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-mocca-muted);
}

.info-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

.info-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}

.rating-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: #D9A05B; /* Cozy warm gold */
}

.rating-val {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.reviews-count {
  font-weight: 400;
  color: var(--color-mocca-muted);
}

.wishlist-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.wishlist-btn:hover,
.wishlist-btn.active {
  color: #c94b4b; /* Hot warm red */
}

.heart-icon {
  width: 16px;
  height: 16px;
}

.product-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.6;
  color: #55443a;
  margin-bottom: 0.85rem;
}

:deep(.product-description h2),
:deep(.product-description h3) {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

:deep(.product-description p) {
  margin-bottom: 0.5rem;
}

:deep(.product-description ul) {
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Size Chart */
.size-chart-container {
  margin-bottom: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
  background-color: var(--color-mocca-dark);
}

.table-scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background-color: var(--color-bg-light);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.size-chart-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-bg-light);
  background-color: var(--color-mocca-dark);
  padding: 0.65rem 1rem;
  margin: 0;
  text-align: center;
  letter-spacing: 0.05em;
}

.size-chart-img-wrapper {
  width: 100%;
  background-color: var(--color-bg-light);
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-mocca-border);
}

.size-chart-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.size-chart-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 0.8rem;
  text-align: center;
  background-color: var(--color-bg-light);
}

.size-chart-table th {
  background-color: #FAF6F0;
  color: var(--color-mocca-dark);
  font-weight: 700;
  padding: 0.65rem;
  border-bottom: 1px solid var(--color-mocca-border);
  border-right: 1px solid var(--color-mocca-border);
}

.size-chart-table th:last-child {
  border-right: none;
}

.size-chart-table td {
  padding: 0.6rem;
  border-bottom: 1px solid var(--color-mocca-border);
  border-right: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-weight: 500;
}

.size-chart-table td:last-child {
  border-right: none;
}

.size-chart-table tr:last-child td {
  border-bottom: none;
}

.size-chart-table tr:nth-child(even) {
  background-color: #FAF6F0;
}

/* Feature grid */
.feature-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #FAF6F0; /* Soft warm cream */
  border-radius: 8px;
  margin-bottom: 0.85rem;
  border: 1px solid var(--color-mocca-border);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-icon {
  color: var(--color-mocca-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

:deep(.f-icon) {
  width: 18px;
  height: 18px;
}

.feature-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
}

/* Selections options */
.selection-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.selection-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.selection-options {
  display: flex;
  gap: 0.75rem;
}

.color-swatch-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  border: 1.5px solid rgba(0,0,0,0.06);
  position: relative;
  transition: var(--transition-smooth);
}

.color-swatch-circle:hover {
  transform: scale(1.1);
}

.color-swatch-circle.active::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 1.5px solid var(--color-mocca-dark);
  border-radius: 50%;
}

.circle-cream { background-color: #FAF6F0; }
.circle-black { background-color: #2D1A0E; }
.circle-green { background-color: #2E4A3E; }
.circle-beige { background-color: #D9C5B2; }

.sizes-row {
  display: flex;
  gap: 0.5rem;
}

.size-selector-btn {
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.size-selector-btn:hover {
  border-color: var(--color-mocca-dark);
}

.size-selector-btn.active {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-color: var(--color-mocca-dark);
}

.stock-indicator {
  margin-top: 0.5rem;
}

.stock-badge {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.stock-badge.sold-out {
  background-color: #FEE2E2;
  color: #B91C1C;
}

.stock-badge.available {
  background-color: #D1FAE5;
  color: #065F46;
}

/* Control & Checkout sections */
.checkout-control-section {
  border-top: 1px solid rgba(59, 35, 20, 0.08);
  padding-top: 1rem;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.price-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

.price-val {
  font-family: var(--font-body);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.actions-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.modal-qty-adjuster {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--color-bg-light);
  height: 44px;
}

.adjust-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  opacity: 0.7;
  transition: var(--transition-smooth);
}

.adjust-btn:hover:not(:disabled) {
  opacity: 1;
  background-color: rgba(59, 35, 20, 0.05);
}

.adjust-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.adj-icon {
  width: 12px;
  height: 12px;
}

.qty-num {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  width: 28px;
  text-align: center;
}

.add-to-cart-outline-btn {
  background: none;
  border: 1.5px solid var(--color-mocca-dark);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0 1.5rem;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-smooth);
  flex-grow: 1;
  justify-content: center;
}

.add-to-cart-outline-btn:hover:not(:disabled) {
  background-color: rgba(59, 35, 20, 0.04);
}

.add-to-cart-outline-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--color-mocca-muted);
  color: var(--color-mocca-muted);
}

.bag-icon {
  width: 16px;
  height: 16px;
}

.buy-now-solid-btn {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0 1.5rem;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  flex-grow: 1;
  transition: var(--transition-smooth);
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.15);
}

.buy-now-solid-btn:hover:not(:disabled) {
  background-color: #2D1A0E;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 35, 20, 0.2);
}

.buy-now-solid-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
  background-color: var(--color-mocca-muted);
}

/* Bottom trust bar grid */
.bottom-trust-features {
  border-top: 1px solid var(--color-mocca-border);
  background-color: var(--color-bg-light);
  padding: 1.5rem 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.trust-icon {
  width: 24px;
  height: 24px;
  color: var(--color-mocca-muted);
  opacity: 0.7;
}

.trust-text {
  display: flex;
  flex-direction: column;
}

.trust-title {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.2;
}

.trust-desc {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  line-height: 1.2;
}

/* Toast */
.checkout-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(59, 35, 20, 0.25);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 11000;
}

.toast-check-icon {
  width: 18px;
  height: 18px;
  color: #92e0a9;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
}

.modal-fade-enter-from .modal-container {
  transform: scale(0.96) translateY(10px);
}

.modal-fade-leave-to .modal-container {
  transform: scale(0.96) translateY(10px);
}

/* RESPONSIVE SCALING DESIGN */
@media (max-width: 991px) {
  .modal-container {
    max-height: 95vh;
  }
  .modal-main-content {
    flex-direction: column;
    min-height: auto;
  }
  .modal-images-column {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-mocca-border);
    padding: 1.75rem;
  }
  .modal-info-column {
    width: 100%;
    max-height: 380px;
    padding: 1.75rem;
  }
  .bottom-trust-features {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.25rem 1.75rem;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .modal-backdrop {
    align-items: flex-end;
    padding: 0;
  }
  .modal-container {
    width: 100%;
    max-height: 90vh;
    border-radius: 24px 24px 0 0;
    overflow: visible; /* allow close button to be visible outside */
    border: none;
    animation: slideUpModal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .close-modal-btn {
    top: -3.5rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.15);
    color: #fff;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .modal-main-content {
    flex-direction: column;
    height: 90vh;
    overflow-y: auto;
    border-radius: 24px 24px 0 0;
    background-color: var(--color-bg-light);
  }
  .modal-images-column {
    padding: 0;
    width: 100%;
    flex-direction: column-reverse;
    border: none;
    flex-shrink: 0;
  }
  .main-display-frame {
    width: 100%;
    height: auto;
    min-height: 350px;
    aspect-ratio: 1 / 1;
    border-radius: 24px 24px 0 0;
    border: none;
    background-color: var(--color-bg-light);
  }
  .main-display-img {
    object-fit: contain;
    padding: 1rem;
  }
  .thumbnails-sidebar {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    padding: 0 1rem 1rem 1rem;
    gap: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }
  .thumbnails-sidebar::-webkit-scrollbar {
    display: none;
  }
  .thumbnails-sidebar .thumb-btn {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
  }
  .modal-info-column {
    max-height: none;
    overflow-y: visible;
    padding: 1.5rem;
  }
  .size-chart-container {
    width: 100%;
    margin-top: 1rem;
  }
  .bottom-trust-features {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    padding: 1rem 1.5rem;
    gap: 1.5rem;
    -webkit-overflow-scrolling: touch;
  }
  .bottom-trust-features::-webkit-scrollbar {
    display: none;
  }
  .trust-item {
    flex-shrink: 0;
  }
  .actions-row {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .modal-qty-adjuster {
    width: auto;
    height: 42px;
    background-color: var(--color-mocca-dark);
    color: var(--color-bg-light);
    border-color: var(--color-mocca-dark);
    border-radius: 6px;
  }
  .modal-qty-adjuster .adjust-btn {
    color: var(--color-bg-light);
    width: 32px;
  }
  .modal-qty-adjuster .qty-num {
    color: var(--color-bg-light);
    font-size: 0.9rem;
  }
  .add-to-cart-outline-btn {
    flex-grow: 1;
    height: 42px;
  }
  .buy-now-solid-btn {
    width: 100%;
  }
}

@keyframes slideUpModal {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
