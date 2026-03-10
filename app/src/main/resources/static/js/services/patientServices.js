// patientServices.js
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

// For creating a patient in db
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }

    return {
      success: true,
      message: result.message || "Signup successful"
    };
  } catch (error) {
    console.error("Error :: patientSignup ::", error);
    return {
      success: false,
      message: error.message
    };
  }
}

// For logging in patient
export async function patientLogin(data) {
  return await fetch(`${PATIENT_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// For getting patient data (name ,id , etc ). Used in booking appointments
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`);
    const data = await response.json();

    if (response.ok) return data.patient;
    return null;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
}

// Backend API for fetching patient record / appointments
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
    const data = await response.json();

    if (response.ok) {
      return data.appointments || [];
    }
    return null;
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return null;
  }
}

export async function filterAppointments(condition, name, token) {
  try {
    const safeCondition = condition ?? "null";
    const safeName = name ?? "null";

    const response = await fetch(
      `${PATIENT_API}/filter/${safeCondition}/${safeName}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch appointments:", response.statusText);
      return { appointments: [] };
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
    return { appointments: [] };
  }
}