import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0];
let token = localStorage.getItem("token");
let patientName = null;

async function loadAppointments() {
  if (!tableBody) return;

  try {
    const response = await getAllAppointments(selectedDate, patientName, token);
    const appointments = response?.appointments || [];

    tableBody.innerHTML = "";

    if (appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5">No Appointments found for today.</td></tr>`;
      return;
    }

    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail
      };

      const row = createPatientRow(patient, appointment.id, appointment.doctorId);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    tableBody.innerHTML = `<tr><td colspan="5">Error loading appointments. Try again later.</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderContent();

  document.getElementById("searchBar")?.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    patientName = value.length > 0 ? value : "null";
    loadAppointments();
  });

  document.getElementById("todayButton")?.addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];
    const datePicker = document.getElementById("datePicker");
    if (datePicker) datePicker.value = selectedDate;
    loadAppointments();
  });

  document.getElementById("datePicker")?.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    loadAppointments();
  });

  const datePicker = document.getElementById("datePicker");
  if (datePicker && !datePicker.value) {
    datePicker.value = selectedDate;
  }

  loadAppointments();
});