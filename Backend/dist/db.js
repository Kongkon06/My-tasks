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
exports.createTables = exports.client = void 0;
const { Client } = require('pg');
exports.client = new Client({ connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/postgres" });
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const createMaintaskTable = `
    CREATE TABLE IF NOT EXISTS maintask (
        id SERIAL PRIMARY KEY,
        task VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        done BOOLEAN DEFAULT false
    );
`;
        const createSubtaskTable = `
    CREATE TABLE IF NOT EXISTS subtask (
        id SERIAL PRIMARY KEY,
        main_id INTEGER REFERENCES maintask(id),
        subtask VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        done BOOLEAN DEFAULT false
    );
`;
        const createLeaftaskTable = `
    CREATE TABLE IF NOT EXISTS leaftask (
        id SERIAL PRIMARY KEY,
        subtask_id INTEGER REFERENCES subtask(id),
        leaftask VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        done BOOLEAN DEFAULT false
    );
`;
        try {
            yield exports.client.query(createMaintaskTable);
            yield exports.client.query(createSubtaskTable);
            yield exports.client.query(createLeaftaskTable);
            console.log("Tables created or already exist.");
        }
        catch (err) {
            console.error("Error creating tables", err);
        }
    });
}
exports.createTables = createTables;
;
