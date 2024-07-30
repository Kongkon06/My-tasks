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
const Add = express.Router();
const db_1 = require("../db");
Add.post('/Maintask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = req.body;
        const insertquery = 'INSERT INTO maintask(task) VALUES ($1)';
        const result = yield db_1.client.query(insertquery, [todo.name]);
        res.json({ message: 'Done' });
    }
    catch (err) {
        res.status(404).json({ msg: "Error in inserting" });
    }
    ;
}));
Add.post('/Subtask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtodo = req.body;
    console.log(subtodo);
    const insertquery = 'INSERT INTO subtask(main_id,subtask) VALUES ($1,$2)';
    const result = yield db_1.client.query(insertquery, [subtodo.uppertodo_id, subtodo.name]);
    if (result.rowCount > 0) {
        res.json({ message: "Done" });
    }
    else {
        res.status(404).json({ msg: 'Database query error' });
    }
}));
Add.post('/Leaftask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaftask = req.body;
    const insertquery = 'INSERT INTO leaftask(subtask_id,leaftask) VALUES ($1,$2)';
    const result = yield db_1.client.query(insertquery, [leaftask.uppertodo_id, leaftask.name]);
    if (result.rowCount > 0) {
        res.json({ message: "Done" });
    }
    else {
        res.status(404).json({ msg: 'Database query error' });
    }
}));
module.exports = Add;
