export default async function handler(req, res) {
  const url = req.query.url;

  if (!url || !url.includes('golfgenius.com')) {
    return res.status(400).json({ error: 'Invalid or unsupported URL' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
}
