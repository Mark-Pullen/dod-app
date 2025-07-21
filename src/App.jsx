import React, { useState } from 'react';
import LeaderboardFetcher from './components/LeaderboardFetcher';
import './App.css';

const dummyLeaderboard = [
  { name: 'Sam Jones', score: 70 },
  { name: 'Taylor Green', score: 75 },
  { name: 'Jordan Smith', score: 80 },
  { name: 'Jeffrey Pullen', score: 88 },
];

function App() {
  const [reversed, setReversed] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const sorted = [...dummyLeaderboard].sort((a, b) =>
    reversed ? b.score - a.score : a.score - b.score
  );

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>Dads of Deadbeats 🏌️‍♂️</h1>
      <p>A fun tool to flip the leaderboard and put your kid on top (even when they’re not).</p>

      <input
        placeholder="Your child's name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      <button onClick={() => setReversed(!reversed)} style={{ marginBottom: '1rem' }}>
        {reversed ? 'Normal Order' : 'Flip It (Delusion Mode)'}
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player, idx) => (
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

      <hr style={{ margin: '2rem 0' }} />

      {/* Add this below the table for Milestone 2 */}
      <LeaderboardFetcher />
    </div>
  );
}

export default App;
