Stored Procedures Report – Smart Clinic Management System

This document contains the SQL stored procedures created for the Smart Clinic Management System along with the execution results.

The procedures were created and executed using the MySQL cms database.

1. Daily Appointment Report by Doctor
Stored Procedure
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
END $$

DELIMITER ;
Execution Command
CALL GetDailyAppointmentReportByDoctor('2025-04-15');
Output
+-------------------+----------------------------+--------+----------------+---------------+
| doctor_name       | appointment_time           | status | patient_name   | patient_phone |
+-------------------+----------------------------+--------+----------------+---------------+
| Dr. Alice Brown   | 2025-04-15 11:00:00.000000 | 1      | Liam King      | 888-666-6666  |
| Dr. Mark Johnson  | 2025-04-15 12:00:00.000000 | 1      | Michael Jordan | 888-444-4444  |
| Dr. Mark Johnson  | 2025-04-15 13:00:00.000000 | 1      | Olivia Moon    | 888-555-5555  |
+-------------------+----------------------------+--------+----------------+---------------+
2. Doctor With Most Patients By Month
Stored Procedure
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
END $$

DELIMITER ;
Execution Command
CALL GetDoctorWithMostPatientsByMonth(4, 2025);
Output
+-----------+---------------+
| doctor_id | patients_seen |
+-----------+---------------+
| 2         | 31            |
+-----------+---------------+

This means Doctor with ID = 2 had the highest number of patients in April 2025.

3. Doctor With Most Patients By Year
Stored Procedure
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
END $$

DELIMITER ;
Execution Command
CALL GetDoctorWithMostPatientsByYear(2025);
Output
+-----------+---------------+
| doctor_id | patients_seen |
+-----------+---------------+
| 1         | 44            |
+-----------+---------------+

This means Doctor with ID = 1 had the highest number of patients in the year 2025.

Stored Procedures Verification

The following command was used to verify the procedures exist in the database:

SHOW PROCEDURE STATUS WHERE Db = 'cms';

Result shows the following procedures:

GetDailyAppointmentReportByDoctor
GetDoctorWithMostPatientsByMonth
GetDoctorWithMostPatientsByYear
Conclusion

Three stored procedures were successfully created and executed:

GetDailyAppointmentReportByDoctor

GetDoctorWithMostPatientsByMonth

GetDoctorWithMostPatientsByYear

These procedures help generate operational reports for clinic management including daily appointment reports and doctor workload statistics.

Author

Clinic Management System – Database Capstone Lab