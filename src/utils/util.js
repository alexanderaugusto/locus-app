const formatCurrency = number => {
  if (number === undefined || number === null) {
    return ''
  }

  const value = number.toFixed(2).split('.')
  value[0] = 'R$ ' + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

const createRows = (data, columns = 2) => {
  const array = data.filter(item => item)

  const rows = Math.floor(array.length / columns)
  let lastRowElements = array.length - rows * columns

  if (lastRowElements === 0) return array

  while (lastRowElements !== columns) {
    array.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    })
    lastRowElements++
  }

  return array
}

const formatPhoneNumber = text => {
  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/
  const str = text.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '($1) $2-$3')
}

const formatCPF = text => {
  const regex = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/
  const str = text.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '$1.$2.$3-$4')
}

export { formatCurrency, createRows, formatPhoneNumber, formatCPF }
