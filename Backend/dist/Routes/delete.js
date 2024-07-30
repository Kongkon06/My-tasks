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
const middleware = require('../middleware');
const express = require('express');
const Delete = express.Router();
const db_1 = require("../db");
Delete.post('/Maintask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = req.body;
        const check = 'DELETE FROM maintask WHERE id =($1)';
        const result = yield db_1.client.query(check, [todo.uppertodo_id]);
        if (result.rowCount > 0) {
            res.json({ msg: result });
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
Delete.post('/Subtask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtodo = req.body;
    const check = 'DELETE FROM subtask WHERE id =($1)';
    const result = yield db_1.client.query(check, [subtodo.uppertodo_id]);
    if (result.rowCount > 0) {
        res.json({ msg: result });
    }
    else {
        res.status(404).json({ msg: 'Database query error' });
    }
}));
Delete.post('/Leaftask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaftask = req.body;
    console.log(leaftask);
    const check = 'DELETE FROM leaftask WHERE id =($1)';
    const result = yield db_1.client.query(check, [leaftask.uppertodo_id]);
    if (result.rowCount > 0) {
        res.json({ msg: result });
    }
    else {
        res.status(404).json({ msg: 'Database query error' });
    }
}));
module.exports = Delete;
