"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAuthorized = exports.notPossibleOperation = exports.notValidEntrie = exports.notFoundError = void 0;
function notFoundError(entity) {
    return {
        type: 'error_not_found',
        message: `Could not find specified "${entity}"!`,
    };
}
exports.notFoundError = notFoundError;
function notValidEntrie(entity) {
    return {
        type: 'error_not_valid',
        message: `Not valid "${entity}"!`,
    };
}
exports.notValidEntrie = notValidEntrie;
function notPossibleOperation(entity) {
    return {
        type: 'error_not_possible',
        message: `Not possible "${entity}"!`,
    };
}
exports.notPossibleOperation = notPossibleOperation;
function notAuthorized(entity) {
    return {
        type: 'error_not_authorized',
        message: `This"${entity} " isn't authorized!`,
    };
}
exports.notAuthorized = notAuthorized;
