# Stored Procedures Lab – Final Submission

## Overview

This lab demonstrates the creation and execution of SQL stored procedures for generating reports in the **Clinic Management System (CMS)** database.

The stored procedures automate reporting tasks such as:

* Generating daily appointment reports
* Identifying the doctor with the most patients in a given month
* Identifying the doctor with the most patients in a given year

Database used: **MySQL**

---

# Database Used

```
cms
```

Tables used in the procedures:

* doctor
* patient
* appointment

---

# Stored Procedure 1

## GetDailyAppointmentReportByDoctor

This procedure generates a daily appointment report grouped by doctor.

### Procedure Definition

```sql
DELIMITER $$

CREATE PROCEDURE GetDailyAppointmentReportByDoctor(
    IN report_date DATE
)
BEGIN
    SELECT 
        d.name AS doctor_name,
        a.appointment_time,
        a.status,
        p.name AS patient_name,
        p.phone AS patient_phone
    FROM appointment a
    JOIN doctor d ON a.doctor_id = d.id
    JOIN patient p ON a.patient_id = p.id
    WHERE DATE(a.appointment_time) = report_date
    ORDER BY d.name, a.appointment_time;
END$$

DELIMITER ;
```

### Execution

```sql
CALL GetDailyAppointmentReportByDoctor('2025-04-15');
```

### Sample Output

| doctor_name     | appointment_time    | status | patient_name | patient_phone |
| --------------- | ------------------- | ------ | ------------ | ------------- |
| Dr. Emily Adams | 2025-04-15 09:00:00 | 0      | Jane Doe     | 888-111-1111  |
| Dr. Emily Adams | 2025-04-15 10:00:00 | 0      | John Smith   | 888-222-2222  |

---

# Stored Procedure 2

## GetDoctorWithMostPatientsByMonth

This procedure identifies the doctor who treated the highest number of patients in a specific month and year.

### Procedure Definition

```sql
DELIMITER $$

CREATE PROCEDURE GetDoctorWithMostPatientsByMonth(
    IN input_month INT,
    IN input_year INT
)
BEGIN
    SELECT
        doctor_id,
        COUNT(patient_id) AS patients_seen
    FROM appointment
    WHERE MONTH(appointment_time) = input_month
      AND YEAR(appointment_time) = input_year
    GROUP BY doctor_id
    ORDER BY patients_seen DESC
    LIMIT 1;
END$$

DELIMITER ;
```

### Execution

```sql
CALL GetDoctorWithMostPatientsByMonth(4, 2025);
```

### Sample Output

| doctor_id | patients_seen |
| --------- | ------------- |
| 1         | 12            |

---

# Stored Procedure 3

## GetDoctorWithMostPatientsByYear

This procedure identifies the doctor who treated the most patients during a given year.

### Procedure Definition

```sql
DELIMITER $$

CREATE PROCEDURE GetDoctorWithMostPatientsByYear(
    IN input_year INT
)
BEGIN
    SELECT
        doctor_id,
        COUNT(patient_id) AS patients_seen
    FROM appointment
    WHERE YEAR(appointment_time) = input_year
    GROUP BY doctor_id
    ORDER BY patients_seen DESC
    LIMIT 1;
END$$

DELIMITER ;
```

### Execution

```sql
CALL GetDoctorWithMostPatientsByYear(2025);
```

### Sample Output

| doctor_id | patients_seen |
| --------- | ------------- |
| 1         | 20            |

---

# SQL Concepts Used

The following SQL concepts were applied in this lab:

* Stored Procedures
* SQL JOIN
* GROUP BY
* ORDER BY
* COUNT() aggregation
* Input parameters
* DELIMITER command
* CALL statement

---

# Conclusion

In this lab, stored procedures were successfully implemented to automate reporting tasks in the Clinic Management System.

These procedures allow:

* Daily operational reporting
* Monthly workload analysis
* Annual performance summaries

Stored procedures improve efficiency, reusability, and maintainability of database reporting operations.
