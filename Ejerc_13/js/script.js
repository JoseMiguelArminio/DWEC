const API_URL = 'https://crudcrud.com/api/YOUR_UNIQUE_ID/users'; // reemplaza YOUR_UNIQUE_ID
let currentEditId = null;
let currentGradesUserId = null;

const initialUsers = [
    {firstName:"Alice",lastName:"Smith",email:"alice.smith@example.com",picture:"https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName:"Bob",lastName:"Johnson",email:"bob.johnson@example.com",picture:"https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName:"Charlie",lastName:"Brown",email:"charlie.brown@example.com",picture:"https://randomuser.me/api/portraits/men/3.jpg"},
    {firstName:"Diana",lastName:"Prince",email:"diana.prince@example.com",picture:"https://randomuser.me/api/portraits/women/4.jpg"},
    {firstName:"Eve",lastName:"Adams",email:"eve.adams@example.com",picture:"https://randomuser.me/api/portraits/women/5.jpg"},
    {firstName:"Frank",lastName:"White",email:"frank.white@example.com",picture:"https://randomuser.me/api/portraits/men/6.jpg"},
    {firstName:"Grace",lastName:"Taylor",email:"grace.taylor@example.com",picture:"https://randomuser.me/api/portraits/women/7.jpg"},
    {firstName:"Henry",lastName:"Moore",email:"henry.moore@example.com",picture:"https://randomuser.me/api/portraits/men/8.jpg"},
    {firstName:"Ivy",lastName:"Clark",email:"ivy.clark@example.com",picture:"https://randomuser.me/api/portraits/women/9.jpg"},
    {firstName:"Jack",lastName:"Lewis",email:"jack.lewis@example.com",picture:"https://randomuser.me/api/portraits/men/10.jpg"}
];

function showMessage(msg, type='success') {
    const div = document.getElementById('messages');
    div.textContent = msg;
    div.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(()=> div.textContent='', 3000);
}

function displayUsers() {
    fetch(API_URL)
    .then(res => res.json())
    .then(users => {
        const list = document.getElementById('userList');
        const searchValue = document.getElementById('search').value.toLowerCase();
        list.innerHTML = '';
        users.forEach(user => {
            if(user.firstName.toLowerCase().includes(searchValue) || user.lastName.toLowerCase().includes(searchValue)) {
                const tr = document.createElement('tr');
                const grades = user.calificaciones 
                    ? `M:${user.calificaciones.Matemáticas}, H:${user.calificaciones.Historia}, C:${user.calificaciones.Ciencia}, I:${user.calificaciones.Inglés}, A:${user.calificaciones.Arte}`
                    : '-';
                tr.innerHTML = `
                    <td><img src="${user.picture}"></td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${grades}</td>
                    <td>
                        <button onclick="editUser('${user._id}')">Editar</button>
                        <button onclick="deleteUser('${user._id}')">Eliminar</button>
                        <button onclick="openGradesModal('${user._id}')">Calificaciones</button>
                    </td>
                `;
                list.appendChild(tr);
            }
        });
    })
    .catch(err => showMessage('Error al cargar usuarios', 'error'));
}

function uploadInitialUsers(users) {
    users.forEach(user => {
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(() => displayUsers())
        .catch(err => showMessage('Error al subir usuario', 'error'));
    });
}

function addUser(e) {
    e.preventDefault();
    const user = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        picture: document.getElementById('picture').value.trim()
    };
    if(!user.firstName || !user.lastName || !user.email || !user.picture){
        showMessage('Todos los campos son obligatorios', 'error');
        return;
    }
    if(currentEditId) { 
        fetch(`${API_URL}/${currentEditId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(() => {
            displayUsers();
            showMessage('Usuario actualizado');
            document.getElementById('userForm').reset();
            currentEditId = null;
        })
        .catch(err => showMessage('Error al actualizar usuario', 'error'));
    } else { 
        fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(() => {
            displayUsers();
            showMessage('Usuario añadido');
            document.getElementById('userForm').reset();
        })
        .catch(err => showMessage('Error al añadir usuario', 'error'));
    }
}

function editUser(id) {
    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('picture').value = user.picture;
        currentEditId = id;
    })
    .catch(err => showMessage('Error al obtener usuario', 'error'));
}

function deleteUser(id) {
    if(confirm('¿Estás seguro de eliminar este usuario?')) {
        fetch(`${API_URL}/${id}`, {method:'DELETE'})
        .then(() => displayUsers())
        .catch(err => showMessage('Error al eliminar usuario', 'error'));
    }
}

function searchUsers() {
    displayUsers();
}

function openGradesModal(id) {
    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
        currentGradesUserId = id;
        document.getElementById('gradesUserName').textContent = `${user.firstName} ${user.lastName}`;
        const cal = user.calificaciones || {};
        document.getElementById('math').value = cal.Matemáticas || '';
        document.getElementById('history').value = cal.Historia || '';
        document.getElementById('science').value = cal.Ciencia || '';
        document.getElementById('english').value = cal.Inglés || '';
        document.getElementById('art').value = cal.Arte || '';
        document.getElementById('gradesModal').style.display = 'block';
    })
    .catch(err => showMessage('Error al abrir calificaciones', 'error'));
}

function saveGrades(e) {
    e.preventDefault();
    const grades = {
        Matemáticas: Number(document.getElementById('math').value),
        Historia: Number(document.getElementById('history').value),
        Ciencia: Number(document.getElementById('science').value),
        Inglés: Number(document.getElementById('english').value),
        Arte: Number(document.getElementById('art').value)
    };

    for(let key in grades){
        if(grades[key] < 0 || grades[key] > 10) {
            showMessage('Calificaciones deben ser entre 0 y 10', 'error');
            return;
        }
    }
    fetch(`${API_URL}/${currentGradesUserId}`)
    .then(res => res.json())
    .then(user => {
        user.calificaciones = grades;
        fetch(`${API_URL}/${currentGradesUserId}`, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(() => {
            displayUsers();
            showMessage('Calificaciones guardadas');
            document.getElementById('gradesModal').style.display='none';
        });
    })
    .catch(err => showMessage('Error al guardar calificaciones', 'error'));
}

function deleteGrades() {
    if(confirm('¿Borrar todas las calificaciones?')){
        fetch(`${API_URL}/${currentGradesUserId}`)
        .then(res => res.json())
        .then(user => {
            delete user.calificaciones;
            fetch(`${API_URL}/${currentGradesUserId}`, {
                method:'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(user)
            })
            .then(() => {
                displayUsers();
                showMessage('Calificaciones borradas');
                document.getElementById('gradesModal').style.display='none';
            });
        })
        .catch(err => showMessage('Error al borrar calificaciones', 'error'));
    }
}

document.getElementById('loadInitialUsers').addEventListener('click', ()=> uploadInitialUsers(initialUsers));
document.getElementById('userForm').addEventListener('submit', addUser);
document.getElementById('search').addEventListener('input', searchUsers);
document.getElementById('closeModal').addEventListener('click', ()=> document.getElementById('gradesModal').style.display='none');
document.getElementById('gradesForm').addEventListener('submit', saveGrades);
document.getElementById('deleteGrades').addEventListener('click', deleteGrades);

displayUsers();
