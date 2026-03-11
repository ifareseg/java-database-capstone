# java-database-capstone
# Clinic Management System – Database Capstone

This project is part of the **IBM Java Database Capstone Lab**.

The goal of the lab is to design and implement a backend data model for a **Clinic Management System** using both relational and document databases.

---

# Technologies Used

- Java
- Spring Boot
- JPA / Hibernate
- MySQL
- MongoDB
- Maven

---

# Project Structure

The system contains the following core entities:

### MySQL (Relational Database)

Tables created:

- Admin
- Doctor
- Patient
- Appointment
- Doctor_Available_Times

These tables represent the relational data model for managing users and appointments.

---

### MongoDB (Document Database)

Collection:

- prescriptions

MongoDB is used to store prescription documents issued during appointments.

Example document:

```json
{
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours."
}