// adminDashboard.js
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

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
    const contentDiv = document.getElementById("content");
    if (contentDiv) {
      contentDiv.innerHTML = "<p>Failed to load doctors.</p>";
    }
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

window.adminAddDoctor = async function () {
  try {
    const name = document.getElementById("doctorName")?.value.trim();
    const specialty = document.getElementById("specialization")?.value.trim();
    const email = document.getElementById("doctorEmail")?.value.trim();
    const password = document.getElementById("doctorPassword")?.value.trim();
    const phone = document.getElementById("doctorPhone")?.value.trim();
    const checkboxes = document.querySelectorAll('input[name="availability"]:checked');
    const availableTimes = Array.from(checkboxes).map((cb) => cb.value);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Token expired or not found. Please log in again.");
      return;
    }

    const doctor = { name, specialty, email, password, phone, availableTimes };
    const { success, message } = await saveDoctor(doctor, token);

    if (success) {
      alert(message || "Doctor added successfully.");
      const modal = document.getElementById("modal");
      if (modal) modal.style.display = "none";
      await loadDoctorCards();
    } else {
      alert("❌ Error: " + (message || "Unable to save doctor"));
    }
  } catch (error) {
    console.error("adminAddDoctor error:", error);
    alert("❌ Failed to add doctor.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  document.getElementById("addDocBtn")?.addEventListener("click", () => {
    openModal("addDoctor");
  });

  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

export { loadDoctorCards, renderDoctorCards };