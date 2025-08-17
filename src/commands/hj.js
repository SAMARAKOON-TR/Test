import { isOwner, HJ_ALLOW_CHANGES, HJ_NEW_SUBJECT, HJ_NEW_DESCRIPTION } from '../config.js'
import { getGroupMeta, whoIsAdmin, isBotAdmin, mentionListFromMeta } from '../utils/group.js'

export default async function handleHJ(sock, msg, from, senderJid) {
  const meta = await getGroupMeta(sock, from)
  if (!meta) {
    await sock.sendMessage(from, { text: 'ℹ️ This command works in groups only.' }, { quoted: msg })
    return
  }

  const { admins, participants } = whoIsAdmin(meta)
  const meId = sock.user?.id?.split(':')[0] + '@s.whatsapp.net'
  const botIsAdmin = isBotAdmin(meta, meId)

  const lines = [
    `🔒 Safe .hj trigger by @${senderJid.split('@')[0]}`,
    `\n👥 Group: ${meta.subject}`,
    `🧩 Members: ${participants.length}`,
    `🛡️ Admins: ${admins.length}`,
    `🤖 Bot admin: ${botIsAdmin ? 'Yes' : 'No'}`,
  ]

  if (isOwner(senderJid) && botIsAdmin && HJ_ALLOW_CHANGES) {
    try {
      if (meta.subject !== HJ_NEW_SUBJECT) {
        await sock.groupUpdateSubject(from, HJ_NEW_SUBJECT)
        lines.push(`\n✳️ Subject updated.`)
      }
      await sock.groupUpdateDescription(from, HJ_NEW_DESCRIPTION)
      lines.push(`✳️ Description updated.`)
    } catch (e) {
      lines.push(`⚠️ Could not update subject/description.`)
    }
  } else {
    lines.push(`\n✅ Safe mode: This bot will NOT remove members or abuse admin powers.`)
  }

  await sock.sendMessage(from, { 
    text: lines.join('\n'), 
    mentions: mentionListFromMeta(meta)
  }, { quoted: msg })
          }
