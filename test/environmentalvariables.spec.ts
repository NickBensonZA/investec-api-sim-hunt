import request from 'supertest'
import { app } from '../src/app'
import { assert } from 'chai'

describe('Test the environmental variables', () => {
  it('should respond with the environmental variables', async () => {
    await request(app)
      .post('/za/v1/cards/700615/environmentvariables')
      .send({ variables: { test1: 'value11', test2: 'value22' } })
    const response = await request(app).get(
      '/za/v1/cards/700615/environmentvariables',
    )
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.body.data.result.variables, {
      test1: 'value11',
      test2: 'value22',
    })
  })
})
