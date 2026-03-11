Clinic Management System – Java Database Capstone
Project Overview

The Clinic Management System is a full-stack application developed as part of the Java Database Capstone Project.
It manages clinic operations including:

Doctor management

Patient registration and login

Appointment booking and tracking

Prescription management

Role-based dashboards for Admin, Doctor, and Patient

The system integrates:

Spring Boot backend

MySQL relational database

MongoDB for prescriptions

Vanilla JavaScript frontend

Thymeleaf templates

Docker containerization

GitHub Actions CI pipeline

Architecture

The application follows a layered architecture:

Frontend
   │
   ▼
Controllers (REST + MVC)
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Database
Technologies Used
Backend

Java 21

Spring Boot

Spring Data JPA

Spring Web

Spring Validation

Thymeleaf

Databases

MySQL

MongoDB

Frontend

HTML

CSS

JavaScript

DevOps

Docker

GitHub Actions

Maven

Project Structure
java-database-capstone
│
├── app
│   ├── src/main/java/com/project/back_end
│   │
│   ├── config
│   │   └── WebConfig.java
│   │
│   ├── controllers
│   │   ├── AdminController.java
│   │   ├── DoctorController.java
│   │   ├── PatientController.java
│   │   ├── AppointmentController.java
│   │   └── PrescriptionController.java
│   │
│   ├── mvc
│   │   └── DashboardController.java
│   │
│   ├── DTO
│   │   ├── Login.java
│   │   └── AppointmentDTO.java
│   │
│   ├── models
│   │   ├── Admin.java
│   │   ├── Doctor.java
│   │   ├── Patient.java
│   │   ├── Appointment.java
│   │   └── Prescription.java
│   │
│   ├── repo
│   │   ├── AdminRepository.java
│   │   ├── DoctorRepository.java
│   │   ├── PatientRepository.java
│   │   ├── AppointmentRepository.java
│   │   └── PrescriptionRepository.java
│   │
│   ├── services
│   │   ├── Service.java
│   │   ├── DoctorService.java
│   │   ├── PatientService.java
│   │   ├── AppointmentService.java
│   │   └── PrescriptionService.java
│   │
│   └── BackEndApplication.java
│
├── src/main/resources
│
├── static
│   ├── index.html
│   ├── pages
│   ├── assets/css
│   └── js
│
├── templates
│   ├── admin
│   │   └── adminDashboard.html
│   └── doctor
│       └── doctorDashboard.html
│
├── mysql-script.sql
├── mongo-script.js
├── stored-procedures.sql
├── schema-design.md
├── user_stories.md
├── Dockerfile
└── README.md
Features
Admin

Login authentication

Add doctors

Update doctor profiles

Delete doctors

Filter doctors by specialty and availability

Doctor

Login authentication

View patient appointments

Filter appointments by patient name

Add prescriptions

View prescriptions

Patient

Register account

Login

View available doctors

Book appointments

View upcoming and completed appointments

Database Design
MySQL Tables
admin
doctor
doctor_available_times
patient
appointment
Relationships
Doctor 1 ──── * Appointment * ──── 1 Patient
Appointment 1 ──── 1 Prescription
MongoDB Collection
prescriptions

Example document:

{
 "appointmentId": 10,
 "diagnosis": "Flu",
 "medication": "Paracetamol",
 "notes": "Rest and hydration"
}
Stored Procedures
Daily Appointment Report
GetDailyAppointmentReportByDoctor

Generates a daily report listing appointments grouped by doctor.

Doctor with Most Patients (Monthly)
GetDoctorWithMostPatientsByMonth

Returns the doctor who saw the most patients in a given month.

Doctor with Most Patients (Yearly)
GetDoctorWithMostPatientsByYear

Returns the doctor who treated the most patients in a year.

Running the Application
1 Clone the repository
git clone https://github.com/ifareseg/java-database-capstone.git
cd java-database-capstone
2 Start MySQL and MongoDB

Example using Docker:

docker run -d -p 3306:3306 mysql
docker run -d -p 27017:27017 mongo
3 Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/cms
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.data.mongodb.uri=mongodb://localhost:27017/prescriptions
4 Run the Spring Boot application
cd app
mvn spring-boot:run
5 Open the application
http://localhost:8080
CI Pipeline

GitHub Actions automatically compiles the backend when code is pushed.

Workflow file:

.github/workflows/compile-backend.yml

It performs:

Checkout repository

Install Java 21

Compile project with Maven

Docker

Build the backend container:

docker build -t clinic-system .

Run container:

docker run -p 8080:8080 clinic-system
Future Improvements

JWT authentication

Role-based security with Spring Security

React frontend

Notification system

Appointment reminders

Author

Capstone Project
Java Database Development Specialization
