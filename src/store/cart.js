import { ref, computed } from 'vue';

// Reactive state
export const cartItems = ref([]);
export const isCartOpen = ref(false);
export const searchQuery = ref('');
export const currentLang = ref('id');
export const currentPage = ref('home');
export const isSearchOpen = ref(false);
export const triggerProfile = ref(false);

// Format helper for ID
const getCartKey = (id, color) => `${id}-${color}`;

// Actions
export const addToCart = (product, color) => {
  const key = getCartKey(product.id, color);
  const existingItem = cartItems.value.find(item => item.key === key);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      key,
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: color || 'default',
      quantity: 1
    });
  }
};

export const updateQuantity = (productId, color, delta) => {
  const key = getCartKey(productId, color);
  const existingItem = cartItems.value.find(item => item.key === key);

  if (existingItem) {
    existingItem.quantity += delta;
    if (existingItem.quantity <= 0) {
      removeFromCart(productId, color);
    }
  }
};

export const removeFromCart = (productId, color) => {
  const key = getCartKey(productId, color);
  cartItems.value = cartItems.value.filter(item => item.key !== key);
};

export const getItemQuantity = (productId, color) => {
  const key = getCartKey(productId, color);
  const existingItem = cartItems.value.find(item => item.key === key);
  return existingItem ? existingItem.quantity : 0;
};

// Computed properties
export const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

export const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

export const clearCart = () => {
  cartItems.value = [];
};
