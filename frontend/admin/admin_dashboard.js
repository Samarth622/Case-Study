const serviceTable = document.getElementById("service-requests");

// Fetch all service requests
const fetchServices = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/services/admin/', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        const data = await response.json();
        populateServiceTable(data);
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

// Populate the service table with fetched data
const populateServiceTable = (services) => {
    serviceTable.innerHTML = ''; // Clear previous data
    services.forEach(service => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${service.user}</td>
            <td>${service.description}</td>
            <td id="status-${service.id}">${service.status}</td>
            <td>
                <select id="status-dropdown-${service.id}" onchange="changeStatus(${service.id})">
                    <option value="Pending" ${service.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${service.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${service.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${service.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
        `;
        
        serviceTable.appendChild(row);
    });
};

// Change the status of the service
const changeStatus = async (id) => {
    try {
        const statusDropdown = document.getElementById(`status-dropdown-${id}`);
        const newStatus = statusDropdown.value;  // Get the selected status from the dropdown

        const response = await fetch('http://127.0.0.1:8000/services/admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (response.ok) {
            const statusCell = document.getElementById(`status-${id}`);
            statusCell.textContent = newStatus; // Update the status text
        } else {
            console.error('Failed to update status');
        }
    } catch (error) {
        console.error("Error changing status:", error);
    }
};

const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("user_id");

    window.location.href = '../auth/auth.html'; 
};

// Attach event listener to the logout button
document.getElementById("logout-button").addEventListener("click", logout);


window.onload = fetchServices;
