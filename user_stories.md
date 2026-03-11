# User Stories – Smart Clinic Management System

This document defines the user stories for the Smart Clinic portal.  
The system supports three primary roles: Admin, Doctor, and Patient.

---

# User Story Template

**Title:**  
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]  
**Story Points:** [Estimated Effort in Points]

**Notes:**
- [Additional information or edge cases]

---

## Admin User Stories

### Title: Admin Login
_As an admin, I want to log into the portal using my username and password so that I can securely manage the platform._

**Acceptance Criteria**
1. Admin can enter username and password.
2. System validates credentials.
3. Admin is redirected to the admin dashboard after successful login.

**Priority:** High  
**Story Points:** 3

---

### Title: Admin Logout
_As an admin, I want to log out of the portal so that I can protect the system from unauthorized access._

**Acceptance Criteria**
1. Admin can click logout.
2. Session is cleared.
3. Admin is redirected to the homepage.

**Priority:** High  
**Story Points:** 2

---

### Title: Add Doctor
_As an admin, I want to add a doctor profile so that the doctor can start receiving appointments._

**Acceptance Criteria**
1. Admin can enter doctor details.
2. Doctor record is saved in the database.
3. Doctor appears in the doctors list.

**Priority:** High  
**Story Points:** 5

---

### Title: Delete Doctor
_As an admin, I want to remove a doctor from the portal so that outdated or inactive profiles are removed._

**Acceptance Criteria**
1. Admin can select a doctor.
2. Admin confirms deletion.
3. Doctor profile is removed from the system.

**Priority:** Medium  
**Story Points:** 3

---

### Title: View Appointment Statistics
_As an admin, I want to run a stored procedure to view the number of appointments per month so that I can track clinic usage._

**Acceptance Criteria**
1. Admin runs the stored procedure from MySQL CLI.
2. System calculates total appointments per month.
3. Results are displayed correctly.

**Priority:** Medium  
**Story Points:** 3

---

## Patient User Stories

### Title: View Doctors Without Login
_As a patient, I want to view a list of doctors without logging in so that I can explore available options._

**Acceptance Criteria**
1. Patient can access doctor list from homepage.
2. Doctor name and specialty are visible.
3. Login is not required.

**Priority:** Medium  
**Story Points:** 2

---

### Title: Patient Sign Up
_As a patient, I want to register using my email and password so that I can book appointments._

**Acceptance Criteria**
1. Patient enters email and password.
2. System validates input.
3. Account is created successfully.

**Priority:** High  
**Story Points:** 5

---

### Title: Patient Login
_As a patient, I want to log into the portal so that I can manage my appointments._

**Acceptance Criteria**
1. Patient enters credentials.
2. System verifies login.
3. Patient dashboard loads.

**Priority:** High  
**Story Points:** 3

---

### Title: Book Appointment
_As a patient, I want to book an appointment with a doctor so that I can receive medical consultation._

**Acceptance Criteria**
1. Patient selects doctor.
2. Patient selects available time slot.
3. Appointment is saved in the system.

**Priority:** High  
**Story Points:** 5

---

### Title: View Upcoming Appointments
_As a patient, I want to view my upcoming appointments so that I can prepare for my visit._

**Acceptance Criteria**
1. Patient dashboard displays appointments.
2. Appointment date and doctor name are shown.
3. Patient can review appointment details.

**Priority:** Medium  
**Story Points:** 3

---

## Doctor User Stories

### Title: Doctor Login
_As a doctor, I want to log into the portal so that I can manage my appointments._

**Acceptance Criteria**
1. Doctor enters credentials.
2. System verifies login.
3. Doctor dashboard loads.

**Priority:** High  
**Story Points:** 3

---

### Title: Doctor Logout
_As a doctor, I want to log out so that my session remains secure._

**Acceptance Criteria**
1. Doctor clicks logout.
2. Session ends.
3. Doctor is redirected to homepage.

**Priority:** Medium  
**Story Points:** 2

---

### Title: View Appointment Calendar
_As a doctor, I want to view my appointment schedule so that I can stay organized._

**Acceptance Criteria**
1. Doctor dashboard displays appointments.
2. Appointments show date and patient name.
3. Doctor can review daily schedule.

**Priority:** High  
**Story Points:** 3

---

### Title: Mark Unavailability
_As a doctor, I want to mark unavailable times so that patients only see available slots._

**Acceptance Criteria**
1. Doctor selects unavailable time.
2. System updates availability.
3. Patients cannot book that slot.

**Priority:** Medium  
**Story Points:** 4

---

### Title: Update Profile
_As a doctor, I want to update my specialization and contact information so that patients have accurate details._

**Acceptance Criteria**
1. Doctor edits profile details.
2. System saves updates.
3. Patients see updated information.

**Priority:** Medium  
**Story Points:** 3