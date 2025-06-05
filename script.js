const userList = document.getElementById('user-list');
const errorMessage = document.getElementById('error-message');
const reloadBtn = document.getElementById('reload-btn');

function renderUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
        `;
        userList.appendChild(card);
    });
}

function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = '';
}

async function fetchUsers() {
    clearError();
    userList.innerHTML = '<p>Loading...</p>';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        userList.innerHTML = '';
        showError('Failed to fetch user data. Please check your internet connection and try again.');
    }
}

reloadBtn.addEventListener('click', fetchUsers);

// Initial fetch
fetchUsers(); 