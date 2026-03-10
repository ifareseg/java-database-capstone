import { getPatientAppointments } from "./services/patientServices.js";

const tableBody = document.getElementById("patientTableBody");

const token = localStorage.getItem("token");

const filterSelect = document.getElementById("appointmentFilter");

let patientId = null;

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "/";
    return;
  }

  try {

    const urlParams = new URLSearchParams(window.location.search);
    patientId = urlParams.get("id");

    if (!patientId) {
      tableBody.innerHTML =
        `<tr><td colspan="5">Invalid patient.</td></tr>`;
      return;
    }

    const appointments = await getPatientAppointments(patientId, token, "patient");

    renderAppointments(appointments || []);

  } catch (error) {

    console.error("Error loading appointments:", error);

    tableBody.innerHTML =
      `<tr><td colspan="5">Failed to load appointments.</td></tr>`;

  }

}

function renderAppointments(appointments) {

  tableBody.innerHTML = "";

  if (!appointments.length) {

    tableBody.innerHTML =
      `<tr><td colspan="5">No appointments found.</td></tr>`;

    return;
  }

  appointments.forEach((appointment) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${appointment.patientName || ""}</td>
      <td>${appointment.doctorName || ""}</td>
      <td>${appointment.appointmentDate || ""}</td>
      <td>${appointment.appointmentTimeOnly || ""}</td>
      <td>
        ${
          appointment.status == 0
            ? `<img src="../assets/images/edit/edit.png"
                   class="edit-btn"
                   data-id="${appointment.id}" />`
            : "-"
        }
      </td>
    `;

    const editBtn = tr.querySelector(".edit-btn");

    if (editBtn) {

      editBtn.addEventListener("click", () => {

        const query = new URLSearchParams({
          appointmentId: appointment.id,
          patientId: appointment.patientId,
          patientName: appointment.patientName,
          doctorName: appointment.doctorName,
          doctorId: appointment.doctorId,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTimeOnly
        }).toString();

        window.location.href = `/pages/updateAppointment.html?${query}`;

      });

    }

    tableBody.appendChild(tr);

  });

}

filterSelect?.addEventListener("change", (e) => {

  const value = e.target.value;

  if (value === "allAppointments") {
    initializePage();
  }

});