const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/', (req, res) => {
        const sql = 'SELECT id, name, email, phone, department_id, designation, join_date, salary FROM employees';
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const sql = 'SELECT id, name, email, phone, department_id, designation, join_date, salary FROM employees WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'Employee not found' });
            res.json(result[0]);
        });
    });

    router.post('/', (req, res) => {
        const { name, email, phone, department_id, designation, join_date, salary } = req.body;
        const sql = 'INSERT INTO employees (name, email, phone, department_id, designation, join_date, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, email, phone, department_id, designation, join_date, salary], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Employee added', id: result.insertId });
        });
    });

    router.put('/:id', (req, res) => {
        const { name, email, phone, department_id, designation, join_date, salary } = req.body;
        const sql = 'UPDATE employees SET name = ?, email = ?, phone = ?, department_id = ?, designation = ?, join_date = ?, salary = ? WHERE id = ?';
        db.query(sql, [name, email, phone, department_id, designation, join_date, salary, req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
            res.json({ message: 'Employee updated' });
        });
    });

    router.delete('/:id', (req, res) => {
        const sql = 'DELETE FROM employees WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Employee not found' });
            res.json({ message: 'Employee deleted' });
        });
    });

    return router;
};