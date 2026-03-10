import { getPatientAppointments, getPatientData, filterAppointments } from "./services/patientServices.js";

const tableBody = document.getElementById("patientTableBody");
const token = localStorage.getItem("token");

let patientId = null;

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  try {
    if (!token) throw new Error("No token found");

    const patient = await getPatientData(token);
    if (!patient) throw new Error("Failed to fetch patient details");

    patientId = Number(patient.id);

    const appointmentData = await getPatientAppointments(patientId, token, "patient");
    const allAppointments = (appointmentData || []).filter((app) => app.patientId === patientId);

    renderAppointments(allAppointments);
  } catch (error) {
    console.error("Error loading appointments:", error);
    alert("❌ Failed to load your appointments.");
  }
}

function renderAppointments(appointments) {
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (!appointments.length) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No Appointments Found</td></tr>`;
    return;
  }

  appointments.forEach((appointment) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${appointment.patientName || "You"}</td>
      <td>${appointment.doctorName || ""}</td>
      <td>${appointment.appointmentDate || ""}</td>
      <td>${appointment.appointmentTimeOnly || ""}</td>
      <td>
        ${
          appointment.status == 0
            ? `<img src="../assets/images/edit/edit.png" alt="Edit" class="prescription-btn" data-id="${appointment.id}">`
            : "-"
        }
      </td>
    `;

    if (appointment.status == 0) {
      const actionBtn = tr.querySelector(".prescription-btn");
      actionBtn?.addEventListener("click", () => redirectToUpdatePage(appointment));
    }

    tableBody.appendChild(tr);
  });
}

function redirectToUpdatePage(appointment) {
  const queryString = new URLSearchParams({
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    patientName: appointment.patientName || "You",
    doctorName: appointment.doctorName,
    doctorId: appointment.doctorId,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTimeOnly
  }).toString();

  window.location.href = `/pages/updateAppointment.html?${queryString}`;
}

async function handleFilterChange() {
  const searchBarValue = document.getElementById("searchBar")?.value.trim() || "";
  const filterValue = document.getElementById("appointmentFilter")?.value || "allAppointments";

  const name = searchBarValue || null;
  const condition = filterValue === "allAppointments" ? null : filterValue;

  try {
    const response = await filterAppointments(condition, name, token);
    const appointments = response?.appointments || [];
    const filteredAppointments = appointments.filter((app) => app.patientId === patientId);
    renderAppointments(filteredAppointments);
  } catch (error) {
    console.error("Failed to filter appointments:", error);
    alert("❌ An error occurred while filtering appointments.");
  }
}

document.getElementById("searchBar")?.addEventListener("input", handleFilterChange);
document.getElementById("appointmentFilter")?.addEventListener("change", handleFilterChange);