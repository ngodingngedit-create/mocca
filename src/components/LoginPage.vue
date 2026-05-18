<template>
  <div class="login-page-wrapper">
    <div class="login-main-container">
      <!-- ================= LEFT PANEL: BRANDING & ART ================= -->
      <div class="login-left-panel">
        <div class="branding-header">
          <h1 class="mocca-logo" @click="goToHome">Mocca</h1>
        </div>

        <div class="branding-content">
          <h2 class="branding-title">
            {{ currentLang === 'id' ? 'Selamat datang di Mocca' : 'Welcome to Mocca' }}
          </h2>
          <p class="branding-subtext">
            {{ currentLang === 'id' 
              ? 'Masuk atau daftar akun untuk menikmati pengalaman berbelanja merch favoritmu dengan lebih mudah.' 
              : 'Sign in or register to enjoy a seamless shopping experience for your favorite cozy merch.' 
            }}
          </p>

          <!-- Beautiful Custom Outline Illustration -->
          <div class="art-illustration-box">
            <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" class="group-sitting-svg">
              <!-- Framed picture on the wall -->
              <rect x="50" y="50" width="45" height="60" rx="3" fill="none" stroke="#55331C" stroke-width="1.8" />
              <rect x="53" y="53" width="39" height="54" rx="1" fill="none" stroke="#55331C" stroke-width="1.2" />
              <text x="72" y="80" font-size="8" font-family="var(--font-heading)" fill="#55331C" text-anchor="middle" font-weight="bold">MoCCA</text>
              <circle cx="63" cy="95" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              <circle cx="71" cy="94" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              <circle cx="79" cy="95" r="3" fill="none" stroke="#55331C" stroke-width="1" />
              
              <!-- Floating shelf next to it -->
              <line x1="220" y1="110" x2="310" y2="110" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M230 110 L233 93 L245 93 L248 110 Z" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M239 93 C236 85, 233 80, 235 75 C237 80, 240 85, 239 93 Z" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M239 93 C242 85, 246 81, 245 76 C242 81, 239 86, 239 93 Z" fill="none" stroke="#55331C" stroke-width="1.5" />
              <!-- Coffee cup -->
              <path d="M265 110 L265 98 L277 98 L277 110 Z" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M277 101 C281 101, 281 107, 277 107" fill="none" stroke="#55331C" stroke-width="1.8" />
              
              <!-- Potted plant on the floor (left) -->
              <path d="M48 310 L52 265 L76 265 L80 310 Z" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M64 265 C64 220, 40 210, 30 200 C50 215, 60 235, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C64 220, 88 210, 98 200 C78 215, 68 235, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C55 235, 30 240, 20 250 C40 250, 50 255, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M64 265 C73 235, 98 240, 108 250 C88 250, 78 255, 64 265" fill="none" stroke="#55331C" stroke-width="1.8" />

              <!-- Sofa -->
              <path d="M110 240 L110 190 A 10 10 0 0 1 120 180 L290 180 A 10 10 0 0 1 300 190 L300 240" fill="none" stroke="#55331C" stroke-width="2" />
              <rect x="100" y="240" width="210" height="25" rx="5" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M100 240 L100 205 A 8 8 0 0 1 108 197 L115 197 C120 205, 120 230, 115 240" fill="none" stroke="#55331C" stroke-width="2" />
              <path d="M310 240 L310 205 A 8 8 0 0 0 302 197 L295 197 C290 205, 290 230, 295 240" fill="none" stroke="#55331C" stroke-width="2" />
              <!-- Legs -->
              <line x1="120" y1="265" x2="115" y2="295" stroke="#55331C" stroke-width="2.2" stroke-linecap="round" />
              <line x1="290" y1="265" x2="295" y2="295" stroke="#55331C" stroke-width="2.2" stroke-linecap="round" />
              <line x1="150" y1="265" x2="150" y2="280" stroke="#55331C" stroke-width="1.2" />
              <line x1="260" y1="265" x2="260" y2="280" stroke="#55331C" stroke-width="1.2" />

              <!-- 4 People Sitting on Sofa -->
              <!-- Person 1 (Far Left, Male) -->
              <circle cx="150" cy="165" r="10" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M150 175 C140 185, 135 200, 130 220 L135 250" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M150 175 C155 185, 160 200, 160 215 L158 245" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M130 220 L115 228" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M135 250 L130 290 L122 292" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M158 245 L162 285 L170 287" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 2 (Male 2) -->
              <circle cx="188" cy="158" r="9.5" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M188 167.5 C180 180, 178 200, 178 215" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M188 167.5 C195 180, 198 200, 198 220" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M180 185 C190 195, 205 195, 210 210" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M178 215 L175 255 L165 292" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M198 220 L202 258 L212 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 3 (Female 1) -->
              <circle cx="225" cy="162" r="9" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M217 162 C217 152, 233 152, 233 162 C234 168, 230 172, 225 173" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M225 171 C220 182, 218 202, 218 218" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M225 171 C232 182, 235 202, 235 218" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M232 185 L242 205" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M218 218 L220 255 L222 285 L228 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M235 218 L238 255 L242 285 L248 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />

              <!-- Person 4 (Female 2) -->
              <circle cx="265" cy="160" r="9.2" fill="none" stroke="#55331C" stroke-width="1.8" />
              <path d="M256 160 C256 150, 274 150, 274 160 C274 175, 270 185, 272 195" fill="none" stroke="#55331C" stroke-width="1.5" />
              <path d="M265 169.2 C258 180, 256 200, 256 216" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M265 169.2 C272 180, 274 200, 274 216" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M272 185 L288 200" fill="none" stroke="#55331C" stroke-width="1.6" stroke-linecap="round" />
              <path d="M256 216 L254 252 L250 286" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
              <path d="M274 216 L278 252 L282 283 L288 284" fill="none" stroke="#55331C" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <!-- Left Panel Footer: Cozy Feature Column Badges -->
        <div class="branding-features">
          <!-- Col 1 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Belanja Aman' : 'Secure Shopping' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Transaksi aman dan terpercaya' : 'Safe and trusted checkout' }}</span>
            </div>
          </div>

          <!-- Col 2 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Promo Eksklusif' : 'Exclusive Promos' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Dapatkan promo & voucher menarik' : 'Access amazing coupon deals' }}</span>
            </div>
          </div>

          <!-- Col 3 -->
          <div class="feat-badge-col">
            <div class="feat-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div class="feat-text-box">
              <span class="feat-title">{{ currentLang === 'id' ? 'Lacak Pesanan' : 'Order Tracking' }}</span>
              <span class="feat-desc">{{ currentLang === 'id' ? 'Pantau pesananmu dengan mudah' : 'Track your package location' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT PANEL: DYNAMIC CARD ================= -->
      <div class="login-right-panel">
        <div class="login-card-container">
          <!-- Card Switch Tabs -->
          <div class="login-tabs">
            <button 
              class="tab-btn" 
              :class="{ active: activeMode === 'login' }"
              @click="switchMode('login')"
            >
              Login
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeMode === 'register' }"
              @click="switchMode('register')"
            >
              {{ currentLang === 'id' ? 'Registrasi' : 'Register' }}
            </button>
          </div>

          <div class="login-card-content">
            <!-- Mode 1: LOGIN VIEW -->
            <div v-if="activeMode === 'login'" class="form-wrapper">
              <div class="form-header">
                <h3 class="form-title">
                  {{ currentLang === 'id' ? 'Selamat datang kembali!' : 'Welcome back!' }}
                </h3>
                <p class="form-subtext">
                  {{ currentLang === 'id' ? 'Masuk untuk melanjutkan ke akun Mocca kamu.' : 'Sign in to access your Mocca account.' }}
                </p>
              </div>

              <!-- Input forms -->
              <form @submit.prevent="submitLogin" class="auth-form-fields">
                <div class="form-input-group">
                  <label class="form-label">Email</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input 
                      v-model="loginForm.email"
                      type="email"
                      required
                      :placeholder="currentLang === 'id' ? 'Masukkan email kamu' : 'Enter your email'"
                      class="auth-input-field"
                    />
                  </div>
                </div>

                <div class="form-input-group">
                  <label class="form-label">Password</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input 
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      :placeholder="currentLang === 'id' ? 'Masukkan password kamu' : 'Enter your password'"
                      class="auth-input-field"
                    />
                    <button type="button" class="eye-toggle-btn" @click="showPassword = !showPassword" aria-label="Toggle password visibility">
                      <svg v-if="showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="forgot-row">
                  <a href="#" class="forgot-link" @click.prevent="triggerForgot">
                    {{ currentLang === 'id' ? 'Lupa password?' : 'Forgot password?' }}
                  </a>
                </div>

                <button type="submit" class="btn-auth-submit font-bold" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-mini"></span>
                  <span v-else>{{ currentLang === 'id' ? 'Masuk' : 'Sign In' }}</span>
                </button>
              </form>
            </div>

            <!-- Mode 2: REGISTRATION VIEW -->
            <div v-else class="form-wrapper">
              <div class="form-header">
                <h3 class="form-title">
                  {{ currentLang === 'id' ? 'Buat akun Mocca kamu' : 'Create your Mocca account' }}
                </h3>
                <p class="form-subtext">
                  {{ currentLang === 'id' ? 'Mulai perjalanan belanja merch Mocca favoritmu.' : 'Start your journey shopping cozy Mocca merchandise.' }}
                </p>
              </div>

              <form @submit.prevent="submitRegister" class="auth-form-fields">
                <div class="form-input-group">
                  <label class="form-label">{{ currentLang === 'id' ? 'Nama Lengkap' : 'Full Name' }}</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input 
                      v-model="registerForm.fullName"
                      type="text"
                      required
                      :placeholder="currentLang === 'id' ? 'Nama lengkap Anda' : 'Your full name'"
                      class="auth-input-field"
                    />
                  </div>
                </div>

                <div class="form-input-group">
                  <label class="form-label">Email</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input 
                      v-model="registerForm.email"
                      type="email"
                      required
                      :placeholder="currentLang === 'id' ? 'Masukkan email kamu' : 'Enter your email'"
                      class="auth-input-field"
                    />
                  </div>
                </div>

                <div class="form-input-group">
                  <label class="form-label">{{ currentLang === 'id' ? 'Kata Sandi' : 'Password' }}</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input 
                      v-model="registerForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      :placeholder="currentLang === 'id' ? 'Buat kata sandi minimal 6 karakter' : 'Create at least 6 characters'"
                      class="auth-input-field"
                    />
                    <button type="button" class="eye-toggle-btn" @click="showPassword = !showPassword" aria-label="Toggle password visibility">
                      <svg v-if="showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="form-input-group">
                  <label class="form-label">{{ currentLang === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm Password' }}</label>
                  <div class="input-icon-wrapper">
                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input 
                      v-model="registerForm.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      required
                      :placeholder="currentLang === 'id' ? 'Ulangi kata sandi Anda' : 'Repeat your password'"
                      class="auth-input-field"
                    />
                    <button type="button" class="eye-toggle-btn" @click="showConfirmPassword = !showConfirmPassword" aria-label="Toggle password visibility">
                      <svg v-if="showConfirmPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" class="btn-auth-submit font-bold" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-mini"></span>
                  <span v-else>{{ currentLang === 'id' ? 'Daftar' : 'Sign Up' }}</span>
                </button>
              </form>
            </div>

            <!-- Social Login Integration Options -->
            <div class="social-auth-block">
              <div class="social-divider">
                <span class="divider-line"></span>
                <span class="divider-text">
                  {{ activeMode === 'login' 
                    ? (currentLang === 'id' ? 'atau masuk dengan' : 'or sign in with')
                    : (currentLang === 'id' ? 'atau daftar dengan' : 'or sign up with') 
                  }}
                </span>
                <span class="divider-line"></span>
              </div>

              <div class="social-buttons-row">
                <!-- Google Button -->
                <button type="button" class="btn-social-auth" @click="socialLogin('Google')">
                  <svg class="social-logo" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>

                <!-- Apple Button -->
                <button type="button" class="btn-social-auth" @click="socialLogin('Apple')">
                  <svg class="social-logo" width="15" height="15" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.39.13-9.14-1.78-14.24-5.75-3.56-2.77-7.38-7.44-11.47-14-11.69-19.16-17.54-38.31-17.54-57.44 0-14.77 3.56-26.68 10.68-35.73 7.13-9.06 16.03-13.59 26.7-13.59 5.02 0 10.42 1.48 16.19 4.43 5.77 2.95 9.35 4.42 10.75 4.42 1.52 0 5.25-1.54 11.19-4.63 5.95-3.08 11.22-4.56 15.82-4.43 16.51 1.39 28.76 7.64 36.75 18.75-14.07 8.56-20.97 20.1-20.72 34.63.26 11.43 4.25 21.08 11.97 28.94 7.72 7.87 17.2 12.18 28.44 12.94 1.02 2.76 2.06 5.86 3.12 9.3zM119.5 29.54C119.5 22.18 122.1 15.6 127.3 9.8c5.2-5.8 11.58-9.1 19.16-9.8.13 1.13.2 2.12.2 2.97 0 7.23-2.68 13.91-8.04 20.02-5.36 6.1-11.83 9.47-19.42 10.09-.45-1.12-.7-2.28-.7-3.54z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>

            <!-- Bottom form switcher text -->
            <div class="auth-bottom-switch">
              <span v-if="activeMode === 'login'">
                {{ currentLang === 'id' ? 'Belum punya akun?' : "Don't have an account?" }}
                <a href="#" class="switch-link font-bold" @click.prevent="switchMode('register')">
                  {{ currentLang === 'id' ? 'Daftar sekarang' : 'Register now' }}
                </a>
              </span>
              <span v-else>
                {{ currentLang === 'id' ? 'Sudah punya akun?' : 'Already have an account?' }}
                <a href="#" class="switch-link font-bold" @click.prevent="switchMode('login')">
                  {{ currentLang === 'id' ? 'Masuk sekarang' : 'Sign in now' }}
                </a>
              </span>
            </div>

            <!-- Kembali ke Beranda Button inside Card -->
            <div class="card-back-home-wrapper">
              <button type="button" class="btn-back-home" @click="goToHome">
                <svg class="back-arrow-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>{{ currentLang === 'id' ? 'Kembali ke Beranda' : 'Back to Home' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer legal disclaimer -->
        <div class="login-footer-text">
          <p>
            {{ currentLang === 'id' 
              ? 'Dengan masuk atau mendaftar, kamu menyetujui' 
              : 'By signing in or registering, you agree to Mocca\'s' 
            }}
            <a href="#" class="legal-link">{{ currentLang === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions' }}</a>
            {{ currentLang === 'id' ? 'dan' : 'and' }}
            <a href="#" class="legal-link">{{ currentLang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy' }}</a> 
            {{ currentLang === 'id' ? 'dari Mocca.' : '.' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Cozy Sleek Toast notifications -->
    <div class="toast" :class="{ 'active': toastActive }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { currentLang, currentPage, triggerProfile } from '../store/cart.js';

// Tabs Mode: 'login' or 'register'
const activeMode = ref('login');
const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const toastActive = ref(false);
const toastMessage = ref('');

// Forms states
const loginForm = reactive({
  email: '',
  password: ''
});

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const switchMode = (mode) => {
  activeMode.value = mode;
  showPassword.value = false;
  showConfirmPassword.value = false;
};

const goToHome = () => {
  currentPage.value = 'home';
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2500);
};

const submitLogin = () => {
  if (!loginForm.email || !loginForm.password) return;
  
  isSubmitting.value = true;
  
  setTimeout(() => {
    isSubmitting.value = false;
    triggerToast(currentLang.value === 'id' ? 'Berhasil masuk! Selamat datang kembali.' : 'Login successful! Welcome back.');
    
    // Redirect to profile page after login
    setTimeout(() => {
      currentPage.value = 'profile';
    }, 1000);
  }, 1200);
};

const submitRegister = () => {
  if (!registerForm.fullName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) return;
  
  if (registerForm.password !== registerForm.confirmPassword) {
    triggerToast(currentLang.value === 'id' ? 'Konfirmasi kata sandi tidak cocok!' : 'Confirm password does not match!');
    return;
  }

  if (registerForm.password.length < 6) {
    triggerToast(currentLang.value === 'id' ? 'Kata sandi minimal 6 karakter!' : 'Password must be at least 6 characters!');
    return;
  }
  
  isSubmitting.value = true;
  
  setTimeout(() => {
    isSubmitting.value = false;
    triggerToast(currentLang.value === 'id' ? 'Pendaftaran berhasil! Akun Anda telah dibuat.' : 'Registration successful! Your account is created.');
    
    // Autofill login and switch tab
    loginForm.email = registerForm.email;
    loginForm.password = '';
    
    setTimeout(() => {
      switchMode('login');
    }, 1500);
  }, 1500);
};

const triggerForgot = () => {
  triggerToast(currentLang.value === 'id' ? 'Link pemulihan kata sandi telah dikirim ke email Anda.' : 'Password recovery link has been sent to your email.');
};

const socialLogin = (provider) => {
  triggerToast(currentLang.value === 'id' ? `Menghubungkan layanan masuk dengan ${provider}...` : `Connecting sign in service with ${provider}...`);
};
</script>

<style scoped>
/* ================= PAGE CONTAINER STYLING ================= */
.login-page-wrapper {
  background-color: #F5F2ED; /* Minimalist warm cream background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.card-back-home-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.15rem;
  width: 100%;
}

.btn-back-home {
  background-color: #FDFBF7;
  border: 1px solid rgba(90, 60, 40, 0.1);
  border-radius: 30px;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(90, 60, 40, 0.03);
  width: 100%;
}

.btn-back-home:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(90, 60, 40, 0.12);
}

.btn-back-home:hover .back-arrow-icon {
  transform: translateX(-2px);
}

.back-arrow-icon {
  stroke-width: 2.5;
  transition: transform 0.25s ease;
}

/* ================= SPLIT PANEL MAIN LAYOUT ================= */
.login-main-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 3rem 3rem 3rem;
  display: grid;
  grid-template-columns: 46% 54%;
  gap: 3rem;
  flex-grow: 1;
  align-items: center;
}

/* ================= LEFT COLUMN: BRANDING & ILLUSTRATION ================= */
.login-left-panel {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.mocca-logo {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  margin: 0;
  cursor: pointer;
  display: inline-block;
}

.branding-content {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.branding-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 500;
  color: var(--color-mocca-dark);
  line-height: 1.15;
  margin: 0;
}

.branding-subtext {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-mocca-muted);
  max-width: 420px;
  margin: 0;
}

.art-illustration-box {
  width: 100%;
  max-width: 440px;
  margin-top: 0.5rem;
}

.group-sitting-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Features Columns Badges */
.branding-features {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 400px;
}

.feat-badge-col {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.feat-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #EFECE6;
  border: 1px solid rgba(90, 60, 40, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.feat-text-box {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.feat-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.feat-desc {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
}

/* ================= RIGHT COLUMN: LOGIN CARD ================= */
.login-right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.5rem;
}

.login-card-container {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.08);
  box-shadow: 0 10px 40px rgba(59, 35, 20, 0.035);
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Header Tab Buttons */
.login-tabs {
  display: flex;
  border-bottom: 1.5px solid rgba(90, 60, 40, 0.06);
  background-color: #FCFAF7;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  text-align: center;
}

.tab-btn:hover {
  color: var(--color-mocca-dark);
  background-color: #F8F5F0;
}

.tab-btn.active {
  color: var(--color-mocca-dark);
  font-weight: 700;
  background-color: #FFFFFF;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1.5px;
  left: 0;
  width: 100%;
  height: 2.5px;
  background-color: #8C7355;
}

/* Form Container Content */
.login-card-content {
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.form-header {
  margin-bottom: 1.5rem;
}

.form-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 0.35rem 0;
}

.form-subtext {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin: 0;
  line-height: 1.45;
}

/* Auth Input Fields */
.auth-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: var(--color-mocca-muted);
  opacity: 0.7;
}

.auth-input-field {
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
  transition: all 0.25s ease;
}

.auth-input-field:focus {
  outline: none;
  border-color: var(--color-mocca-dark);
  box-shadow: 0 0 0 3px rgba(140, 115, 85, 0.08);
}

.eye-toggle-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-mocca-muted);
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-toggle-btn:hover {
  color: var(--color-mocca-dark);
}

/* Forgot Password Link Row */
.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.25rem;
}

.forgot-link {
  font-size: 0.78rem;
  color: var(--color-mocca-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--color-mocca-dark);
}

/* Submit Action Button */
.btn-auth-submit {
  width: 100%;
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0.85rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.btn-auth-submit:hover:not(:disabled) {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.15);
}

.btn-auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Social Logins Split Block */
.social-auth-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.divider-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(90, 60, 40, 0.08);
}

.divider-text {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
  white-space: nowrap;
}

.social-buttons-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.btn-social-auth {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  padding: 0.65rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-social-auth:hover {
  background-color: #FCFAF7;
  border-color: rgba(90, 60, 40, 0.22);
}

.social-logo {
  flex-shrink: 0;
}

/* Bottom Tab Switch Link styling */
.auth-bottom-switch {
  text-align: center;
  margin-top: 1.75rem;
  font-size: 0.82rem;
  color: var(--color-mocca-muted);
}

.switch-link {
  color: var(--color-mocca-dark);
  text-decoration: none;
  margin-left: 0.25rem;
  border-bottom: 1.5px solid transparent;
  padding-bottom: 1px;
  transition: border-color 0.2s ease;
}

.switch-link:hover {
  border-color: var(--color-mocca-dark);
}

/* Split Column footer text disclaimers */
.login-footer-text {
  text-align: center;
  max-width: 440px;
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--color-mocca-muted);
}

.legal-link {
  color: var(--color-mocca-muted);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: var(--color-mocca-dark);
}

/* Spinner Loader Animation */
.spinner-mini {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Global Sleek Toast Popup Alerts */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 15px);
  background-color: #3B2314;
  color: #FDFBF7;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10000;
  text-align: center;
  max-width: 90%;
  white-space: nowrap;
}

.toast.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .login-main-container {
    grid-template-columns: 1fr; /* Stacking panels on tablets and phones */
    gap: 1.5rem;
    padding: 0.25rem 0.75rem 1rem 0.75rem;
    max-width: 440px;
    justify-content: center;
    align-items: center;
  }

  .login-left-panel {
    display: none; /* Hide the branding left panel on tablet/mobile so card is instantly visible */
  }
}

@media (max-width: 768px) {
  .card-back-home-wrapper {
    display: none; /* Hide Kembali ke Beranda button on mobile screens to maximize form visibility */
  }

  .login-card-container {
    border-radius: 12px;
  }

  .tab-btn {
    padding: 0.55rem;
    font-size: 0.8rem;
  }

  .login-card-content {
    padding: 0.85rem 0.85rem; /* Super compact padding */
  }

  .form-header {
    margin-bottom: 0.25rem;
  }

  .form-title {
    font-size: 0.95rem;
  }

  .form-subtext {
    display: none !important; /* Hide description fluff text on mobile to save vertical space */
  }

  .auth-form-fields {
    gap: 0.4rem; /* Ultra tight vertical spacing */
  }

  .form-input-group {
    gap: 0.1rem;
  }

  .form-label {
    font-size: 0.65rem;
  }

  .auth-input-field {
    padding: 0.42rem 0.65rem 0.42rem 2rem; /* Super slim inputs */
    font-size: 0.74rem;
  }

  .input-icon {
    left: 8px;
    width: 14px;
    height: 14px;
  }

  .btn-auth-submit {
    padding: 0.45rem;
    font-size: 0.76rem;
    margin-top: 0.05rem;
  }

  .social-auth-block {
    margin-top: 0.45rem;
    gap: 0.35rem;
  }

  .social-buttons-row {
    grid-template-columns: 1fr 1fr; /* Keep side-by-side to save height! */
    gap: 0.5rem;
  }

  .btn-social-auth {
    padding: 0.38rem;
    font-size: 0.7rem;
  }

  .auth-bottom-switch {
    margin-top: 0.45rem;
    font-size: 0.7rem;
  }

  .login-footer-text {
    font-size: 0.62rem;
    margin-top: 0.1rem;
  }
}
</style>
