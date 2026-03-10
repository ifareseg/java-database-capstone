import { savePrescription, getPrescription } from "./services/prescriptionServices.js";

const token = localStorage.getItem("token");

const urlParams = new URLSearchParams(window.location.search);

const appointmentId = urlParams.get("appointmentId");
const patientName = urlParams.get("patientName");

const patientNameInput = document.getElementById("patientName");
const diagnosisInput = document.getElementById("diagnosis");
const medicinesInput = document.getElementById("medicines");
const notesInput = document.getElementById("notes");

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {

  if (!token) {
    alert("Session expired. Please login again.");
    window.location.href = "/";
    return;
  }

  if (!appointmentId) {
    alert("Invalid appointment.");
    return;
  }

  if (patientNameInput) {
    patientNameInput.value = patientName || "Patient";
  }

  try {

    const existingPrescription = await getPrescription(appointmentId, token);

    if (existingPrescription) {

      patientNameInput.value = existingPrescription.patientName || patientName || "Patient";
      diagnosisInput.value = existingPrescription.diagnosis || "";
      medicinesInput.value = existingPrescription.medicines || "";
      notesInput.value = existingPrescription.notes || "";

      diagnosisInput.disabled = true;
      medicinesInput.disabled = true;
      notesInput.disabled = true;

      const saveBtn = document.getElementById("savePrescriptionBtn");
      if (saveBtn) {
        saveBtn.style.display = "none";
      }

    }

  } catch (error) {

    console.log("No existing prescription found.");

  }

}

window.savePrescriptionHandler = async function () {

  const diagnosis = diagnosisInput.value.trim();
  const medicines = medicinesInput.value.trim();
  const notes = notesInput.value.trim();

  if (!diagnosis || !medicines) {
    alert("Please fill required fields.");
    return;
  }

  const prescription = {
    appointmentId: appointmentId,
    diagnosis: diagnosis,
    medicines: medicines,
    notes: notes
  };

  try {

    const response = await savePrescription(prescription, token);

    if (response.success) {

      alert("Prescription saved successfully.");

      window.location.href = "/pages/doctorDashboard.html";

    } else {

      alert(response.message || "Failed to save prescription.");

    }

  } catch (error) {

    console.error("Error saving prescription:", error);
    alert("Something went wrong.");

  }

};