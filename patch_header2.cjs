const fs = require('fs');

let content = fs.readFileSync('src/components/Header.vue', 'utf8');

// The replacement code we previously placed:
const oldFunc = `const isUserCreator = computed(() => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decoded = parseJwt(token);
  return decoded && (decoded.role === 'creator' || decoded.is_creator === true || decoded.role_id === 2);
});`;

const newFunc = `const isUserCreator = computed(() => {
  return localStorage.getItem('is_creator') === 'true';
});`;

content = content.replace(oldFunc, newFunc);

fs.writeFileSync('src/components/Header.vue', content);
console.log('Done replacing isUserCreator');
