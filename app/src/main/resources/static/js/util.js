// util.js
  // util.js
function setRole(role) {
  localStorage.setItem("userRole", role);
}

function getRole() {
  return localStorage.getItem("userRole");
}

function clearRole() {
  localStorage.removeItem("userRole");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function clearToken() {
  localStorage.removeItem("token");
}

function logoutUser() {
  clearToken();
  clearRole();
  window.location.href = "/";
}

window.setRole = setRole;
window.getRole = getRole;
window.clearRole = clearRole;
window.setToken = setToken;
window.getToken = getToken;
window.clearToken = clearToken;
window.logoutUser = logoutUser;