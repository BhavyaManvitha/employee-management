**Employee Management Application**

---

### **Project Description**

The Employee Management Application is a modern, web-based solution designed to streamline and simplify core HR functions. It provides a centralized system for managing employee records, processing payroll, tracking leave requests, and handling department information. This platform improves efficiency and reduces administrative overhead for small to mid-sized organizations that may rely on outdated manual methods.

---

### **Features**

#### **Frontend (User Interface)**

- **Comprehensive Dashboard**: Overview page (index.html) with quick actions for key HR tasks.

- **Employee Management**:

  - Displays employee records in a tabular format.
  - "Add New Employee" form appears as a compact, styled card.
  - Fields: Name, Email, Phone, Department, Designation, Join Date, Salary.

- **Payroll Management**:

  - Table format for payroll records.
  - "Add New Payroll" form with fields: Employee ID, Base Salary, Allowance, Deductions, Net Salary, Pay Date.

- **Leave Management**:

  - Table view for leave requests.
  - "Manage Leave Request" card with dynamic Accept/Reject buttons.

- **Department Management**: Department records in tabular format.

- **HR-Relevant Settings**: settings.html for admin configurations like payroll rules and leave policies.

- **Consistent & Modern UI/UX**:

  - Modern design with Poppins font.
  - Unified style across tables, forms, and cards.
  - Consistent "Add" buttons styling.

---

### **Backend (API & Database Interaction)**

- **Node.js & Express.js**: Server-side framework.
- **MySQL Database**: Secure, structured data storage.
- **RESTful API**:
  - CRUD operations for: Employees, Payrolls, Departments, Leave Requests.
  - Schema aligned with `db_schema.png`.

---

### **Technologies Used**

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend**: Node.js, Express.js
- **Database**: MySQL (via mysql2 Node.js driver)
- **Tools**: Postman, MySQL Workbench
- **Icons**: Font Awesome

---

### **Project Setup Instructions**

#### **Prerequisites**

- Node.js (v18.x or later)
- npm
- MySQL Server (v8.x or later)
- MySQL Workbench

#### **1. Clone the Repository**

```bash
git clone <your-repository-url>
cd employee-management
```

#### **2. Install Backend Dependencies**

```bash
cd hr-backend
npm install express mysql2 cors
```

#### **3. Database Setup (MySQL)**

**a. Create Database:**

```sql
CREATE DATABASE hr_portal;
USE hr_portal;
```

**b. Drop Existing Tables (if any):**

```sql
DROP TABLE IF EXISTS payrolls;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
```

**c. Create Tables (as per db\_schema.png):**

```sql
-- Departments
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    head_id INT,
    team_size INT
);

-- Employees
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

-- Add foreign key to Departments
ALTER TABLE departments
ADD CONSTRAINT fk_head_id
FOREIGN KEY (head_id) REFERENCES employees(id) ON DELETE SET NULL;

-- Leave Requests
CREATE TABLE leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Payrolls
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
```

#### **4. Configure Database Connection**

Update `hr-backend/index.js`:

```js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bhavya@18',
    database: 'hr_portal'
});
```

#### **5. Start the Backend Server**

```bash
node index.js
```

Expected Output:

```
Connected to MySQL Database!
Server running on http://localhost:3000
```

#### **6. Access the Frontend**

Open `index.html` in a browser.

---

### **API Endpoints (**[**http://localhost:3000/api/**](http://localhost:3000/api/)**)**

#### **Employees**

- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`

```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "department_id": 1,
    "designation": "Software Engineer",
    "join_date": "2024-01-01",
    "salary": 80000.00
}
```

- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

#### **Departments**

- `GET /api/departments`
- `GET /api/departments/:id`
- `POST /api/departments`

```json
{
    "name": "Engineering",
    "head_id": null,
    "team_size": 20
}
```

- `PUT /api/departments/:id`
- `DELETE /api/departments/:id`

#### **Payrolls**

- `GET /api/payrolls`
- `GET /api/payrolls/:employee_id`
- `POST /api/payrolls`

```json
{
    "employee_id": 1,
    "base_salary": 60000.00,
    "allowance": 5000.00,
    "deductions": 2000.00,
    "net_salary": 63000.00,
    "pay_date": "2024-07-25"
}
```

- `PUT /api/payrolls/:id`
- `DELETE /api/payrolls/:id`

#### **Leave Requests**

- `GET /api/leaves`
- `GET /api/leaves/:id`
- `POST /api/leaves`

```json
{
    "employee_id": 1,
    "leave_type": "Annual Leave",
    "start_date": "2025-09-01",
    "end_date": "2025-09-05",
    "status": "pending"
}
```

- `PUT /api/leaves/:id`
- `DELETE /api/leaves/:id`

---

### **Future Enhancements (Optional)**

- Use React.js for a dynamic SPA.
- Implement authentication & user roles.
- Add reporting and analytics.
- Add performance review module.
- File upload for employee documents.
- Dynamic search, filter, and sort features.

---

