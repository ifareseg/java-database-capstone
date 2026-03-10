// header.js
// header.js
function getLogoPath() {
  const path = window.location.pathname;
  if (path === "/" || path.endsWith("/index.html")) {
    return "./assets/images/logo/logo.png";
  }
  if (path.includes("/pages/")) {
    return "../assets/images/logo/logo.png";
  }
  return "/assets/images/logo/logo.png";
}

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/index.html");

  if (isHomePage) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");

    headerDiv.innerHTML = `
      <header class="header">
        <a href="/" class="logo-link" style="text-decoration: none;">
          <div class="logo-section">
            <img src="${getLogoPath()}" alt="Hospital CMS Logo" class="logo-img">
            <span class="logo-title">Hospital CMS</span>
          </div>
        </a>
      </header>
    `;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  let headerContent = `
    <header class="header">
      <a href="/" class="logo-link" style="text-decoration: none;">
        <div class="logo-section">
          <img src="${getLogoPath()}" alt="Hospital CMS Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </a>
      <nav class="nav-links">
  `;

  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn">Add Doctor</button>
      <a href="#" id="logoutLink">Logout</a>
    `;
  } else if (role === "doctor") {
    headerContent += `
      <button id="doctorHomeBtn" class="adminBtn">Home</button>
      <a href="#" id="logoutLink">Logout</a>
    `;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>
    `;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn">Home</button>
      <button id="patientAppointments" class="adminBtn">Appointments</button>
      <a href="#" id="logoutPatientLink">Logout</a>
    `;
  }

  headerContent += `
      </nav>
    </header>
  `;

  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  document.getElementById("addDocBtn")?.addEventListener("click", () => {
    if (window.openModal) {
      window.openModal("addDoctor");
    }
  });

  document.getElementById("doctorHomeBtn")?.addEventListener("click", () => {
    if (window.selectRole) {
      window.selectRole("doctor");
    }
  });

  document.getElementById("patientLogin")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    if (window.openModal) {
      window.openModal("patientLogin");
    }
  });

  document.getElementById("patientSignup")?.addEventListener("click", () => {
    if (window.openModal) {
      window.openModal("patientSignup");
    }
  });

  document.getElementById("home")?.addEventListener("click", () => {
    window.location.href = "/pages/loggedPatientDashboard.html";
  });

  document.getElementById("patientAppointments")?.addEventListener("click", () => {
    window.location.href = "/pages/patientAppointments.html";
  });

  document.getElementById("logoutLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  document.getElementById("logoutPatientLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    logoutPatient();
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

window.logout = logout;
window.logoutPatient = logoutPatient;
window.renderHeader = renderHeader;

document.addEventListener("DOMContentLoaded", renderHeader);