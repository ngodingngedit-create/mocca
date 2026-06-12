const fs = require('fs');

let content = fs.readFileSync('src/components/Header.vue', 'utf8');

// Replace openProfileToast definition
const target = `const openProfileToast = () => {
  if (isLoggedIn.value) {
    currentPage.value = 'profile';
  } else {
    currentPage.value = 'login';
  }
};`;

const replacement = `const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const isProfileDropdownOpen = ref(false);

const isUserCreator = computed(() => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decoded = parseJwt(token);
  return decoded && (decoded.role === 'creator' || decoded.is_creator === true || decoded.role_id === 2);
});

const handleProfileClick = () => {
  if (isLoggedIn.value) {
    if (currentPage.value === 'dashboard-user') {
      isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
      isLangDropdownOpen.value = false;
      isSearchOpen.value = false;
    } else {
      currentPage.value = 'dashboard-user';
      isProfileDropdownOpen.value = false;
    }
  } else {
    currentPage.value = 'login';
  }
};

const openProfileToast = handleProfileClick;

const switchToCreatorProfile = () => {
  currentPage.value = 'profile';
  isProfileDropdownOpen.value = false;
};

const handleLogout = () => {
  isProfileDropdownOpen.value = false;
  triggerToast(currentLang.value === 'id' ? 'Berhasil keluar. Mengarahkan...' : 'Logout successful. Redirecting...');
  isLoggedIn.value = false;
  localStorage.removeItem('token');
  setTimeout(() => {
    currentPage.value = 'home';
  }, 1200);
};`;

const pattern = new RegExp(target.replace(/\r?\n/g, '\\r?\\n').replace(/\(/g, '\\(').replace(/\)/g, '\\)'), 'g');
content = content.replace(pattern, replacement);

fs.writeFileSync('src/components/Header.vue', content);
console.log('Done replacing script');
