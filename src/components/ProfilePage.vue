<template>
  <div class="profile-page-wrapper">
    <div class="profile-container">
      <!-- Breadcrumb navigation (scrapbook style) -->
      <div class="breadcrumb">
        <a href="#" @click.prevent="goToHome" class="breadcrumb-link">{{ currentLang === 'id' ? 'Beranda' : 'Home' }}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ currentLang === 'id' ? 'Profil & Pengaturan' : 'Profile & Settings' }}</span>
      </div>

      <!-- Two-Column Grid Layout -->
      <div class="profile-grid">
        
        <!-- ================= LEFT COLUMN: SIDEBAR NAVIGATION ================= -->
        <aside class="profile-sidebar">
          
          <!-- User Header Panel -->
          <div class="user-sidebar-header">
            <div class="avatar-circle-wrapper">
              <!-- Hand-drawn style vector sketch of the Mocca band in circle -->
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="band-sketch-svg">
                <circle cx="60" cy="60" r="54" fill="#FAF6F0" stroke="#E6DFD5" stroke-width="1"/>
                <line x1="20" y1="80" x2="100" y2="80" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="30" y1="80" x2="30" y2="95" stroke="#55331C" stroke-width="1.5"/>
                <line x1="90" y1="80" x2="90" y2="95" stroke="#55331C" stroke-width="1.5"/>
                <!-- Band Members Sit Outline -->
                <circle cx="40" cy="48" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M40 55 C35 60, 35 78, 38 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="53" cy="44" r="7.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M53 51.5 C48 57, 48 78, 52 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="67" cy="46" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M67 53 C64 58, 62 78, 65 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="80" cy="49" r="6.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                <path d="M80 55.5 C76 60, 75 78, 78 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Details -->
                <path d="M38 80 L38 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M42 80 L42 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M50 80 L50 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M54 80 L54 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M64 80 L64 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M68 80 L68 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M76 80 L76 90" stroke="#55331C" stroke-width="1.5"/>
                <path d="M80 80 L80 90" stroke="#55331C" stroke-width="1.5"/>
              </svg>
            </div>
            
            <div class="user-text-info">
              <h3 class="user-fullname">{{ userState.fullName }}</h3>
              <span class="user-email-text">{{ userState.email }}</span>
              <div class="member-badge-container">
                <span class="member-badge">Member Mocca</span>
              </div>
            </div>
          </div>

          <!-- Mocca Rewards Card (Static) -->
          <div class="rewards-card static-rewards">
            <div class="rewards-icon-box">
              <svg class="rewards-star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div class="rewards-info-box">
              <span class="rewards-label">Mocca Rewards</span>
              <span class="rewards-points">{{ userState.points }} poin terkumpul</span>
            </div>
          </div>

          <!-- Vertical Menu Navigation -->
          <nav class="sidebar-menu">
            <!-- Logout Button (Only button left in the sidebar) -->
            <button class="menu-link-btn logout-btn" @click="showLogoutModal = true">
              <span class="menu-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </span>
              <span class="menu-label-text">{{ currentLang === 'id' ? 'Keluar' : 'Logout' }}</span>
            </button>

            <!-- Sidebar Accordion (Mobile only) -->
            <div class="sidebar-accordion mobile-only">
              <button class="accordion-header" @click="isAccordionOpen = !isAccordionOpen" aria-label="Toggle Security Settings">
                <span class="accordion-title">{{ currentLang === 'id' ? 'Pengaturan Keamanan' : 'Security Settings' }}</span>
                <svg class="chevron-icon" :class="{ 'rotate': isAccordionOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <Transition name="accordion-slide">
                <div v-if="isAccordionOpen" class="accordion-content">
                  <div class="photo-action-buttons">
                    <button class="photo-action-btn" @click="openModal('password')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Ubah Kata Sandi
                    </button>
                    <button class="photo-action-btn" @click="openModal('pin')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      PIN Transaksi
                    </button>
                    <button class="photo-action-btn" @click="openModal('verification')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z"></path>
                        <path d="M12 6a6 6 0 0 1 6 6M12 8a4 4 0 0 1 4 4M12 10a2 2 0 0 1 2 2"></path>
                      </svg>
                      Verifikasi Instan
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </nav>
        </aside>

        <!-- ================= RIGHT COLUMN: SETTINGS PANEL ================= -->
        <main class="settings-panel">
          
          <!-- Top Tabbed Bar (Desktop only, scrollable layout) -->
          <div class="tabs-nav-bar">
            <button 
              v-for="tab in mainTabs" 
              :key="tab.id" 
              class="tab-nav-btn" 
              :class="{ active: activeTab === tab.id }" 
              @click="activeTab = tab.id"
            >
              {{ currentLang === 'id' ? tab.labelId : tab.labelEn }}
            </button>
          </div>

          <!-- Active Panel Content (Cozy transition) -->
          <div class="tab-content-container">
            <Transition name="tab-fade" mode="out-in">
              <div :key="activeTab" class="active-tab-panel">
                
                <!-- ================= TAB 1: BIODATA DIRI (DEFAULT) ================= -->
                <div v-if="activeTab === 'biodata'" class="biodata-tab-layout">
                  
                  <!-- Sub-section: Profile Photo Upload (Left) -->
                  <div class="profile-photo-panel">
                    <h4 class="photo-title-label">Foto Profil</h4>
                    <div class="photo-avatar-box">
                      <!-- Circular photo box containing custom drawing -->
                      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="band-sketch-svg-main">
                        <circle cx="60" cy="60" r="54" fill="#FAF6F0" stroke="#E6DFD5" stroke-width="1"/>
                        <line x1="20" y1="80" x2="100" y2="80" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                        <line x1="30" y1="80" x2="30" y2="95" stroke="#55331C" stroke-width="1.5"/>
                        <line x1="90" y1="80" x2="90" y2="95" stroke="#55331C" stroke-width="1.5"/>
                        <!-- Members -->
                        <circle cx="40" cy="48" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M40 55 C35 60, 35 78, 38 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                        <circle cx="53" cy="44" r="7.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M53 51.5 C48 57, 48 78, 52 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                        <circle cx="67" cy="46" r="7" fill="none" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M67 53 C64 58, 62 78, 65 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                        <circle cx="80" cy="49" r="6.5" fill="none" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M80 55.5 C76 60, 75 78, 78 80" fill="none" stroke="#55331C" stroke-width="1.5" stroke-linecap="round"/>
                        <!-- details -->
                        <path d="M38 80 L38 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M42 80 L42 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M50 80 L50 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M54 80 L54 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M64 80 L64 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M68 80 L68 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M76 80 L76 90" stroke="#55331C" stroke-width="1.5"/>
                        <path d="M80 80 L80 90" stroke="#55331C" stroke-width="1.5"/>
                      </svg>
                    </div>
                    
                    <button class="btn-change-photo" @click="triggerPhotoUpload">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-btn-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      Ubah Foto
                    </button>
                    
                    <span class="photo-requirements-text">
                      Format JPG, JPEG, PNG. Ukuran maksimal 10MB.
                    </span>
                    <input type="file" ref="fileInput" class="hidden-file-input" @change="handleFileChange" accept="image/*" />
                  </div>

                  <!-- Sub-section: Information Blocks (Right) -->
                  <div class="profile-details-panel">
                    
                    <!-- Block 1: Informasi Pribadi -->
                    <div class="details-block">
                      <div class="block-header-row">
                        <h4 class="block-title">Informasi Pribadi</h4>
                        
                        <!-- Inline Edit Action Buttons Group -->
                        <div v-if="isEditingPribadi" class="inline-edit-action-group">
                          <button class="btn-cancel-inline font-bold" @click="cancelEditInline('pribadi')">Batal</button>
                          <button class="btn-save-inline font-bold" @click="saveEditInline('pribadi')">Simpan</button>
                        </div>
                        <button v-else class="btn-edit-block" @click="startEditInline('pribadi')">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-btn-icon">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                      </div>

                      <div class="details-rows">
                        <div class="detail-row">
                          <div class="detail-label-col">
                            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Nama Lengkap
                          </div>
                          
                          <!-- Inline Edit Input -->
                          <div v-if="isEditingPribadi" class="detail-val-col-wrapper">
                            <input type="text" v-model="editForm.fullName" class="input-field-mocca inline-edit-input font-bold" />
                          </div>
                          <div v-else class="detail-val-col font-bold">{{ userState.fullName }}</div>
                        </div>
                        
                        <div class="detail-row">
                          <div class="detail-label-col">
                            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Tanggal Lahir
                          </div>
                          
                          <!-- Inline Edit Input -->
                          <div v-if="isEditingPribadi" class="detail-val-col-wrapper">
                            <input type="text" v-model="editForm.birthDate" class="input-field-mocca inline-edit-input" placeholder="Contoh: 12 Januari 1998" />
                          </div>
                          <div v-else class="detail-val-col">{{ userState.birthDate }}</div>
                        </div>
                        
                        <div class="detail-row">
                          <div class="detail-label-col">
                            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="10" cy="14" r="5"></circle>
                              <line x1="19" y1="5" x2="13.6" y2="10.4"></line>
                              <polyline points="14 5 19 5 19 10"></polyline>
                            </svg>
                            Jenis Kelamin
                          </div>
                          
                          <!-- Inline Edit Select -->
                          <div v-if="isEditingPribadi" class="detail-val-col-wrapper">
                            <select v-model="editForm.gender" class="input-field-mocca select-mocca inline-edit-input">
                              <option value="Laki-laki">Laki-laki</option>
                              <option value="Perempuan">Perempuan</option>
                            </select>
                          </div>
                          <div v-else class="detail-val-col">{{ userState.gender }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Block 2: Informasi Kontak -->
                    <div class="details-block">
                      <div class="block-header-row">
                        <h4 class="block-title">Informasi Kontak</h4>
                        
                        <!-- Inline Edit Action Buttons Group -->
                        <div v-if="isEditingKontak" class="inline-edit-action-group">
                          <button class="btn-cancel-inline font-bold" @click="cancelEditInline('kontak')">Batal</button>
                          <button class="btn-save-inline font-bold" @click="saveEditInline('kontak')">Simpan</button>
                        </div>
                        <button v-else class="btn-edit-block" @click="startEditInline('kontak')">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-btn-icon">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                      </div>

                      <div class="details-rows">
                        <div class="detail-row">
                          <div class="detail-label-col">
                            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Email
                          </div>
                          
                          <!-- Inline Edit Input -->
                          <div v-if="isEditingKontak" class="detail-val-col-wrapper full-width-input">
                            <input type="email" v-model="editForm.email" class="input-field-mocca inline-edit-input font-bold" />
                          </div>
                          <div v-else class="detail-val-col-wrapper">
                            <span class="detail-val-col font-bold">{{ userState.email }}</span>
                            <span class="verified-pill">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline-check">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Terverifikasi
                            </span>
                          </div>
                        </div>
                        
                        <div class="detail-row">
                          <div class="detail-label-col">
                            <svg class="detail-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            Nomor HP
                          </div>
                          
                          <!-- Inline Edit Input -->
                          <div v-if="isEditingKontak" class="detail-val-col-wrapper full-width-input">
                            <input type="text" v-model="editForm.phone" class="input-field-mocca inline-edit-input font-bold" />
                          </div>
                          <div v-else class="detail-val-col-wrapper">
                            <span class="detail-val-col font-bold">{{ userState.phone }}</span>
                            <span class="verified-pill">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="inline-check">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons moved here -->
                    <div class="photo-action-buttons desktop-only">
                      <button class="photo-action-btn" @click="openModal('password')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Ubah Kata Sandi
                      </button>
                      <button class="photo-action-btn" @click="openModal('pin')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        PIN Transaksi
                      </button>
                      <button class="photo-action-btn" @click="openModal('verification')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z"></path>
                          <path d="M12 6a6 6 0 0 1 6 6M12 8a4 4 0 0 1 4 4M12 10a2 2 0 0 1 2 2"></path>
                        </svg>
                        Verifikasi Instan
                      </button>
                    </div>

                  </div>
                </div>

                <!-- ================= TAB 2: DAFTAR ALAMAT ================= -->
                <div v-else-if="activeTab === 'alamat'" class="alamat-tab-layout">
                  <!-- Address Form (Add / Edit) -->
                  <div v-if="isAddingAddress || isEditingAddress" class="address-form-box">
                    <h4 class="section-title-inside">{{ isAddingAddress ? 'Tambah Alamat Baru' : 'Ubah Alamat' }}</h4>
                    
                    <div class="address-form-fields">
                      <div class="input-group-mocca">
                        <label class="input-label font-bold">Label Alamat</label>
                        <input type="text" v-model="addressForm.label" class="input-field-mocca" placeholder="Contoh: Rumah, BCA Tower, Kantor" />
                      </div>
                      
                      <div class="form-row-2col">
                        <div class="input-group-mocca">
                          <label class="input-label font-bold">Nama Penerima</label>
                          <input type="text" v-model="addressForm.recipientName" class="input-field-mocca" />
                        </div>
                        <div class="input-group-mocca">
                          <label class="input-label font-bold">Nomor Telepon</label>
                          <input type="text" v-model="addressForm.recipientPhone" class="input-field-mocca" />
                        </div>
                      </div>
                      
                      <div class="input-group-mocca">
                        <label class="input-label font-bold">Alamat Lengkap</label>
                        <textarea v-model="addressForm.addressDetails" class="input-field-mocca textarea-mocca" rows="3" placeholder="Nama Jalan, Gedung, No Rumah, Kelurahan, Kecamatan, Kota, Kode Pos"></textarea>
                      </div>
                      
                      <div class="input-group-mocca checkbox-group">
                        <label class="vintage-checkbox-label">
                          <input type="checkbox" v-model="addressForm.isUtama" :disabled="isEditingAddress && addressForm.isUtama" />
                          <span class="checkbox-custom"></span>
                          Jadikan Alamat Utama
                        </label>
                      </div>
                    </div>
                    
                    <div class="address-form-actions">
                      <button class="btn-cancel-mocca" @click="cancelAddressForm">Batal</button>
                      <button class="btn-save-mocca font-bold" @click="saveAddress">Simpan Alamat</button>
                    </div>
                  </div>

                  <!-- Address List -->
                  <div v-else>
                    <div class="alamat-header-row">
                      <div class="alamat-header-left">
                        <div class="header-title-with-icon">
                          <svg class="header-loc-pin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <h4 class="alamat-tab-title font-bold">Daftar Alamat</h4>
                        </div>
                        <p class="alamat-tab-subtext">Kelola alamat pengiriman Anda untuk pengalaman belanja yang lebih mudah.</p>
                      </div>
                      <button class="btn-tambah-alamat font-bold" @click="startAddAddress">
                        <svg class="btn-plus-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Tambah Alamat
                      </button>
                    </div>
                    
                    <div class="addresses-stack">
                      <div 
                        v-for="addr in addresses" 
                        :key="addr.id" 
                        class="addr-premium-card"
                        :class="{ 'active-utama-card': addr.isUtama }"
                      >
                        <!-- Left Side: Type Icon -->
                        <div class="addr-card-icon-box">
                          <svg v-if="addr.label.toLowerCase().includes('kantor')" class="addr-type-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                            <line x1="9" y1="22" x2="9" y2="16"></line>
                            <line x1="15" y1="22" x2="15" y2="16"></line>
                            <line x1="9" y1="16" x2="15" y2="16"></line>
                            <path d="M8 6h.01"></path>
                            <path d="M16 6h.01"></path>
                            <path d="M8 10h.01"></path>
                            <path d="M16 10h.01"></path>
                          </svg>
                          <svg v-else class="addr-type-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        </div>
                        
                        <!-- Center Content -->
                        <div class="addr-card-center">
                          <div class="addr-first-row">
                            <span class="addr-label-bold font-bold">{{ addr.label }}</span>
                            <span v-if="addr.isUtama" class="addr-badge-utama-gold">Utama</span>
                            
                            <div class="addr-recipient-inline">
                              <span class="recipient-name font-bold">{{ addr.recipientName }}</span>
                              <span class="recipient-tag-grey">Penerima</span>
                            </div>
                          </div>
                          
                          <div class="addr-details-text">
                            {{ addr.addressDetails }}
                          </div>
                          
                          <div class="addr-phone-text">
                            {{ addr.recipientPhone }}
                          </div>
                        </div>
                        
                        <!-- Right Side Actions -->
                        <div class="addr-card-right-actions">
                          <button class="addr-action-row-btn font-bold" @click="startEditAddress(addr)">
                            <svg class="action-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Edit
                          </button>
                          
                          <button 
                            class="addr-action-row-btn font-bold delete-action-btn"
                            :class="{ 'disabled-action': addr.isUtama }"
                            :disabled="addr.isUtama"
                            @click="deleteAddress(addr.id)"
                          >
                            <svg class="action-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Hapus
                          </button>
                          
                          <button 
                            v-if="!addr.isUtama" 
                            class="addr-action-row-btn font-bold set-utama-action-btn"
                            @click="setAlamatUtamaDirect(addr)"
                          >
                            Set Utama
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Bottom Support Banner -->
                    <div class="addr-support-banner">
                      <div class="banner-left-info">
                        <div class="banner-info-icon-box">
                          <svg class="info-svg-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </div>
                        <div class="banner-text-content">
                          <p class="banner-title font-bold">Perlu bantuan?</p>
                          <p class="banner-subtext">Hubungi customer service kami jika Anda mengalami kesulitan mengelola alamat.</p>
                        </div>
                      </div>
                      <button class="btn-hubungi-kami font-bold" @click="triggerToast('Menghubungi customer service...')">
                        <svg class="headset-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                        Hubungi Kami
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ================= TAB 3: PESANAN SAYA ================= -->
                <div v-else-if="activeTab === 'pesanan'" class="pesanan-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Riwayat Pesanan Saya' : 'My Orders History' }}</h4>
                  
                  <div class="orders-list">
                    <!-- Order 1 -->
                    <div class="order-scrapbook-card">
                      <div class="order-card-header">
                        <div class="order-meta-left">
                          <span class="order-id font-bold">#MC-2026-0518</span>
                          <span class="order-date">18 Mei 2026</span>
                        </div>
                        <span class="order-status-badge shipping">Sedang Dikirim</span>
                      </div>
                      
                      <div class="order-card-body">
                        <div class="order-item-detail">
                          <div class="item-thumb-mini">
                            <img src="/mocca_group_tee.png" alt="Mocca Group Tee" onerror="this.src='https://placehold.co/50x50/F4EDE4/55331C?text=Tee'" />
                          </div>
                          <div class="item-text-mini">
                            <p class="item-name-mini font-bold">Mocca Group Tee</p>
                            <span class="item-options-mini">Warna: Cream, Ukuran: L</span>
                            <span class="item-qty-mini">x 1</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="order-card-footer">
                        <div class="price-summary-mini">
                          <span class="total-label-mini">Total Pesanan:</span>
                          <span class="total-price-mini font-bold">Rp 217.000</span>
                        </div>
                        <button class="btn-order-detail" @click="triggerToast('Menampilkan detail pesanan #MC-2026-0518...')">
                          Lacak Pengiriman
                        </button>
                      </div>
                    </div>

                    <!-- Order 2 -->
                    <div class="order-scrapbook-card">
                      <div class="order-card-header">
                        <div class="order-meta-left">
                          <span class="order-id font-bold">#MC-2026-0412</span>
                          <span class="order-date">12 April 2026</span>
                        </div>
                        <span class="order-status-badge completed">Selesai</span>
                      </div>
                      
                      <div class="order-card-body">
                        <div class="order-item-detail">
                          <div class="item-thumb-mini">
                            <img src="/album_art.png" alt="Scrapbook Album CD" onerror="this.src='https://placehold.co/50x50/F4EDE4/55331C?text=CD'" />
                          </div>
                          <div class="item-text-mini">
                            <p class="item-name-mini font-bold">Vintage Scrapbook Album CD</p>
                            <span class="item-options-mini">Koleksi Terbatas</span>
                            <span class="item-qty-mini">x 1</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="order-card-footer">
                        <div class="price-summary-mini">
                          <span class="total-label-mini">Total Pesanan:</span>
                          <span class="total-price-mini font-bold">Rp 145.000</span>
                        </div>
                        <button class="btn-order-detail-secondary" @click="triggerToast('Menampilkan detail invoice #MC-2026-0412...')">
                          Beli Lagi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ================= TAB 4: PEMBAYARAN ================= -->
                <div v-else-if="activeTab === 'pembayaran'" class="pembayaran-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Metode Pembayaran Tersimpan' : 'Saved Payment Methods' }}</h4>
                  
                  <div class="payments-list">
                    <div class="payment-method-box linked">
                      <div class="pm-left">
                        <span class="pm-badge-bca">BCA KlikPay</span>
                        <div class="pm-info">
                          <p class="pm-name font-bold">Budi Santoso</p>
                          <p class="pm-details">Terhubung ke 8832 *** 991</p>
                        </div>
                      </div>
                      <span class="pm-status-connected">Terhubung</span>
                    </div>

                    <div class="payment-method-box linked">
                      <div class="pm-left">
                        <span class="pm-badge-gopay font-bold">GoPay</span>
                        <div class="pm-info">
                          <p class="pm-name font-bold">0812-3456-7890</p>
                          <p class="pm-details">Saldo e-Wallet GoPay</p>
                        </div>
                      </div>
                      <span class="pm-status-connected">Terhubung</span>
                    </div>

                    <div class="payment-method-box">
                      <div class="pm-left">
                        <span class="pm-badge-card font-bold">VISA</span>
                        <div class="pm-info">
                          <p class="pm-name font-bold">Budi Santoso</p>
                          <p class="pm-details">Visa Platinum **** 4321</p>
                        </div>
                      </div>
                      <button class="pm-btn-disconnect" @click="triggerToast('Kartu Visa berhasil dihapus.')">Hapus</button>
                    </div>
                  </div>

                  <button class="btn-add-payment-method" @click="triggerToast('Metode pembayaran baru dibuka...')">
                    + Tambah Metode Pembayaran Baru
                  </button>
                </div>

                <!-- ================= TAB 5: REKENING BANK ================= -->
                <div v-else-if="activeTab === 'rekening'" class="rekening-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Rekening Bank Terdaftar' : 'Registered Bank Accounts' }}</h4>
                  
                  <div class="bank-cards-list">
                    <div class="vintage-bank-card-container">
                      <div class="bank-card-inner">
                        <div class="bank-card-logo-row">
                          <span class="card-bank-name font-bold">BCA</span>
                          <span class="card-bank-type">Rekening Utama</span>
                        </div>
                        <div class="bank-card-number-row font-bold">
                          8832 9901 7890
                        </div>
                        <div class="bank-card-holder-row">
                          <span class="card-holder-label">PEMEGANG REKENING</span>
                          <span class="card-holder-name font-bold">BUDI SANTOSO</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="bank-action-row">
                    <button class="btn-edit-bank" @click="triggerToast('Edit Rekening BCA...')">Ubah Rekening</button>
                    <button class="btn-add-bank-secondary" @click="triggerToast('Tambah rekening baru dibuka...')">
                      + Tambah Rekening Lain
                    </button>
                  </div>
                </div>

                <!-- ================= TAB 6: NOTIFIKASI ================= -->
                <div v-else-if="activeTab === 'notifikasi'" class="notifikasi-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Pengaturan Notifikasi' : 'Notification Preferences' }}</h4>
                  
                  <div class="notification-settings-list">
                    <div class="notif-option-row">
                      <div class="notif-text-side">
                        <h5 class="notif-option-title font-bold">Diskon & Promosi Mocca</h5>
                        <p class="notif-option-desc">Dapatkan update merchandise terbaru, diskon musiman, dan penjualan khusus album fisik.</p>
                      </div>
                      <label class="vintage-switch">
                        <input type="checkbox" checked />
                        <span class="switch-slider"></span>
                      </label>
                    </div>

                    <div class="notif-option-row">
                      <div class="notif-text-side">
                        <h5 class="notif-option-title font-bold">Status Update Pesanan</h5>
                        <p class="notif-option-desc">Terima pemberitahuan melalui email dan SMS ketika paket merchandise dikemas atau dikirim.</p>
                      </div>
                      <label class="vintage-switch">
                        <input type="checkbox" checked />
                        <span class="switch-slider"></span>
                      </label>
                    </div>

                    <div class="notif-option-row">
                      <div class="notif-text-side">
                        <h5 class="notif-option-title font-bold">Buletin & Berita Musik</h5>
                        <p class="notif-option-desc">Email berkala dari band Mocca mengenai konser, rilisan single terbaru, dan aktivitas belakang layar.</p>
                      </div>
                      <label class="vintage-switch">
                        <input type="checkbox" />
                        <span class="switch-slider"></span>
                      </label>
                    </div>
                  </div>
                  
                  <button class="btn-primary-mocca mt-6" @click="triggerToast('Pengaturan notifikasi berhasil disimpan!')">
                    Simpan Pengaturan
                  </button>
                </div>

                <!-- ================= TAB 7: MODE TAMPILAN ================= -->
                <!-- <div v-else-if="activeTab === 'mode'" class="mode-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Pilih Mode Tampilan' : 'Choose Display Mode' }}</h4>
                  
                  <div class="theme-palette-grid"> -->
                    <!-- Theme Card 1: Light Cream (Default) -->
                    <!-- <div
                      class="theme-card"
                      :class="{ 'active-theme': currentTheme === 'cream' }"
                      @click="selectTheme('cream')"
                    >
                      <div class="theme-preview-box cream-theme">
                        <div class="preview-header"></div>
                        <div class="preview-body"></div>
                      </div>
                      <span class="theme-name font-bold">Light Cream (Default)</span>
                      <span class="theme-desc">Latar kertas hangat, tulisan kopi pekat hangat.</span>
                    </div> -->

                    <!-- Theme Card 2: Vintage Sepia -->
                    <!-- <div
                      class="theme-card"
                      :class="{ 'active-theme': currentTheme === 'sepia' }"
                      @click="selectTheme('sepia')"
                    >
                      <div class="theme-preview-box sepia-theme">
                        <div class="preview-header"></div>
                        <div class="preview-body"></div>
                      </div>
                      <span class="theme-name font-bold">Vintage Sepia</span>
                      <span class="theme-desc">Nuansa album foto lama, warna sage dan pasir hangat.</span>
                    </div> -->

                    <!-- Theme Card 3: Cozy Dark Cocoa -->
                    <!-- <div
                      class="theme-card"
                      :class="{ 'active-theme': currentTheme === 'cocoa' }"
                      @click="selectTheme('cocoa')"
                    >
                      <div class="theme-preview-box cocoa-theme">
                        <div class="preview-header"></div>
                        <div class="preview-body"></div>
                      </div>
                      <span class="theme-name font-bold">Cozy Dark Cocoa</span>
                      <span class="theme-desc">Latar cokelat pekat gelap, teks krem lembut.</span>
                    </div>
                  </div>
                </div> -->

                <!-- ================= TAB 8: KEAMANAN ================= -->
                <div v-else-if="activeTab === 'keamanan'" class="keamanan-tab-layout">
                  <h4 class="section-title-inside">{{ currentLang === 'id' ? 'Pengaturan Keamanan Akun' : 'Account Security Settings' }}</h4>
                  
                  <div class="security-sections-list">
                    <div class="sec-item-row">
                      <div class="sec-text-side">
                        <h5 class="sec-item-title font-bold">Autentikasi Dua Faktor (2FA)</h5>
                        <p class="sec-item-desc">Tambahkan lapisan keamanan ekstra dengan mengirimkan kode OTP ke nomor handphone Anda saat masuk.</p>
                      </div>
                      <label class="vintage-switch">
                        <input type="checkbox" />
                        <span class="switch-slider"></span>
                      </label>
                    </div>

                    <div class="sec-item-row">
                      <div class="sec-text-side">
                        <h5 class="sec-item-title font-bold">Daftar Sesi Login</h5>
                        <p class="sec-item-desc">Anda saat ini sedang login melalui Chrome (Windows) - Jakarta, Indonesia.</p>
                      </div>
                      <button class="btn-outline-mocca-small" @click="triggerToast('Sesi perangkat lain berhasil dikeluarkan.')">
                        Keluar dari Semua Perangkat
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ================= TAB 9: MOCCA REWARDS ================= -->
                <div v-else-if="activeTab === 'rewards'" class="rewards-tab-layout-panel">
                  <h4 class="section-title-inside">Mocca Rewards & Loyalty Program</h4>
                  
                  <div class="rewards-loyalty-showcase">
                    <div class="points-card-large">
                      <span class="points-label-large">SALDO POIN ANDA</span>
                      <span class="points-val-large font-bold">{{ userState.points }} POIN</span>
                      <span class="points-sub-large">Poin kedaluwarsa pada 31 Desember 2026</span>
                    </div>

                    <div class="rewards-tiers-info">
                      <h5 class="tier-title font-bold">Level Keanggotaan: Gold Member</h5>
                      <p class="tier-desc">Kumpulkan 55 poin lagi untuk membuka status <strong>Platinum Member</strong> dan nikmati keuntungan gratis ongkir tanpa batas serta rilisan merchandise eksklusif H-3 lebih awal.</p>
                    </div>
                  </div>
                </div>

              </div>
            </Transition>
          </div>
        </main>
      </div>

      <!-- ================= MODALS SECTION ================= -->
      
      <!-- Edit modals removed in favor of inline direct editing -->

      <!-- Modal 3: Action Buttons Modals (Password, PIN, Instant verification) -->
      <Transition name="modal-fade">
        <div v-if="actionModalType" class="profile-modal-backdrop" @click="closeActionModal">
          <div class="profile-modal-container" @click.stop>
            <div class="modal-header-row">
              <h3 class="modal-title font-bold">
                {{ actionModalType === 'password' ? 'Ubah Kata Sandi' : (actionModalType === 'pin' ? 'Ubah PIN Transaksi' : 'Verifikasi Instan') }}
              </h3>
              <button class="modal-close-btn" @click="closeActionModal">&times;</button>
            </div>
            
            <div class="modal-body-content">
              <div v-if="actionModalType === 'password'">
                <div class="input-group-mocca">
                  <label class="input-label font-bold">Kata Sandi Lama</label>
                  <input type="password" class="input-field-mocca" placeholder="Masukkan kata sandi lama" />
                </div>
                <div class="input-group-mocca">
                  <label class="input-label font-bold">Kata Sandi Baru</label>
                  <input type="password" class="input-field-mocca" placeholder="Masukkan kata sandi baru" />
                </div>
                <div class="input-group-mocca">
                  <label class="input-label font-bold">Konfirmasi Kata Sandi Baru</label>
                  <input type="password" class="input-field-mocca" placeholder="Ulangi kata sandi baru" />
                </div>
              </div>

              <div v-else-if="actionModalType === 'pin'">
                <div class="input-group-mocca">
                  <label class="input-label font-bold">PIN Transaksi Saat Ini</label>
                  <input type="password" maxlength="6" class="input-field-mocca text-center tracking-widest" placeholder="******" />
                </div>
                <div class="input-group-mocca">
                  <label class="input-label font-bold">PIN Baru (6 Digit)</label>
                  <input type="password" maxlength="6" class="input-field-mocca text-center tracking-widest" placeholder="******" />
                </div>
              </div>

              <div v-else-if="actionModalType === 'verification'" class="text-center py-6">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-mocca-dark)" stroke-width="1.2" class="mx-auto mb-4 animate-pulse">
                  <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z"></path>
                  <path d="M12 6a6 6 0 0 1 6 6M12 8a4 4 0 0 1 4 4M12 10a2 2 0 0 1 2 2"></path>
                </svg>
                <p class="font-bold mb-2">Verifikasi Instan Sidik Jari / Wajah</p>
                <p class="text-xs text-stone-500 max-width-xs mx-auto">Aktifkan login biometric menggunakan perangkat Anda untuk akses transaksi yang lebih cepat dan aman.</p>
              </div>
            </div>
            
            <div class="modal-footer-row">
              <button class="btn-cancel-mocca" @click="closeActionModal">Batal</button>
              <button class="btn-save-mocca font-bold" @click="submitActionModal">
                {{ actionModalType === 'verification' ? 'Aktifkan Sekarang' : 'Simpan Perubahan' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Modal 4: Logout Confirmation Modal -->
      <Transition name="modal-fade">
        <div v-if="showLogoutModal" class="profile-modal-backdrop" @click="showLogoutModal = false">
          <div class="profile-modal-container confirmation-modal" @click.stop>
            <div class="modal-header-row">
              <h3 class="modal-title font-bold">Konfirmasi Keluar</h3>
              <button class="modal-close-btn" @click="showLogoutModal = false">&times;</button>
            </div>
            
            <div class="modal-body-content text-center py-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D9534F" stroke-width="1.8" class="mx-auto mb-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <p class="font-bold text-lg mb-2">Apakah Anda yakin ingin keluar?</p>
              <p class="text-sm text-stone-500">Anda perlu melakukan login kembali untuk dapat melihat riwayat pesanan dan mengumpulkan poin Mocca Rewards.</p>
            </div>
            
            <div class="modal-footer-row">
              <button class="btn-cancel-mocca" @click="showLogoutModal = false">Batal</button>
              <button class="btn-danger-mocca font-bold" @click="handleLogout">Ya, Keluar</button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Sleek Toast Notification -->
      <div class="profile-toast" :class="{ active: toastActive }">
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { currentPage, currentLang, currentTheme, isLoggedIn } from '../store/cart.js';

const isAccordionOpen = ref(true);
const selectTheme = (theme) => {
  currentTheme.value = theme;
  const names = { cream: 'Light Cream (Default)', sepia: 'Vintage Sepia', cocoa: 'Cozy Dark Cocoa' };
  triggerToast(`Mode ${names[theme]} diaktifkan!`);
};

// Reactive User State initialized matching mock Budi Santoso
const userState = reactive({
  fullName: 'Budi Santoso',
  birthDate: '12 Januari 1998',
  gender: 'Laki-laki',
  email: 'budi.santoso@gmail.com',
  phone: '0812 3456 7890',
  points: 245
});

// Navigation state
const activeTab = ref('biodata');

// File Upload ref
const fileInput = ref(null);

// Address dynamic state
const addresses = reactive([
  {
    id: 1,
    label: 'Rumah',
    isUtama: true,
    recipientName: 'Budi Santoso',
    recipientPhone: '0812 3456 7890',
    addressDetails: 'Jl. Kembang Indah No. 10, RT 03/RW 02, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12120'
  },
  {
    id: 2,
    label: 'Kantor',
    isUtama: false,
    recipientName: 'Budi Santoso',
    recipientPhone: '0812 3456 7890',
    addressDetails: 'Jl. Jenderal Sudirman No. 45, Karet Tengsin, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220'
  },
  {
    id: 3,
    label: 'Rumah Orang Tua',
    isUtama: false,
    recipientName: 'Budi Santoso',
    recipientPhone: '0812 3456 7890',
    addressDetails: 'Jl. Melati Raya No. 23, RT 01/RW 03, Depok, Jawa Barat 16452'
  }
]);

const isEditingAddress = ref(false);
const isAddingAddress = ref(false);
const addressForm = reactive({
  id: null,
  label: '',
  recipientName: '',
  recipientPhone: '',
  addressDetails: '',
  isUtama: false
});

// Inline editing states
const isEditingPribadi = ref(false);
const isEditingKontak = ref(false);

// Modal and editing forms state
const editModalType = ref(null); // kept for modal type tracking if needed
const actionModalType = ref(null); // 'password', 'pin', 'verification'
const showLogoutModal = ref(false);

const editForm = reactive({
  fullName: '',
  birthDate: '',
  gender: 'Laki-laki',
  email: '',
  phone: ''
});

// Toast system
const toastActive = ref(false);
const toastMessage = ref('');

const triggerToast = (msg) => {
  toastMessage.value = msg;
  toastActive.value = true;
  setTimeout(() => {
    toastActive.value = false;
  }, 2500);
};

// Sidebar menus config with inline vector icons matching picture
const menuItems = [
  {
    id: 'biodata',
    labelId: 'Biodata Diri',
    labelEn: 'Personal Profile',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`
  },
  {
    id: 'alamat',
    labelId: 'Daftar Alamat',
    labelEn: 'Shipping Addresses',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`
  },
  {
    id: 'pesanan',
    labelId: 'Pesanan Saya',
    labelEn: 'My Orders',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>`
  },
  {
    id: 'pembayaran',
    labelId: 'Pembayaran',
    labelEn: 'Saved Payments',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>`
  },
  {
    id: 'rekening',
    labelId: 'Rekening Bank',
    labelEn: 'Bank Accounts',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M3 22h18M6 18v-7m5 7v-7m5 7v-7M3 11l9-9 9 9M3 18h18"></path>
    </svg>`
  },
  {
    id: 'notifikasi',
    labelId: 'Notifikasi',
    labelEn: 'Notifications',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>`
  },
  // {
  //   id: 'mode',
  //   labelId: 'Mode Tampilan',
  //   labelEn: 'Display Theme',
  //   icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
  //     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  //   </svg>`
  // },
  {
    id: 'keamanan',
    labelId: 'Keamanan',
    labelEn: 'Account Security',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`
  }
];

// Top desktop tabs matching exact mock screenshot
const mainTabs = [
  { id: 'biodata', labelId: 'Biodata Diri', labelEn: 'Profile' },
  { id: 'alamat', labelId: 'Daftar Alamat', labelEn: 'Addresses' },
  { id: 'pembayaran', labelId: 'Pembayaran', labelEn: 'Payments' },
  { id: 'rekening', labelId: 'Rekening Bank', labelEn: 'Banks' },
  { id: 'notifikasi', labelId: 'Notifikasi', labelEn: 'Alerts' },
  // { id: 'mode', labelId: 'Mode Tampilan', labelEn: 'Display' },
  { id: 'keamanan', labelId: 'Keamanan', labelEn: 'Security' }
];

const goToHome = () => {
  currentPage.value = 'home';
};

const triggerPhotoUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    triggerToast(currentLang.value === 'id' ? 'Foto profil berhasil diunggah!' : 'Profile photo uploaded successfully!');
  }
};

const openModal = (type) => {
  actionModalType.value = type;
};

const closeActionModal = () => {
  actionModalType.value = null;
};

const submitActionModal = () => {
  let msg = '';
  if (actionModalType.value === 'password') {
    msg = currentLang.value === 'id' ? 'Kata sandi berhasil diubah!' : 'Password successfully updated!';
  } else if (actionModalType.value === 'pin') {
    msg = currentLang.value === 'id' ? 'PIN transaksi berhasil diperbarui!' : 'Transaction PIN updated!';
  } else if (actionModalType.value === 'verification') {
    msg = currentLang.value === 'id' ? 'Biometrik diaktifkan!' : 'Biometric verification activated!';
  }
  triggerToast(msg);
  closeActionModal();
};

const startEditInline = (type) => {
  if (type === 'pribadi') {
    editForm.fullName = userState.fullName;
    editForm.birthDate = userState.birthDate;
    editForm.gender = userState.gender;
    isEditingPribadi.value = true;
  } else if (type === 'kontak') {
    editForm.email = userState.email;
    editForm.phone = userState.phone;
    isEditingKontak.value = true;
  }
};

const cancelEditInline = (type) => {
  if (type === 'pribadi') {
    isEditingPribadi.value = false;
  } else if (type === 'kontak') {
    isEditingKontak.value = false;
  }
};

const saveEditInline = (type) => {
  if (type === 'pribadi') {
    userState.fullName = editForm.fullName;
    userState.birthDate = editForm.birthDate;
    userState.gender = editForm.gender;
    isEditingPribadi.value = false;
  } else if (type === 'kontak') {
    userState.email = editForm.email;
    userState.phone = editForm.phone;
    isEditingKontak.value = false;
  }
  triggerToast(currentLang.value === 'id' ? 'Informasi berhasil diperbarui!' : 'Information successfully updated!');
};

// Dynamic Address methods
const startAddAddress = () => {
  addressForm.id = null;
  addressForm.label = '';
  addressForm.recipientName = userState.fullName;
  addressForm.recipientPhone = userState.phone;
  addressForm.addressDetails = '';
  addressForm.isUtama = addresses.length === 0;
  isAddingAddress.value = true;
  isEditingAddress.value = false;
};

const startEditAddress = (addr) => {
  addressForm.id = addr.id;
  addressForm.label = addr.label;
  addressForm.recipientName = addr.recipientName;
  addressForm.recipientPhone = addr.recipientPhone;
  addressForm.addressDetails = addr.addressDetails;
  addressForm.isUtama = addr.isUtama;
  isEditingAddress.value = true;
  isAddingAddress.value = false;
};

const cancelAddressForm = () => {
  isAddingAddress.value = false;
  isEditingAddress.value = false;
};

const saveAddress = () => {
  if (!addressForm.label || !addressForm.recipientName || !addressForm.recipientPhone || !addressForm.addressDetails) {
    triggerToast(currentLang.value === 'id' ? 'Semua field harus diisi!' : 'All fields are required!');
    return;
  }

  if (addressForm.isUtama) {
    addresses.forEach(a => a.isUtama = false);
  }

  if (isAddingAddress.value) {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    addresses.push({
      id: newId,
      label: addressForm.label,
      recipientName: addressForm.recipientName,
      recipientPhone: addressForm.recipientPhone,
      addressDetails: addressForm.addressDetails,
      isUtama: addressForm.isUtama
    });
    triggerToast(currentLang.value === 'id' ? 'Alamat baru berhasil ditambahkan!' : 'New address added successfully!');
  } else if (isEditingAddress.value) {
    const idx = addresses.findIndex(a => a.id === addressForm.id);
    if (idx !== -1) {
      addresses[idx].label = addressForm.label;
      addresses[idx].recipientName = addressForm.recipientName;
      addresses[idx].recipientPhone = addressForm.recipientPhone;
      addresses[idx].addressDetails = addressForm.addressDetails;
      addresses[idx].isUtama = addressForm.isUtama;
    }
    triggerToast(currentLang.value === 'id' ? 'Alamat berhasil diperbarui!' : 'Address updated successfully!');
  }

  const hasUtama = addresses.some(a => a.isUtama);
  if (!hasUtama && addresses.length > 0) {
    addresses[0].isUtama = true;
  }

  isAddingAddress.value = false;
  isEditingAddress.value = false;
};

const deleteAddress = (id) => {
  const idx = addresses.findIndex(a => a.id === id);
  if (idx !== -1) {
    const wasUtama = addresses[idx].isUtama;
    addresses.splice(idx, 1);
    
    if (wasUtama && addresses.length > 0) {
      addresses[0].isUtama = true;
    }
    
    triggerToast(currentLang.value === 'id' ? 'Alamat berhasil dihapus!' : 'Address successfully deleted!');
  }
};

const setAlamatUtamaDirect = (addr) => {
  addresses.forEach(a => a.isUtama = false);
  addr.isUtama = true;
  triggerToast(currentLang.value === 'id' ? 'Alamat utama berhasil diubah!' : 'Primary address successfully updated!');
};

const handleLogout = () => {
  showLogoutModal.value = false;
  triggerToast(currentLang.value === 'id' ? 'Berhasil keluar. Mengarahkan...' : 'Logout successful. Redirecting...');
  isLoggedIn.value = false;
  setTimeout(() => {
    currentPage.value = 'home';
  }, 1200);
};
</script>

<style scoped>
/* ================= PAGE CONTAINER STYLING ================= */
.profile-page-wrapper {
  background-color: #F5F2ED; /* Minimalist warm cream background */
  min-height: 100vh;
  padding: 2.5rem 1.5rem;
  font-family: var(--font-body);
  color: var(--color-mocca-dark);
}

.profile-container {
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
  color: var(--color-mocca-muted);
}

.breadcrumb-link {
  color: var(--color-mocca-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-mocca-dark);
}

.breadcrumb-separator {
  opacity: 0.5;
}

.breadcrumb-current {
  color: var(--color-mocca-dark);
  font-weight: 500;
}

/* ================= TWO-COLUMN GRID LAYOUT ================= */
.profile-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.75rem;
  align-items: start;
}

/* ================= LEFT COLUMN: SIDEBAR ================= */
.profile-sidebar {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(59, 35, 20, 0.02);
}

/* User Header Inside Sidebar */
.user-sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(90, 60, 40, 0.08);
}

.avatar-circle-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1.5px dashed var(--color-mocca-border);
  padding: 3px;
  background-color: #FAF8F5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.band-sketch-svg {
  width: 100%;
  height: 100%;
}

.user-fullname {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
}

.user-email-text {
  font-size: 0.8rem;
  color: var(--color-mocca-muted);
  word-break: break-all;
  margin-bottom: 0.75rem;
  display: block;
}

.member-badge-container {
  display: flex;
  justify-content: center;
}

.member-badge {
  background-color: #F8F4EE;
  color: #8C7355;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 30px;
  border: 1px solid rgba(140, 115, 85, 0.15);
  letter-spacing: 0.03em;
}

/* Mocca Rewards Card */
.rewards-card {
  margin-top: 1.25rem;
  background-color: #FAF6F0;
  border: 1px solid rgba(140, 115, 85, 0.12);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.rewards-card:hover, .rewards-card.active {
  background-color: #FAF0E4;
  border-color: rgba(140, 115, 85, 0.25);
  box-shadow: 0 4px 12px rgba(90, 60, 40, 0.04);
}

.rewards-icon-box {
  background-color: #FFFFFF;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(140, 115, 85, 0.12);
  color: #B09875;
  flex-shrink: 0;
}

.rewards-star-icon {
  width: 16px;
  height: 16px;
}

.rewards-info-box {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.rewards-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-mocca-dark);
}

.rewards-points {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
  margin-top: 0.05rem;
}

.rewards-chevron {
  color: var(--color-mocca-muted);
  opacity: 0.7;
}

/* Sidebar Menu Navigation */
.sidebar-menu {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.menu-link-btn {
  background: none;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0.95rem;
  border-radius: 8px;
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
}

.menu-link-btn:hover {
  background-color: #FDFBF7;
  color: var(--color-mocca-dark);
  transform: translateX(2px);
}

.menu-link-btn.active {
  background-color: #F6EDE0; /* active state soft highlight matching mock */
  color: var(--color-mocca-dark);
  font-weight: 600;
}

.menu-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.menu-link-btn.active .menu-icon-wrapper {
  opacity: 1;
}

.menu-divider {
  height: 1px;
  background-color: rgba(90, 60, 40, 0.08);
  margin: 0.75rem 0.5rem;
}

.logout-btn {
  color: #C05646;
}

.logout-btn:hover {
  background-color: #FDF3F1;
  color: #D9534F;
}

/* ================= RIGHT COLUMN: SETTINGS PANEL ================= */
.settings-panel {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 25px rgba(59, 35, 20, 0.02);
  min-height: 580px;
  display: flex;
  flex-direction: column;
}

/* Top Tabbed Bar Navigation */
.tabs-nav-bar {
  display: flex;
  gap: 1.5rem;
  border-bottom: 1.5px solid rgba(90, 60, 40, 0.06);
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: none; /* Hide scrollbar for clean aesthetic */
}

.tabs-nav-bar::-webkit-scrollbar {
  display: none;
}

.tab-nav-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-mocca-muted);
  padding: 0.5rem 0;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: all 0.25s ease;
}

.tab-nav-btn:hover {
  color: var(--color-mocca-dark);
}

.tab-nav-btn.active {
  color: var(--color-mocca-dark);
  font-weight: 700;
}

.tab-nav-btn.active::after {
  content: '';
  position: absolute;
  bottom: -0.85rem;
  left: 0;
  width: 100%;
  height: 2.5px;
  background-color: #8C7355; /* aesthetic line matching mock */
  border-radius: 4px;
}

.tab-content-container {
  flex-grow: 1;
}

/* Active tab panel fade transitions */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* ================= TAB CONTENT 1: BIODATA DIRI ================= */
.biodata-tab-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* Profile Photo Panel (Left Sub-column) */
.profile-photo-panel {
  border: 1px solid rgba(90, 60, 40, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #FCFAF7;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.photo-title-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0 0 1rem 0;
}

.photo-avatar-box {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.25rem;
  border: 1px solid var(--color-mocca-border);
  padding: 3px;
  background-color: #FFFFFF;
  box-shadow: inset 0 2px 10px rgba(59, 35, 20, 0.03);
}

.band-sketch-svg-main {
  width: 100%;
  height: 100%;
}

.btn-change-photo {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(59, 35, 20, 0.03);
  transition: all 0.25s ease;
}

.btn-change-photo:hover {
  background-color: #F8F5F0;
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
}

.photo-requirements-text {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
  margin-top: 0.75rem;
  max-width: 160px;
}

.hidden-file-input {
  display: none;
}

/* Action buttons at the bottom of left panel */
.photo-action-buttons {
  width: 100%;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.photo-action-btn {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  color: var(--color-mocca-dark);
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  box-shadow: 0 1px 4px rgba(59, 35, 20, 0.01);
  transition: all 0.25s ease;
}

.photo-action-btn:hover {
  background-color: #FAF8F5;
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(59, 35, 20, 0.03);
}

/* Information Section (Right Sub-column) */
.profile-details-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.details-block {
  border-bottom: 1px solid rgba(90, 60, 40, 0.06);
  padding-bottom: 1.75rem;
}

.details-block:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.block-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.block-title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.btn-edit-block {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 1px 3px rgba(59, 35, 20, 0.02);
  transition: all 0.25s ease;
}

.btn-edit-block:hover {
  background-color: #FDFBF8;
  border-color: var(--color-mocca-dark);
  transform: translateY(-1px);
}

.details-rows {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.detail-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 1rem;
}

.detail-label-col {
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.detail-icon {
  color: var(--color-mocca-muted);
  opacity: 0.75;
}

.detail-val-col {
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
}

.detail-val-col-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}

.verified-pill {
  background-color: #EBF7EE;
  color: #2E7D32;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  border-radius: 30px;
  border: 1px solid rgba(46, 125, 50, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.inline-check {
  margin-bottom: -1px;
}

/* ================= TAB CONTENT 2: DAFTAR ALAMAT ================= */
.alamat-tab-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title-inside {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-mocca-dark);
  margin: 0;
}

.alamat-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.addresses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.address-box {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: all 0.25s ease;
}

.address-box:hover {
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.03);
}

.address-box.active-address {
  border-color: #8C7355;
  background-color: #FAF8F5;
  box-shadow: 0 4px 15px rgba(140, 115, 85, 0.05);
}

.address-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(90, 60, 40, 0.08);
  padding-bottom: 0.65rem;
}

.address-title {
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
}

.address-tag-utama {
  background-color: #EFE6DA;
  color: #8C7355;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.address-card-body {
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-mocca-dark);
  flex-grow: 1;
}

.recipient-name {
  margin: 0 0 0.15rem 0;
}

.recipient-phone {
  color: var(--color-mocca-muted);
  margin: 0 0 0.5rem 0;
}

.recipient-address {
  margin: 0;
}

.address-card-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid rgba(90, 60, 40, 0.06);
  padding-top: 0.75rem;
}

.addr-action-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #8C7355;
  cursor: pointer;
  padding: 0;
}

.addr-action-btn:hover {
  text-decoration: underline;
  color: var(--color-mocca-dark);
}

.addr-action-btn.disabled-btn {
  color: var(--color-mocca-muted);
  opacity: 0.5;
  cursor: not-allowed;
}

.addr-action-btn.disabled-btn:hover {
  text-decoration: none;
}

.footer-divider {
  font-size: 0.75rem;
  color: rgba(90, 60, 40, 0.15);
}

.btn-primary-mocca {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-primary-mocca:hover {
  background-color: #55331C;
  transform: translateY(-1px);
}

/* ================= TAB CONTENT 3: PESANAN SAYA ================= */
.pesanan-tab-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.order-scrapbook-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(90, 60, 40, 0.08);
  padding-bottom: 0.75rem;
}

.order-meta-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.order-id {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
}

.order-date {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.order-status-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.order-status-badge.shipping {
  background-color: #FAF0E2;
  color: #C08A3E;
  border: 1px solid rgba(192, 138, 62, 0.15);
}

.order-status-badge.completed {
  background-color: #EBF7EE;
  color: #2E7D32;
  border: 1px solid rgba(46, 125, 50, 0.15);
}

.order-item-detail {
  display: flex;
  gap: 0.85rem;
  align-items: center;
}

.item-thumb-mini {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--color-mocca-border);
  background-color: #FAF8F5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-thumb-mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-text-mini {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.item-name-mini {
  font-size: 0.82rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.item-options-mini {
  font-size: 0.7rem;
  color: var(--color-mocca-muted);
}

.item-qty-mini {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
}

.order-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(90, 60, 40, 0.06);
  padding-top: 0.85rem;
  margin-top: 0.25rem;
}

.price-summary-mini {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total-label-mini {
  font-size: 0.75rem;
  color: var(--color-mocca-muted);
}

.total-price-mini {
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
}

.btn-order-detail {
  background-color: #8C7355;
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-order-detail:hover {
  background-color: var(--color-mocca-dark);
}

.btn-order-detail-secondary {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-order-detail-secondary:hover {
  background-color: #FAF8F5;
  border-color: var(--color-mocca-dark);
}

/* ================= TAB CONTENT 4: PEMBAYARAN ================= */
.pembayaran-tab-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.payments-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.payment-method-box {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.payment-method-box:hover {
  box-shadow: 0 3px 10px rgba(59, 35, 20, 0.02);
}

.payment-method-box.linked {
  background-color: #FAFBF9;
}

.pm-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pm-badge-bca {
  background-color: #E2ECF7;
  color: #0E5CA9;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
}

.pm-badge-gopay {
  background-color: #E6F3F9;
  color: #0081A7;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
}

.pm-badge-card {
  background-color: #FAF4EB;
  color: #8C7355;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
}

.pm-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.pm-name {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.pm-details {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
  margin: 0;
}

.pm-status-connected {
  font-size: 0.75rem;
  color: #2E7D32;
  font-weight: 600;
}

.pm-btn-disconnect {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: #C05646;
  cursor: pointer;
}

.pm-btn-disconnect:hover {
  text-decoration: underline;
}

.btn-add-payment-method {
  background-color: #FFFFFF;
  border: 1px dashed var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  text-align: center;
}

.btn-add-payment-method:hover {
  background-color: #FAF8F5;
  border-style: solid;
  border-color: var(--color-mocca-dark);
}

/* ================= TAB CONTENT 5: REKENING BANK ================= */
.rekening-tab-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.vintage-bank-card-container {
  max-width: 360px;
  width: 100%;
}

.bank-card-inner {
  background: linear-gradient(135deg, #513629 0%, #3B2314 100%);
  color: #FCF9F5;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(59, 35, 20, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
}

.bank-card-inner::after {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  pointer-events: none;
}

.bank-card-logo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-bank-name {
  font-size: 1.35rem;
  letter-spacing: 0.05em;
  font-style: italic;
}

.card-bank-type {
  background-color: rgba(255, 255, 255, 0.15);
  color: #FDFBF8;
  font-size: 0.62rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.bank-card-number-row {
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  font-family: monospace;
}

.bank-card-holder-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.card-holder-label {
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  color: #B29B8E;
}

.card-holder-name {
  font-size: 0.88rem;
  letter-spacing: 0.05em;
}

.bank-action-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}

.btn-edit-bank {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit-bank:hover {
  background-color: #FAF8F5;
  border-color: var(--color-mocca-dark);
}

.btn-add-bank-secondary {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: #8C7355;
  cursor: pointer;
}

.btn-add-bank-secondary:hover {
  text-decoration: underline;
}

/* ================= TAB CONTENT 6: NOTIFIKASI ================= */
.notifikasi-tab-layout {
  display: flex;
  flex-direction: column;
}

.notification-settings-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-bottom: 1px solid rgba(90, 60, 40, 0.06);
  padding-bottom: 1.5rem;
}

.notif-option-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px dotted rgba(90, 60, 40, 0.06);
}

.notif-option-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.notif-text-side {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  max-width: 500px;
}

.notif-option-title {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.notif-option-desc {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
  margin: 0;
  line-height: 1.5;
}

/* Custom Vintage Toggle Switch */
.vintage-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  flex-shrink: 0;
}

.vintage-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E2DFD8;
  transition: .3s;
  border-radius: 34px;
  border: 1px solid rgba(90, 60, 40, 0.1);
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: #FFFFFF;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(59, 35, 20, 0.1);
}

.vintage-switch input:checked + .switch-slider {
  background-color: #8C7355; /* Warm mocca switch coloring */
}

.vintage-switch input:checked + .switch-slider:before {
  transform: translateX(22px);
}

/* ================= TAB CONTENT 7: MODE TAMPILAN ================= */
.theme-palette-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

.theme-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.theme-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.03);
  border-color: var(--color-mocca-dark);
}

.theme-card.active-theme {
  border-color: #8C7355;
  box-shadow: 0 4px 15px rgba(140, 115, 85, 0.06);
  background-color: #FCFAF7;
}

.theme-preview-box {
  height: 100px;
  border-radius: 6px;
  border: 1px solid rgba(90, 60, 40, 0.08);
  margin-bottom: 0.85rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.theme-preview-box.cream-theme {
  background-color: #F5F2ED;
}
.theme-preview-box.cream-theme .preview-header {
  background-color: #FFFFFF;
  height: 24px;
  border-bottom: 1px solid rgba(90, 60, 40, 0.06);
}

.theme-preview-box.sepia-theme {
  background-color: #E2DCD0;
}
.theme-preview-box.sepia-theme .preview-header {
  background-color: #ECE5DA;
  height: 24px;
}

.theme-preview-box.cocoa-theme {
  background-color: #4A3525;
}
.theme-preview-box.cocoa-theme .preview-header {
  background-color: #382518;
  height: 24px;
}

.theme-name {
  font-size: 0.8rem;
  color: var(--color-mocca-dark);
  margin-bottom: 0.15rem;
}

.theme-desc {
  font-size: 0.65rem;
  color: var(--color-mocca-muted);
  line-height: 1.4;
}

/* ================= TAB CONTENT 8: KEAMANAN ================= */
.security-sections-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sec-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(90, 60, 40, 0.06);
}

.sec-item-row:last-child {
  border-bottom: none;
}

.sec-text-side {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  max-width: 520px;
}

.sec-item-title {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.sec-item-desc {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
  margin: 0;
  line-height: 1.5;
}

.btn-outline-mocca-small {
  background-color: #FFFFFF;
  border: 1px solid var(--color-mocca-border);
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-outline-mocca-small:hover {
  background-color: #FAF8F5;
  border-color: var(--color-mocca-dark);
}

/* ================= TAB CONTENT 9: REWARDS PROGRAM ================= */
.rewards-tab-layout-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.points-card-large {
  background-color: #FAF6F0;
  border: 1px solid rgba(140, 115, 85, 0.15);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.points-label-large {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-mocca-muted);
}

.points-val-large {
  font-size: 2.25rem;
  color: #8C7355;
  letter-spacing: 0.02em;
}

.points-sub-large {
  font-size: 0.72rem;
  color: var(--color-mocca-muted);
}

.rewards-tiers-info {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.08);
  border-radius: 10px;
  padding: 1.25rem;
}

.tier-title {
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  margin: 0 0 0.5rem 0;
}

.tier-desc {
  font-size: 0.78rem;
  color: var(--color-mocca-muted);
  line-height: 1.6;
  margin: 0;
}

/* ================= MODAL DIALOGS STYLE ================= */
.profile-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(59, 35, 20, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.profile-modal-container {
  background-color: #FFFFFF;
  border: 1.5px solid var(--color-mocca-dark);
  border-radius: 12px;
  width: 90%;
  max-width: 440px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(59, 35, 20, 0.15);
  position: relative;
  animation: modal-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.profile-modal-container.confirmation-modal {
  max-width: 380px;
}

@keyframes modal-slide-in {
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(90, 60, 40, 0.08);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
}

.modal-title {
  font-size: 1.05rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-mocca-muted);
  cursor: pointer;
  padding: 0;
  margin-top: -4px;
}

.modal-body-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Form controls */
.input-group-mocca {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-label {
  font-size: 0.78rem;
  color: var(--color-mocca-dark);
}

.input-field-mocca {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--color-mocca-border);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-mocca-dark);
  outline: none;
  background-color: #FAF8F5;
  transition: border-color 0.2s;
}

.input-field-mocca:focus {
  border-color: var(--color-mocca-dark);
  background-color: #FFFFFF;
}

.select-mocca {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233B2314' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.85rem center;
  background-size: 1rem;
  padding-right: 2.25rem;
}

.modal-footer-row {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(90, 60, 40, 0.06);
  padding-top: 1rem;
}

.btn-cancel-mocca {
  background: none;
  border: 1px solid rgba(90, 60, 40, 0.15);
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.8rem;
  padding: 0.55rem 1.15rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel-mocca:hover {
  background-color: #FAF8F5;
  color: var(--color-mocca-dark);
}

.btn-save-mocca {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  padding: 0.55rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save-mocca:hover {
  background-color: #55331C;
}

.btn-danger-mocca {
  background-color: #D9534F;
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  padding: 0.55rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-danger-mocca:hover {
  background-color: #C9302C;
}

/* ================= TOAST NOTIFICATION STYLING ================= */
.profile-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: var(--color-mocca-dark);
  color: var(--color-bg-light);
  padding: 0.85rem 1.75rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 8px 30px rgba(59, 35, 20, 0.2);
  z-index: 10000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}

.profile-toast.active {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Static rewards card styling */
.rewards-card.static-rewards {
  cursor: default;
}
.rewards-card.static-rewards:hover {
  background-color: #FAF6F0;
  border-color: rgba(140, 115, 85, 0.12);
  box-shadow: none;
}

/* Inline editing styles */
.inline-edit-action-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-save-inline {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save-inline:hover {
  background-color: #55331C;
  transform: translateY(-1px);
}

.btn-cancel-inline {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.15);
  color: var(--color-mocca-muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel-inline:hover {
  background-color: #FAF8F5;
  color: var(--color-mocca-dark);
}

.inline-edit-input {
  max-width: 280px;
  padding: 0.45rem 0.75rem;
  font-size: 0.85rem;
  margin: 0;
}

.full-width-input {
  width: 100%;
}

/* Dynamic Address tab styling */
.address-form-box {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.12);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.02);
}

.form-row-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.textarea-mocca {
  resize: vertical;
  font-family: var(--font-body);
}

.checkbox-group {
  margin-top: 0.5rem;
}

.vintage-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  color: var(--color-mocca-dark);
  user-select: none;
}

.vintage-checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  height: 18px;
  width: 18px;
  background-color: #FFFFFF;
  border: 1.5px solid rgba(90, 60, 40, 0.3);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.vintage-checkbox-label input:checked ~ .checkbox-custom {
  background-color: var(--color-mocca-dark);
  border-color: var(--color-mocca-dark);
}

.checkbox-custom::after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.vintage-checkbox-label input:checked ~ .checkbox-custom::after {
  display: block;
}

.address-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(90, 60, 40, 0.08);
  padding-top: 1.25rem;
}

.text-accent {
  color: #8C7355;
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-body);
  font-size: 0.82rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.text-accent:hover {
  color: #55331C;
}

/* Premium cozy address list tab layouts */
.alamat-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1.5rem;
  border-bottom: 1px solid rgba(90, 60, 40, 0.05);
  padding-bottom: 1.25rem;
}

.header-title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-mocca-dark);
}

.header-loc-pin {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.alamat-tab-title {
  font-size: 1.35rem;
  font-family: var(--font-title);
  margin: 0;
}

.alamat-tab-subtext {
  font-size: 0.88rem;
  color: var(--color-mocca-muted);
  margin: 0.35rem 0 0 0;
}

.btn-tambah-alamat {
  background-color: var(--color-mocca-dark);
  color: #FFFFFF;
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.82rem;
  padding: 0.55rem 1.15rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.12);
  flex-shrink: 0;
}

.btn-tambah-alamat:hover {
  background-color: #55331C;
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(59, 35, 20, 0.18);
}

.btn-plus-icon {
  stroke-width: 2.5;
}

.addresses-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.addr-premium-card {
  background-color: #FFFFFF;
  border: 1px solid rgba(90, 60, 40, 0.07);
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 52px 1fr 100px;
  gap: 1.5rem;
  box-shadow: 0 4px 15px rgba(59, 35, 20, 0.015);
  transition: all 0.25s ease;
}

.addr-premium-card:hover {
  border-color: rgba(90, 60, 40, 0.15);
  box-shadow: 0 8px 25px rgba(59, 35, 20, 0.035);
}

.addr-premium-card.active-utama-card {
  border-color: rgba(140, 115, 85, 0.2);
  box-shadow: 0 8px 25px rgba(140, 115, 85, 0.025);
}

.addr-card-icon-box {
  width: 52px;
  height: 52px;
  background-color: #FAF6F0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.addr-card-center {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.addr-first-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.15rem;
}

.addr-label-bold {
  font-size: 1.12rem;
  color: var(--color-mocca-dark);
  font-family: var(--font-title);
}

.addr-badge-utama-gold {
  background-color: #F8F1E5;
  color: #8C7355;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(140, 115, 85, 0.15);
  line-height: 1;
}

.addr-recipient-inline {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 2.5rem;
}

.recipient-name {
  font-size: 0.9rem;
  color: var(--color-mocca-dark);
}

.recipient-tag-grey {
  background-color: #ECEAE6;
  color: var(--color-mocca-muted);
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.18rem 0.55rem;
  border-radius: 4px;
  line-height: 1;
}

.addr-details-text {
  font-size: 0.88rem;
  color: var(--color-mocca-dark);
  line-height: 1.55;
}

.addr-phone-text {
  font-size: 0.85rem;
  color: var(--color-mocca-muted);
}

.addr-card-right-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-left: 1px solid rgba(90, 60, 40, 0.08);
  padding-left: 1.5rem;
  justify-content: center;
}

.addr-action-row-btn {
  background: none;
  border: none;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-mocca-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.25rem 0;
  transition: all 0.2s ease;
  text-align: left;
}

.addr-action-row-btn:hover {
  color: #55331C;
  transform: translateX(1px);
}

.addr-action-row-btn.delete-action-btn {
  color: var(--color-mocca-muted);
}

.addr-action-row-btn.delete-action-btn:hover:not(.disabled-action) {
  color: #D9534F;
}

.addr-action-row-btn.disabled-action {
  opacity: 0.4;
  cursor: not-allowed;
}

.addr-action-row-btn.set-utama-action-btn {
  color: #8C7355;
  font-size: 0.78rem;
}

.addr-action-row-btn.set-utama-action-btn:hover {
  color: #55331C;
}

.action-svg-icon {
  flex-shrink: 0;
}

/* Bottom Support Banner styling */
.addr-support-banner {
  background-color: #FAF6F0;
  border: 1px solid rgba(140, 115, 85, 0.08);
  border-radius: 12px;
  padding: 1.25rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.banner-left-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.banner-info-icon-box {
  color: var(--color-mocca-dark);
  flex-shrink: 0;
}

.banner-text-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.banner-title {
  font-size: 0.95rem;
  color: var(--color-mocca-dark);
  margin: 0;
}

.banner-subtext {
  font-size: 0.82rem;
  color: var(--color-mocca-muted);
  margin: 0;
}

.btn-hubungi-kami {
  background-color: #FFFFFF;
  color: var(--color-mocca-dark);
  border: 1px solid rgba(90, 60, 40, 0.12);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.82rem;
  padding: 0.55rem 1.15rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(59, 35, 20, 0.03);
  flex-shrink: 0;
}

.btn-hubungi-kami:hover {
  background-color: #FAF8F5;
  border-color: rgba(90, 60, 40, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 35, 20, 0.06);
}

/* ================= RESPONSIVE LAYOUT CONFIGURATIONS ================= */
@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 200px 1fr;
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .profile-page-wrapper {
    padding: 0 1.5rem; /* Match footer's mobile side padding exactly */
    padding-top: 1rem;
    padding-bottom: 5rem;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .profile-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .profile-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .profile-sidebar {
    width: 100%;
    box-sizing: border-box;
    padding: 1.25rem 1rem;
    border-radius: 12px;
  }

  .user-sidebar-header {
    padding-bottom: 1rem;
  }

  .avatar-circle-wrapper {
    width: 84px;
    height: 84px;
    margin-bottom: 0.75rem;
  }

  .user-fullname {
    font-size: 1.15rem;
  }

  .user-email-text {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .rewards-card {
    margin-top: 0.85rem;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
  }

  .rewards-icon-box {
    width: 28px;
    height: 28px;
    border-radius: 6px;
  }

  .rewards-star-icon {
    width: 14px;
    height: 14px;
  }

  .rewards-label {
    font-size: 0.72rem;
  }

  .rewards-points {
    font-size: 0.68rem;
  }

  .settings-panel {
    padding: 1rem;
    border-radius: 12px;
    min-height: auto;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  /* Horizontal swipeable tabs nav bar */
  .tabs-nav-bar {
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid rgba(90, 60, 40, 0.05);
    padding-bottom: 0.5rem;
    margin-bottom: 1.25rem;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .tabs-nav-bar::-webkit-scrollbar {
    display: none;
  }
  
  .tab-nav-btn {
    flex-shrink: 0;
    font-size: 0.8rem;
    padding: 0.25rem 0.35rem;
  }

  .tab-nav-btn.active::after {
    bottom: -0.6rem;
    height: 2px;
  }

  .biodata-tab-layout {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  /* Compact Photo Panel inside tab */
  .profile-photo-panel {
    padding: 1rem;
    border-radius: 10px;
  }

  .photo-title-label {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }

  .photo-avatar-box {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  .btn-change-photo {
    padding: 0.45rem 1rem;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  .photo-requirements-text {
    font-size: 0.62rem;
    margin-top: 0.5rem;
    max-width: 100%;
  }

  .photo-action-buttons {
    margin-top: 1.25rem;
    gap: 0.5rem;
  }

  .photo-action-btn {
    padding: 0.55rem;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  /* Stacking and aligning detail rows cleanly for mobile editing */
  .block-header-row {
    margin-bottom: 1rem;
  }

  .block-title {
    font-size: 0.95rem;
  }

  .btn-edit-block {
    padding: 0.35rem 0.75rem;
    font-size: 0.72rem;
    border-radius: 5px;
  }

  .details-rows {
    gap: 0.85rem;
  }

  .detail-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    align-items: flex-start;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed rgba(90, 60, 40, 0.04);
  }

  .detail-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .detail-label-col {
    font-size: 0.78rem;
    margin-bottom: 0.05rem;
  }

  .detail-val-col {
    font-size: 0.88rem;
    padding-left: 1.65rem;
  }

  .detail-val-col-wrapper {
    padding-left: 1.65rem;
    width: 100%;
  }

  .detail-val-col-wrapper .detail-val-col {
    padding-left: 0;
  }

  .inline-edit-input {
    width: 100%;
    font-size: 0.82rem;
    padding: 0.4rem 0.6rem;
  }

  /* Responsive shipping address card adjustments */
  .alamat-header-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .btn-tambah-alamat {
    width: 100%;
    justify-content: center;
  }

  .addr-premium-card {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .addr-card-right-actions {
    flex-direction: row;
    border-left: none;
    border-top: 1px solid rgba(90, 60, 40, 0.08);
    padding-left: 0;
    padding-top: 1rem;
    justify-content: flex-start;
    gap: 1.25rem;
  }
  
  .addr-recipient-inline {
    margin-left: 0;
    margin-top: 0.25rem;
    width: 100%;
  }

  .addr-first-row {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .addr-support-banner {
    flex-direction: column;
    align-items: stretch;
    gap: 1.25rem;
  }

  .btn-hubungi-kami {
    width: 100%;
    justify-content: center;
  }
}

/* Desktop & Mobile Responsive Utilities */
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
}

/* Sidebar Accordion Styles */
.sidebar-accordion {
  margin-top: 1.25rem;
  border-top: 1.5px dashed rgba(90, 60, 40, 0.08);
  padding-top: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.accordion-header {
  background: none;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 0.5rem;
  color: var(--color-mocca-dark);
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  border-radius: 6px;
}

.accordion-header:hover {
  background-color: rgba(90, 60, 40, 0.03);
}

.accordion-header .chevron-icon {
  transition: transform 0.25s ease;
  color: var(--color-mocca-muted);
}

.accordion-header .chevron-icon.rotate {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0.5rem 0;
}

.accordion-content .photo-action-buttons {
  margin-top: 0.5rem;
}

/* Accordion Transition */
.accordion-slide-enter-active,
.accordion-slide-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.25s ease-out;
  max-height: 250px;
  overflow: hidden;
}
.accordion-slide-enter-from,
.accordion-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
