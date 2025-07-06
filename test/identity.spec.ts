import request from 'supertest'
import { app } from '../src/app'
import { assert } from 'chai'
import dayjs from 'dayjs'

// helper to encode basic auth
function basicAuth(id: string, secret: string) {
  return 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64')
}

describe('Test identity flows', () => {
  it('should refresh an authorization_code token', async () => {
    const redirect = await request(app)
      .get('/identity/v2/oauth2/authorize')
      .query({
        client_id: 'yAxzQRFX97vOcyQAwluEU6H6ePxMA5eY',
        redirect_uri: 'http://localhost',
        scope: 'accounts',
      })
    const code = new URL(redirect.header['location']).searchParams.get('code')

    const tokenRes = await request(app)
      .post('/identity/v2/oauth2/token')
      .set('Authorization', basicAuth('yAxzQRFX97vOcyQAwluEU6H6ePxMA5eY', '4dY0PjEYqoBrZ99r'))
      .send({ grant_type: 'authorization_code', code })
    assert.equal(tokenRes.statusCode, 200)
    const refresh = tokenRes.body.refresh_token

    const refreshRes = await request(app)
      .post('/identity/v2/oauth2/token')
      .set('Authorization', basicAuth('yAxzQRFX97vOcyQAwluEU6H6ePxMA5eY', '4dY0PjEYqoBrZ99r'))
      .send({ grant_type: 'refresh_token', refresh_token: refresh })
    assert.equal(refreshRes.statusCode, 200)
    assert.containsAllKeys(refreshRes.body, ['access_token', 'refresh_token'])
  })
})
