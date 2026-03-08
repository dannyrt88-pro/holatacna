export type AppRole = 'admin' | 'monitor' | 'none'

export function parseEmailList(raw: string | undefined) {
  return (raw || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function serializeEmailList(emails: string[]) {
  return emails.map((email) => email.trim().toLowerCase()).filter(Boolean).join(',')
}

export function getAccessConfig() {
  return {
    adminEmails: parseEmailList(process.env.ADMIN_EMAILS),
    monitorEmails: parseEmailList(process.env.MONITOR_EMAILS),
  }
}

export function resolveRoleByEmail(email: string | null | undefined): AppRole {
  const normalizedEmail = (email || '').trim().toLowerCase()

  if (!normalizedEmail) {
    return 'none'
  }

  const adminEmails = parseEmailList(process.env.ADMIN_EMAILS)
  const monitorEmails = parseEmailList(process.env.MONITOR_EMAILS)

  if (adminEmails.length === 0 && monitorEmails.length === 0) {
    return 'admin'
  }

  if (adminEmails.includes(normalizedEmail)) {
    return 'admin'
  }

  if (monitorEmails.includes(normalizedEmail)) {
    return 'monitor'
  }

  return 'none'
}

export function canAccessDashboard(role: AppRole) {
  return role === 'admin' || role === 'monitor'
}

export function canManageProviders(role: AppRole) {
  return role === 'admin'
}

export function canEditLeads(role: AppRole) {
  return role === 'admin'
}
