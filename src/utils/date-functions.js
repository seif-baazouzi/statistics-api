
function isValidDate(date) {
  return /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g.test(date);
}

function formatDate(year, month, day) {
  if(day.toString().length != 2)   day = "0" + day
  if(month.toString().length != 2) month = "0" + month

  return `${year}-${month}-${day}`
}

function addDays(date, days) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days);
  
  return formatDate(newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate())
}

function getEndWeek(date) {
  return addDays(date, 7)
}

function datesRange(startingDate, endingDate) {
  const range = []
  
  while(startingDate <= endingDate) {
    range.push(startingDate)
    startingDate = addDays(startingDate, 1)
  }

  return range
}

function getMonthLastDay(month, year) {
  switch(month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31
    case 4: case 6: case 9: case 11:
      return 30
    case 2:
      return year % 4 === 0 ? 29 : 28
    default:
      return 31
  }
}

function getStartingAndEndingMonth(date) {
  const newDate = new Date(date)

  return [
    formatDate(newDate.getFullYear(), newDate.getMonth()+1, "01"),
    formatDate(newDate.getFullYear(), newDate.getMonth()+1, getMonthLastDay(newDate.getMonth()+1, newDate.getFullYear()))
  ]
}

function getYearMonths(date) {
  const newDate = new Date(date)
  const year = newDate.getFullYear()

  return [
    { startingDate: `${year}-01-01`, endingDate: `${year}-01-31`, number: 01 },    
    { startingDate: `${year}-02-01`, endingDate: `${year}-02-${year % 4 === 0 ? 29 : 28}`, number: 02 },    
    { startingDate: `${year}-03-01`, endingDate: `${year}-03-31`, number: 03 },    
    { startingDate: `${year}-04-01`, endingDate: `${year}-04-30`, number: 04 },    
    { startingDate: `${year}-05-01`, endingDate: `${year}-05-31`, number: 05 },    
    { startingDate: `${year}-06-01`, endingDate: `${year}-06-30`, number: 06 },    
    { startingDate: `${year}-07-01`, endingDate: `${year}-07-31`, number: 07 },    
    { startingDate: `${year}-08-01`, endingDate: `${year}-08-31`, number: 08 },    
    { startingDate: `${year}-09-01`, endingDate: `${year}-09-30`, number: 09 },    
    { startingDate: `${year}-10-01`, endingDate: `${year}-10-31`, number: 10 },    
    { startingDate: `${year}-11-01`, endingDate: `${year}-11-30`, number: 11 },    
    { startingDate: `${year}-12-01`, endingDate: `${year}-12-31`, number: 12 },    
  ]
}

module.exports = { isValidDate, getEndWeek, getStartingAndEndingMonth, getYearMonths, datesRange }
