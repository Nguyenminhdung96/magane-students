let currentIndex = -1;
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function save() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let adress = document.getElementById("adress").value;
  let gender = document.getElementById("male").checked
    ? document.getElementById("male").value
    : document.getElementById("female").checked
    ? document.getElementById("female").value
    : "";
  //   if (_.isEmpty(name) | (name.length < 8)) {
  //     alert("name >= 8");
  //   }
  //   if (!validateEmail(email)) {
  //     alert("email khong dung");
  //   }
  if (name && email && phone && adress && gender) {
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    let student = {
      name: name,
      email: email,
      phone: phone,
      adress: adress,
      gender: gender,
    };
    if (currentIndex === -1) {
      students.push(student);
    } else {
      students[currentIndex] = student;
      currentIndex = -1;
      document.getElementById("mode").innerHTML = "add student";
    }

    localStorage.setItem("students", JSON.stringify(students));
    // document.getElementById("name").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("phone").value = "";
    // document.getElementById("adress").value = "";
    // document.getElementById("male").checked = false;
    // document.getElementById("female").checked = false;
  }
  renderListStudent();
}

function renderListStudent() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  let tableContent = ` <tr>
    <td>#</td>
    <td>name</td>
    <td>email</td>
    <td>phonenumber</td>
    <td>adress</td>
    <td>gender</td>
    <td>custom</td>
</tr>`;

  students.forEach((item, index) => {
    tableContent += ` <tr>
        <td>${index}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.adress}</td>
        <td>${item.gender}</td>
        <td>
        <a href="#" onclick="edit(${index})">edit</a>
        <span>/</span>
        <a href="#" onclick="remove(${index})">remove</a>
        
        </td>
    </tr>`;
  });
  document.getElementById("table_list").innerHTML = tableContent;
}

function edit(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  currentIndex = id;
  document.getElementById("name").value = students[id].name;
  document.getElementById("email").value = students[id].email;
  document.getElementById("phone").value = students[id].phone;
  document.getElementById("adress").value = students[id].adress;
  parseInt(students[id].gender) === 1
    ? (document.getElementById("male").checked = true)
    : (document.getElementById("female").checked = true);
  document.getElementById("mode").innerHTML = "edit student";
}

function remove(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];
  students.splice(id, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderListStudent();
}
