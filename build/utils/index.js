"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatesStartEnds = exports.calculateDaysBetweenDates = void 0;
function calculateDaysBetweenDates(start, end) {
    if (!validateDateTimestamp(start) || !validateDateTimestamp(end))
        return null;
    const difference = convertToMilliseconds(end) - convertToMilliseconds(start);
    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    return daysDifference;
}
exports.calculateDaysBetweenDates = calculateDaysBetweenDates;
function checkDatesStartEnds(start, end) {
    if (!validateDateTimestamp(start) || !validateDateTimestamp(end))
        return null;
    if (start > end)
        return false;
    return true;
}
exports.checkDatesStartEnds = checkDatesStartEnds;
function validateDateTimestamp(timestamp) {
    const valid = (new Date(timestamp)).getTime() > 0;
    return valid;
}
function convertToMilliseconds(timestamp) {
    if (timestamp.toString().length > 11)
        return timestamp;
    return (new Date(timestamp * 1000)).getTime();
}
