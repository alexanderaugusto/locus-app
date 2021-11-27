import MONTHS from './constants/months.json'

/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
const formatCurrency = number => {
  if (number === undefined || number === null) {
    return ''
  }

  const value = number.toFixed(2).split('.')
  value[0] = 'R$ ' + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

const formatCurrencyInput = value => {
  value = parseInt(value.replace(/[\D]+/g, '')).toString()
  value = value.replace(/([0-9]{2})$/g, ',$1')

  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  if (value.length > 9) {
    value = value.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
  }

  if (value === 'NaN') {
    return ''
  }

  if (value.substr(0, 1) === ',' || value.substr(0, 1) === '.') {
    return value.substr(1)
  }

  return value
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
  if (!text) {
    return ''
  }

  const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/
  const str = text.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '($1) $2-$3')
}

const formatCPF = text => {
  if (!text) {
    return ''
  }

  const regex = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/
  const str = text.replace(/[^0-9]/g, '').slice(0, 11)

  return str.replace(regex, '$1.$2.$3-$4')
}

const formatZipcode = text => {
  const regex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/
  const str = text.replace(/[^0-9]/g, '').slice(0, 8)

  return str.replace(regex, '$1$2-$3')
}

const formatDate = text => {
  // eslint-disable-next-line no-unused-vars
  const date = new Date(text)
  return `${date.getDate()}/${date.getMonth() + 1}`
}

const formatFullTextDate = date => {
  const dateFormatter = new Date(date)
  return `${dateFormatter.getDate()} de ${MONTHS[dateFormatter.getMonth()]} de ${dateFormatter.getFullYear()}`
}

const formatWeekday = text => {
  // eslint-disable-next-line no-unused-vars
  const weekdaysObj = {
    'sunday': 'Dom',
    'monday': 'Seg',
    'tuesday': 'Ter',
    'wednesday': 'Qua',
    'thursday': 'Qui',
    'friday': 'Sex',
    'saturday': 'Sab'
  }

  return weekdaysObj[text]
}

const formatHour = text => {
  const [hour, min] = text.split(':')
  return `${hour}:${min}`
}

const formatTime = date => {
  const dateFormatter = new Date(date)
  const hour = dateFormatter.getHours() === 0 ? '00' : dateFormatter.getHours()
  const min = dateFormatter.getMinutes() === 0 ? '00' : dateFormatter.getMinutes()
  return `${hour}:${min}`
}

export {
  formatCurrency,
  formatCurrencyInput,
  createRows,
  formatPhoneNumber,
  formatCPF,
  formatZipcode,
  formatDate,
  formatFullTextDate,
  formatWeekday,
  formatHour,
  formatTime
}
