# Service Request Management System

This project is a Django-based API that allows users to create and manage service requests. The system provides two main sections:

1. **User Section** - Users can create service requests and view the status of their services.
2. **Admin Section** - Admin users can manage and update the status of the services.

## Table of Contents
- [User Functionality](#user-functionality)
- [Admin Functionality](#admin-functionality)
- [Setup Instructions](#setup-instructions)
  - [Setting Up the Virtual Environment](#setting-up-the-virtual-environment)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)

## User Functionality

- **Create Service Request**:
  - Authenticated users can create a service request by sending a `POST` request to the `/service-request/` endpoint.
  - The request body should include:
    - `service_type`: Type of the service (e.g., plumbing, electrical, etc.)
    - `description`: A description of the service required.
  - After successful creation, the service request is saved with the user ID, and the status is set to "Pending".

- **View Service Request Status**:
  - Authenticated users can view the status of all their service requests by sending a `GET` request to the `/service-request/` endpoint.
  - The response will include details of all their service requests, including the status (e.g., Pending, Completed).

---

## Admin Functionality

- **Manage Service Request Status**:
  - Admin users can update the status of a service request by sending a `PATCH` request to the `/service-request/{id}/` endpoint.
  - Admins can change the service request status (e.g., from "Pending" to "Completed" or "In Progress").
  
- **View All Service Requests**:
  - Admins can view all service requests submitted by users by sending a `GET` request to the `/service-request/` endpoint.
  - The response will include details of all service requests, including the user, service type, description, and status.

## Setup Instructions

### 1. **Setting Up the Virtual Environment**

To set up the project environment, follow these steps:

1. **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

2. **Activate the virtual environment:**
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

3. **Install required dependencies:**
    Once the virtual environment is activated, install the project dependencies from the `requirements.txt` file:
    ```bash
    pip install -r requirements.txt
    ```

### 2. **Database Setup**

To set up the database and apply migrations:

1. **Database Configuration:**
    Ensure that the database configurations are correct in the `settings.py` file. By default, Django uses SQLite. If you're using a different database, adjust the settings accordingly.

2. **Make migrations:**
    Generate the initial migrations for your models:
    ```bash
    python manage.py makemigrations
    ```

3. **Apply migrations:**
    Apply the migrations to set up the database schema:
    ```bash
    python manage.py migrate
    ```

### 3. **Running the Server**

After setting up the environment and database, start the development server with the following command:
```bash
python manage.py runserver
