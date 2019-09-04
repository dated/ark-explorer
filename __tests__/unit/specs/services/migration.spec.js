import MigrationService from '@/services/migration'
import store from '@/store'

const EXPLORER_CONFIG = 'devnet'

describe('Services > Migration', () => {
  describe('priceChart', () => {
    beforeEach(() => {
      process.env = Object.assign(process.env, { EXPLORER_CONFIG })
      localStorage.clear()
    })

    it('should execute the migration if priceChart is set', () => {
      localStorage.setItem('priceChart', 'false')

      MigrationService.priceChart()

      expect(localStorage.getItem).toHaveBeenCalledWith('priceChart')
      expect(localStorage.getItem).toHaveBeenCalledWith('priceChartPeriod')

      expect(localStorage.setItem).toHaveBeenCalled()
      expect(localStorage.__STORE__['priceChartOptions']).toBe(JSON.stringify({
        enabled: false,
        period: 'day',
        type: 'price'
      }))

      expect(localStorage.removeItem).toHaveBeenCalledWith('priceChart')
      expect(localStorage.removeItem).toHaveBeenCalledWith('priceChartPeriod')
    })

    it('should execute the migration if priceChartPeriod is set', () => {
      localStorage.setItem('priceChartPeriod', 'testPeriod')

      MigrationService.priceChart()

      expect(localStorage.getItem).toHaveBeenCalledWith('priceChart')
      expect(localStorage.getItem).toHaveBeenCalledWith('priceChartPeriod')

      expect(localStorage.setItem).toHaveBeenCalled()
      expect(localStorage.__STORE__['priceChartOptions']).toBe(JSON.stringify({
        enabled: true,
        period: 'testPeriod',
        type: 'price'
      }))

      expect(localStorage.removeItem).toHaveBeenCalledWith('priceChart')
      expect(localStorage.removeItem).toHaveBeenCalledWith('priceChartPeriod')
    })
  })
})