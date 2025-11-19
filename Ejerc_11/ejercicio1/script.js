let userData;
const profileContainer = document.getElementById("profile-fields");
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");

const xhr = new XMLHttpRequest();
xhr.open("GET", "user_data.json");
xhr.onload = function() {
  userData = JSON.parse(xhr.responseText);
  renderProfile(false);
};
xhr.send();

function renderProfile(editable) {
  profileContainer.innerHTML = `
    <label>Nombre:</label>
    <input class="form-control" id="firstName" ${editable ? "" : "disabled"} value="${userData.personalInfo.firstName}">

    <label class="mt-2">Apellido:</label>
    <input class="form-control" id="lastName" ${editable ? "" : "disabled"} value="${userData.personalInfo.lastName}">

    <label class="mt-2">Email:</label>
    <input class="form-control" id="email" ${editable ? "" : "disabled"} value="${userData.personalInfo.email}">
  `;

  editBtn.classList.toggle("d-none", editable);
  saveBtn.classList.toggle("d-none", !editable);
}

editBtn.onclick = function() {
  renderProfile(true);
};

saveBtn.onclick = function() {
  saveBtn.disabled = true;

  userData.personalInfo.firstName = document.getElementById("firstName").value;
  userData.personalInfo.lastName = document.getElementById("lastName").value;
  userData.personalInfo.email = document.getElementById("email").value;

  const xhrPost = new XMLHttpRequest();
  xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/");
  xhrPost.setRequestHeader("Content-Type", "application/json");

  xhrPost.onload = function() {
    document.getElementById("message").innerText = "Datos guardados correctamente.";
    saveBtn.disabled = false;
    renderProfile(false);
  };

  xhrPost.onerror = function() {
    document.getElementById("message").innerText = "Error al guardar datos.";
  };

  xhrPost.send(JSON.stringify(userData));
};
