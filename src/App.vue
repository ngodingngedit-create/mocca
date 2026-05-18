<template>
  <div class="site-container">
    <Header />
    <main>
      <Transition name="fade" mode="out-in">
        <div v-if="currentPage === 'home'" key="home">
          <HeroSection />
          <FeaturesSection />
          <ShopSection />
        </div>
        <div v-else-if="currentPage === 'shop'" key="shop">
          <ShopPage />
        </div>
        <div v-else-if="currentPage === 'checkout'" key="checkout">
          <CheckoutPage />
        </div>
        <div v-else-if="currentPage === 'payment'" key="payment">
          <PaymentPage />
        </div>
      </Transition>
    </main>
    <Footer />
    <CartDrawer />
    <BottomCartBar v-if="currentPage !== 'checkout' && currentPage !== 'payment'" />
    <MobileNavbar v-if="currentPage !== 'checkout'" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import ShopSection from './components/sections/ShopSection.vue'
import ShopPage from './components/ShopPage.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import Footer from './components/Footer.vue'
import CartDrawer from './components/CartDrawer.vue'
import BottomCartBar from './components/BottomCartBar.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import { currentPage, totalItems } from './store/cart.js'
</script>

<style>
.site-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

/* Ensure global fonts are applied */
body {
  background-color: var(--color-bg-cream);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
}

/* Premium page transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  main {
    padding-top: 4.5rem; /* account for fixed header */
    padding-bottom: 5.5rem; /* account for fixed bottom nav or cart bar */
  }
}
</style>
