<template>
  <div class="event-checkout-page">
    <div class="checkout-container">
      
      <!-- Breadcrumbs Navigation -->
      <div class="breadcrumbs-container-checkout">
        <a href="#" class="breadcrumb-link" @click.prevent="goToHome">
          <svg class="breadcrumb-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {{ currentLang === 'id' ? 'Beranda' : 'Home' }}
        </a>
        <span class="breadcrumb-separator">></span>
        <a href="#" class="breadcrumb-link" @click.prevent="goToEventList">Event</a>
        <span class="breadcrumb-separator">></span>
        <a href="#" class="breadcrumb-link" @click.prevent="goToEventDetail">{{ displayEvent.title }}</a>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Beli Tiket' : 'Buy Tickets' }}</span>
      </div>

      <!-- Page Title & Stepper Area -->
      <div class="checkout-header-section">
        <div class="header-left-title">
          <h1 class="checkout-title-heading">{{ currentLang === 'id' ? 'Isi Data Diri' : 'Fill Personal Info' }}</h1>
          <p class="checkout-subtitle-text">
            {{ currentLang === 'id' ? 'Lengkapi data diri untuk proses pemesanan tiket Anda.' : 'Complete your personal data to proceed with ticket booking.' }}
          </p>
        </div>

        <!-- Horizontal Stepper -->
        <div class="stepper-horizontal">
          <div class="step-item active">
            <span class="step-num">1</span>
            <span class="step-label">{{ currentLang === 'id' ? 'Data Diri' : 'Personal Info' }}</span>
          </div>
          <div class="step-line"></div>
          <div class="step-item">
            <span class="step-num">2</span>
            <span class="step-label">{{ currentLang === 'id' ? 'Metode Pembayaran' : 'Payment Method' }}</span>
          </div>
          <div class="step-line"></div>
          <div class="step-item">
            <span class="step-num">3</span>
            <span class="step-label">{{ currentLang === 'id' ? 'Konfirmasi' : 'Confirmation' }}</span>
          </div>
        </div>
      </div>

      <!-- Two-Column Checkout Layout -->
      <div class="checkout-layout-grid">
        
        <!-- Left Column: Registration Forms -->
        <div class="checkout-forms-column">
          
          <!-- Data Pemesan Box -->
          <div class="form-block-card">
            <h2 class="form-block-title">{{ currentLang === 'id' ? 'Data Pemesan' : 'Orderer Data' }}</h2>
            <p class="form-block-desc">
              {{ currentLang === 'id' ? 'Data ini akan digunakan untuk keperluan pemesanan dan pengiriman e-ticket.' : 'This information will be used for ticket booking and e-ticket delivery.' }}
            </p>

            <div class="fields-grid-2col">
              <!-- Nama Lengkap -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Nama Lengkap' : 'Full Name' }} <span class="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-text-input" 
                  v-model="formData.fullName"
                  :placeholder="currentLang === 'id' ? 'Contoh: Andi Pratama' : 'e.g. John Doe'" 
                />
              </div>

              <!-- KTP / Identity Number -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Nomor Identitas (KTP)' : 'ID Number (KTP/Passport)' }} <span class="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-text-input" 
                  v-model="formData.idCard"
                  maxlength="16"
                  :placeholder="currentLang === 'id' ? '16 digit angka' : '16-digit ID number'" 
                />
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="input-field-label">
                  Email <span class="required-asterisk">*</span>
                </label>
                <input 
                  type="email" 
                  class="form-text-input" 
                  v-model="formData.email"
                  placeholder="Contoh: andi.pratama@email.com" 
                />
              </div>

              <!-- Phone Number with Country Flag Code Picker -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Nomor Telepon' : 'Phone Number' }} <span class="required-asterisk">*</span>
                </label>
                <div class="phone-input-group">
                  <div class="country-flag-selector" @click="toggleCountryDropdown">
                    <img src="https://flagcdn.com/w20/id.png" alt="ID Flag" class="flag-icon-img" />
                    <span class="country-code-val">+62</span>
                    <svg class="dropdown-caret-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <input 
                    type="tel" 
                    class="phone-text-input" 
                    v-model="formData.phone"
                    placeholder="812-3456-7890" 
                  />
                </div>
              </div>

              <!-- Date of Birth -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Tanggal Lahir' : 'Date of Birth' }} <span class="required-asterisk">*</span>
                </label>
                <div class="date-input-wrapper">
                  <input 
                    type="date" 
                    class="form-text-input date-picker-input" 
                    v-model="formData.birthDate"
                  />
                </div>
              </div>

              <!-- Gender -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Jenis Kelamin' : 'Gender' }} <span class="required-asterisk">*</span>
                </label>
                <div class="gender-radio-group">
                  <label class="gender-radio-label">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Laki-laki" 
                      v-model="formData.gender" 
                      class="gender-radio-native"
                    />
                    <span class="gender-radio-custom"></span>
                    <span class="gender-text-lbl">{{ currentLang === 'id' ? 'Laki-laki' : 'Male' }}</span>
                  </label>

                  <label class="gender-radio-label">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="Perempuan" 
                      v-model="formData.gender" 
                      class="gender-radio-native"
                    />
                    <span class="gender-radio-custom"></span>
                    <span class="gender-text-lbl">{{ currentLang === 'id' ? 'Perempuan' : 'Female' }}</span>
                  </label>
                </div>
              </div>

              <!-- Nationality -->
              <div class="form-group select-wrapper-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Kewarganegaraan' : 'Nationality' }} <span class="required-asterisk">*</span>
                </label>
                <div class="custom-select-container">
                  <select class="form-select-input" v-model="formData.nationality">
                    <option value="" disabled selected>{{ currentLang === 'id' ? 'Pilih kewarganegaraan' : 'Select nationality' }}</option>
                    <option value="WNI">{{ currentLang === 'id' ? 'Warga Negara Indonesia (WNI)' : 'Indonesian Citizen (WNI)' }}</option>
                    <option value="WNA">{{ currentLang === 'id' ? 'Warga Negara Asing (WNA)' : 'Foreign Citizen (WNA)' }}</option>
                  </select>
                  <svg class="select-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Alamat Domisili Box -->
          <div class="form-block-card">
            <h2 class="form-block-title">{{ currentLang === 'id' ? 'Alamat Domisili' : 'Residential Address' }}</h2>

            <!-- Full Address Textarea -->
            <div class="form-group full-width-field">
              <label class="input-field-label">
                {{ currentLang === 'id' ? 'Alamat Lengkap' : 'Full Address' }} <span class="required-asterisk">*</span>
              </label>
              <textarea 
                class="form-textarea-input" 
                v-model="formData.address"
                rows="3"
                :placeholder="currentLang === 'id' ? 'Contoh: Jl. Kemang Raya No. 72, Bangka, Mampang Prapatan' : 'e.g. 72nd Kemang Road, Mampang'"
              ></textarea>
            </div>

            <!-- Address dropdown grid -->
            <div class="fields-grid-2col">
              <!-- Provinsi -->
              <div class="form-group select-wrapper-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Provinsi' : 'Province' }} <span class="required-asterisk">*</span>
                </label>
                <div class="custom-select-container">
                  <select class="form-select-input" v-model="formData.province" @change="onProvinceChange">
                    <option value="" disabled selected>{{ currentLang === 'id' ? 'Pilih provinsi' : 'Select province' }}</option>
                    <option v-for="prov in provincesList" :key="prov" :value="prov">{{ prov }}</option>
                  </select>
                  <svg class="select-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Kota / Kabupaten -->
              <div class="form-group select-wrapper-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Kota / Kabupaten' : 'City / Regency' }} <span class="required-asterisk">*</span>
                </label>
                <div class="custom-select-container">
                  <select class="form-select-input" v-model="formData.city" :disabled="!formData.province" @change="onCityChange">
                    <option value="" disabled selected>{{ currentLang === 'id' ? 'Pilih kota / kabupaten' : 'Select city / regency' }}</option>
                    <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
                  </select>
                  <svg class="select-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Kecamatan -->
              <div class="form-group select-wrapper-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Kecamatan' : 'District' }} <span class="required-asterisk">*</span>
                </label>
                <div class="custom-select-container">
                  <select class="form-select-input" v-model="formData.district" :disabled="!formData.city">
                    <option value="" disabled selected>{{ currentLang === 'id' ? 'Pilih kecamatan' : 'Select district' }}</option>
                    <option v-for="dist in availableDistricts" :key="dist" :value="dist">{{ dist }}</option>
                  </select>
                  <svg class="select-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Postal Code -->
              <div class="form-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Kode Pos' : 'Postal Code' }} <span class="required-asterisk">*</span>
                </label>
                <input 
                  type="text" 
                  class="form-text-input" 
                  v-model="formData.postalCode"
                  maxlength="5"
                  :placeholder="currentLang === 'id' ? 'Contoh: 12730' : 'e.g. 12730'" 
                />
              </div>
            </div>
          </div>

          <!-- Informasi Tambahan Box -->
          <div class="form-block-card">
            <h2 class="form-block-title">{{ currentLang === 'id' ? 'Informasi Tambahan' : 'Additional Info' }}</h2>

            <div class="fields-grid-2col">
              <!-- Pekerjaan -->
              <div class="form-group select-wrapper-group">
                <label class="input-field-label">
                  {{ currentLang === 'id' ? 'Pekerjaan' : 'Occupation' }}
                </label>
                <div class="custom-select-container">
                  <select class="form-select-input" v-model="formData.job">
                    <option value="" disabled selected>{{ currentLang === 'id' ? 'Pilih pekerjaan (opsional)' : 'Select occupation (optional)' }}</option>
                    <option value="Karyawan Swasta">{{ currentLang === 'id' ? 'Karyawan Swasta' : 'Private Employee' }}</option>
                    <option value="PNS">{{ currentLang === 'id' ? 'Pegawai Negeri Sipil (PNS)' : 'Civil Servant' }}</option>
                    <option value="Mahasiswa / Pelajar">{{ currentLang === 'id' ? 'Mahasiswa / Pelajar' : 'Student' }}</option>
                    <option value="Wiraswasta">{{ currentLang === 'id' ? 'Wiraswasta' : 'Entrepreneur' }}</option>
                    <option value="Lainnya">{{ currentLang === 'id' ? 'Lainnya' : 'Other' }}</option>
                  </select>
                  <svg class="select-caret-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Instagram -->
              <div class="form-group">
                <label class="input-field-label">
                  Instagram ({{ currentLang === 'id' ? 'opsional' : 'optional' }})
                </label>
                <div class="instagram-input-wrapper">
                  <span class="instagram-at-prefix">@</span>
                  <input 
                    type="text" 
                    class="instagram-text-input" 
                    v-model="formData.instagram"
                    placeholder="username" 
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Kebijakan Privasi Box -->
          <div class="form-block-card privacy-policy-card">
            <h2 class="form-block-title">{{ currentLang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy' }}</h2>
            
            <div class="checkbox-row-list">
              <!-- Privacy Checkbox 1 -->
              <label class="custom-checkbox-row">
                <input type="checkbox" v-model="formData.privacyChecked1" />
                <span class="custom-check-box"></span>
                <span class="checkbox-label-text">
                  {{ currentLang === 'id' 
                      ? 'Saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.' 
                      : 'I declare that the information provided is correct and accountable.' }}
                </span>
              </label>

              <!-- Privacy Checkbox 2 -->
              <label class="custom-checkbox-row">
                <input type="checkbox" v-model="formData.privacyChecked2" />
                <span class="custom-check-box"></span>
                <span class="checkbox-label-text">
                  {{ currentLang === 'id' 
                      ? 'Saya telah membaca dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi.' 
                      : 'I have read and agree to the Terms & Conditions and Privacy Policy.' }}
                </span>
              </label>
            </div>
          </div>

          <!-- Form Navigation Actions -->
          <div class="checkout-navigation-buttons">
            <button class="back-outline-btn" @click="goToEventDetail">
              ← {{ currentLang === 'id' ? 'Kembali ke Event' : 'Back to Event' }}
            </button>
            <button class="continue-solid-btn" @click="proceedToPayment">
              {{ currentLang === 'id' ? 'Lanjutkan ke Pembayaran →' : 'Proceed to Payment →' }}
            </button>
          </div>
        </div>

        <!-- Right Column: Sticky Order Summary Card -->
        <div class="checkout-summary-column">
          <div class="sticky-summary-card">
            <h2 class="summary-card-title">{{ currentLang === 'id' ? 'Ringkasan Pesanan' : 'Order Summary' }}</h2>

            <!-- Event Poster Thumbnail and quick metadata -->
            <div class="summary-event-banner-box">
              <img :src="displayEvent.image" :alt="displayEvent.title" class="summary-event-poster" />
            </div>

            <!-- Metadata info -->
            <div class="summary-event-info">
              <h3 class="summary-event-title">{{ displayEvent.title }}</h3>
              
              <div class="summary-meta-rows">
                <!-- Date -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ displayEvent.dateId }}</span>
                </div>

                <!-- Location -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ displayEvent.location }}</span>
                </div>

                <!-- Category -->
                <div class="summary-meta-item">
                  <svg class="meta-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span>{{ displayEvent.categoriesLabel || 'Festival & Pameran • Musik • Pop Indonesia' }}</span>
                </div>
              </div>
            </div>

            <div class="summary-price-divider"></div>

            <!-- Pricing Breakdown -->
            <div class="summary-pricing-breakdown">
              <template v-if="selectedTickets && selectedTickets.length > 0">
                <div v-for="t in selectedTickets" :key="t.id" class="checkout-ticket-summary-item" style="margin-bottom: 0.75rem;">
                  <div class="pricing-row" style="margin-bottom: 0.25rem;">
                    <span class="price-lbl">{{ currentLang === 'id' ? 'Tipe Tiket:' : 'Ticket Type:' }}</span>
                    <span class="price-lbl-detail">{{ t.name }}</span>
                  </div>
                  <div class="pricing-row flex-justify-end">
                    <span class="price-qty-calc">{{ t.quantity }} x {{ formatPrice(t.price) }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="pricing-row">
                  <span class="price-lbl">{{ currentLang === 'id' ? 'Tipe Tiket:' : 'Ticket Type:' }}</span>
                  <span class="price-lbl-detail">{{ selectedTicket ? selectedTicket.name : (currentLang === 'id' ? 'Reguler Ticket' : 'Regular Ticket') }}</span>
                </div>
                <div class="pricing-row flex-justify-end">
                  <span class="price-qty-calc">{{ selectedTicket ? ticketQuantity : 2 }} x {{ selectedTicket ? formatPrice(selectedTicket.price) : (displayEvent.priceLabel || 'Rp150.000') }}</span>
                </div>
              </template>

              <div class="pricing-row">
                <span class="pricing-left">{{ currentLang === 'id' ? 'Subtotal' : 'Subtotal' }}</span>
                <span class="pricing-right">{{ formatPrice(subtotalPrice) }}</span>
              </div>

              <div class="pricing-row">
                <span class="pricing-left align-items-center-flex">
                  {{ currentLang === 'id' ? 'Biaya Layanan' : 'Service Fee' }}
                  <span class="info-circle-tooltip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </span>
                </span>
                <span class="pricing-right">{{ formatPrice(serviceFee) }}</span>
              </div>
            </div>

            <div class="summary-price-divider"></div>

            <!-- Grand Total -->
            <div class="grand-total-row">
              <span class="grand-label">{{ currentLang === 'id' ? 'Total Pembayaran' : 'Total Payment' }}</span>
              <span class="grand-value">{{ formatPrice(grandTotalPrice) }}</span>
            </div>

            <!-- Security Trust signals -->
            <div class="summary-trust-signals">
              <!-- Signal 1 -->
              <div class="trust-signal-item">
                <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p class="trust-desc">
                  {{ currentLang === 'id' 
                      ? 'Pembayaran Anda dilindungi sistem keamanan terenkripsi.' 
                      : 'Your payment is protected by an encrypted security system.' }}
                </p>
              </div>

              <!-- Signal 2 -->
              <div class="trust-signal-item">
                <svg class="trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <p class="trust-desc">
                  {{ currentLang === 'id' 
                      ? 'E-ticket akan dikirimkan ke email Anda setelah pembayaran berhasil.' 
                      : 'E-ticket will be sent to your email after successful payment.' }}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Bottom Trust Banner -->
      <div class="bottom-trust-banner-checkout">
        <div class="trust-banner-card">
          <div class="trust-card-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 11 11 13 15 9"></polyline>
            </svg>
          </div>
          <div class="trust-card-text">
            <h4 class="trust-card-title">{{ currentLang === 'id' ? 'Data Anda aman bersama kami' : 'Your data is safe with us' }}</h4>
            <p class="trust-card-desc">
              {{ currentLang === 'id' 
                  ? 'Informasi yang Anda berikan hanya akan digunakan untuk keperluan pemesanan tiket dan tidak akan dibagikan ke pihak ketiga.' 
                  : 'The information you provide will only be used for ticket booking purposes and will not be shared with third parties.' }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Fixed Bottom Action Bar -->
    <div class="bottom-action-bar-checkout">
      <div class="bottom-bar-container-checkout">
        
        <!-- Left Side: Circular Countdown and Price Text -->
        <div class="bottom-left-checkout">
          <!-- Circular Countdown timer -->
          <div class="circular-countdown">
            <svg class="progress-ring" width="50" height="50">
              <circle class="progress-ring__circle-bg" stroke="rgba(59, 35, 20, 0.1)" stroke-width="3" fill="transparent" r="21" cx="25" cy="25"/>
              <circle class="progress-ring__circle" stroke="#3B2314" stroke-width="3" fill="transparent" r="21" cx="25" cy="25" :stroke-dasharray="131.95" :stroke-dashoffset="dashOffset"/>
            </svg>
            <span class="countdown-digits">{{ formattedTime }}</span>
          </div>

          <!-- Price & Ticket Info -->
          <div class="bottom-price-info-checkout">
            <span class="bottom-label-checkout">
              {{ currentLang === 'id' 
                 ? `Total Pembayaran (${totalTicketCount} Tiket)` 
                 : `Total Payment (${totalTicketCount} Tickets)` }}
            </span>
            <span class="bottom-price-checkout">{{ formatPrice(grandTotalPrice) }}</span>
          </div>
        </div>

        <!-- Right Side: Buy Ticket Button -->
        <button class="bottom-action-btn-checkout" @click="proceedToPayment">
          {{ currentLang === 'id' ? 'Beli Tiket' : 'Buy Tickets' }}
        </button>
        
      </div>
    </div>

    <!-- Error/Success Toast Popup -->
    <div class="toast-popup" :class="{ active: toastActive }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { currentPage, currentLang, selectedEvent, selectedTicket, ticketQuantity, selectedTickets } from '../store/cart.js';

// Fallback mods mayday details
const displayEvent = computed(() => {
  return selectedEvent.value || {
    id: 13,
    title: 'Jakarta Mods Mayday 2026',
    image: '/event_mods_mayday.png',
    dateId: 'Minggu, 31 Mei 2026',
    dateEn: 'Sunday, May 31, 2026',
    time: '12:00 - 23:00 WIB',
    location: 'Senayan Park (Island & Dome), Jakarta Pusat',
    priceLabel: 'Rp150.000',
    categoriesLabel: 'Festival & Pameran • Musik • Pop Indonesia',
    priceVal: 150000
  };
});

// Calculate prices
const subtotalPrice = computed(() => {
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    return selectedTickets.value.reduce((sum, t) => sum + t.price * t.quantity, 0);
  }
  if (selectedTicket.value) {
    return selectedTicket.value.price * ticketQuantity.value;
  }
  const price = displayEvent.value.priceVal || 150000;
  return price * 2;
});

const totalTicketCount = computed(() => {
  if (selectedTickets.value && selectedTickets.value.length > 0) {
    return selectedTickets.value.reduce((sum, t) => sum + t.quantity, 0);
  }
  if (selectedTicket.value) {
    return ticketQuantity.value;
  }
  return 2;
});

const serviceFee = ref(10000);

const grandTotalPrice = computed(() => {
  return subtotalPrice.value + serviceFee.value;
});

// Form countdown timer logic (15 minutes limit)
const timeLeft = ref(900); // 15 minutes in seconds
let timerId = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const dashOffset = computed(() => {
  const circumference = 2 * Math.PI * 21; // approx 131.95
  const progress = timeLeft.value / 900;
  return circumference * (1 - progress);
});

onMounted(() => {
  timerId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerId);
      triggerToast(currentLang.value === 'id' ? 'Batas waktu pengisian form telah habis.' : 'Form filling time limit has expired.');
      setTimeout(() => {
        goToEventDetail();
      }, 2000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});

// Toast notification states
const toastActive = ref(false);
const toastMessage = ref('');

// Registration Form Reactive State
const formData = ref({
  fullName: '',
  idCard: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: 'Laki-laki',
  nationality: 'WNI',
  address: '',
  province: '',
  city: '',
  district: '',
  postalCode: '',
  job: '',
  instagram: '',
  privacyChecked1: false,
  privacyChecked2: true // checked by default to match image spec
});

// Dynamic location selector data
const provincesList = ['DKI Jakarta', 'Jawa Barat', 'DI Yogyakarta', 'Jawa Timur', 'Banten'];

const citiesMap = {
  'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara', 'Jakarta Barat'],
  'Jawa Barat': ['Bandung', 'Bogor', 'Depok', 'Bekasi', 'Tangerang'],
  'DI Yogyakarta': ['Yogyakarta', 'Sleman', 'Bantul', 'Kulon Progo'],
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo'],
  'Banten': ['Tangerang Selatan', 'Serang', 'Cilegon']
};

const districtsMap = {
  'Jakarta Pusat': ['Gambir', 'Menteng', 'Kemayoran', 'Sawah Besar', 'Cempaka Putih'],
  'Jakarta Selatan': ['Kebayoran Baru', 'Mampang Prapatan', 'Kemang', 'Cilandak', 'Tebet'],
  'Bandung': ['Coblong', 'Sumur Bandung', 'Cibeunying', 'Andir', 'Ujung Berung'],
  'Yogyakarta': ['Gondokusuman', 'Danurejan', 'Mantinejeron', 'Umbulharjo'],
  'Surabaya': ['Tegalsari', 'Gubeng', 'Wonokromo', 'Genteng']
};

const availableCities = computed(() => {
  if (!formData.value.province) return [];
  return citiesMap[formData.value.province] || [];
});

const availableDistricts = computed(() => {
  if (!formData.value.city) return [];
  return districtsMap[formData.value.city] || ['Kecamatan A', 'Kecamatan B', 'Kecamatan C'];
});

const onProvinceChange = () => {
  formData.value.city = '';
  formData.value.district = '';
};

const onCityChange = () => {
  formData.value.district = '';
};

// Form validation
const validateForm = () => {
  const data = formData.value;
  if (!data.fullName.trim()) return currentLang.value === 'id' ? 'Nama Lengkap wajib diisi.' : 'Full Name is required.';
  if (!data.idCard.trim() || data.idCard.length < 16) return currentLang.value === 'id' ? 'Nomor Identitas (KTP) harus 16 digit.' : 'ID Card number must be 16 digits.';
  if (!data.email.trim() || !data.email.includes('@')) return currentLang.value === 'id' ? 'Format email tidak valid.' : 'Invalid email format.';
  if (!data.phone.trim()) return currentLang.value === 'id' ? 'Nomor Telepon wajib diisi.' : 'Phone Number is required.';
  if (!data.birthDate) return currentLang.value === 'id' ? 'Tanggal Lahir wajib diisi.' : 'Birth date is required.';
  if (!data.address.trim()) return currentLang.value === 'id' ? 'Alamat Lengkap wajib diisi.' : 'Full Address is required.';
  if (!data.province) return currentLang.value === 'id' ? 'Provinsi wajib dipilih.' : 'Province selection is required.';
  if (!data.city) return currentLang.value === 'id' ? 'Kota / Kabupaten wajib dipilih.' : 'City/Regency selection is required.';
  if (!data.district) return currentLang.value === 'id' ? 'Kecamatan wajib dipilih.' : 'District selection is required.';
  if (!data.postalCode.trim()) return currentLang.value === 'id' ? 'Kode Pos wajib diisi.' : 'Postal Code is required.';
  if (!data.privacyChecked1 || !data.privacyChecked2) {
    return currentLang.value === 'id' 
      ? 'Anda harus menyetujui seluruh ketentuan dan kebijakan privasi.' 
      : 'You must agree to all terms and policies.';
  }
  return null;
};

// Navigation events
const goToHome = () => {
  currentPage.value = 'home';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToEventList = () => {
  currentPage.value = 'event';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const goToEventDetail = () => {
  currentPage.value = 'event-detail';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const proceedToPayment = () => {
  const errorMsg = validateForm();
  if (errorMsg) {
    triggerToast(errorMsg);
    return;
  }

  triggerToast(currentLang.value === 'id' ? 'Menghubungkan ke sistem pembayaran...' : 'Redirecting to payment gateway...');
  setTimeout(() => {
    currentPage.value = 'payment';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1200);
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 3500);
};

// Format currency standard
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
.event-checkout-page {
  background-color: #F5F2ED; /* Warm cream background */
  min-height: 100vh;
  width: 100%;
  padding: 2rem 0 8rem 0;
  box-sizing: border-box;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

/* Breadcrumbs Navigation */
.breadcrumbs-container-checkout {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}

.breadcrumb-icon {
  margin-bottom: 1px;
}

.breadcrumb-separator {
  color: var(--color-mocca-border);
}

.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Title & Stepper Header Area */
.checkout-header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(59, 35, 20, 0.08);
  padding-bottom: 1.5rem;
}

.header-left-title {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.checkout-title-heading {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  line-height: 1.2;
}

.checkout-subtitle-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-mocca-muted);
}

/* Horizontal Stepper */
.stepper-horizontal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-mocca-muted);
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  background-color: transparent;
  color: var(--color-mocca-muted);
}

.step-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.step-item.active .step-num {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: #ffffff;
}

.step-item.active .step-label {
  color: var(--color-mocca-dark);
}

.step-line {
  width: 30px;
  height: 1.5px;
  background-color: var(--color-mocca-border);
}

/* Two-Column Grid */
.checkout-layout-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Form Cards styling */
.checkout-forms-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-block-card {
  background-color: #ffffff;
  border: 1px solid rgba(59, 35, 20, 0.08);
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
}

.form-block-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.35rem;
}

.form-block-desc {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  margin-bottom: 1.5rem;
}

.fields-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.full-width-field {
  grid-column: span 2;
  margin-bottom: 1.25rem;
}

.input-field-label {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.required-asterisk {
  color: #7A1C1C;
  font-weight: bold;
  margin-left: 1px;
}

.form-text-input,
.form-textarea-input,
.form-select-input {
  width: 100%;
  box-sizing: border-box;
  background-color: #FCFAF7;
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.form-text-input:focus,
.form-textarea-input:focus,
.form-select-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
}

.form-textarea-input {
  resize: vertical;
}

/* Phone input flag addon */
.phone-input-group {
  display: flex;
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FCFAF7;
  transition: all 0.2s ease;
}

.phone-input-group:focus-within {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
}

.country-flag-selector {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.75rem;
  background-color: rgba(59, 35, 20, 0.03);
  border-right: 1px solid rgba(59, 35, 20, 0.15);
  cursor: pointer;
}

.flag-icon-img {
  width: 18px;
  height: 12px;
  object-fit: cover;
  border-radius: 1px;
}

.country-code-val {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.dropdown-caret-icon {
  color: var(--color-mocca-muted);
}

.phone-text-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
}

/* Date picker customization wrapper */
.date-input-wrapper {
  position: relative;
}

.date-picker-input {
  padding-right: 2.25rem;
}

/* Custom Select carets */
.select-wrapper-group {
  position: relative;
}

.custom-select-container {
  position: relative;
  width: 100%;
}

.form-select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2rem;
}

.select-caret-svg {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-mocca-muted);
}

/* Gender radio groups */
.gender-radio-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  min-height: 38px;
}

.gender-radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.gender-radio-native {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.gender-radio-custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(59, 35, 20, 0.25);
  background-color: #FCFAF7;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
}

.gender-radio-native:checked ~ .gender-radio-custom {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
}

.gender-radio-custom::after {
  content: '';
  position: absolute;
  display: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gender-radio-native:checked ~ .gender-radio-custom::after {
  display: block;
}

.gender-text-lbl {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* Instagram input with prefix */
.instagram-input-wrapper {
  display: flex;
  border: 1px solid rgba(59, 35, 20, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FCFAF7;
  transition: all 0.2s ease;
}

.instagram-input-wrapper:focus-within {
  border-color: var(--color-mocca-dark);
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
}

.instagram-at-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  background-color: rgba(59, 35, 20, 0.03);
  border-right: 1px solid rgba(59, 35, 20, 0.15);
}

.instagram-text-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
}

/* Privacy checklists */
.checkbox-row-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.custom-checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-row input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-check-box {
  width: 18px;
  height: 18px;
  background-color: #FCFAF7;
  border: 1.5px solid rgba(59, 35, 20, 0.25);
  border-radius: 4px;
  flex-shrink: 0;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
  margin-top: 0.1rem;
}

.custom-checkbox-row input:checked ~ .custom-check-box {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.custom-check-box::after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox-row input:checked ~ .custom-check-box::after {
  display: block;
}

.custom-checkbox-row .custom-check-box::after {
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  line-height: 1.4;
  font-weight: 500;
}

.checkbox-label-text a {
  color: var(--color-mocca-dark);
  text-decoration: underline;
  font-weight: 700;
}

/* Form Action Buttons */
.checkout-navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.back-outline-btn {
  background: transparent;
  border: 1.5px solid var(--color-mocca-dark);
  color: var(--color-mocca-dark);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-outline-btn:hover {
  background-color: rgba(59, 35, 20, 0.05);
}

.continue-solid-btn {
  background-color: var(--color-mocca-dark);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.15);
  transition: all 0.2s ease;
}

.continue-solid-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 35, 20, 0.2);
}

/* Sticky Summary Card styling */
.sticky-summary-card {
  background-color: #ffffff;
  border: 1px solid rgba(59, 35, 20, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
  position: sticky;
  top: 6rem;
}

.summary-card-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 1.25rem;
}

.summary-event-banner-box {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.summary-event-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.summary-event-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-event-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  line-height: 1.3;
}

.summary-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.summary-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  line-height: 1.3;
}

.summary-meta-item .meta-icon {
  margin-top: 0.1rem;
  color: var(--color-mocca-muted);
  flex-shrink: 0;
}

.summary-price-divider {
  height: 1px;
  background-color: rgba(59, 35, 20, 0.08);
  margin: 1.25rem 0;
}

/* Pricing itemized breakdown styling */
.summary-pricing-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
}

.price-lbl {
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.price-lbl-detail {
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.price-qty-calc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  background-color: rgba(59, 35, 20, 0.04);
  padding: 1px 6px;
  border-radius: 4px;
}

.flex-justify-end {
  justify-content: flex-end;
  margin-top: -0.3rem;
  margin-bottom: 0.2rem;
}

.pricing-left {
  color: var(--color-mocca-muted);
  font-weight: 500;
}

.pricing-right {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.align-items-center-flex {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.info-circle-tooltip {
  display: inline-flex;
  align-items: center;
  color: var(--color-mocca-muted);
  cursor: pointer;
}

/* Grand Total Row styling */
.grand-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.grand-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.grand-value {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-mocca-dark);
}

/* Trust Signals inside summary card */
.summary-trust-signals {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background-color: rgba(59, 35, 20, 0.02);
  border-radius: 8px;
  padding: 0.85rem;
}

.trust-signal-item {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.trust-signal-item .trust-icon {
  color: var(--color-mocca-muted);
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.trust-signal-item .trust-desc {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  line-height: 1.35;
  margin: 0;
}

/* Bottom full-width trust banner */
.bottom-trust-banner-checkout {
  margin-top: 3rem;
  width: 100%;
}

.trust-banner-card {
  background-color: transparent;
  border: 1px solid rgba(59, 35, 20, 0.1);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.trust-card-icon-box {
  color: var(--color-mocca-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.trust-card-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.trust-card-title {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.trust-card-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
  margin: 0;
}

/* Toast popup notifications */
.toast-popup {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 0.85rem 1.75rem;
  border-radius: 30px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 8px 30px rgba(59, 35, 20, 0.2);
  z-index: 20000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}

.toast-popup.active {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* ================= RESPONSIVE MEDIA QUERIES ================= */
@media (max-width: 1024px) {
  .checkout-container {
    padding: 0 1rem;
  }

  .checkout-header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .checkout-layout-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sticky-summary-card {
    position: static;
  }
}

@media (max-width: 600px) {
  .event-checkout-page {
    padding: 1.5rem 0 3rem 0;
  }

  .checkout-title-heading {
    font-size: 1.75rem;
  }

  .fields-grid-2col {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .full-width-field {
    grid-column: span 1;
  }

  .form-block-card {
    padding: 1.25rem;
  }

  .checkout-navigation-buttons {
    flex-direction: column-reverse;
    gap: 1rem;
    width: 100%;
  }

  .back-outline-btn,
  .continue-solid-btn {
    width: 100%;
    text-align: center;
  }

  .stepper-horizontal {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .trust-banner-card {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Fixed Bottom Action Bar for Checkout */
.bottom-action-bar-checkout {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid rgba(59, 35, 20, 0.1);
  box-shadow: 0 -8px 30px rgba(59, 35, 20, 0.08);
  z-index: 9999;
  padding: 0.6rem 0;
  box-sizing: border-box;
}

.bottom-bar-container-checkout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.bottom-left-checkout {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Circular Countdown Timer Styling */
.circular-countdown {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.5s linear;
}

.countdown-digits {
  position: absolute;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.bottom-price-info-checkout {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.bottom-label-checkout {
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.bottom-price-checkout {
  font-family: var(--font-body);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
}

.bottom-action-btn-checkout {
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2.2rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.15);
  transition: all 0.25s ease;
}

.bottom-action-btn-checkout:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 35, 20, 0.2);
}

@media (max-width: 600px) {
  .bottom-bar-container-checkout {
    padding: 0 1rem;
  }
  .bottom-left-checkout {
    gap: 0.75rem;
  }
  .bottom-price-checkout {
    font-size: 1.15rem;
  }
  .bottom-action-btn-checkout {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
  }
}
</style>
