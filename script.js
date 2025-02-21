document.addEventListener('DOMContentLoaded', function () {
    const signupSection = document.querySelector('.signup-section');
    const loginSection = document.querySelector('.login-section');
    const passwordManagerSections = document.querySelectorAll('.password-manager-section');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const mainNav = document.getElementById('main-nav');
    const authNav = document.getElementById('auth-nav');
    const navItems = document.querySelectorAll('#main-nav .nav-item'); // Select nav items from main nav only
    const authNavItems = document.querySelectorAll('#auth-nav .nav-item'); // Select auth nav items
    const accountsNavItem = document.querySelector('#main-nav .nav-item[data-section="accounts"]'); // Select from main nav
    const settingsNavItem = document.querySelector('#main-nav .nav-item[data-section="settings"]'); // Select from main nav
    const logoutButton = document.getElementById('logout-button'); // Log Out Button


    // --- Navigation ---
    function handleMainNavClick(event) {
        navItems.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        const sectionId = event.target.dataset.section + '-section';
        passwordManagerSections.forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }

    function handleAuthNavClick(event) {
        authNavItems.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        const sectionId = event.target.dataset.section + '-section';
        signupSection.style.display = 'none';
        loginSection.style.display = 'none';
        if (sectionId === 'signup-section') { // Correctly show signup or login section
            signupSection.style.display = 'block';
        } else if (sectionId === 'login-section') {
            loginSection.style.display = 'block';
        }
        updateNavTitle(event.target.textContent); // Update nav title on auth nav click
    }


    navItems.forEach(navItem => {
        navItem.addEventListener('click', handleMainNavClick);
    });

    authNavItems.forEach(navItem => {
        navItem.addEventListener('click', handleAuthNavClick);
    });

    function updateNavTitle(title) {
        authNavItems.forEach(item => {
            if (item.classList.contains('active')) {
                item.textContent = title; // Update active auth nav item text
            }
        });
    }


    // Password toggle functionality for sign up and login
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = this.textContent === '👁️' ? '👁️‍🗨️' : '👁️';
        });
    });

    // Optional fields visibility
    const useUsernameCheckbox = document.getElementById('use-username');
    const usernameField = document.getElementById('username-field');
    const useEmailCheckbox = document.getElementById('use-email');
    const emailField = document.getElementById('email-field');

    useUsernameCheckbox.addEventListener('change', function() {
        usernameField.style.display = this.checked ? 'block' : 'none';
    });

    useEmailCheckbox.addEventListener('change', function() {
        emailField.style.display = this.checked ? 'block' : 'none';
    });

    const usePinCheckbox = document.getElementById('use-pin');
    const pinField = document.getElementById('pin-field');
    const vaultPinInput = document.getElementById('vault-pin');

    usePinCheckbox.addEventListener('change', function() {
        pinField.style.display = this.checked ? 'block' : 'none';
    });

    vaultPinInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
        if (this.value.length > 16) {
            this.value = this.value.slice(0, 16); // Limit to 16 digits
        }
    });


    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
        authNav.style.display = 'block'; // Show auth nav
        mainNav.style.display = 'none'; // Hide main nav
        passwordManagerSections.forEach(section => section.style.display = 'none'); // Hide password manager sections
        authNavItems.forEach(item => item.classList.remove('active')); // Reset auth nav active state
        authNavItems[1].classList.add('active'); // Set Login nav item as active
        updateNavTitle('Log In'); // Update nav title to Log In
        document.getElementById('login-section').style.display = 'block'; // Show login section
    });

    signupLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
        authNav.style.display = 'block'; // Show auth nav
        mainNav.style.display = 'none'; // Hide main nav
        passwordManagerSections.forEach(section => section.style.display = 'none'); // Hide password manager sections
        authNavItems.forEach(item => item.classList.remove('active')); // Reset auth nav active state
        authNavItems[0].classList.add('active'); // Set Signup nav item as active
        updateNavTitle('Sign Up'); // Update nav title to Sign Up
        document.getElementById('signup-section').style.display = 'block'; // Show signup section
    });

    // --- Dummy Login and Signup & Settings Display ---
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const settingsUsernameDisplay = document.getElementById('settings-username');
    const settingsEmailDisplay = document.getElementById('settings-email'); // Email display in settings
    const settingsBirthdayDisplay = document.getElementById('settings-birthday');
    const settingsGenderDisplay = document.getElementById('settings-gender');

    let currentUser = null; // To store logged in user data

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value; // Get email from signup form
        const password = document.getElementById('signup-password').value;
        const birthday = document.getElementById('signup-birthday').value;
        const gender = document.getElementById('signup-gender').value;

        currentUser = { username: username, email: email, password: password, birthday: birthday, gender: gender }; // Store user data including email

        alert('Sign up successful! (Dummy)');
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
        authNavItems.forEach(item => item.classList.remove('active')); // Reset auth nav active state
        authNavItems[1].classList.add('active'); // Set Login nav item as active after signup
        updateNavTitle('Log In'); // Update nav title to Log In after signup
        document.getElementById('login-section').style.display = 'block'; // Show login section after signup
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const identifier = document.getElementById('login-identifier').value; // Can be username or email
        const password = document.getElementById('login-password').value;
        // In a real app, you'd check 'identifier' against both username and email

        alert('Log in successful! (Dummy)');
        loginSection.style.display = 'none';
        authNav.style.display = 'none'; // Hide auth nav
        mainNav.style.display = 'block'; // Show main nav
        passwordManagerSections.forEach(section => section.style.display = 'none'); // Hide all sections first
        document.getElementById('vault-section').style.display = 'block'; // Show vault section by default
        navItems.forEach(item => item.classList.remove('active')); // Reset main nav active state
        navItems[0].classList.add('active'); // Set Vault nav item as active
        navItems[0].textContent = 'Vault'; // Reset Vault nav title
        navItems[1].textContent = 'Accounts'; // Reset Accounts nav title
        navItems[2].textContent = 'About Us'; // Reset About Us nav title
        navItems[3].textContent = 'Settings'; // Reset Settings nav title


        accountsNavItem.style.display = 'list-item'; // Show Accounts nav item after login
        settingsNavItem.style.display = 'list-item'; // Show Settings nav item after login


        // Display user settings after login
        if (currentUser) {
            settingsUsernameDisplay.textContent = currentUser.username;
            settingsEmailDisplay.textContent = currentUser.email; // Display email in settings
            settingsBirthdayDisplay.textContent = currentUser.birthday || 'N/A';
            settingsGenderDisplay.textContent = currentUser.gender || 'N/A';
        }
    });


    // --- Log Out ---
    logoutButton.addEventListener('click', function() {
        mainNav.style.display = 'none'; // Hide main nav
        authNav.style.display = 'block'; // Show auth nav
        passwordManagerSections.forEach(section => section.style.display = 'none'); // Hide all sections
        signupSection.style.display = 'block'; // Show signup section as default after logout
        authNavItems.forEach(item => item.classList.remove('active')); // Reset auth nav active state
        authNavItems[0].classList.add('active'); // Set Sign Up nav item active
        updateNavTitle('Sign Up'); // Update nav title to Sign Up
        currentUser = null; // Clear user data (in a real app, you'd clear session/tokens)
        accountsNavItem.style.display = 'none'; // Hide Accounts nav item
        settingsNavItem.style.display = 'none'; // Hide Settings nav item
    });


    // --- Vault Management ---
    const addVaultForm = document.getElementById('add-vault-form');
    const vaultsContainer = document.getElementById('vaults-container');
    let vaults = []; // Array to store vault objects

    function displayVaults() {
        vaultsContainer.innerHTML = ''; // Clear existing list
        if (vaults.length === 0) {
            vaultsContainer.innerHTML = '<p>No vaults added yet.</p>';
            return;
        }

        vaults.forEach((vault, index) => {
            const vaultItem = document.createElement('div');
            vaultItem.classList.add('vault-item');
            vaultItem.innerHTML = `
                <h3>${vault.title}</h3>
                <div class="vault-details">
                    ${vault.useUsername ? `<p>Username: ${vault.username || 'N/A'}</p>` : ''}
                    ${vault.useEmail ? `<p>Email: ${vault.email || 'N/A'}</p>` : ''}
                    <p>Password: <span class="password-masked">********</span><button class="show-password-button vault-actions button" data-index="${index}">Show</button></p>
                </div>
                <div class="vault-actions">
                    <button class="delete-vault-button button" data-index="${index}">Delete</button>
                </div>
            `;
            vaultsContainer.appendChild(vaultItem);
        });

        // Add event listeners to newly created buttons
        attachVaultEventListeners();
    }

    function attachVaultEventListeners() {
        document.querySelectorAll('.show-password-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showPassword(index);
            });
        });
        document.querySelectorAll('.delete-vault-button').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                deleteVault(index);
            });
        });
    }


    addVaultForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('vault-title').value;
        const useUsername = document.getElementById('use-username').checked;
        const username = document.getElementById('vault-username').value;
        const useEmail = document.getElementById('use-email').checked;
        const email = document.getElementById('vault-email').value;
        const password = document.getElementById('vault-password').value;
        const usePin = document.getElementById('use-pin').checked;
        const pin = document.getElementById('vault-pin').value;

        if (usePin && (pin.length < 4 || pin.length > 16)) {
            alert('PIN must be between 4 and 16 digits.');
            return;
        }

        vaults.push({
            title: title,
            useUsername: useUsername,
            username: username,
            useEmail: useEmail,
            email: email,
            password: password,
            usePin: usePin,
            pin: pin
        });

        displayVaults();
        addVaultForm.reset();
        usernameField.style.display = 'none'; // Reset optional fields visibility
        emailField.style.display = 'none';
        pinField.style.display = 'none';
        useUsernameCheckbox.checked = false;
        useEmailCheckbox.checked = false;
        usePinCheckbox.checked = false;

    });

    const pinRequestOverlay = document.getElementById('pin-request-overlay');
    const pinInput = document.getElementById('pin-input');
    const submitPinButton = document.getElementById('submit-pin-button');
    const cancelPinButton = document.getElementById('cancel-pin-button');
    let currentVaultIndex = -1; // To track which vault is being accessed

    function showPassword(index) {
        currentVaultIndex = index;
        if (vaults[index].usePin) {
            pinRequestOverlay.style.display = 'flex';
            pinInput.value = ''; // Clear previous input
            pinInput.focus();
        } else {
            revealPassword(index);
        }
    }

    function revealPassword(index) {
        const vaultItem = vaultsContainer.children[index];
        const passwordSpan = vaultItem.querySelector('.password-masked');
        passwordSpan.textContent = vaults[index].password;
        const showButton = vaultItem.querySelector('.show-password-button');
        showButton.textContent = 'Hide';
        showButton.removeEventListener('click', arguments.callee); // Remove old listener
        showButton.addEventListener('click', function() { hidePassword(index); }); // Add hide listener
    }

    function hidePassword(index) {
         const vaultItem = vaultsContainer.children[index];
        const passwordSpan = vaultItem.querySelector('.password-masked');
        passwordSpan.textContent = '********';
        const showButton = vaultItem.querySelector('.show-password-button');
        showButton.textContent = 'Show';
        showButton.removeEventListener('click', arguments.callee); // Remove old listener
        showButton.addEventListener('click', function() { showPassword(index); }); // Add show listener
    }


    submitPinButton.addEventListener('click', function() {
        const enteredPin = pinInput.value;
        if (enteredPin === vaults[currentVaultIndex].pin) {
            pinRequestOverlay.style.display = 'none';
            revealPassword(currentVaultIndex);
        } else {
            alert('Incorrect PIN.');
        }
    });

    cancelPinButton.addEventListener('click', function() {
        pinRequestOverlay.style.display = 'none';
        currentVaultIndex = -1; // Reset index
    });


    function deleteVault(index) {
        currentVaultIndex = index;
        if (vaults[index].usePin) {
            pinRequestOverlay.style.display = 'flex';
            pinInput.value = ''; // Clear previous input for deletion pin request
            pinInput.placeholder = 'Enter PIN to Delete Vault';
            submitPinButton.onclick = function() { // Re-purpose submit button for delete confirmation
                const enteredPinForDelete = pinInput.value;
                if (enteredPinForDelete === vaults[currentVaultIndex].pin) {
                    vaults.splice(currentVaultIndex, 1);
                    displayVaults();
                    pinRequestOverlay.style.display = 'none';
                    currentVaultIndex = -1;
                    pinInput.placeholder = 'Enter PIN'; // Reset placeholder
                    submitPinButton.onclick = submitPinButton.previousElementSibling.onclick; // Reset button to password reveal function
                } else {
                    alert('Incorrect PIN for deletion.');
                }
            };

        } else {
            if (confirm('Are you sure you want to delete this vault?')) {
                vaults.splice(index, 1);
                displayVaults();
            }
        }
    }


    // Initial setup: Show auth nav, hide main nav and password manager sections, show signup section
    authNav.style.display = 'block';
    mainNav.style.display = 'none';
    passwordManagerSections.forEach(section => section.style.display = 'none');
    signupSection.style.display = 'block';
    authNavItems[0].classList.add('active'); // Set Sign Up nav active initially
    updateNavTitle('Sign Up'); // Initial nav title
    accountsNavItem.style.display = 'none';
    settingsNavItem.style.display = 'none';


    displayVaults(); // Initial display on page load
});