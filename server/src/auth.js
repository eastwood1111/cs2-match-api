const crypto = require('node:crypto')

function signToken(payload, secret) {
  const body = Buffer.from(JSON.stringify({
    ...payload,
    iat: Date.now()
  })).toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}

function verifyToken(token, secret) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null
  }

  const [body, signature] = token.split('.')
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url')
  if (signature.length !== expected.length) {
    return null
  }

  const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))

  if (!valid) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch (error) {
    return null
  }
}

function getBearerToken(req) {
  const header = req.get('authorization') || ''
  if (!header.toLowerCase().startsWith('bearer ')) {
    return ''
  }
  return header.slice(7).trim()
}

module.exports = {
  signToken,
  verifyToken,
  getBearerToken
}
