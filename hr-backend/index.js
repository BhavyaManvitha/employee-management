const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bhavya@18', 
    database: 'hr_portal' 
});

db.connect(err => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Connected to MySQL Database!');
    }
});

// Import and use employee routes
const employeeRoutes = require('./routes/employees')(db);
app.use('/api/employees', employeeRoutes);

// Add multiple employees (updated to match new schema)
app.post('/api/employees/bulk', (req, res) => {
    const employees = req.body;

    if (!Array.isArray(employees) || employees.length === 0) {
        return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    // Ensure values match the new 'employees' table schema
    const values = employees.map(emp => [
        emp.name,
        emp.email,
        emp.phone,
        emp.department_id,
        emp.designation,
        emp.join_date,
        emp.salary
    ]);

    const sql = 'INSERT INTO employees (name, email, phone, department_id, designation, join_date, salary) VALUES ?';

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Bulk insert error:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.json({ message: 'Employees added', inserted: result.affectedRows });
    });
});

// Get all payrolls (updated to match new schema)
app.get('/api/payrolls', (req, res) => {
    db.query('SELECT id, employee_id, base_salary, allowance, deductions, net_salary, pay_date FROM payrolls', (err, results) => {
        if (err) return res.status(500).json({ error: 'DB error', details: err.message });
        res.json(results);
    });
});

// Get payroll for specific employee (updated to match new schema)
app.get('/api/payrolls/:employee_id', (req, res) => {
    const employeeId = req.params.employee_id;
    db.query('SELECT id, employee_id, base_salary, allowance, deductions, net_salary, pay_date FROM payrolls WHERE employee_id = ?', [employeeId], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB error', details: err.message });
        res.json(results);
    });
});

// Add a new payroll entry (updated to match new schema)
app.post('/api/payrolls', (req, res) => {
    const { employee_id, base_salary, allowance, deductions, net_salary, pay_date } = req.body;
    const sql = 'INSERT INTO payrolls (employee_id, base_salary, allowance, deductions, net_salary, pay_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [employee_id, base_salary, allowance, deductions, net_salary, pay_date], (err, result) => {
        if (err) {
            console.error('Payroll insert error:', err);
            return res.status(500).json({ error: 'Insert error', details: err.message });
        }
        res.json({ message: 'Payroll added', id: result.insertId });
    });
});

// Import and use department routes (NEW)
const departmentRoutes = require('./routes/departments')(db);
app.use('/api/departments', departmentRoutes);

// Import and use leave routes (NEW)
const leaveRoutes = require('./routes/leaves')(db);
app.use('/api/leaves', leaveRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});