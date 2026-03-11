# Smart Clinic Management System – Database Design

This document describes the database design for the Smart Clinic Management System using both relational and NoSQL databases.

---

# MySQL Database Design

The relational database (MySQL) stores structured and relational data such as doctors, patients, and appointments.

---

## Table: admin

- id: INT, Primary Key, Auto Increment
- username: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null

Purpose: Stores system administrator credentials.

---

## Table: doctor

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(100), Not Null
- specialty: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null
- phone: VARCHAR(20), Not Null

Purpose: Stores doctor profiles and contact details.

---

## Table: patient

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(100), Not Null
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null
- phone: VARCHAR(20), Not Null
- address: VARCHAR(255)

Purpose: Stores patient personal information.

---

## Table: appointment

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctor(id)
- patient_id: INT, Foreign Key → patient(id)
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)

Purpose: Stores scheduled appointments between doctors and patients.

---

## Table: doctor_available_times

- doctor_id: INT, Foreign Key → doctor(id)
- available_times: VARCHAR(50)

Purpose: Stores doctor availability time slots.

---

# MongoDB Collection Design

MongoDB is used for flexible document-based data such as prescriptions.

---

## Collection: prescriptions

Example document:

```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens",
    "location": "Market Street"
  }
}