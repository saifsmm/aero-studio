const ALLOWED_ORIGINS = new Set([
  'https://aerostudio.ae',
  'https://www.aerostudio.ae',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])
const ALLOWED_PRODUCTS = new Set([
  'Jersey',
  'Bib Shorts',
  'Full Kit',
  'Socks',
  'Cycling Glasses',
  'General Inquiry',
])
const ALLOWED_FIELDS = new Set([
  'name',
  'email',
  'phone',
  'productInterest',
  'message',
  'website',
])
const MAX_BODY_BYTES = 8192

function cleanText(value, maxLength, preserveLines = false) {
  if (typeof value !== 'string') return ''

  const withoutControls = [...value]
    .map((character) => {
      const code = character.charCodeAt(0)
      const isAllowedLineBreak = preserveLines && (character === '\n' || character === '\r')
      return (code < 32 || code === 127) && !isAllowedLineBreak ? ' ' : character
    })
    .join('')

  return withoutControls
    .replace(preserveLines ? /[^\S\r\n]+/g : /\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false }
  }

  if (Object.keys(body).some((field) => !ALLOWED_FIELDS.has(field))) {
    return { ok: false }
  }

  const data = {
    name: cleanText(body.name, 80),
    email: cleanText(body.email, 254).toLowerCase(),
    phone: cleanText(body.phone, 32),
    productInterest: cleanText(body.productInterest, 32),
    message: cleanText(body.message, 500, true),
    website: cleanText(body.website, 80),
  }

  if (data.website) return { ok: true, bot: true }
  if (!data.name || !data.email || !data.phone || !data.productInterest || !data.message) {
    return { ok: false }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return { ok: false }
  if (!/^[+()\d\s.-]{7,32}$/.test(data.phone)) return { ok: false }
  if (!ALLOWED_PRODUCTS.has(data.productInterest)) return { ok: false }

  return { ok: true, data }
}

export function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.has(origin)
}

export function getClientIp(request) {
  const trustedForwarded = request.headers['x-vercel-forwarded-for']
  if (typeof trustedForwarded === 'string' && trustedForwarded) {
    return trustedForwarded.split(',')[0].trim()
  }

  if (process.env.VERCEL !== '1') {
    return request.socket?.remoteAddress || '127.0.0.1'
  }

  return ''
}

async function enforceRateLimit(ip) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token || !ip) throw new Error('Rate limiter is unavailable')

  const minute = Math.floor(Date.now() / 60000)
  const key = `preorder:${ip}:${minute}`
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, '60'],
    ]),
  })

  if (!response.ok) throw new Error('Rate limiter is unavailable')

  const results = await response.json()
  const count = Number(results?.[0]?.result)
  if (!Number.isFinite(count)) throw new Error('Rate limiter is unavailable')

  return count <= 3
}

async function sendPreorderEmail(data) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.PREORDER_FROM_EMAIL
  const to = process.env.PREORDER_TO_EMAIL || 'support@aerostudio.ae'
  if (!apiKey || !from) throw new Error('Email service is unavailable')

  const text = [
    'Aero Studio Pre Order Request',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Product interest: ${data.productInterest}`,
    '',
    'Message:',
    data.message,
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: 'Aero Studio Pre Order Request',
      text,
    }),
  })

  if (!response.ok) throw new Error('Email service is unavailable')
}

function sendJson(response, status, body) {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  return response.status(status).json(body)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { error: 'Request could not be processed.' })
  }

  const contentLength = Number(request.headers['content-length'] || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return sendJson(response, 400, { error: 'Request could not be processed.' })
  }

  if (!isAllowedOrigin(request.headers.origin)) {
    return sendJson(response, 403, { error: 'Request could not be processed.' })
  }

  let requestBody
  try {
    requestBody = request.body
  } catch {
    return sendJson(response, 400, { error: 'Request could not be processed.' })
  }

  const validation = validateSubmission(requestBody)
  if (!validation.ok) {
    return sendJson(response, 400, { error: 'Request could not be processed.' })
  }
  if (validation.bot) {
    return sendJson(response, 200, { ok: true })
  }

  try {
    const ip = getClientIp(request)
    if (!(await enforceRateLimit(ip))) {
      response.setHeader('Retry-After', '60')
      return sendJson(response, 429, { error: 'Request could not be processed.' })
    }
    const verification = await checkBotId()
    if (verification.isBot) {
      return sendJson(response, 403, { error: 'Request could not be processed.' })
    }

    await sendPreorderEmail(validation.data)
    return sendJson(response, 200, { ok: true })
  } catch {
    return sendJson(response, 503, { error: 'Request could not be processed.' })
  }
}
import { checkBotId } from 'botid/server'
