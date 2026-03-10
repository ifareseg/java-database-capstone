import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { openModal } from "./components/modals.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { patientSignup, patientLogin } from "./services/patientServices.js";

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
}

async function filterDoctorsOnChange() {
  try {
    const searchBar = document.getElementById("searchBar")?.value.trim() || "";
    const filterTime = document.getElementById("filterTime")?.value || "";
    const filterSpecialty = document.getElementById("filterSpecialty")?.value || "";

    const name = searchBar || null;
    const time = filterTime || null;
    const specialty = filterSpecialty || null;

    const response = await filterDoctors(name, time, specialty);
    const doctors = response?.doctors || [];
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to filter doctors:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

window.signupPatient = async function () {
  try {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);

    if (success) {
      alert(message || "Signup successful");
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

window.loginPatient = async function () {
  try {
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    const data = { email, password };
    const response = await patientLogin(data);

    if (response.ok) {
      const result = await response.json();
      selectRole("loggedPatient");
      localStorage.setItem("token", result.token);
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("❌ Invalid credentials!");
    }
  } catch (error) {
    console.error("loginPatient error:", error);
    alert("❌ Failed to login.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  document.getElementById("patientSignup")?.addEventListener("click", () => {
    openModal("patientSignup");
  });

  document.getElementById("patientLogin")?.addEventListener("click", () => {
    openModal("patientLogin");
  });

  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

export { renderDoctorCards };