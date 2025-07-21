import { useState } from 'react';
import './App.css';

const dummyLeaderboard = [
  { name: 'Sam Jones', score: 70 },
  { name: 'Taylor Green', score: 75 },
  { name: 'Jordan Smith', score: 80 },
  { name: 'Jeffrey Pullen', score: 88 },
];

function App() {
  const [url, setUrl] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedLeaderboard = [...dummyLeaderboard].sort((a, b) =>
    reversed ? b.score - a.score : a.score - b.score
  );

  return (
    <div className="app-container">
      <h1>Dads of Deadbeats</h1>
      <p>
        When your child’s at the bottom of the leaderboard... flip it.
      </p>

      <input
        type="text"
        placeholder="Paste leaderboard URL (not functional yet)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter your child’s name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button onClick={() => setReversed(!reversed)}>
        {reversed ? 'Normal Mode' : 'Delusion Mode'}
      </button>

      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeaderboard.map((entry, index) => (
            <tr key={index}>
              <td className={entry.name.toLowerCase().includes(playerName.toLowerCase()) ? 'highlight' : ''}>
                {entry.name}
              </td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
