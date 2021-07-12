"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lowerCase(str) {
    return str.toLocaleLowerCase();
}
exports.lowerCase = lowerCase;
function upperCase(str) {
    return str.toUpperCase();
}
exports.upperCase = upperCase;
function dashToUnderscore(str) {
    return str.replace(/-/g, '_');
}
exports.dashToUnderscore = dashToUnderscore;
