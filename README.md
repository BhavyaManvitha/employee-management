Employee Management Application
Project Description
The Employee Management Application is a modern, web-based solution designed to streamline and simplify core HR functions. It provides a centralized system for managing employee records, processing payroll, tracking leave requests, and handling department information. This platform aims to improve efficiency and reduce administrative overhead for small to mid-sized organizations that may currently rely on outdated manual methods.

Features
Frontend (User Interface)
Comprehensive Dashboard: An overview page (index.html) with quick actions for key HR tasks.

Employee Management:

Displays employee records in a clean, tabular format.

"Add New Employee" form implemented as a compact, styled card that appears within the main content area.

Form fields align with the database schema, including Name, Email, Phone, Department, Designation, Join Date, and Salary.

Payroll Management:

Displays payroll records in a clear table format.

"Add New Payroll" form implemented with the same compact card styling, including fields for Employee ID, Base Salary, Allowance, Deductions, Net Salary, and Pay Date.

Leave Management:

Displays leave requests in a table format.

"Manage Leave Request" card to view details of a specific leave, dynamically showing "Accept/Reject" buttons for pending requests or a status message for approved/rejected ones.

Department Management: Displays department records in a table format.

HR-Relevant Settings: A dedicated settings page (settings.html) for administrative configurations pertinent to the HR portal's functionality (e.g., payroll rules, leave policies).

Consistent & Modern UI/UX:

Uses a clean, modern design with a consistent color palette and typography (Poppins font).

All tables, forms, and cards share a unified visual style.

"Add" action buttons are consistently styled across pages.

Backend (API & Database Interaction)
Node.js & Express.js: Robust server-side application framework.

MySQL Database: Used for secure and structured data storage.

Comprehensive RESTful API: Provides full CRUD (Create, Read, Update, Delete) operations for all core entities:

Employees (/api/employees)

Payrolls (/api/payrolls)

Departments (/api/departments)

Leave Requests (/api/leaves)

Schema Alignment: Backend API endpoints are precisely aligned with the predefined database schema (db_schema.png) for consistent data handling.

Technologies Used
Frontend: HTML5, CSS3, JavaScript (Vanilla JS for interactivity)

Backend: Node.js, Express.js

Database: MySQL (via mysql2 Node.js driver)

Tools: Postman (for API testing), MySQL Workbench (for database management)

Icons: Font Awesome (for various UI icons)

Project Setup Instructions
Prerequisites
Node.js (v18.x or later recommended)

npm (Node Package Manager, comes with Node.js)

MySQL Server (v8.x or later recommended)

MySQL Workbench (or any MySQL client)

1. Clone the Repository
git clone <your-repository-url>
cd employee-management

(Assuming your project is in an 'employee-management' folder and the hr-backend folder is inside it.)

2. Install Backend Dependencies
Navigate into the hr-backend directory and install the necessary Node.js packages.

cd hr-backend
npm install express mysql2 cors

3. Database Setup (MySQL)
Open MySQL Workbench and connect to your MySQL server.

a. Create the Database:

CREATE DATABASE hr_portal;
USE hr_portal;

b. Drop Existing Tables (if any, for a clean start):

USE hr_portal;
DROP TABLE IF EXISTS payrolls;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

c. Create New Tables (aligned with db_schema.png):

USE hr_portal;

-- 1. Create Departments table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    head_id INT,
    team_size INT
);

-- 2. Create Employees table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department_id INT,
    designation VARCHAR(100),
    join_date DATE,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- 3. Add head_id Foreign Key to Departments table
ALTER TABLE departments
ADD CONSTRAINT fk_head_id
FOREIGN KEY (head_id) REFERENCES employees(id) ON DELETE SET NULL;

-- 4. Create Leave Requests table
CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- 5. Create Payrolls table
CREATE TABLE payrolls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    base_salary DECIMAL(10,2) NOT NULL,
    allowance DECIMAL(10,2) DEFAULT 0.00,
    deductions DECIMAL(10,2) DEFAULT 0.00,
    net_salary DECIMAL(10,2) NOT NULL,
    pay_date DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

4. Configure Database Connection
Ensure your hr-backend/index.js file has the correct MySQL connection details:

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Bhavya@18', // Your MySQL password
    database: 'hr_portal' 
});

5. Start the Backend Server
From the hr-backend directory, run:

node index.js

You should see Connected to MySQL Database! and Server running on http://localhost:3000.

6. Access the Frontend
Open your index.html file in a web browser.

API Endpoints (for Postman Testing)
The backend server exposes the following RESTful API endpoints at http://localhost:3000/api/:

Employees
GET /api/employees: Get all employees.

GET /api/employees/:id: Get employee by ID.

POST /api/employees: Add a new employee.

Body (JSON):

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "department_id": 1, 
    "designation": "Software Engineer",
    "join_date": "2024-01-01",
    "salary": 80000.00
}

PUT /api/employees/:id: Update an employee.

Body (JSON): (Full object with updated fields)

DELETE /api/employees/:id: Delete an employee.

Departments
GET /api/departments: Get all departments.

GET /api/departments/:id: Get department by ID.

POST /api/departments: Add a new department.

Body (JSON):

{
    "name": "Engineering",
    "head_id": null,
    "team_size": 20
}

PUT /api/departments/:id: Update a department.

DELETE /api/departments/:id: Delete a department.

Payrolls
GET /api/payrolls: Get all payroll entries.

GET /api/payrolls/:employee_id: Get payroll for a specific employee.

POST /api/payrolls: Add a new payroll entry.

Body (JSON):

{
    "employee_id": 1,
    "base_salary": 60000.00,
    "allowance": 5000.00,
    "deductions": 2000.00,
    "net_salary": 63000.00,
    "pay_date": "2024-07-25"
}

PUT /api/payrolls/:id: Update a payroll entry.

DELETE /api/payrolls/:id: Delete a payroll entry.

Leave Requests
GET /api/leaves: Get all leave requests.

GET /api/leaves/:id: Get leave request by ID.

POST /api/leaves: Add a new leave request.

Body (JSON):

{
    "employee_id": 1,
    "leave_type": "Annual Leave",
    "start_date": "2025-09-01",
    "end_date": "2025-09-05",
    "status": "pending"
}

PUT /api/leaves/:id: Update a leave request.

DELETE /api/leaves/:id: Delete a leave request.

Future Enhancements (Optional)
Integrate a dynamic frontend framework (e.g., React.js) for a more interactive single-page application experience.

Implement user authentication and authorization (login, user roles).

Add comprehensive reporting features.

Develop performance evaluation modules.

Implement file upload capabilities for employee documents.

Search, sort, and filter functionality for tables dynamically.
