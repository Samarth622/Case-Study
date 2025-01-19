document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const switcherLogin = document.querySelector('.switcher-login');
    const switcherSignup = document.querySelector('.switcher-signup');
    const loginFormWrapper = document.querySelector('.form-wrapper.is-active');
    const signupFormWrapper = document.querySelector('.form-wrapper:not(.is-active)');
    const loginForm = document.querySelector('.form-login');
    const signupForm = document.querySelector('.form-signup');

    // Switch between forms
    switcherLogin.addEventListener('click', () => {
        loginFormWrapper.classList.add('is-active');
        signupFormWrapper.classList.remove('is-active');
    });

    switcherSignup.addEventListener('click', () => {
        signupFormWrapper.classList.add('is-active');
        loginFormWrapper.classList.remove('is-active');
    });

    // Login form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                // credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('access_token', data.access);
                localStorage.setItem('is_admin', data.is_admin);
                localStorage.setItem('user_id', data.userId);


                alert('Login successful!');
                // Redirect or handle success
                console.log('User Info:', data);
                
                if(data.is_admin == true){
                    window.location.href = '../admin/admin_dashboard.html';
                }
                else window.location.href = '../user/user_dashboard.html';
            } else {
                const error = await response.json();
                alert(`Login failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Something went wrong. Please try again.');
        }
    });

    // Signup form submission
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const password2 = document.getElementById('signup-password2').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, password2 }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Signup successful!');
                // Redirect or handle success
                console.log('User Info:', data);
            } else {
                const error = await response.json();
                alert(`Signup failed: ${error.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Something went wrong. Please try again.');
        }
    });
});
