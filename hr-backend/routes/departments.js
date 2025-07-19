const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.get('/', (req, res) => {
        const sql = 'SELECT id, name, head_id, team_size FROM departments';
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    router.get('/:id', (req, res) => {
        const sql = 'SELECT id, name, head_id, team_size FROM departments WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: 'Department not found' });
            res.json(result[0]);
        });
    });

    router.post('/', (req, res) => {
        const { name, head_id, team_size } = req.body;
        const sql = 'INSERT INTO departments (name, head_id, team_size) VALUES (?, ?, ?)';
        db.query(sql, [name, head_id, team_size], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Department added', id: result.insertId });
        });
    });

    router.put('/:id', (req, res) => {
        const { name, head_id, team_size } = req.body;
        const sql = 'UPDATE departments SET name = ?, head_id = ?, team_size = ? WHERE id = ?';
        db.query(sql, [name, head_id, team_size, req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Department not found' });
            res.json({ message: 'Department updated' });
        });
    });

    router.delete('/:id', (req, res) => {
        const sql = 'DELETE FROM departments WHERE id = ?';
        db.query(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Department not found' });
            res.json({ message: 'Department deleted' });
        });
    });

    return router;
};