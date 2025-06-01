# JPDB - Student Enrollment Form

A fast and efficient student enrollment form built using **JsonPowerDB (JPDB)**. This project demonstrates how to leverage JPDB’s NoSQL database with REST API for a simple yet effective CRUD-based web app.

---

## Table of Contents

- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [Usage Example](#usage-example)
- [Illustrations](#illustrations)
- [Development Setup](#development-setup)
- [Release History](#release-history)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [Meta](#meta)
- [License](#license)

---

## Description

The **JPDB - Student Enrollment Form** is a web-based interface for registering students, storing their data securely using JsonPowerDB, and retrieving it instantly. It is built using only frontend technologies (HTML, CSS, JavaScript) while using JPDB's powerful backend-as-a-service features for data storage and querying.

---

## Benefits of using JsonPowerDB

- **Simple to use** with REST APIs.
- **High performance** due to in-memory data storage.
- **No backend setup** required — ideal for frontend developers.
- **Secure and robust** access control using token-based authentication.
- **Cost-effective** — perfect for small projects and prototypes.

---

## Scope of Functionalities

- Student registration with:
  - Roll number
  - Name
  - Class
  - Birth date
- Update student details
- Retrieve student record
- Delete student data
- Form validations and user feedback

---

## Usage Example

```javascript
function saveStudent() {
  let jsonStr = {
    rollNo: "101",
    name: "Praveen Kumar",
    class: "12A",
    dob: "2005-09-12"
  };

  let putReqStr = createPUTRequest(
    "YOUR-JPDB-CONNECTION-TOKEN",
    jsonStr,
    "SCHOOL-DB",
    "STUDENT-TABLE"
  );

  jQuery.ajaxSetup({ async: false });
  let resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
  jQuery.ajaxSetup({ async: true });
}
