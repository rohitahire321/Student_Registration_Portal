document.addEventListener("DOMContentLoaded", function () {
    //form and table consts
    const form = document.getElementById("form1");
    const table_body = document.getElementById("studentData");
    
    //local storage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    refreshTable();

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // it will prevent data to be get lost after refreshing

        const name = document.getElementById("StudentName").value.trim();
        const id = document.getElementById("Studentid").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!isValidName(name)) {
        alert("Name should contain only letters.");
        return;
        }

        if (!isValidID(id)) {
        alert("Student ID must be a number.");
        return;
        }

        if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return;
        }

        if (!isValidContact(contact)) {
        alert("Contact number must be at least 10 digits.");
        return;
        }

        const student = { name, id, email, contact };
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));

        refreshTable();
        form.reset();
    });
    
    //Functionalities for data to be edited and deleted.
    table_body.addEventListener("click", function (e) {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("delete-btn")) {
            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            refreshTable();
        }

        if (e.target.classList.contains("edit-btn")) {
            const student = students[index];
            document.getElementById("StudentName").value = student.name;
            document.getElementById("Studentid").value = student.id;
            document.getElementById("email").value = student.email;
            document.getElementById("contact").value = student.contact;

            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            refreshTable();
        }
    });

    function refreshTable() {
        table_body.innerHTML = "";
        students.forEach((student, index) => {
            addRowToTable(student, index);
        });
    }

    function addRowToTable(student, index) {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>`;
        table_body.appendChild(row);
    }
});

//Name :- Rohit Ahire
function isValidName(name){
    for(let char of name){
        let code = char.charCodeAt()
        if(!(code >= 65 && code<=90) && !(code>=97 && code<=122) && !(char == " ")){
            return false;
        }
        return true;
    }
}

//id :- 211
function isValidID(id){
    return !isNaN(id) && !(id == "")
}

//contact :- 9876543210
function isValidContact(contact){
    return !isNaN(contact) && !(contact.length < 10) && !(contact == "")
}

//email :- vgcsghscjk1235@gmail.com
function isValidEmail(email){
    return email.includes(`@`) && email.includes(`.`) && (email.indexOf(`@`) < email.indexOf(`.`))
}