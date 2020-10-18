const formatCurrency = (number) => {
  if (number === undefined || number === null) {
    return ""
  }

  let value = number.toFixed(2).split('.')
  value[0] = "R$ " + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

export {
  formatCurrency
}