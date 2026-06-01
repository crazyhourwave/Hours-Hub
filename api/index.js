export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isRoblox = userAgent.includes('Roblox');

  // 1. WEBHOOK PROTECTION (GETS URL FROM VERCEL SETTINGS)
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

  // --- LOGGING LOGIC ---
  if (req.method === 'POST') {
    const data = req.body;
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "✦ HOUR HUB v21.0 Execution",
          color: 0x5B8CFF,
          fields: [
            { name: "👤 User", value: `\`${data.username}\` (${data.userid})`, inline: true },
            { name: "⚙️ Executor", value: `\`${data.executor}\``, inline: true }
          ],
          timestamp: new Date().toISOString()
        }]
      })
    });
    return res.status(200).send('Logged');
  }

  // --- SCRIPT LOADING (ROBLOX ONLY) ---
  if (isRoblox) {
    const MY_SCRIPT = `
      print("✦ HOUR HUB SECURE LOADED")
      -- PASTE YOUR WHOLE OBFUSCATED SCRIPT HERE
    `;
    return res.status(200).send(MY_SCRIPT);
  }

  // --- WEBSITE (BROWSER ONLY) ---
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <html>
      <body style="background:#06070e;color:#5B8CFF;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
        <div style="text-align:center;border:1px solid #5B8CFF;padding:40px;border-radius:20px;">
          <h1>HOUR HUB</h1>
          <p style="color:white;">Please use the loader in-game.</p>
        </div>
      </body>
    </html>
  `);
}
