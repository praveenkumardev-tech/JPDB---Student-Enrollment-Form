const DB_NAME = "SCHOOL-DB";
const REL_NAME = "STUDENT-TABLE";
const BASE_URL = "http://api.login2explore.com:5577";
const CONN_TOKEN = "90934605|-31949211866471794|90956764";

$(document).ready(function () {
    $("#rollNo").focus();
    disableAllFieldsExceptRollNo();
    disableButtons();
});

function disableAllFieldsExceptRollNo() {
    $("#fullName").prop("disabled", true);
    $("#class").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollmentDate").prop("disabled", true);
}

function enableAllFields() {
    $("#fullName").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollmentDate").prop("disabled", false);
}

function disableButtons() {
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
}

function enableSaveResetButtons() {
    $("#saveBtn").prop("disabled", false);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", false);
}

function enableUpdateResetButtons() {
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", false);
    $("#resetBtn").prop("disabled", false);
}

window.checkStudent = function() {
    let rollNo = $("#rollNo").val().trim();
    if (rollNo === "") {
        alert("Roll No cannot be empty!");
        $("#rollNo").focus();
        return;
    }

    let jsonRequest = createGET_BY_KEYRequest(CONN_TOKEN, DB_NAME, REL_NAME, rollNo);

    jQuery.ajaxSetup({async: false});
    let resultObj = executeCommandAtGivenBaseUrl(jsonRequest, BASE_URL, "/api/irl");
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {
        // New student: enable all fields, Save and Reset
        $("#fullName, #class, #birthDate, #address, #enrollmentDate").prop("disabled", false);
        $("#saveBtn, #resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#rollNo").prop("disabled", false);
        $("#fullName").focus();
        // Clear fields
        $("#fullName, #class, #birthDate, #address, #enrollmentDate").val("");
    } else if (resultObj.status === 200) {
        // Existing student: fill fields, enable Update and Reset, disable Save, disable Roll No
        let studentData = resultObj.data;
        $("#fullName").val(studentData["Full-Name"] || "");
        $("#class").val(studentData.Class || "");
        $("#birthDate").val(studentData["Birth-Date"] || "");
        $("#address").val(studentData.Address || "");
        $("#enrollmentDate").val(studentData["Enrollment-Date"] || "");

        $("#fullName, #class, #birthDate, #address, #enrollmentDate").prop("disabled", false);
        $("#updateBtn, #resetBtn").prop("disabled", false);
        $("#saveBtn").prop("disabled", true);
        $("#rollNo").prop("disabled", true);

        $("#fullName").focus();
    } else {
        alert("Error: " + (resultObj.message || "Unknown error"));
        setInitialState();
    }
};


function validateAndGetFormData() {
    let rollNo = $("#rollNo").val().trim();
    if (rollNo === "") {
        alert("Roll No is required!");
        $("#rollNo").focus();
        return "";
    }

    let fullName = $("#fullName").val().trim();
    if (fullName === "") {
        alert("Full Name is required!");
        $("#fullName").focus();
        return "";
    }

    let studentClass = $("#class").val().trim();
    if (studentClass === "") {
        alert("Class is required!");
        $("#class").focus();
        return "";
    }

    let birthDate = $("#birthDate").val();
    if (birthDate === "") {
        alert("Birth Date is required!");
        $("#birthDate").focus();
        return "";
    }

    let address = $("#address").val().trim();
    if (address === "") {
        alert("Address is required!");
        $("#address").focus();
        return "";
    }

    let enrollmentDate = $("#enrollmentDate").val();
    if (enrollmentDate === "") {
        alert("Enrollment Date is required!");
        $("#enrollmentDate").focus();
        return "";
    }

    return JSON.stringify({
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": studentClass,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    });
}

function saveStudent() {
    let jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }

    let putReqStr = createPUTRequest(CONN_TOKEN, jsonStr, DB_NAME, REL_NAME);

    jQuery.ajaxSetup({ async: false });
    let resultObj = executeCommandAtGivenBaseUrl(putReqStr, BASE_URL, "/api/iml");
    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Student record saved successfully!");
        resetForm();
    } else {
        alert("Error: " + resultObj.message);
    }
}

function updateStudent() {
    let jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }

    let updateReqStr = createUPDATERecordRequest(CONN_TOKEN, jsonStr, DB_NAME, REL_NAME);

    jQuery.ajaxSetup({ async: false });
    let resultObj = executeCommandAtGivenBaseUrl(updateReqStr, BASE_URL, "/api/iml");
    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Student record updated successfully!");
        resetForm();
    } else {
        alert("Error: " + resultObj.message);
    }
}

function resetForm() {
    $("#studentForm")[0].reset();
    $("#rollNo").prop("disabled", false);
    disableAllFieldsExceptRollNo();
    disableButtons();
    $("#rollNo").focus();
}
