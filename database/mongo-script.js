use prescriptions

db.prescriptions.insertMany([

{
patientName:"John Smith",
appointmentId:51,
medication:"Paracetamol",
dosage:"500mg",
doctorNotes:"Take 1 tablet every 6 hours."
},

{
patientName:"Emily Rose",
appointmentId:52,
medication:"Aspirin",
dosage:"300mg",
doctorNotes:"Take 1 tablet after meals."
},

{
patientName:"Michael Jordan",
appointmentId:53,
medication:"Ibuprofen",
dosage:"400mg",
doctorNotes:"Take 1 tablet every 8 hours."
},

{
patientName:"Olivia Moon",
appointmentId:54,
medication:"Antihistamine",
dosage:"10mg",
doctorNotes:"Take 1 tablet daily before bed."
},

{
patientName:"Liam King",
appointmentId:55,
medication:"Vitamin C",
dosage:"1000mg",
doctorNotes:"Take 1 tablet daily."
},

{
patientName:"Sophia Lane",
appointmentId:56,
medication:"Antibiotics",
dosage:"500mg",
doctorNotes:"Take 1 tablet every 12 hours."
},

{
patientName:"Noah Brooks",
appointmentId:57,
medication:"Paracetamol",
dosage:"500mg",
doctorNotes:"Take 1 tablet every 6 hours."
},

{
patientName:"Ava Daniels",
appointmentId:58,
medication:"Ibuprofen",
dosage:"200mg",
doctorNotes:"Take 1 tablet every 8 hours."
},

{
patientName:"William Harris",
appointmentId:59,
medication:"Aspirin",
dosage:"300mg",
doctorNotes:"Take 1 tablet after meals."
},

{
patientName:"Mia Green",
appointmentId:60,
medication:"Vitamin D",
dosage:"1000 IU",
doctorNotes:"Take 1 tablet daily with food."
}

])

db.prescriptions.find().limit(5).pretty()