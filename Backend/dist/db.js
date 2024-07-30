"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { Client } = require('pg');
exports.client = new Client({ connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres" });
