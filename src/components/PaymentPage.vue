<template>
  <div class="payment-page-wrapper">
    <div class="payment-container">
      
      <!-- Stepper Progress Header -->
      <div class="stepper-section">
        <div class="stepper-wrapper">
          <div class="step-item done">
            <span class="step-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="step-text">Keranjang</span>
          </div>
          <div class="step-line active"></div>
          
          <div class="step-item done">
            <span class="step-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="step-text">Pengiriman</span>
          </div>
          <div class="step-line active"></div>
          
          <div class="step-item active">
            <span class="step-badge">3</span>
            <span class="step-text">Pembayaran</span>
          </div>
          <div class="step-line"></div>
          
          <div class="step-item">
            <span class="step-badge">4</span>
            <span class="step-text">Konfirmasi</span>
          </div>
        </div>
      </div>

      <!-- Main Columns Grid Layout -->
      <div class="payment-grid">
        
        <!-- Left Column: Form Details -->
        <div class="left-column">
          
          <!-- 1. Data Diri Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <h2 class="section-title">1. Data Diri</h2>
              <div class="form-grid-3">
                <div class="input-group">
                  <label class="field-label">Nama Lengkap</label>
                  <input type="text" v-model="profile.name" class="text-input" placeholder="Masukkan nama lengkap" />
                </div>
                <div class="input-group">
                  <label class="field-label">Email</label>
                  <input type="email" v-model="profile.email" class="text-input" placeholder="contoh@domain.com" />
                </div>
                <div class="input-group">
                  <label class="field-label">Nomor Telepon</label>
                  <input type="tel" v-model="profile.phone" class="text-input" placeholder="0812xxxx" />
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Alamat Pengiriman Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <div class="card-header-row">
                <h2 class="section-title text-alamat-pengiriman">2. Alamat Pengiriman</h2>
                <button class="add-address-btn btn-tambah-alamat" @click="addNewAddress">
                  Tambah Alamat Baru
                </button>
              </div>
              
              <div class="input-group mb-1-5">
                <label class="field-label">Pilih Alamat</label>
                <div class="select-wrapper">
                  <select v-model="selectedAddressIndex" class="select-input" @change="syncAddressDetails">
                    <option v-for="(addr, idx) in addresses" :key="idx" :value="idx">
                      {{ addr.label }} - {{ addr.street }}, {{ addr.city }}, {{ addr.province }} {{ addr.zip }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-grid-2 mb-1-5">
                <div class="input-group">
                  <label class="field-label">Provinsi</label>
                  <input type="text" v-model="activeAddress.province" class="text-input" />
                </div>
                <div class="input-group">
                  <label class="field-label">Kota / Kabupaten</label>
                  <input type="text" v-model="activeAddress.city" class="text-input" />
                </div>
              </div>

              <div class="form-grid-2 mb-1-5">
                <div class="input-group">
                  <label class="field-label">Kecamatan</label>
                  <input type="text" v-model="activeAddress.district" class="text-input" />
                </div>
                <div class="input-group">
                  <label class="field-label">Kode Pos</label>
                  <input type="text" v-model="activeAddress.zip" class="text-input" />
                </div>
              </div>

              <div class="input-group mb-1-5">
                <label class="field-label">Alamat Lengkap</label>
                <textarea v-model="activeAddress.street" rows="3" class="textarea-input"></textarea>
              </div>

              <label class="primary-checkbox-label">
                <input type="checkbox" v-model="activeAddress.isMain" />
                <span class="checkbox-box"></span>
                <span class="checkbox-text">Jadikan sebagai alamat utama</span>
              </label>
            </div>
          </div>

          <!-- 3. Metode Pengiriman Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <h2 class="section-title">3. Metode Pengiriman</h2>
              
              <!-- Courier shipping radio -->
              <div class="shipping-method-choice mb-1-5">
                <label class="shipping-radio-label">
                  <input type="radio" value="courier" v-model="shippingType" />
                  <span class="radio-box"></span>
                  <span class="radio-text font-bold">Kirim Melalui Kurir</span>
                </label>
              </div>

              <!-- Courier Options Card (Visible if shippingType === 'courier') -->
              <div v-if="shippingType === 'courier'" class="couriers-accordion-list mb-1-5">
                
                <!-- JNE Express -->
                <div class="courier-card" :class="{ open: expandedCourier === 'jne' }">
                  <div class="courier-header" @click="toggleCourier('jne')">
                    <div class="header-left-col">
                      <span class="courier-dot" :class="{ checked: selectedCourier === 'jne' }"></span>
                      <div class="courier-brand">
                        <!-- Inline JNE Red/Blue mockup Logo -->
                        <span class="jne-logo">
                          <span class="blue-text">JNE</span><span class="red-text">express</span>
                        </span>
                        <span class="courier-title">JNE Express</span>
                      </div>
                    </div>
                    <div class="header-right-col">
                      <span class="courier-price-range">Mulai dari Rp 7.000</span>
                      <svg class="chevron-arrow" :class="{ rotate: expandedCourier === 'jne' }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <!-- JNE Services List (Sub-accordion expanded) -->
                  <div class="courier-services-body" v-if="expandedCourier === 'jne'">
                    <h4 class="services-title">Layanan Pengiriman</h4>
                    
                    <div class="services-grid">
                      <label 
                        v-for="service in courierServices.jne" 
                        :key="service.id" 
                        class="service-row" 
                        :class="{ selected: selectedCourier === 'jne' && selectedServiceId === service.id }"
                        @click="selectCourierService('jne', service)"
                      >
                        <div class="service-left">
                          <input 
                            type="radio" 
                            name="jne_service" 
                            :checked="selectedCourier === 'jne' && selectedServiceId === service.id" 
                          />
                          <span class="service-radio-dot"></span>
                          <div class="service-meta">
                            <span class="service-name font-bold">{{ service.name }}</span>
                            <span class="service-desc">{{ service.desc }}</span>
                          </div>
                        </div>
                        <span class="service-price font-bold">{{ formatPrice(service.price) }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- J&T Express -->
                <div class="courier-card" :class="{ open: expandedCourier === 'jnt' }">
                  <div class="courier-header" @click="toggleCourier('jnt')">
                    <div class="header-left-col">
                      <span class="courier-dot" :class="{ checked: selectedCourier === 'jnt' }"></span>
                      <div class="courier-brand">
                        <span class="jnt-logo font-bold">J&T</span>
                        <span class="courier-title">J&T Express</span>
                      </div>
                    </div>
                    <div class="header-right-col">
                      <span class="courier-price-range">Mulai dari Rp 8.000</span>
                      <svg class="chevron-arrow" :class="{ rotate: expandedCourier === 'jnt' }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  
                  <div class="courier-services-body" v-if="expandedCourier === 'jnt'">
                    <h4 class="services-title">Layanan Pengiriman</h4>
                    <div class="services-grid">
                      <label 
                        v-for="service in courierServices.jnt" 
                        :key="service.id" 
                        class="service-row" 
                        :class="{ selected: selectedCourier === 'jnt' && selectedServiceId === service.id }"
                        @click="selectCourierService('jnt', service)"
                      >
                        <div class="service-left">
                          <input 
                            type="radio" 
                            name="jnt_service" 
                            :checked="selectedCourier === 'jnt' && selectedServiceId === service.id" 
                          />
                          <span class="service-radio-dot"></span>
                          <div class="service-meta">
                            <span class="service-name font-bold">{{ service.name }}</span>
                            <span class="service-desc">{{ service.desc }}</span>
                          </div>
                        </div>
                        <span class="service-price font-bold">{{ formatPrice(service.price) }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- SiCepat Ekspres -->
                <div class="courier-card" :class="{ open: expandedCourier === 'sicepat' }">
                  <div class="courier-header" @click="toggleCourier('sicepat')">
                    <div class="header-left-col">
                      <span class="courier-dot" :class="{ checked: selectedCourier === 'sicepat' }"></span>
                      <div class="courier-brand">
                        <span class="sicepat-logo font-bold">SiCepat</span>
                        <span class="courier-title">SiCepat Ekspres</span>
                      </div>
                    </div>
                    <div class="header-right-col">
                      <span class="courier-price-range">Mulai dari Rp 8.000</span>
                      <svg class="chevron-arrow" :class="{ rotate: expandedCourier === 'sicepat' }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div class="courier-services-body" v-if="expandedCourier === 'sicepat'">
                    <h4 class="services-title">Layanan Pengiriman</h4>
                    <div class="services-grid">
                      <label 
                        v-for="service in courierServices.sicepat" 
                        :key="service.id" 
                        class="service-row" 
                        :class="{ selected: selectedCourier === 'sicepat' && selectedServiceId === service.id }"
                        @click="selectCourierService('sicepat', service)"
                      >
                        <div class="service-left">
                          <input 
                            type="radio" 
                            name="sicepat_service" 
                            :checked="selectedCourier === 'sicepat' && selectedServiceId === service.id" 
                          />
                          <span class="service-radio-dot"></span>
                          <div class="service-meta">
                            <span class="service-name font-bold">{{ service.name }}</span>
                            <span class="service-desc">{{ service.desc }}</span>
                          </div>
                        </div>
                        <span class="service-price font-bold">{{ formatPrice(service.price) }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Anteraja -->
                <div class="courier-card" :class="{ open: expandedCourier === 'anteraja' }">
                  <div class="courier-header" @click="toggleCourier('anteraja')">
                    <div class="header-left-col">
                      <span class="courier-dot" :class="{ checked: selectedCourier === 'anteraja' }"></span>
                      <div class="courier-brand">
                        <span class="anteraja-logo font-bold">Anteraja</span>
                        <span class="courier-title">Anteraja</span>
                      </div>
                    </div>
                    <div class="header-right-col">
                      <span class="courier-price-range">Mulai dari Rp 8.500</span>
                      <svg class="chevron-arrow" :class="{ rotate: expandedCourier === 'anteraja' }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div class="courier-services-body" v-if="expandedCourier === 'anteraja'">
                    <h4 class="services-title">Layanan Pengiriman</h4>
                    <div class="services-grid">
                      <label 
                        v-for="service in courierServices.anteraja" 
                        :key="service.id" 
                        class="service-row" 
                        :class="{ selected: selectedCourier === 'anteraja' && selectedServiceId === service.id }"
                        @click="selectCourierService('anteraja', service)"
                      >
                        <div class="service-left">
                          <input 
                            type="radio" 
                            name="anteraja_service" 
                            :checked="selectedCourier === 'anteraja' && selectedServiceId === service.id" 
                          />
                          <span class="service-radio-dot"></span>
                          <div class="service-meta">
                            <span class="service-name font-bold">{{ service.name }}</span>
                            <span class="service-desc">{{ service.desc }}</span>
                          </div>
                        </div>
                        <span class="service-price font-bold">{{ formatPrice(service.price) }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- COD Accordion Choice -->
              <div class="shipping-method-choice">
                <label class="shipping-radio-label mb-0-5">
                  <input type="radio" value="cod" v-model="shippingType" @change="handleCodSelected" />
                  <span class="radio-box"></span>
                  <div class="cod-label-text">
                    <span class="radio-text font-bold">Bayar di Tempat (COD)</span>
                    <span class="cod-sub-desc">Bayar saat pesanan tiba di alamat tujuan</span>
                  </div>
                </label>
                <span class="cod-flat-price font-bold">Rp 15.000</span>
              </div>
            </div>
          </div>

          <!-- 4. Metode Pembayaran Section -->
          <div class="form-card">
            <div class="card-inner-compact">
              <h2 class="section-title">4. Metode Pembayaran</h2>
              
              <div class="payment-methods-grid">
                
                <!-- 1) Transfer Bank -->
                <label class="pay-method-row" :class="{ active: selectedPayMethod === 'bank' }" @click="selectedPayMethod = 'bank'">
                  <div class="pay-left">
                    <input type="radio" name="pay_method" :checked="selectedPayMethod === 'bank'" />
                    <span class="pay-radio-dot"></span>
                    <div class="pay-info">
                      <svg class="pay-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                      </svg>
                      <div class="pay-text-group">
                        <span class="pay-title font-bold">Transfer Bank</span>
                        <span class="pay-desc">Bayar melalui transfer ke rekening bank kami.</span>
                      </div>
                    </div>
                  </div>
                </label>

                <!-- 2) E-Wallet -->
                <label class="pay-method-row" :class="{ active: selectedPayMethod === 'ewallet' }" @click="selectedPayMethod = 'ewallet'">
                  <div class="pay-left">
                    <input type="radio" name="pay_method" :checked="selectedPayMethod === 'ewallet'" />
                    <span class="pay-radio-dot"></span>
                    <div class="pay-info">
                      <svg class="pay-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                        <path d="M16 14h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10"></path>
                      </svg>
                      <div class="pay-text-group">
                        <span class="pay-title font-bold">E-Wallet</span>
                        <span class="pay-desc">Bayar menggunakan saldo e-wallet.</span>
                      </div>
                    </div>
                  </div>
                  <div class="pay-right-logos">
                    <span class="wallet-logo ovo">ovo</span>
                    <span class="wallet-logo gopay">gopay</span>
                    <span class="wallet-logo dana">dana</span>
                  </div>
                </label>

                <!-- 3) Kartu Kredit / Debit -->
                <label class="pay-method-row" :class="{ active: selectedPayMethod === 'cc' }" @click="selectedPayMethod = 'cc'">
                  <div class="pay-left">
                    <input type="radio" name="pay_method" :checked="selectedPayMethod === 'cc'" />
                    <span class="pay-radio-dot"></span>
                    <div class="pay-info">
                      <svg class="pay-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      <div class="pay-text-group">
                        <span class="pay-title font-bold">Kartu Kredit / Debit</span>
                        <span class="pay-desc">Visa, Mastercard, JCB, dan lainnya.</span>
                      </div>
                    </div>
                  </div>
                  <div class="pay-right-logos">
                    <span class="cc-logo visa">VISA</span>
                    <span class="cc-logo mc">Mastercard</span>
                  </div>
                </label>

                <!-- 4) Virtual Account -->
                <label class="pay-method-row" :class="{ active: selectedPayMethod === 'va' }" @click="selectedPayMethod = 'va'">
                  <div class="pay-left">
                    <input type="radio" name="pay_method" :checked="selectedPayMethod === 'va'" />
                    <span class="pay-radio-dot"></span>
                    <div class="pay-info">
                      <span class="pay-va-badge font-bold">VA</span>
                      <div class="pay-text-group">
                        <span class="pay-title font-bold">Virtual Account</span>
                        <span class="pay-desc">Bayar melalui Virtual Account.</span>
                      </div>
                    </div>
                  </div>
                </label>

                <!-- 5) QRIS -->
                <label class="pay-method-row" :class="{ active: selectedPayMethod === 'qris' }" @click="selectedPayMethod = 'qris'">
                  <div class="pay-left">
                    <input type="radio" name="pay_method" :checked="selectedPayMethod === 'qris'" />
                    <span class="pay-radio-dot"></span>
                    <div class="pay-info">
                      <svg class="pay-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <rect x="7" y="7" width="3" height="3"></rect>
                        <rect x="14" y="7" width="3" height="3"></rect>
                        <rect x="7" y="14" width="3" height="3"></rect>
                      </svg>
                      <div class="pay-text-group">
                        <span class="pay-title font-bold">QRIS</span>
                        <span class="pay-desc">Scan QR untuk pembayaran mudah.</span>
                      </div>
                    </div>
                  </div>
                  <span class="qris-brand font-bold">QRIS</span>
                </label>
              </div>
            </div>
          </div>

          

        </div>

        <!-- Right Column: Order Summary (Sticky Sidebar) -->
        <div class="right-column">
          <div class="summary-card">
            <div class="card-inner-compact">
              <div class="summary-header-row">
                <h3 class="summary-title">Ringkasan Pesanan</h3>
                <button class="edit-summary-btn" @click="isEditingSummary = !isEditingSummary" :class="{ editing: isEditingSummary }">
                  {{ isEditingSummary ? 'Selesai ✓' : 'Edit' }}
                </button>
              </div>
              
              <!-- Products List inside summary -->
              <div class="summary-products-list">
                <div 
                  v-for="item in visibleCartItems" 
                  :key="item.id" 
                  class="summary-prod-item"
                  :class="{ 'editing-row': isEditingSummary, 'zero-qty': item.qty === 0 }"
                >
                  <div class="prod-left">
                    <div class="prod-thumb">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <div class="prod-info">
                      <h4 class="prod-name font-bold">{{ item.name }}</h4>
                      <span class="prod-meta">Warna: {{ item.color }}, Ukuran: {{ item.size }}</span>
                      
                      <!-- Notes Edit Mode -->
                      <div v-if="isEditingSummary" class="summary-note-edit-wrapper mt-0-5">
                        <input 
                          type="text" 
                          v-model="item.note" 
                          class="summary-note-input" 
                          placeholder="Tambah catatan..." 
                        />
                      </div>
                      <span class="prod-note" v-else-if="item.note">Catatan: "{{ item.note }}"</span>
                    </div>
                  </div>
                  
                  <div class="prod-right text-right">
                    <span class="prod-price font-bold">{{ formatPrice(item.price) }}</span>
                    
                    <!-- Quantity adjuster in Edit Mode -->
                    <div v-if="isEditingSummary" class="summary-qty-adjuster mt-0-5">
                      <button class="sqty-btn minus" @click="adjustSummaryQty(item, -1)">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span class="sqty-val font-bold">{{ item.qty }}</span>
                      <button class="sqty-btn plus" @click="adjustSummaryQty(item, 1)">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <button class="sqty-delete-btn" @click="item.qty = 0" title="Hapus produk">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                    <span class="prod-qty" v-else>x {{ item.qty }}</span>
                  </div>
                </div>
                <div v-if="visibleCartItems.length === 0" class="empty-summary-text text-center py-2">
                  Tidak ada produk di keranjang.
                </div>
              </div>

              <!-- Voucher Section -->
              <div class="voucher-wrapper">
                <label class="voucher-label">Voucher</label>
                <div class="voucher-input-row">
                  <input 
                    type="text" 
                    v-model="voucherCode" 
                    class="voucher-input" 
                    placeholder="Masukkan kode voucher"
                    :disabled="voucherApplied"
                  />
                  <button 
                    class="voucher-apply-btn" 
                    :class="{ applied: voucherApplied }"
                    @click="applyVoucherCode"
                  >
                    {{ voucherApplied ? 'Gunakan ✓' : 'Gunakan' }}
                  </button>
                </div>
                <p class="voucher-tip" v-if="!voucherApplied">Gunakan kode <strong class="code-text">MOCCA10</strong> untuk diskon 10%!</p>
                <p class="voucher-success-text" v-else>Voucher diskon 10% berhasil digunakan! <span class="remove-btn" @click="removeVoucherCode">Hapus</span></p>
              </div>

              <div class="summary-divider"></div>

              <!-- Cost Breakdowns -->
              <div class="summary-breakdowns">
                <div class="breakdown-row">
                  <span class="breakdown-label">Subtotal ({{ cartProductCount }} produk)</span>
                  <span class="breakdown-value">{{ formatPrice(cartSubtotalPrice) }}</span>
                </div>
                
                <!-- Shipping Cost -->
                <div class="breakdown-row" v-if="shippingType === 'courier'">
                  <span class="breakdown-label">Ongkir ({{ activeCourierLabel }} - {{ activeServiceLabel }})</span>
                  <span class="breakdown-value">{{ formatPrice(shippingPrice) }}</span>
                </div>

                <!-- COD Cost -->
                <div class="breakdown-row" v-if="shippingType === 'cod'">
                  <span class="breakdown-label">Biaya COD</span>
                  <span class="breakdown-value">{{ formatPrice(15000) }}</span>
                </div>

                <!-- Voucher Discount -->
                <div class="breakdown-row discount" v-if="voucherApplied">
                  <span class="breakdown-label">Diskon Voucher (10%)</span>
                  <span class="breakdown-value">- {{ formatPrice(voucherDiscount) }}</span>
                </div>

                <div class="summary-divider"></div>

                <!-- Total Payments -->
                <div class="breakdown-row total-row">
                  <span class="total-label font-semibold">Total Pembayaran</span>
                  <span class="total-value font-semibold text-coffee">{{ formatPrice(totalPaymentsPrice) }}</span>
                </div>
              </div>

              <!-- Shield Trust Notice -->
              <div class="security-notice">
                <svg class="shield-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div class="notice-desc-group">
                  <span class="notice-title font-bold">Pembayaran aman & terenkripsi</span>
                  <span class="notice-desc">Informasi pembayaran Anda dijaga kerahasiaannya dengan enkripsi tingkat tinggi.</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="summary-actions">
                <button class="primary-checkout-btn font-bold" @click="submitOrder" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner"></span>
                  <span v-else>Bayar Sekarang</span>
                </button>
                
                <div class="terms-text text-center mt-0-75">
                  Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.
                </div>

                <button class="back-to-cart-link-btn" @click="backToCheckout">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="back-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Kembali ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Success Modal Transition -->
    <Transition name="modal-fade">
      <div v-if="showSuccessModal" class="success-modal-backdrop" @click="closeSuccessModal">
        <div class="success-modal-card" @click.stop>
          <div class="check-animation-circle">
            <svg class="success-checkmark-icon" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          
          <h2 class="modal-title font-bold">Pembayaran Berhasil!</h2>
          <p class="modal-subtitle">Terima kasih atas pembelian Anda. Pesanan Anda telah diterima dan sedang diproses.</p>
          
          <div class="order-invoice-details">
            <div class="invoice-row">
              <span class="inv-label">Nomor Transaksi:</span>
              <span class="inv-value font-bold text-coffee">MC-{{ transactionId }}</span>
            </div>
            <div class="invoice-row">
              <span class="inv-label">Metode Pembayaran:</span>
              <span class="inv-value font-bold capitalize">{{ selectedPayMethodName }}</span>
            </div>
            <div class="invoice-row">
              <span class="inv-label">Total Dibayar:</span>
              <span class="inv-value font-bold text-coffee">{{ formatPrice(totalPaymentsPrice) }}</span>
            </div>
          </div>

          <button class="close-success-btn font-bold" @click="closeSuccessModal">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { currentPage, cartItems, clearCart } from '../store/cart.js';

// 1. Data Diri
const profile = ref({
  name: 'Budi Santoso',
  email: 'budi.santoso@gmail.com',
  phone: '0812 3456 7890'
});

// 2. Alamat Pengiriman
const addresses = ref([
  {
    label: 'Rumah',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Kebayoran Baru',
    zip: '12120',
    street: 'Jl. Kembang Indah No. 10, RT 03/RW 02',
    isMain: true
  },
  {
    label: 'Kantor',
    province: 'DKI Jakarta',
    city: 'Jakarta Pusat',
    district: 'Gambir',
    zip: '10110',
    street: 'Gedung Menara Mulia Lt. 12, Jl. Jend. Sudirman Kav. 9-11',
    isMain: false
  }
]);

const selectedAddressIndex = ref(0);
const activeAddress = ref({
  province: '',
  city: '',
  district: '',
  zip: '',
  street: '',
  isMain: true
});

const syncAddressDetails = () => {
  const chosen = addresses.value[selectedAddressIndex.value];
  if (chosen) {
    activeAddress.value = { ...chosen };
  }
};

const addNewAddress = () => {
  const newAddr = {
    label: 'Alamat Baru ' + (addresses.value.length + 1),
    province: '',
    city: '',
    district: '',
    zip: '',
    street: '',
    isMain: false
  };
  addresses.value.push(newAddr);
  selectedAddressIndex.value = addresses.value.length - 1;
  syncAddressDetails();
};

// Initialize addresses
onMounted(() => {
  syncAddressDetails();
});

// 3. Metode Pengiriman
const shippingType = ref('courier'); // 'courier' or 'cod'
const selectedCourier = ref('jne');  // 'jne', 'jnt', 'sicepat', 'anteraja'
const expandedCourier = ref('jne');  // sub-accordion expander
const selectedServiceId = ref('next_day'); // default selected service

const courierServices = ref({
  jne: [
    { id: 'sameday', name: 'Sameday', desc: 'Sampai dihari yang sama', price: 20000 },
    { id: 'instan', name: 'Instan', desc: '1 - 2 jam sampai', price: 18000 },
    { id: 'next_day', name: 'Next Day', desc: 'Sampai besok', price: 12000 },
    { id: 'regular', name: 'Regular', desc: '2 - 3 hari kerja', price: 9000 },
    { id: 'hemat', name: 'Hemat', desc: '3 - 5 hari kerja', price: 7000 }
  ],
  jnt: [
    { id: 'jnt_reg', name: 'Regular EZ', desc: '2 - 3 hari kerja', price: 9000 },
    { id: 'jnt_eco', name: 'Economy', desc: '3 - 6 hari kerja', price: 8000 }
  ],
  sicepat: [
    { id: 'sicepat_best', name: 'BEST', desc: 'Besok Sampai Tujuan', price: 12000 },
    { id: 'sicepat_reg', name: 'REG', desc: 'Layanan Regular', price: 9000 },
    { id: 'sicepat_halu', name: 'HALU', desc: 'Harga Mulai Delapan Ribu', price: 8000 }
  ],
  anteraja: [
    { id: 'anteraja_next', name: 'Next Day', desc: 'Layanan 1 hari kerja', price: 11500 },
    { id: 'anteraja_reg', name: 'Regular', desc: 'Layanan 2-3 hari kerja', price: 8500 }
  ]
});

const shippingPrice = ref(12000); // flat tracking of shipping price

const toggleCourier = (carrier) => {
  expandedCourier.value = expandedCourier.value === carrier ? null : carrier;
  // If clicked header and not selected, automatically select first service of that courier
  if (selectedCourier.value !== carrier) {
    selectedCourier.value = carrier;
    const services = courierServices.value[carrier];
    if (services && services.length > 0) {
      selectedServiceId.value = services[0].id;
      shippingPrice.value = services[0].price;
    }
  }
};

const selectCourierService = (carrier, service) => {
  selectedCourier.value = carrier;
  selectedServiceId.value = service.id;
  shippingPrice.value = service.price;
};

const handleCodSelected = () => {
  shippingPrice.value = 15000;
  selectedCourier.value = '';
  selectedServiceId.value = '';
};

// Courier text helpers
const activeCourierLabel = computed(() => {
  if (shippingType.value === 'cod') return 'COD';
  const mapping = { jne: 'JNE', jnt: 'J&T', sicepat: 'SiCepat', anteraja: 'Anteraja' };
  return mapping[selectedCourier.value] || 'Kurir';
});

const activeServiceLabel = computed(() => {
  if (shippingType.value === 'cod') return 'Bayar di Tempat';
  const services = courierServices.value[selectedCourier.value] || [];
  const found = services.find(s => s.id === selectedServiceId.value);
  return found ? found.name : 'Regular';
});

// 4. Metode Pembayaran
const selectedPayMethod = ref('ewallet'); // default 'ewallet' corresponding to mockup

const selectedPayMethodName = computed(() => {
  const mapping = {
    bank: 'Transfer Bank',
    ewallet: 'E-Wallet (OVO/GoPay/Dana)',
    cc: 'Kartu Kredit / Debit',
    va: 'Virtual Account',
    qris: 'QRIS'
  };
  return mapping[selectedPayMethod.value] || 'Metode Pembayaran';
});

// Notes
const notes = ref('');

// Right Column: Order Summary data
const activeCartItems = ref([
  {
    id: 'tee',
    name: 'Mocca Group Tee',
    price: 199000,
    qty: 1,
    color: 'Cream',
    size: 'M',
    image: '/mocca_group_tee.png',
    note: 'untuk hadiah ulang tahun'
  },
  {
    id: 'tote',
    name: 'Mocca Logo Tote Bag',
    price: 149000,
    qty: 1,
    color: 'Forest Green',
    size: '-',
    image: '/mocca_tote_bag.png',
    note: 'tulis happy birthday di tag'
  },
  {
    id: 'mug',
    name: 'Mocca Enamel Mug',
    price: 119000,
    qty: 2,
    color: 'Cream',
    size: '-',
    image: '/mocca_enamel_mug.png',
    note: 'tolong dibungkus rapi'
  }
]);

// Summary Calculations
const isEditingSummary = ref(false);

const visibleCartItems = computed(() => {
  if (isEditingSummary.value) {
    return activeCartItems.value;
  }
  return activeCartItems.value.filter(item => item.qty > 0);
});

const adjustSummaryQty = (item, delta) => {
  item.qty = Math.max(0, item.qty + delta);
};

const cartProductCount = computed(() => {
  return activeCartItems.value.reduce((acc, curr) => acc + curr.qty, 0);
});

const cartSubtotalPrice = computed(() => {
  return activeCartItems.value.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
});

// Voucher
const voucherCode = ref('');
const voucherApplied = ref(false);
const voucherDiscount = computed(() => {
  if (!voucherApplied.value) return 0;
  return Math.round(cartSubtotalPrice.value * 0.1); // 10% discount
});

const applyVoucherCode = () => {
  if (voucherCode.value.trim().toUpperCase() === 'MOCCA10') {
    voucherApplied.value = true;
  } else {
    alert('Kode voucher tidak valid. Gunakan kode MOCCA10');
  }
};

const removeVoucherCode = () => {
  voucherApplied.value = false;
  voucherCode.value = '';
};

// Total Payments calculation
const totalPaymentsPrice = computed(() => {
  let total = cartSubtotalPrice.value;
  
  if (shippingType.value === 'courier') {
    total += shippingPrice.value;
  } else {
    // COD fee of Rp 15.000 + JNE Next Day default shipping fee (Rp 12.000)
    // Wait, in mockup, total is Rp 613.000 = Rp 586.000 (Subtotal) + Rp 12.000 (JNE Next Day) + Rp 15.000 (Biaya COD)
    total += 12000 + 15000;
  }
  
  if (voucherApplied.value) {
    total -= voucherDiscount.value;
  }
  return total;
});

// Stepper back link
const backToCheckout = () => {
  currentPage.value = 'checkout';
};

// Submit Order / Bayar Sekarang handler
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const transactionId = ref('');

const submitOrder = () => {
  isSubmitting.value = true;
  
  setTimeout(() => {
    isSubmitting.value = false;
    transactionId.value = Math.floor(100000 + Math.random() * 900000).toString();
    showSuccessModal.value = true;
  }, 2000);
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  // Clear cart and go back home
  clearCart();
  currentPage.value = 'home';
};

// Currency Formatter
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
</script>

<style scoped>
/* Colors & Global Typography defaults */
.payment-page-wrapper {
  background-color: #F5F2ED;
  min-height: 100vh;
  padding: 2rem 0 4rem 0;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Stepper Steppers styling */
.stepper-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.stepper-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #FFFFFF;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  border: 1px solid var(--color-mocca-border);
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.02);
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.step-item.done {
  color: var(--color-mocca-dark);
}

.step-item.active {
  color: #FFFFFF;
  font-weight: 700;
}

.step-badge {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  transition: all 0.25s ease;
}

.step-item.done .step-badge {
  background-color: #E6DFD5;
  border-color: #D9D2C5;
  color: var(--color-mocca-dark);
}

.step-item.active .step-badge {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  color: #FFFFFF;
}

.step-text {
  font-family: var(--font-body);
}

.step-item.active .step-text {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.step-line {
  width: 40px;
  height: 1px;
  background-color: var(--color-mocca-border);
}

.step-line.active {
  background-color: var(--color-mocca-dark);
}

/* Two-Column Grid */
.payment-grid {
  display: grid;
  grid-template-columns: 2fr 1.15fr;
  gap: 2rem;
  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cards layout styles */
.form-card {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
  width: 95%;
  max-width: 760px;
  margin-left: 0;
  margin-right: auto;
  box-sizing: border-box;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header-row .section-title {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

/* Form controls and inputs */
.form-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-muted);
}

.text-input {
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.text-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(59, 35, 20, 0.05);
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--color-mocca-muted);
  pointer-events: none;
}

.select-input {
  width: 100%;
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.select-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
}

.textarea-input {
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  resize: vertical;
  transition: all 0.2s ease;
}

.textarea-input:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
}

.add-address-btn {
  background-color: #FAF9F6;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-address-btn:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
}

/* Custom Checkbox Label */
.primary-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.85rem;
}

.primary-checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-mocca-border);
  border-radius: 4px;
  background-color: #FFFFFF;
  position: relative;
  transition: all 0.2s ease;
}

.primary-checkbox-label input:checked ~ .checkbox-box {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.checkbox-box::after {
  content: "";
  position: absolute;
  display: none;
  left: 4.5px;
  top: 1.5px;
  width: 4px;
  height: 8px;
  border: solid #FFFFFF;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.primary-checkbox-label input:checked ~ .checkbox-box::after {
  display: block;
}

.checkbox-text {
  font-weight: 500;
  color: var(--color-mocca-muted);
}

/* Shipping choices radios */
.shipping-method-choice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FCFAF7;
  border: 1px solid var(--color-mocca-border);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
}

.shipping-radio-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.shipping-radio-label input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-box {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-mocca-border);
  border-radius: 50%;
  background-color: #FFFFFF;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
}

.shipping-radio-label input:checked ~ .radio-box {
  border-color: var(--color-mocca-dark);
}

.radio-box::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.shipping-radio-label input:checked ~ .radio-box::after {
  display: block;
}

.radio-text {
  font-size: 0.9rem;
  color: var(--color-mocca-dark);
}

/* Couriers Sub-Accordion options */
.couriers-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.courier-card {
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  overflow: hidden;
  background-color: #FFFFFF;
  transition: all 0.25s ease;
}

.courier-card.open {
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.03);
  border-color: var(--color-mocca-dark);
}

.courier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 1.5rem;
  cursor: pointer;
}

.header-left-col {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.courier-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid var(--color-mocca-border);
  transition: all 0.2s ease;
}

.courier-dot.checked {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
  transform: scale(1.2);
}

.courier-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.jne-logo {
  display: inline-flex;
  font-weight: 800;
  font-style: italic;
  font-size: 0.95rem;
}

.jne-logo .blue-text {
  color: #0E4E9E;
}

.jne-logo .red-text {
  color: #E21E26;
  font-size: 0.6rem;
  align-self: flex-end;
  margin-bottom: 2px;
  margin-left: 1px;
}

.jnt-logo {
  color: #ED1B24;
}

.sicepat-logo {
  color: #E4222E;
}

.anteraja-logo {
  color: #EA0B8C;
}

.courier-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.header-right-col {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.courier-price-range {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.chevron-arrow {
  color: var(--color-mocca-muted);
  transition: transform 0.25s ease;
}

.chevron-arrow.rotate {
  transform: rotate(180deg);
}

/* Expanded courier services body */
.courier-services-body {
  background-color: #FCFAF7;
  border-top: 1px solid var(--color-mocca-border);
  padding: 1.25rem 1.5rem;
}

.services-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.services-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.service-row:hover {
  background-color: #FCFAF7;
  border-color: var(--color-mocca-dark);
}

.service-row.selected {
  border-color: var(--color-mocca-dark);
  background-color: #FAF7F2;
  box-shadow: 0 2px 8px rgba(59, 35, 20, 0.03);
}

.service-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.service-left input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.service-radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  display: inline-block;
  position: relative;
}

.service-row.selected .service-radio-dot {
  border-color: var(--color-mocca-dark);
}

.service-radio-dot::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.service-row.selected .service-radio-dot::after {
  display: block;
}

.service-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.service-name {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.service-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.service-price {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.cod-label-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cod-sub-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.cod-flat-price {
  font-size: 0.9rem;
}

/* 4. Payment Methods lists */
.payment-methods-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pay-method-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-mocca-border);
  border-radius: 10px;
  padding: 1.15rem 1.5rem;
  cursor: pointer;
  background-color: #FFFFFF;
  transition: all 0.2s ease;
}

.pay-method-row:hover {
  background-color: #FCFAF7;
}

.pay-method-row.active {
  border-color: var(--color-mocca-dark);
  background-color: #FAF7F2;
  box-shadow: 0 2px 10px rgba(59, 35, 20, 0.03);
}

.pay-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-grow: 1;
}

.pay-left input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pay-radio-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  position: relative;
  flex-shrink: 0;
}

.pay-method-row.active .pay-radio-dot {
  border-color: var(--color-mocca-dark);
}

.pay-radio-dot::after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-mocca-dark);
}

.pay-method-row.active .pay-radio-dot::after {
  display: block;
}

.pay-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pay-icon {
  color: var(--color-mocca-dark);
  opacity: 0.8;
  flex-shrink: 0;
}

.pay-text-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pay-title {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.pay-desc {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.pay-va-badge {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.pay-right-logos {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wallet-logo {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.wallet-logo.ovo {
  background-color: #FAF4FF;
  color: #4C2A86;
  border: 1px solid #E8D3FF;
}

.wallet-logo.gopay {
  background-color: #E8F4F9;
  color: #0081A7;
  border: 1px solid #C5E4EF;
}

.wallet-logo.dana {
  background-color: #E5F3FF;
  color: #118EEA;
  border: 1px solid #BCDFFF;
}

.cc-logo {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.cc-logo.visa {
  background-color: #F0F4FF;
  color: #0E4595;
  border: 1px solid #CAD8FF;
}

.cc-logo.mc {
  background-color: #FFF5F2;
  color: #FF5F00;
  border: 1px solid #FFD9CC;
}

.qris-brand {
  font-size: 0.8rem;
  color: #0A3254;
  border: 1.5px solid #0A3254;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

/* Notes section styles */
.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
}

.char-count.limit {
  color: #C2410C;
  font-weight: 700;
}

/* Right Column Order Summary styling */
.right-column {
  width: 100%;
}

.summary-card {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
}

@media (min-width: 1025px) {
  .right-column {
    position: sticky;
    top: 7rem;
    align-self: start;
    z-index: 10;
  }
}

.summary-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.summary-header-row .summary-title {
  margin-bottom: 0;
}

.summary-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.edit-summary-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
}

.edit-summary-btn:hover {
  color: var(--color-mocca-dark);
}

/* Products inside summary */
.summary-products-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.summary-prod-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.prod-left {
  display: flex;
  gap: 0.75rem;
  flex-grow: 1;
}

.prod-thumb {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #FCFAF7;
  border: 1px solid var(--color-mocca-border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.prod-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prod-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.prod-name {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.prod-meta {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.prod-note {
  font-size: 0.7rem;
  font-style: italic;
  color: var(--color-mocca-muted);
}

.prod-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  flex-shrink: 0;
}

.prod-price {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
}

.prod-qty {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

/* Inline editing inside summary styling */
.summary-prod-item.editing-row {
  background-color: #FCFAF7;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px dashed var(--color-mocca-border);
  transition: all 0.2s ease;
}

.summary-prod-item.zero-qty {
  opacity: 0.45;
}

.summary-note-edit-wrapper {
  width: 100%;
}

.summary-note-input {
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.35rem 0.6rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-mocca-dark);
  outline: none;
  transition: all 0.2s ease;
}

.summary-note-input:focus {
  border-color: var(--color-mocca-dark);
}

.summary-qty-adjuster {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.sqty-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--color-mocca-border);
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.sqty-btn:hover {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border-color: var(--color-mocca-dark);
}

.sqty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sqty-val {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  min-width: 12px;
  text-align: center;
}

.sqty-delete-btn {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.sqty-delete-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.edit-summary-btn.editing {
  color: var(--color-mocca-dark);
  background-color: rgba(59, 35, 20, 0.08);
  border-radius: 4px;
  padding: 0.25rem 0.65rem;
}

.font-semibold {
  font-weight: 600 !important;
}

.empty-summary-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

/* Voucher */
.voucher-wrapper {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  background-color: #FCFAF7;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-mocca-border);
}

.voucher-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin-bottom: 0.45rem;
  display: block;
}

.voucher-input-row {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.voucher-input {
  flex-grow: 1;
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  outline: none;
}

.voucher-apply-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 1rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.voucher-apply-btn:hover {
  background-color: #55331C;
}

.voucher-apply-btn.applied {
  background-color: var(--color-mocca-dark);
}

.voucher-tip {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  margin: 0.45rem 0 0 0;
}

.code-text {
  color: var(--color-mocca-dark);
}

.voucher-success-text {
  font-size: 0.7rem;
  color: var(--color-mocca-dark);
  font-weight: 600;
  margin: 0.45rem 0 0 0;
}

.voucher-success-text .remove-btn {
  color: #EF4444;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.5rem;
}

.summary-divider {
  height: 1px;
  background-color: var(--color-mocca-border);
  margin: 1.25rem 0;
}

.summary-breakdowns {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-body);
}

.breakdown-label {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
}

.breakdown-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.breakdown-row.discount .breakdown-label {
  color: #C2410C;
  font-weight: 600;
}

.breakdown-row.discount .breakdown-value {
  color: #C2410C;
}

.total-row {
  align-items: baseline;
}

.total-label {
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
}

.total-value {
  font-size: 1.35rem;
}

.text-coffee {
  color: var(--color-mocca-dark);
}

/* Security Notice */
.security-notice {
  margin-top: 1.5rem;
  background-color: #FCFAF7;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
}

.shield-icon {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.notice-desc-group {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.notice-title {
  font-size: 0.75rem;
  color: var(--color-mocca-dark);
}

.notice-desc {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

/* Actions */
.summary-actions {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
}

.primary-checkout-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 1rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.12);
}

.primary-checkout-btn:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 35, 20, 0.18);
}

.primary-checkout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.terms-text {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

.back-to-cart-link-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-mocca-muted);
  cursor: pointer;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
  align-self: center;
}

.back-to-cart-link-btn:hover {
  color: var(--color-mocca-dark);
}

.back-icon {
  transition: transform 0.2s ease;
}

.back-to-cart-link-btn:hover .back-icon {
  transform: translateX(-3px);
}

/* Spinner Loader */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin-anim 0.8s linear infinite;
}

@keyframes spin-anim {
  to { transform: rotate(360deg); }
}

/* Invoice details */
.order-invoice-details {
  background-color: #FCFAF7;
  border: 1px solid var(--color-mocca-border);
  border-radius: 8px;
  padding: 1.25rem;
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.invoice-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.inv-label {
  color: var(--color-mocca-muted);
}

.inv-value {
  color: var(--color-mocca-dark);
}

/* Success Modal Backdrop */
.success-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(59, 35, 20, 0.4);
  backdrop-filter: blur(4px);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.success-modal-card {
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid var(--color-mocca-border);
  padding: 3rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 15px 50px rgba(59, 35, 20, 0.15);
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--color-mocca-dark);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.modal-subtitle {
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  line-height: 1.5;
  margin-top: 0;
  margin-bottom: 1.75rem;
}

.close-success-btn {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  width: 100%;
  padding: 0.9rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.1);
}

.close-success-btn:hover {
  background-color: #55331C;
}

/* Checkmark Success Icon Animation styling */
.check-animation-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #10B981;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #10B981;
  animation: fill-check 0.4s ease-in-out 0.4s forwards, scale-check 0.3s ease-in-out 0.9s both;
}

.success-checkmark-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #10B981;
  stroke-miterlimit: 10;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-linecap: round;
  stroke: #10B981;
  fill: none;
  animation: stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke-linecap: round;
  stroke: #10B981;
  animation: stroke-check 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke-circle {
  100% { stroke-dashoffset: 0; }
}

@keyframes stroke-check {
  100% { stroke-dashoffset: 0; }
}

@keyframes fill-check {
  100% { box-shadow: inset 0px 0px 0px 36px #E6FBF3; }
}

@keyframes scale-check {
  0%, 100% { transform: none; }
  50% { transform: scale3d(1.1, 1.1, 1); }
}

/* Margins helpers */
.mb-0 { margin-bottom: 0; }
.mb-0-5 { margin-bottom: 0.5rem; }
.mb-1-5 { margin-bottom: 1.5rem; }
.mt-0-5 { margin-top: 0.5rem; }
.mt-0-75 { margin-top: 0.75rem; }

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive viewports overrides */
@media (max-width: 1024px) {
  .payment-container {
    padding: 0 2rem;
  }
  
  .payment-grid {
    grid-template-columns: 1.5fr 1.1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .payment-page-wrapper {
    padding: 1rem 0 5rem 0;
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  .payment-container {
    padding: 0 1rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .stepper-section {
    margin-bottom: 1.75rem;
  }
  
  .stepper-wrapper {
    padding: 0.65rem 1.25rem;
    gap: 0.5rem;
  }
  
  .step-text {
    display: none; /* Hide stepper text labels on mobile to save space */
  }
  
  .step-line {
    width: 25px;
  }
  
  .payment-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .form-grid-3, .form-grid-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-card {
    padding: 1rem;
    width: 92% !important;
    max-width: 480px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box !important;
  }
  
  .courier-header {
    padding: 0.85rem;
  }
  
  .pay-method-row {
    padding: 0.85rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .pay-right-logos {
    padding-left: 2.25rem;
  }
  
  .summary-card {
    padding: 1rem;
    width: 92% !important;
    max-width: 480px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box !important;
  }
  
  .success-modal-card {
    padding: 2rem 1.5rem;
  }

  /* Compact Card styles */
  .card-inner-compact {
    font-size: 0.8rem;
  }
  
  .card-inner-compact .section-title {
    font-size: 1.05rem !important;
    margin-bottom: 0.85rem !important;
  }
  
  .card-inner-compact .field-label {
    font-size: 0.7rem !important;
    margin-bottom: 0.25rem !important;
  }
  
  .card-inner-compact .text-input,
  .card-inner-compact .select-input,
  .card-inner-compact .textarea-input {
    padding: 0.5rem 0.65rem !important;
    font-size: 0.75rem !important;
    height: auto !important;
    border-radius: 6px !important;
  }
  
  .card-inner-compact .input-group {
    margin-bottom: 0.75rem !important;
  }

  /* Alamat Pengiriman specifically */
  .card-inner-compact .text-alamat-pengiriman {
    font-size: 0.95rem !important;
  }
  
  .card-inner-compact .btn-tambah-alamat {
    font-size: 0.65rem !important;
    padding: 0.25rem 0.5rem !important;
    border-radius: 4px !important;
    height: auto !important;
    line-height: 1.2 !important;
  }

  /* Courier/Payments lists spacing */
  .card-inner-compact .courier-header {
    padding: 0.75rem !important;
  }
  
  .card-inner-compact .pay-method-row {
    padding: 0.75rem !important;
  }
  
  .card-inner-compact .shipping-method-choice {
    padding: 0.65rem 0.85rem !important;
  }

  /* Summary Prod lists */
  .card-inner-compact .summary-prod-item {
    padding: 0.5rem 0 !important;
    gap: 0.5rem !important;
  }
  
  .card-inner-compact .prod-name {
    font-size: 0.78rem !important;
  }
  
  .card-inner-compact .prod-meta {
    font-size: 0.65rem !important;
  }
  
  .card-inner-compact .prod-price {
    font-size: 0.78rem !important;
  }
  
  .card-inner-compact .total-label {
    font-size: 0.85rem !important;
  }
  
  .card-inner-compact .total-value {
    font-size: 1.1rem !important;
  }
  
  .card-inner-compact .primary-checkout-btn {
    padding: 0.75rem !important;
    font-size: 0.85rem !important;
  }
}
</style>
