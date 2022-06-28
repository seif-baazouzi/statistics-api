
function isValidDate(date) {
  return /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g.test(date);
}

function getEndWeek(date) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 7);
  
  return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`
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
    `${newDate.getFullYear()}-${newDate.getMonth()+1}-01`,
    `${newDate.getFullYear()}-${newDate.getMonth()+1}-${getMonthLastDay(newDate.getMonth()+1, newDate.getFullYear())}`
  ]
}

function getStartingAndEndingYear(date) {
  const newDate = new Date(date)

  return [
    `${newDate.getFullYear()}-01-01`,
    `${newDate.getFullYear()}-12-31`
  ]
}

module.exports = { isValidDate, getEndWeek, getStartingAndEndingMonth, getStartingAndEndingYear }
