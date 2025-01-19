document.getElementById('serviceForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form inputs
    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;

    // Validate inputs
    if (!serviceName || !serviceDescription) {
        alert('Please fill out all fields.');
        return;
    }

    // Send POST request to the backend
    try {
        const response = await fetch('http://127.0.0.1:8000/services/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({
                request_type: serviceName,
                description: serviceDescription,
                user: localStorage.getItem("user_id")
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit service request.');
        }

        // Fetch updated services list
        fetchServices();

        // Clear form fields
        document.getElementById('serviceForm').reset();
    } catch (error) {
        console.error(error);
        alert('An error occurred while submitting the request.');
    }
});

async function fetchServices() {
    try {
        const response = await fetch('http://127.0.0.1:8000/services/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            // credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch services.');
        }

        const services = await response.json();

        // Update the service list in the UI
        const serviceList = document.getElementById('serviceList');
        serviceList.innerHTML = '<h2>Submitted Services</h2>'; // Reset the list

        services.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'service';
            serviceDiv.innerHTML = `
                <p>${service.description}</p>
                <p class="service-status">Status: ${service.status || 'Pending'}</p>
            `;
            serviceList.appendChild(serviceDiv);
        });
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the services.');
    }
}

// Fetch and display services on page load
fetchServices();

document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear user session or any related data (adjust based on your authentication logic)
    localStorage.removeItem("access_token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("user_id");

    alert('You have been logged out.');
    window.location.href = '../auth/auth.html'; // Redirect to login page
});