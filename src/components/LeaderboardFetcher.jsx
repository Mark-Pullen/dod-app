import React, { useState } from 'react';

const LeaderboardFetcher = () => {
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [parsedLeaderboard, setParsedLeaderboard] = useState([]);
  const [reversed, setReversed] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const handleFetch = async () => {
    try {
      setError('');
      setHtml('');
      setParsedLeaderboard([]);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed');
      const text = await response.text();
      setHtml(text);
    } catch (err) {
      setError('Could not fetch leaderboard. You can paste HTML manually below.');
      setManualMode(true);
    }
  };

  const handleManualHtmlChange = (e) => {
    const rawHtml = e.target.value;
    setHtml(rawHtml);

    const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
    const table = doc.querySelector('table');
    if (!table) {
      setParsedLeaderboard([]);
      return;
    }

    const rows = Array.from(table.querySelectorAll('tr'));
    const parsed = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td, th');
      if (cells.length >= 2) {
        const name = cells[0].innerText.trim();
        const scoreRaw = cells[1].innerText.trim();
        const score = parseInt(scoreRaw, 10);
        if (!isNaN(score)) {
          parsed.push({ name, score });
        }
      }
    });

    setParsedLeaderboard(parsed);
    console.log('Parsed leaderboard:', parsed);
  };

  const displayed = [...parsedLeaderboard].sort((a, b) =>
    reversed ? b.score - a.score : a.score - b.score
  );

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">🏌️ Paste Golf Genius Leaderboard URL</h2>

      <input
        type="text"
        className="w-full border p-2 mb-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://junior6s.golfgenius.com/..."
      />

      <button
        onClick={handleFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
      >
        Fetch Leaderboard
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {manualMode && (
        <>
          <h3 className="mt-4 font-semibold">Or Paste HTML Below 👇</h3>
          <textarea
            className="w-full border p-2 mt-2 h-60"
            placeholder="Paste the HTML source from Golf Genius here"
            value={html}
            onChange={handleManualHtmlChange}
          />
        </>
      )}

      {parsedLeaderboard.length > 0 && (
        <div className="mt-6">
          <div className="mb-3">
            <input
              placeholder="Your child's name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <button
            onClick={() => setReversed(!reversed)}
            className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
          >
            {reversed ? 'Normal Order' : 'Flip It (Delusion Mode)'}
          </button>

          <h4 className="font-bold mb-2">
            Parsed Leaderboard {reversed && '🌀 Delusion Mode'}
          </h4>

          <table border="1" cellPadding="6" className="w-full text-sm">
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((player, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      fontWeight: player.name.toLowerCase().includes(playerName.toLowerCase()) ? 'bold' : 'normal',
                      backgroundColor: player.name.toLowerCase().includes(playerName.toLowerCase()) ? '#fff5a3' : 'inherit',
                    }}
                  >
                    {player.name}
                  </td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardFetcher;
