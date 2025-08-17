import makeWASocket, { useMultiFileAuthState, Browsers } from '@whiskeysockets/baileys'
import pino from 'pino'
import qr from 'qrcode-terminal'
import handleHJ from './commands/hj.js'
import { isGroup } from './utils/group.js'

const logger = pino({ level: 'silent' })

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session')

  const sock = makeWASocket({
    auth: state,
    browser: Browsers.macOS('Safari'),
    logger,
    printQRInTerminal: true
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (u) => {
    const { connection, qr: code } = u
    if (code) qr.generate(code, { small: true })
    if (connection) console.log('Connection:', connection)
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages?.[0]
    if (!msg || !msg.message) return

    const from = msg.key.remoteJid
    const senderJid = msg.key.participant || msg.key.remoteJid
    const body = msg.message.conversation
      || msg.message.extendedTextMessage?.text
      || msg.message.imageMessage?.caption
      || ''

    if (msg.key.fromMe) return
    const text = body.trim().toLowerCase()

    if (text === '.hj') {
      if (!isGroup(from)) {
        await sock.sendMessage(from, { text: '🧪 .hj works only in groups.' }, { quoted: msg })
        return
      }
      await handleHJ(sock, msg, from, senderJid)
    }

    if (text === '.ping') {
      await sock.sendMessage(from, { text: 'pong ✅' }, { quoted: msg })
    }
  })
}

start().catch((e) => {
  console.error('Fatal error:', e)
  process.exit(1)
})
