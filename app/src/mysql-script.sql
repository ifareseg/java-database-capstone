
-- Create database
CREATE DATABASE IF NOT EXISTS cms;

USE cms;

-- Admin table
CREATE TABLE admin (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(255) NOT NULL
);

-- Doctor table
CREATE TABLE doctor (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
password VARCHAR(255),
phone VARCHAR(20),
specialty VARCHAR(100)
);

-- Patient table
CREATE TABLE patient (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
password VARCHAR(255),
phone VARCHAR(20),
address VARCHAR(255)
);

-- Appointment table
CREATE TABLE appointment (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
appointment_time DATETIME,
status INT,
doctor_id BIGINT,
patient_id BIGINT,
FOREIGN KEY (doctor_id) REFERENCES doctor(id),
FOREIGN KEY (patient_id) REFERENCES patient(id)
);

-- Doctor availability
CREATE TABLE doctor_available_times (
doctor_id BIGINT,
available_times VARCHAR(50),
FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- Insert Doctors
INSERT INTO doctor (name,email,password,phone,specialty) VALUES
('Dr. Emily Adams','dr.adams@example.com','pass12345','555-101-2020','Cardiologist'),
('Dr. Mark Johnson','dr.johnson@example.com','secure4567','555-202-3030','Neurologist'),
('Dr. Sarah Lee','dr.lee@example.com','leePass987','555-303-4040','Orthopedist'),
('Dr. Tom Wilson','dr.wilson@example.com','w!ls0nPwd','555-404-5050','Pediatrician'),
('Dr. Alice Brown','dr.brown@example.com','brownie123','555-505-6060','Dermatologist');

-- Insert Doctor Availability
INSERT INTO doctor_available_times (doctor_id,available_times) VALUES
(1,'09:00-10:00'),
(1,'10:00-11:00'),
(1,'11:00-12:00'),
(1,'14:00-15:00'),
(2,'10:00-11:00'),
(2,'11:00-12:00'),
(2,'14:00-15:00'),
(2,'15:00-16:00'),
(3,'09:00-10:00'),
(3,'11:00-12:00'),
(3,'14:00-15:00'),
(3,'16:00-17:00');

-- Insert Patients
INSERT INTO patient (address,email,name,password,phone) VALUES
('101 Oak St','jane.doe@example.com','Jane Doe','passJane1','888-111-1111'),
('202 Maple Rd','john.smith@example.com','John Smith','smithSecure','888-222-2222'),
('303 Pine Ave','emily.rose@example.com','Emily Rose','emilyPass99','888-333-3333'),
('404 Birch Ln','michael.j@example.com','Michael Jordan','airmj23','888-444-4444'),
('505 Cedar Blvd','olivia.m@example.com','Olivia Moon','moonshine12','888-555-5555');

-- Insert Appointments
INSERT INTO appointment (appointment_time,status,doctor_id,patient_id) VALUES
('2025-05-01 09:00:00',0,1,1),
('2025-05-02 10:00:00',0,1,2),
('2025-05-03 11:00:00',0,1,3),
('2025-05-04 14:00:00',0,1,4),
('2025-05-05 15:00:00',0,1,5);

-- Insert Admin
INSERT INTO admin (username,password)
VALUES ('admin','admin@1234');