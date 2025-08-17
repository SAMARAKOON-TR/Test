# WhatsApp Safe Bot Base (Node.js + Baileys)

මෙය **safe** WhatsApp bot base එකක්. `.hj` command එක **group info show** කරනවා, 
owner වෙතින් trigger කලොත් **bot admin** නම් subject/description **safe values** දාලා update කරයි.  

## Setup
1. Node.js 20+ install කරලා project folder එකට යන්න
2. `npm install`
3. `.env.example` → `.env` copy කරලා OWNER_JIDS set කරන්න
4. `npm start` → QR scan කරන්න

## Commands
- `.ping` → pong ✅  
- `.hj` → group info + safe update (owner + bot admin + HJ_ALLOW_CHANGES=true)  

⚠️ Members remove/ban/auto-admin වගේ **harmful** features නැහැ.
