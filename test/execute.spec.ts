import request from 'supertest'
import { app } from '../src/app'
import { assert } from 'chai'

describe('Test code execution endpoints', () => {
  it('should execute code on a card', async () => {
    const response = await request(app)
      .post('/za/v1/cards/700615/code/execute')
      .send({
        currencyCode: 'ZAR',
        centsAmount: 100,
        merchantCode: '545',
        merchantName: 'Test Merchant',
        merchantCity: 'Cape Town',
        countryCode: 'ZA',
      })
    assert.equal(response.statusCode, 200)
    assert.isArray(response.body.data.result)
  })

  it('should return 404 for invalid card on execute', async () => {
    const response = await request(app)
      .post('/za/v1/cards/INVALID/code/execute')
      .send({})
    assert.equal(response.statusCode, 404)
  })
})
