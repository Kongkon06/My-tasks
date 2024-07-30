"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = require('./middleware');
const express = require('express');
const Status = express.Router();
const db_1 = require("../db");
Status.post('/Maintask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = req.body;
        const check = 'SELECT done FROM maintask WHERE id=($1)';
        const result = yield db_1.client.query(check, [todo.uppertodo_id]);
        const value = result.rows[0].done;
        const insertquery = 'UPDATE maintask SET done = $1 WHERE id = $2';
        const out = yield db_1.client.query(insertquery, [!value, todo.uppertodo_id]);
        if (result.rowCount > 0) {
            res.json({ msg: !value });
        }
        else {
            res.status(404).json({ msg: 'Database query error' });
        }
    }
    catch (err) {
        res.status(404).json({ msg: "Error in inserting" });
    }
    ;
}));
Status.post('/Subtask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtodo = req.body;
    const check = 'SELECT done FROM subtask WHERE id=($1)';
    const result = yield db_1.client.query(check, [subtodo.uppertodo_id]);
    console.log(result);
    const value = result.rows[0].done;
    const insertquery = 'UPDATE subtask SET done = $1 WHERE id = $2';
    const out = yield db_1.client.query(insertquery, [!value, subtodo.uppertodo_id]);
    if (result.rowCount > 0) {
        res.json({ msg: !value });
    }
    else {
        res.status(404).json({ msg: 'Database query error' });
    }
}));
Status.post('/Leaftask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaftask = req.body;
    const check = 'SELECT done FROM leaftask WHERE id=($1)';
    const result = yield db_1.client.query(check, [leaftask.uppertodo_id]);
    const value = result.rows[0].done;
    const insertquery = 'UPDATE leaftask SET done = $1 WHERE id = $2';
    const out = yield db_1.client.query(insertquery, [!value, leaftask.uppertodo_id]);
    if (out.rowCount > 0) {
        res.json({ msg: !value });
    }
    else {
        res.status(404).json({ msg: 'Database query error', out });
    }
}));
module.exports = Status;
