<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- Left-aligned Content overlaying the full background -->
      <div class="hero-content">
        <span class="tagline">Mocca's Official Merchandise</span>
        <h1 class="headline">Mocca's <br /> Official Merchandise</h1>
        
        <div class="cta-wrapper">
          <button class="shop-button">SHOP NOW</button>
        </div>
        
        <!-- Slide Indicators -->
        <div class="slide-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Interactive controls for slide dots can be added here if necessary
</script>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 520px; /* Shortened, compact height as requested */
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  /* Set full image background with precise right alignment (zoom and position) and contrast gradient */
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.98) 0%, 
    rgba(255, 255, 255, 0.92) 25%, 
    rgba(255, 255, 255, 0.55) 55%, 
    rgba(255, 255, 255, 0.10) 90%,
    rgba(255, 255, 255, 0.0) 100%
  ), url('/banner_baru.jpeg') no-repeat;
  background-position: 82% 50%; /* Perfect horizontal and vertical positioning to prevent product cut-off */
  background-size: cover; /* Beautiful responsive cover scale */
  transition: var(--transition-smooth);
}

.hero-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.hero-content {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  animation: fadeIn 1s cubic-bezier(0.25, 1, 0.5, 1);
}

.tagline {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-mocca-dark);
  opacity: 0.8;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.headline {
  font-family: var(--font-heading);
  font-size: clamp(2.0rem, 3.2vw, 3.2rem); /* Reduced size to ensure text fits on one line */
  font-weight: 500;
  line-height: 1.1;
  color: var(--color-mocca-dark);
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.subtext {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  font-weight: 300;
  color: var(--color-mocca-dark);
  opacity: 0.75;
  margin-bottom: 2rem; /* Reduced bottom margin for compact fit */
  max-width: 420px;
  line-height: 1.5;
}

.cta-wrapper {
  margin-bottom: 2.5rem; /* Reduced vertical space for compact height */
}

.shop-button {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.95rem 2.5rem; /* Slightly more compact padding */
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.12);
  transition: var(--transition-smooth);
}

.shop-button:hover {
  background-color: #2D1A0E;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(59, 35, 20, 0.2);
}

.slide-dots {
  display: flex;
  gap: 0.65rem;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #C6BCB4;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.dot.active {
  background-color: var(--color-mocca-dark);
}

.dot:hover {
  background-color: var(--color-mocca-dark);
  transform: scale(1.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-container {
    padding: 0 4rem;
  }
  .hero-section {
    background-position: 85% 50%;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    min-height: 480px;
    background-position: 90% 50%;
  }
  .hero-container {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 450px;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.96) 0%, 
      rgba(255, 255, 255, 0.90) 60%, 
      rgba(255, 255, 255, 0.75) 100%
    ), url('/banner_baru.jpeg') no-repeat center center;
    background-size: cover;
  }

  .hero-container {
    padding: 2rem;
    justify-content: center;
  }

  .hero-content {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .subtext {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-wrapper {
    margin-bottom: 2rem;
  }
}
</style>
