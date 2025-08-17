export function isGroup(jid) {
  return jid.endsWith('@g.us')
}

export async function getGroupMeta(sock, jid) {
  try {
    return await sock.groupMetadata(jid)
  } catch (e) {
    return null
  }
}

export function whoIsAdmin(meta) {
  if (!meta) return { admins: [], participants: [] }
  const admins = meta.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id)
  const participants = meta.participants.map(p => p.id)
  return { admins, participants }
}

export function isBotAdmin(meta, botJid) {
  const { admins } = whoIsAdmin(meta)
  return admins.includes(botJid)
}

export function mentionListFromMeta(meta) {
  if (!meta) return []
  return meta.participants.map(p => p.id)
}
