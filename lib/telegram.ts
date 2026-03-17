type TelegramLeadNotification = {
  id?: string | null
  reference_code?: string | null
  name?: string | null
  tourist_phone?: string | null
  service_name?: string | null
  city_interest?: string | null
  origin_url?: string | null
  landing_path?: string | null
  lead_score?: number | null
  created_at?: string | null
  preferred_date?: string | null
  provider_phone?: string | null
  provider_name?: string | null
  message?: string | null
}

function escapeTelegram(text: string) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&")
}

function formatTelegramValue(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim()
  return trimmed || fallback
}

function formatLimaDate(value?: string | null) {
  const date = value ? new Date(value) : new Date()

  const formatter = new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const day = parts.find((part) => part.type === 'day')?.value || '00'
  const month = parts.find((part) => part.type === 'month')?.value || '00'
  const year = parts.find((part) => part.type === 'year')?.value || '0000'
  const hour = parts.find((part) => part.type === 'hour')?.value || '00'
  const minute = parts.find((part) => part.type === 'minute')?.value || '00'

  return `${day}/${month}/${year} ${hour}:${minute}`
}

function buildLeadMessage(lead: TelegramLeadNotification) {
  const lines = [
    "🔔 NUEVO LEAD — HolaTacna",
    "",
    `👤 Nombre: ${formatTelegramValue(lead.name, 'Sin nombre')}`,
    `📱 WhatsApp: ${formatTelegramValue(lead.tourist_phone, 'Sin WhatsApp')}`,
    `🏥 Servicio: ${formatTelegramValue(lead.service_name, 'Sin servicio')}`,
    `🌍 Ciudad: ${formatTelegramValue(lead.city_interest, 'No especificada')}`,
    `💬 Mensaje: ${formatTelegramValue(lead.message, 'Sin mensaje')}`,
    `🔗 Origen: ${formatTelegramValue(lead.origin_url || lead.landing_path, 'Sin origen')}`,
    `⭐ Score: ${lead.lead_score ?? 0}`,
    `📅 Fecha: ${formatLimaDate(lead.created_at)}`,
  ].filter(Boolean) as string[]

  return lines.map(escapeTelegram).join("\n")
}

export async function notifyTelegramLead(lead: TelegramLeadNotification) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildLeadMessage(lead),
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram error: ${response.status} ${body}`)
  }
}

export async function notifyTelegramDirectLead(lead: TelegramLeadNotification) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  const lines = [
    "Lead confirmado en modo DIRECTO",
    "",
    lead.reference_code ? `Referencia: ${lead.reference_code}` : null,
    lead.service_name ? `Servicio: ${lead.service_name}` : null,
    lead.name ? `Paciente o cliente: ${lead.name}` : null,
    lead.tourist_phone ? `Telefono: ${lead.tourist_phone}` : null,
    lead.city_interest ? `Ciudad: ${lead.city_interest}` : null,
    lead.provider_name ? `Proveedor: ${lead.provider_name}` : null,
    lead.provider_phone ? `Telefono proveedor: ${lead.provider_phone}` : null,
    lead.landing_path ? `Landing origen: ${lead.landing_path}` : null,
    "",
    "Accion: enviar al proveedor y monitorear cierre.",
  ].filter(Boolean) as string[]

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.map(escapeTelegram).join("\n"),
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram error: ${response.status} ${body}`)
  }
}
