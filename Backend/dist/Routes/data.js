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
const db_1 = require("../db");
const express = require('express');
const Data = express.Router();
Data.get('/Maintask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = 'SELECT * FROM maintask';
    const result = yield db_1.client.query(search);
    if (result.rows == 0) {
        res.json({ msg: 'something', re: result.rows });
    }
    else {
        res.json(result.rows);
    }
}));
Data.post('/Subtask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subtask = req.body;
    const search = 'SELECT * FROM subtask WHERE main_id = ($1);';
    const result = yield db_1.client.query(search, [subtask.uppertodo_id]);
    if (result.rows == 0) {
        res.json([]);
    }
    else {
        res.json(result.rows);
    }
}));
Data.post('/Leaftask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaftask = req.body;
    const search = 'SELECT * FROM leaftask WHERE subtask_id = ($1);';
    const result = yield db_1.client.query(search, [leaftask.uppertodo_id]);
    if (result.rows == 0) {
        res.json([]);
    }
    else {
        res.json(result.rows);
    }
}));
module.exports = Data;
