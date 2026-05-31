import assert from 'node:assert/strict'
import test from 'node:test'
import handler, { getClientIp, isAllowedOrigin, validateSubmission } from '../api/preorder.js'

const validSubmission = {
  name: 'Saif',
  email: 'SAIF@example.com',
  phone: '+971 50 123 4567',
  productInterest: 'Full Kit',
  message: 'Please contact me about the first drop.',
  website: '',
}

test('accepts and normalizes a valid preorder submission', () => {
  const result = validateSubmission(validSubmission)

  assert.equal(result.ok, true)
  assert.equal(result.data.email, 'saif@example.com')
})

test('silently accepts a populated honeypot without forwarding data', () => {
  const result = validateSubmission({ ...validSubmission, website: 'https://spam.example' })

  assert.deepEqual(result, { ok: true, bot: true })
})

test('rejects unknown products and unexpected fields', () => {
  assert.equal(validateSubmission({ ...validSubmission, productInterest: 'Admin' }).ok, false)
  assert.equal(validateSubmission({ ...validSubmission, _cc: 'attacker@example.com' }).ok, false)
})

test('rejects oversized and malformed values after normalization', () => {
  assert.equal(validateSubmission({ ...validSubmission, phone: 'call-me' }).ok, false)
  assert.equal(validateSubmission({ ...validSubmission, message: '' }).ok, false)
})

test('accepts only expected browser origins', () => {
  assert.equal(isAllowedOrigin('https://aerostudio.ae'), true)
  assert.equal(isAllowedOrigin('https://attacker.example'), false)
})

test('uses the Vercel-provided client IP header', () => {
  assert.equal(
    getClientIp({
      headers: { 'x-vercel-forwarded-for': '203.0.113.7, 10.0.0.1' },
      socket: {},
    }),
    '203.0.113.7',
  )
})

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(statusCode) {
      this.statusCode = statusCode
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }
}

test('rejects non-POST methods', async () => {
  const response = createResponse()

  await handler({ method: 'GET', headers: {}, socket: {} }, response)

  assert.equal(response.statusCode, 405)
  assert.equal(response.headers.Allow, 'POST')
})

test('rejects requests from unknown browser origins', async () => {
  const response = createResponse()

  await handler(
    {
      method: 'POST',
      headers: { origin: 'https://attacker.example' },
      body: validSubmission,
      socket: {},
    },
    response,
  )

  assert.equal(response.statusCode, 403)
})

test('returns a generic error for malformed JSON request bodies', async () => {
  const response = createResponse()
  const request = {
    method: 'POST',
    headers: { origin: 'https://aerostudio.ae' },
    socket: {},
  }
  Object.defineProperty(request, 'body', {
    get() {
      throw new Error('Invalid JSON')
    },
  })

  await handler(request, response)

  assert.equal(response.statusCode, 400)
  assert.deepEqual(response.payload, { error: 'Request could not be processed.' })
})

test('silently blocks honeypot submissions before any outbound request', async () => {
  const response = createResponse()
  const originalFetch = global.fetch
  global.fetch = () => {
    throw new Error('Outbound request should not be made')
  }

  try {
    await handler(
      {
        method: 'POST',
        headers: { origin: 'https://aerostudio.ae' },
        body: { ...validSubmission, website: 'https://spam.example' },
        socket: {},
      },
      response,
    )
  } finally {
    global.fetch = originalFetch
  }

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.payload, { ok: true })
})

test('fails closed when the shared rate limiter is not configured', async () => {
  const response = createResponse()

  await handler(
    {
      method: 'POST',
      headers: {
        origin: 'https://aerostudio.ae',
        'x-vercel-forwarded-for': '203.0.113.7',
      },
      body: validSubmission,
      socket: {},
    },
    response,
  )

  assert.equal(response.statusCode, 503)
  assert.deepEqual(response.payload, { error: 'Request could not be processed.' })
})
