<template>
  <Transition name="slide-up">
    <div v-if="totalItems === 0 || currentPage === 'payment'" class="mobile-navbar">
      <div class="nav-items-container">
        <!-- Home -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'home' }" 
          @click="navigateTo('home')"
          aria-label="Home"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20V4l8 8 8-8v16"></path>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</span>
        </button>

        <!-- Shop / Merch -->
        <button 
          class="nav-item" 
          :class="{ active: currentPage === 'shop' && !isSearchOpen }" 
          @click="navigateTo('shop')"
          aria-label="Shop"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Merch' : 'Merch' }}</span>
        </button>

        <!-- Search -->
        <button 
          class="nav-item" 
          :class="{ active: isSearchOpen && currentPage !== 'payment' }" 
          @click="toggleSearchInput"
          aria-label="Search"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Cari' : 'Search' }}</span>
        </button>

        <!-- Cart -->
        <button 
          class="nav-item" 
          @click="openCartDrawer"
          aria-label="Cart"
        >
          <span class="active-indicator"></span>
          <div class="cart-icon-wrapper">
            <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span class="cart-badge-count" v-if="totalItems > 0">{{ totalItems }}</span>
          </div>
          <span class="nav-label">{{ currentLang === 'id' ? 'Keranjang' : 'Cart' }}</span>
        </button>

        <!-- Profile -->
        <button 
          class="nav-item" 
          @click="triggerProfileToast"
          aria-label="Profile"
        >
          <span class="active-indicator"></span>
          <svg class="nav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="nav-label">{{ currentLang === 'id' ? 'Profil' : 'Profile' }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { currentPage, currentLang, isSearchOpen, isCartOpen, totalItems, triggerProfile } from '../store/cart.js';

const navigateTo = (page) => {
  currentPage.value = page;
  isSearchOpen.value = false;
};

const toggleSearchInput = () => {
  // If not on shop, go to shop first so search works
  if (currentPage.value !== 'shop') {
    currentPage.value = 'shop';
  }
  isSearchOpen.value = !isSearchOpen.value;
};

const openCartDrawer = () => {
  isCartOpen.value = true;
};

const triggerProfileToast = () => {
  triggerProfile.value = true;
};
</script>

<style scoped>
.mobile-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-bg-light);
  border-top: 1px solid rgba(59, 35, 20, 0.08);
  border-radius: 28px 28px 0 0;
  box-shadow: 0 -12px 36px rgba(59, 35, 20, 0.16), 0 -3px 12px rgba(59, 35, 20, 0.08);
  z-index: 9998;
  padding: 0.65rem 0;
  padding-bottom: calc(0.65rem + env(safe-area-inset-bottom, 0px));
  display: none; /* Hidden on desktop */
}

.nav-items-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  color: var(--color-mocca-muted);
  cursor: pointer;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex: 1;
}

.active-indicator {
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background-color: var(--color-mocca-dark);
  position: absolute;
  top: -0.65rem;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 4px rgba(59, 35, 20, 0.2);
}

.nav-item.active .active-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-icon {
  color: var(--color-mocca-muted);
  transition: transform 0.25s ease, color 0.25s ease;
  margin-bottom: 0.25rem;
}

.nav-item.active .nav-icon {
  color: var(--color-mocca-dark);
  transform: translateY(-1px) scale(1.05);
}

.nav-label {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 500;
  transition: color 0.25s ease, font-weight 0.25s ease;
}

.nav-item.active .nav-label {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.cart-icon-wrapper {
  position: relative;
  display: inline-block;
}

.cart-badge-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border-radius: 50%;
  padding: 1px 5px;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 14px;
  text-align: center;
  border: 1px solid var(--color-bg-light);
}

/* Slide Up Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .mobile-navbar {
    display: block;
  }
}
</style>
