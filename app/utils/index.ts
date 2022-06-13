function calculateDaysBetweenDates(start: number, end: number) {
    if(!validateDateTimestamp(start) || !validateDateTimestamp(end)) return null
    const difference = convertToMilliseconds(end) - convertToMilliseconds(start)
    const daysDifference = Math.floor(difference/1000/60/60/24)
    return daysDifference
}

function checkDatesStartEnds(start: number, end: number) {
    if(!validateDateTimestamp(start) || !validateDateTimestamp(end)) return null
    if(start > end) return false
    return true
}

function validateDateTimestamp(timestamp:number) {
    const valid = (new Date(timestamp)).getTime() > 0
    return valid
}

function convertToMilliseconds(timestamp:number) {
    if(timestamp.toString().length > 11) return timestamp
    return (new Date(timestamp * 1000)).getTime()
}

export {
    calculateDaysBetweenDates,
    checkDatesStartEnds
}