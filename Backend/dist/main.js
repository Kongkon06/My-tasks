"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const db_js_1 = require("./db.js");
const cors = require('cors');
const data = require('./Routes/data.js');
const add = require('./Routes/index.js');
const status = require('./Routes/status.js');
const dele = require('./Routes/delete.js');
const db_js_2 = require("./db.js");
const mainrouter = express();
(0, db_js_2.createTables)();
db_js_1.client.connect();
mainrouter.use(cors());
mainrouter.use(express.json());
mainrouter.use("/Add", add);
mainrouter.use("/Delete", dele);
mainrouter.use("/Data", data);
mainrouter.use("/Status", status);
mainrouter.listen(3000, () => {
    console.log(`Server is running on `);
});
