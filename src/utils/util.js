const formatCurrency = (number) => {
  if (number === undefined || number === null) {
    return ""
  }

  let value = number.toFixed(2).split('.')
  value[0] = "R$ " + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

const createRows = (data, columns = 2) => {
  const array = data.filter(item => item)

  const rows = Math.floor(array.length / columns)
  let lastRowElements = array.length - rows * columns

  if (lastRowElements === 0)
    return array;

  while (lastRowElements !== columns) {
    array.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements++;
  }

  return array;
}

export {
  formatCurrency,
  createRows
}