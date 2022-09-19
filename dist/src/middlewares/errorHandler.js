"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res, next) {
    if (error.type === 'error_not_found') {
        return res.status(404).send(error.message);
    }
    if (error.type === 'error_not_valid') {
        return res.status(403).send(error.message);
    }
    if (error.type === 'error_not_possible') {
        return res.status(409).send(error.message);
    }
    if (error.type === 'error_not_authorized') {
        return res.status(401).send(error.message);
    }
    res.sendStatus(500);
}
exports.default = errorHandler;
