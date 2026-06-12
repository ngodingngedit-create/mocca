const fs = require('fs');

let content = fs.readFileSync('src/components/Header.vue', 'utf8');

const regex = /\\s*<!-- Profile Icon \\(Placed on the far right\\) -->\\s*<button class="action-btn" :class="\\{ 'profile-active': currentPage === 'profile' \\}" aria-label="Profile" @click="openProfileToast">\\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\\s*<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"><\\/path>\\s*<circle cx="12" cy="7" r="4"><\\/circle>\\s*<\\/svg>\\s*<\\/button>/m;

const newCode = `        <!-- Profile Icon (Placed on the far right) -->
        <div class="profile-switcher-container mobile-hidden" style="position: relative;">
          <button class="action-btn" :class="{ 'profile-active': currentPage === 'profile' || currentPage === 'dashboard-user' }" aria-label="Profile" @click="handleProfileClick">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          <Transition name="lang-accordion">
            <div v-if="isProfileDropdownOpen" class="lang-dropdown-card" style="width: 220px; right: 0;">
              <div class="lang-options-list">
                <button v-if="isUserCreator" class="lang-option-item" @click="switchToCreatorProfile">
                  <span class="flag-wrapper" style="border: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </span>
                  <span class="lang-name">{{ currentLang === 'id' ? 'Beralih ke Profil Creator' : 'Switch to Creator Profile' }}</span>
                </button>
                <button class="lang-option-item" @click="handleLogout" style="color: #D32F2F;">
                  <span class="flag-wrapper" style="border: none; color: #D32F2F;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                  <span class="lang-name">{{ currentLang === 'id' ? 'Keluar' : 'Logout' }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>`;

if (regex.test(content)) {
  content = content.replace(regex, '\\n' + newCode);
  fs.writeFileSync('src/components/Header.vue', content);
  console.log('Replaced');
} else {
  console.log('Not found');
}
