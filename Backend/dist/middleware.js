"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const zod = require('zod');
const check = zod.object({
    name: zod.string,
    uppertodo_id: zod.number.optional,
});
function middleware(req, res, next) {
    const data = req.body.todo;
    const result = check.safeParse(data);
    if (result.success) {
        res.status(403).json({ msg: 'Input error' });
    }
    else {
        next();
    }
}
exports.middleware = middleware;
