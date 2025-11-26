//Select All Elements

const form = document.getElementById("student-form");

const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("emailId");
const contactInput = document.getElementById("contact");

const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const errorDiv = document.getElementById("form-error");

const tableWrapper = document.getElementById("table-wrap");
const tbody = document.getElementById("student-tbody");

//Load saved data
let students = JSON.parse(localStorage.getItem("studentsList")) || [];
let editIndex = null;


//Validation Function

function validateForm() {

    if (!/^[A-Za-z ]+$/.test(nameInput.value.trim())) {
        errorDiv.textContent = "Name must contain only letters.";
        return false;
    }

    if (!/^[0-9]+$/.test(idInput.value.trim())) {
        errorDiv.textContent = "Student ID must be numeric.";
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
        errorDiv.textContent = "Enter a valid email address.";
        return false;
    }

    if (!/^[0-9]{10}$/.test(contactInput.value.trim())) {
        errorDiv.textContent = "Contact number must be 10 digits.";
        return false;
    }

    errorDiv.textContent = "";
    return true;
}



//Display Students in Table

function showStudents() {
    tbody.innerHTML = "";

    students.forEach((stu, actions) => {
        let row = `
            <tr>
                <td>${stu.name}</td>
                <td>${stu.studentId}</td>
                <td>${stu.email}</td>
                <td>${stu.contact}</td>
                <td>
                    <button  class ="action-btn edit" onclick="editStudent(${actions})">Edit</button>
                    <button class ="action-btn delete" onclick="deleteStudent(${actions})">Delete</button>
                </td>
            </tr>
        `;

        tbody.innerHTML += row;
    });

    applyScroll();
}


//Handle Submit (Add / Update)

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const student = {
        name: nameInput.value.trim(),
        studentId: idInput.value.trim(),
        email: emailInput.value.trim(),
        contact: contactInput.value.trim()
    };

    if (editIndex !== null) {
        students[editIndex] = student;
        editIndex = null;
        submitBtn.textContent = "Submit";
    } else {
        students.push(student);
    }

    saveData();
    showStudents();
    form.reset();
});



 //Edit Student

function editStudent(actions) {
    let s = students[actions];

    nameInput.value = s.name;
    idInput.value = s.studentId;
    emailInput.value = s.email;
    contactInput.value = s.contact;

    editIndex = actions;
    submitBtn.textContent = "Update";
}


//Delete Student

function deleteStudent(actions) {
    if (confirm("Are you sure you want to delete this data?")) {
        students.splice(actions, 1);
        saveData();
        showStudents();
    }
}



//  Save to LocalStorage

function saveData() {
    localStorage.setItem("studentsList", JSON.stringify(students));
}


//Scroll if too many rows

function applyScroll() {
    if (students.length > 4) {
        tableWrapper.style.maxHeight = "250px";
        tableWrapper.style.overflowY = "auto";
    } else {
        tableWrapper.style.maxHeight = "none";
        tableWrapper.style.overflowY = "visible";
    }
}


//Load data on page open

showStudents();
