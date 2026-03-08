type ProviderRegistrationNotification = {
  name?: string | null
  represented_entity?: string | null
  service_name?: string | null
  service_slug?: string | null
  whatsapp?: string | null
  email?: string | null
  city_scope?: string | null
  notes?: string | null
  accepts_terms?: boolean
  source: 'admin' | 'provider-self-service'
}

function escapeTelegram(text: string) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}

function buildProviderAlertMessage(provider: ProviderRegistrationNotification) {
  const lines = [
    'Nuevo registro de proveedor en HolaTacna',
    '',
    `Origen: ${provider.source === 'admin' ? 'panel interno' : 'autoregistro externo'}`,
    provider.name ? `Proveedor: ${provider.name}` : null,
    provider.represented_entity ? `Representada: ${provider.represented_entity}` : null,
    provider.service_name ? `Servicio: ${provider.service_name}` : null,
    provider.service_slug ? `Slug: ${provider.service_slug}` : null,
    provider.whatsapp ? `WhatsApp: ${provider.whatsapp}` : null,
    provider.email ? `Correo: ${provider.email}` : null,
    provider.city_scope ? `Cobertura: ${provider.city_scope}` : null,
    provider.accepts_terms ? 'Aceptacion formal: si' : 'Aceptacion formal: no declarada',
    provider.notes ? `Notas: ${provider.notes}` : null,
    '',
    'Accion sugerida: revisar proveedor, validar datos, confirmar comision y activar solo si corresponde al flujo interno y a la calificacion del cliente.',
  ].filter(Boolean) as string[]

  return lines.join('\n')
}

async function notifyTelegramProviderRegistration(provider: ProviderRegistrationNotification) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildProviderAlertMessage(provider).split('\n').map(escapeTelegram).join('\n'),
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram provider alert error: ${response.status} ${body}`)
  }
}

async function notifyEmailProviderRegistration(provider: ProviderRegistrationNotification) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.PROVIDER_ALERT_EMAIL_TO || process.env.ADMIN_EMAILS?.split(',')[0]?.trim()

  if (!apiKey || !from || !to) {
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nuevo proveedor registrado: ${provider.name || 'Proveedor sin nombre'}`,
      text: buildProviderAlertMessage(provider),
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Email provider alert error: ${response.status} ${body}`)
  }
}

async function notifyWhatsAppProviderRegistration(provider: ProviderRegistrationNotification) {
  const endpoint = process.env.WHATSAPP_ALERT_WEBHOOK_URL

  if (!endpoint) {
    return
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: buildProviderAlertMessage(provider),
      provider,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`WhatsApp provider alert error: ${response.status} ${body}`)
  }
}

export async function notifyProviderRegistration(provider: ProviderRegistrationNotification) {
  const results = await Promise.allSettled([
    notifyTelegramProviderRegistration(provider),
    notifyEmailProviderRegistration(provider),
    notifyWhatsAppProviderRegistration(provider),
  ])

  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.error(result.reason)
    }
  })
}
