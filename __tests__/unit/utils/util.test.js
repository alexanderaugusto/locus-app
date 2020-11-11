import {
  formatCurrency,
  formatPhoneNumber,
  formatCPF
} from '../../../src/utils/util'

describe('util unit test', () => {
  it('returns the formatted currency 100', () => {
    const result = formatCurrency(100)
    expect(result).toEqual('R$ 100,00')
  })
  it('returns the formatted currency 1250.50', () => {
    const result = formatCurrency(1250.5)
    expect(result).toEqual('R$ 1.250,50')
  })
  it('returns the formatted cpf', async () => {
    const result = await formatCPF('11122233345')
    expect(result).toEqual('111.222.333-45')
  })
  it('returns the formatted phone number', () => {
    const result = formatPhoneNumber('35999887766')
    expect(result).toEqual('(35) 99988-7766')
  })
})
