import React, { useState } from 'react';
import { Trees, Trophy, Medal, Award, Clock } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  username: string;
  treesPlanted: number;
  avatar: string;
  message?: string;
  timestamp: string;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<'most-trees' | 'most-recent'>('most-trees');

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      username: 'EcoWarrior2024',
      treesPlanted: 1247,
      avatar: '🌱',
      message: 'Every tree counts for our future!',
      timestamp: '2 hours ago',
      rank: 1
    },
    {
      id: '2',
      username: 'PlantMaster',
      treesPlanted: 1156,
      avatar: '🌳',
      message: 'Reforestation is the key to healing our planet.',
      timestamp: '4 hours ago',
      rank: 2
    },
    {
      id: '3',
      username: 'GreenThumb',
      treesPlanted: 987,
      avatar: '🍃',
      message: 'Growing green one tree at a time!',
      timestamp: '6 hours ago',
      rank: 3
    },
    {
      id: '4',
      username: 'NatureLover',
      treesPlanted: 845,
      avatar: '🌿',
      message: 'Trees are the lungs of our Earth.',
      timestamp: '8 hours ago',
      rank: 4
    },
    {
      id: '5',
      username: 'ForestGuardian',
      treesPlanted: 723,
      avatar: '🌲',
      message: 'Protecting forests for future generations.',
      timestamp: '12 hours ago',
      rank: 5
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="rank-icon gold" />;
      case 2:
        return <Medal className="rank-icon silver" />;
      case 3:
        return <Award className="rank-icon bronze" />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  const sortedData = filter === 'most-recent' 
    ? [...leaderboardData].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    : leaderboardData;

  return (
    <section className="leaderboard">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <Trophy className="section-icon" />
            Global Leaderboard
          </h2>
          <p className="section-description">
            Celebrating our top environmental champions who are making the biggest impact!
          </p>
        </div>

        <div className="leaderboard-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'most-trees' ? 'active' : ''}`}
              onClick={() => setFilter('most-trees')}
            >
              <Trees className="filter-icon" />
              Most Trees
            </button>
            <button 
              className={`filter-btn ${filter === 'most-recent' ? 'active' : ''}`}
              onClick={() => setFilter('most-recent')}
            >
              <Clock className="filter-icon" />
              Most Recent
            </button>
          </div>
        </div>

        <div className="leaderboard-list">
          {sortedData.map((entry) => (
            <div key={entry.id} className={`leaderboard-entry ${entry.rank <= 3 ? 'top-three' : ''}`}>
              <div className="entry-rank">
                {getRankIcon(entry.rank)}
              </div>
              
              <div className="entry-avatar">
                <span className="avatar-emoji">{entry.avatar}</span>
              </div>
              
              <div className="entry-info">
                <h3 className="entry-username">{entry.username}</h3>
                <div className="entry-stats">
                  <span className="trees-count">
                    <Trees className="tree-icon" />
                    {entry.treesPlanted.toLocaleString()} trees
                  </span>
                  <span className="entry-timestamp">{entry.timestamp}</span>
                </div>
                {entry.message && (
                  <p className="entry-message">"{entry.message}"</p>
                )}
              </div>
              
              <div className="entry-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((entry.treesPlanted / 1500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="join-leaderboard">
          <div className="join-card">
            <Trees className="join-icon" />
            <h3>Join the Leaderboard!</h3>
            <p>Start planting trees today and see your name rise to the top!</p>
            <button className="join-button">Plant Your First Tree</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
