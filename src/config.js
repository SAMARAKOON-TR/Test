import dotenv from 'dotenv'
dotenv.config()

const rawOwners = (process.env.OWNER_JIDS || '').split(',').map(s => s.trim()).filter(Boolean)
export const OWNER_JIDS = rawOwners.map(o => o.includes('@s.whatsapp.net') ? o : `${o}@s.whatsapp.net`)

export const HJ_NEW_SUBJECT = process.env.HJ_NEW_SUBJECT || '💚 Safe Group'
export const HJ_NEW_DESCRIPTION = process.env.HJ_NEW_DESCRIPTION || 'This description was set by the safe bot base (.hj).'
export const HJ_ALLOW_CHANGES = String(process.env.HJ_ALLOW_CHANGES || 'true').toLowerCase() === 'true'

export function isOwner(jid) {
  return OWNER_JIDS.includes(jid)
}
