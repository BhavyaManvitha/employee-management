const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/', (req, res) => {
        const sql = 'SELECT id, employee_id, leave_type, start_date, end_date, status FROM leave_requests';
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const sql = 'SELECT id, employee_id, leave_type, start_date, end_date, status FROM leave_requests WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'Leave request not found' });
            res.json(result[0]);
        });
    });

    router.post('/', (req, res) => {
        const { employee_id, leave_type, start_date, end_date, status } = req.body;
        const sql = 'INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [employee_id, leave_type, start_date, end_date, status], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Leave request added', id: result.insertId });
        });
    });

    router.put('/:id', (req, res) => {
        const { employee_id, leave_type, start_date, end_date, status } = req.body;
        const sql = 'UPDATE leave_requests SET employee_id = ?, leave_type = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?';
        db.query(sql, [employee_id, leave_type, start_date, end_date, status, req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Leave request not found' });
            res.json({ message: 'Leave request updated' });
        });
    });

    router.delete('/:id', (req, res) => {
        const sql = 'DELETE FROM leave_requests WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Leave request not found' });
            res.json({ message: 'Leave request deleted' });
        });
    });

    return router;
};