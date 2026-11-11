// Check user login status on page load
document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
});

// Function to check if user is logged in
function checkUserLogin() {
    fetch('/api/user')
        .then(res => res.json())
        .then(user => {
            // User is logged in
            updateNavbarLoggedIn(user);
        })
        .catch(() => {
            // User is not logged in
            updateNavbarLoggedOut();
        });
}

// Update navbar when user is logged in
function updateNavbarLoggedIn(user) {
    const authLinks = document.getElementById('authLinks');
    const userLinks = document.getElementById('userLinks');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const userName = document.getElementById('userName');

    if (authLinks) authLinks.style.display = 'none';
    if (userLinks) userLinks.style.display = 'block';
    if (dashboardBtn) dashboardBtn.style.display = 'block';
    if (userName) userName.textContent = `Hello, ${user.full_name}!`;
}

// Update navbar when user is logged out
function updateNavbarLoggedOut() {
    const authLinks = document.getElementById('authLinks');
    const userLinks = document.getElementById('userLinks');
    const dashboardBtn = document.getElementById('dashboardBtn');

    if (authLinks) authLinks.style.display = 'block';
    if (userLinks) userLinks.style.display = 'none';
    if (dashboardBtn) dashboardBtn.style.display = 'none';
}

// Logout function
function logout() {
    fetch('/api/logout')
        .then(res => res.json())
        .then(data => {
            // Update navbar immediately
            updateNavbarLoggedOut();
            
            // Redirect to home
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        })
        .catch(err => {
            console.error('Logout error:', err);
            window.location.href = '/';
        });
}

// Load departments function (for home and about pages)
function loadDepartments() {
    fetch('/api/departments')
        .then(res => res.json())
        .then(data => {
            const deptList = document.getElementById('departmentsList');
            if (deptList) {
                deptList.innerHTML = '';
                data.forEach(dept => {
                    deptList.innerHTML += `
                        <div class="dept-card">
                            <h3>${dept.name}</h3>
                            <p>${dept.description}</p>
                            <p><strong>Head:</strong> ${dept.head_name}</p>
                            <p><strong>Email:</strong> ${dept.contact_email}</p>
                        </div>
                    `;
                });
            }

            // Also load departments for about page
            const deptListAbout = document.getElementById('departmentsAbout');
            if (deptListAbout) {
                deptListAbout.innerHTML = '';
                data.forEach((dept, index) => {
                    deptListAbout.innerHTML += `
                        <div class="dept-list-item">
                            <h4>${index + 1}. ${dept.name}</h4>
                            <p>${dept.description}</p>
                            <p><strong>Department Head:</strong> ${dept.head_name}</p>
                            <p><strong>Contact:</strong> ${dept.contact_email}</p>
                        </div>
                    `;
                });
            }
        })
        .catch(err => console.error('Error loading departments:', err));
}

// Load user profile for dashboard
function loadUserProfile() {
    fetch('/api/user')
        .then(res => res.json())
        .then(user => {
            const userName = document.getElementById('userName');
            if (userName) userName.textContent = `Hello, ${user.full_name}!`;
            
            const userProfile = document.getElementById('userProfile');
            if (userProfile) {
                userProfile.innerHTML = `
                    <p><strong>Name:</strong> ${user.full_name}</p>
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                `;
            }
        })
        .catch(() => {
            window.location.href = '/login';
        });
}

// Load departments for dashboard
function loadDashboardDepartments() {
    fetch('/api/departments')
        .then(res => res.json())
        .then(data => {
            const deptCount = document.getElementById('deptCount');
            if (deptCount) deptCount.textContent = data.length;

            const userDepartments = document.getElementById('userDepartments');
            if (userDepartments) {
                userDepartments.innerHTML = '';
                data.forEach(dept => {
                    userDepartments.innerHTML += `
                        <div class="dept-list-item">
                            <h4>${dept.name}</h4>
                            <p>${dept.description}</p>
                            <p><strong>Head:</strong> ${dept.head_name}</p>
                            <p><strong>Email:</strong> ${dept.contact_email}</p>
                        </div>
                    `;
                });
            }
        })
        .catch(err => console.error('Error loading departments:', err));
}