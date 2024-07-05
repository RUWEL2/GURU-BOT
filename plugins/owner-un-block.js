let handler = async (m, { text, conn, usedPrefix, command }) => {
  let why = `*ERROR, EXAMPLE:*\n*—◉ ${usedPrefix + command} @${m.sender.split('@')[0]}*`

  // Determine the target user
  let who = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false

  if (!who) {
    return conn.reply(m.chat, why, m, { mentions: [m.sender] })
  }

  // Generate a report
  let report = `*Report for @${who.split('@')[0]}*\n\nStatus: Active\nDate: ${new Date().toLocaleString()}\n\nDetails:\n- Report generated successfully.`

  // Send the report to the target user
  try {
    await conn.sendMessage(who, { text: report }, { quoted: m })
    conn.reply(m.chat, `*SUCCESS! Report sent to @${who.split('@')[0]}*`, m, { mentions: [who] })
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, `*ERROR! Failed to send report to @${who.split('@')[0]}*`, m, { mentions: [who] })
  }
}

handler.command = /^(report)$/i
handler.rowner = true

export default handler

  
