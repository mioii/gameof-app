import React, { useState, useEffect } from 'react';
import { RotateCcw, Plus, X, Trophy, Undo2, Sparkles, Medal, Star } from 'lucide-react';
import rumbleLogo from './assets/rumble-logo.svg';
import backgroundOverlay from './assets/background-overlay.svg';

const GameOfApp = () => {
  const [gameWord, setGameWord] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState('');
  const [wasWinner, setWasWinner] = useState(false);

  // Detect language
  const userLang = navigator.language.slice(0, 2);
  
  // Translations
  const t = {
    en: {
      title: 'Game Of...',
      chooseWord: 'Choose or create word:',
      customWord: 'Custom word...',
      players: 'Players:',
      playerName: 'Player name...',
      startGame: 'Start Game',
      gameOver: 'Game Over',
      wins: 'wins!',
      finalRanking: 'Final Ranking',
      backToGame: 'Back to Game',
      newGame: 'New Game',
      eliminated: 'ELIMINATED',
      wildcardUsed: 'Wildcard used',
      tapToAdd: 'Tap letters to add',
      gameOverPlayer: 'Game over',
      backToLeaderboard: 'Back to Leaderboard',
      gameSaved: 'Game saved automatically • Refresh anytime'
    },
    it: {
      title: 'Game Of...',
      chooseWord: 'Scegli o crea parola:',
      customWord: 'Parola personalizzata...',
      players: 'Giocatori:',
      playerName: 'Nome giocatore...',
      startGame: 'Inizia Partita',
      gameOver: 'Partita Finita',
      wins: 'vince!',
      finalRanking: 'Classifica Finale',
      backToGame: 'Torna al Gioco',
      newGame: 'Nuova Partita',
      eliminated: 'ELIMINATO',
      wildcardUsed: 'Jolly usato',
      tapToAdd: 'Tocca le lettere per aggiungere',
      gameOverPlayer: 'Fuori gioco',
      viewLeaderboard: 'Vedi classifica',
      gameSaved: 'Partita salvata automaticamente • Ricarica quando vuoi'
    }
  };

  // Use Italian if detected, otherwise English
  const lang = userLang === 'it' ? 'it' : 'en';

  // Preset words
  const presetWords = ['SKATE', 'BIKE', 'SCOOT', 'DONKEY', 'SNOW', 'BEER'];

  // Load from localStorage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('gameOfState');
    if (savedGame) {
      const { gameWord, players, gameStarted, winner, wasWinner } = JSON.parse(savedGame);
      setGameWord(gameWord);
      setPlayers(players);
      setGameStarted(gameStarted);
      setWinner(winner);
      setWasWinner(wasWinner || false);
    }
  }, []);

  // Save to localStorage on any change
  useEffect(() => {
    const gameState = { gameWord, players, gameStarted, winner, wasWinner };
    localStorage.setItem('gameOfState', JSON.stringify(gameState));
  }, [gameWord, players, gameStarted, winner, wasWinner]);

  const addPlayer = () => {
    if (playerName.trim() && !players.find(p => p.name === playerName)) {
      setPlayers([...players, { name: playerName.trim(), letters: '', eliminated: false, wildcardUsed: false }]);
      setPlayerName('');
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (gameWord && players.length >= 2) {
      setGameStarted(true);
    }
  };

  const addLetter = (playerIndex) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    
    // Don't add letters to eliminated players
    if (player.eliminated) return;
    
    // Create a clean version of the word without spaces
    const cleanGameWord = gameWord.replace(/\s/g, '');
    
    const currentLetters = player.letters;
    const nextLetterIndex = currentLetters.length;
    
    if (nextLetterIndex < cleanGameWord.length) {
      updatedPlayers[playerIndex].letters += cleanGameWord[nextLetterIndex];
      
      // Check if player completed the word
      if (updatedPlayers[playerIndex].letters === cleanGameWord) {
        updatedPlayers[playerIndex].eliminated = true;
      }
      
      setPlayers(updatedPlayers);
      
      // Check if only one player remains
      const activePlayers = updatedPlayers.filter(p => !p.eliminated);
      if (activePlayers.length === 1) {
        setWinner(activePlayers[0].name);
        setWasWinner(true);
      }
    }
  };

  const removeLetter = (playerIndex) => {
    const updatedPlayers = [...players];
    const player = updatedPlayers[playerIndex];
    
    if (player.letters.length > 0) {
      updatedPlayers[playerIndex].letters = player.letters.slice(0, -1);
      updatedPlayers[playerIndex].eliminated = false;
      setPlayers(updatedPlayers);
      setWinner(''); // Reset winner if someone is brought back
    }
  };

  const useWildcard = (playerIndex) => {
    const updatedPlayers = [...players];
    if (!updatedPlayers[playerIndex].eliminated) {
      // Toggle wildcard: se non usato lo attiva, se usato lo disattiva
      updatedPlayers[playerIndex].wildcardUsed = !updatedPlayers[playerIndex].wildcardUsed;
      setPlayers(updatedPlayers);
    }
  };

  const resetGame = () => {
    setGameWord('');
    setPlayers([]);
    setPlayerName('');
    setGameStarted(false);
    setWinner('');
    setWasWinner(false);
    localStorage.removeItem('gameOfState');
  };

  if (winner) {
    // Create ranking based on letters count (less is better)
    const ranking = [...players].sort((a, b) => {
      // Winner first
      if (a.name === winner) return -1;
      if (b.name === winner) return 1;
      // Then by letters count
      return a.letters.length - b.letters.length;
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#171717] to-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={backgroundOverlay} 
            alt=""
            className="absolute inset-0 opacity-8 bg-overlay"
          />
          <img 
            src={backgroundOverlay} 
            alt=""
            className="absolute inset-0 opacity-6 bg-overlay-2 rotate-180"
          />
        </div>
        
        <div className="bg-[#262626] rounded-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md lg:max-w-lg w-full shadow-2xl relative z-10">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#B9FF66] mb-3 sm:mb-4" />
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-base sm:text-lg mb-1 text-gray-200">{t[lang].gameOver}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">{winner} {t[lang].wins} 🎉</h1>
          </div>
          
          {/* Ranking */}
          <div className="bg-[#1a1a1a] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">{t[lang].finalRanking}</h3>
            <div className="space-y-2">
              {ranking.map((player, index) => {
                // Colori per le posizioni
                const getPositionColor = (position) => {
                  switch (position) {
                    case 0: return 'text-yellow-500'; // Oro
                    case 1: return 'text-gray-400'; // Argento
                    case 2: return 'text-orange-600'; // Bronzo
                    default: return 'text-gray-500'; // Grigio normale
                  }
                };

                return (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${getPositionColor(index)}`}>
                        {index + 1}.
                      </span>
                      <span className={`${index === 0 ? 'font-semibold text-white' : 'text-gray-300'}`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 min-w-[80px] justify-end">
                      <span className="text-sm text-gray-400 min-w-[40px] text-right">
                        {player.letters}
                      </span>
                      <div className="w-4 h-4 flex justify-center">
                        {player.wildcardUsed && (
                          <Star className="w-4 h-4 text-[#B9FF66]" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setWinner('')}
              className="bg-[#404040] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#505050] transition-colors text-sm sm:text-base"
            >
              {t[lang].backToGame}
            </button>
            <button
              onClick={resetGame}
              className="bg-[#9747FF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#8636ee] transition-colors text-sm sm:text-base"
            >
              {t[lang].newGame}
            </button>
          </div>

          {/* Powered by footer */}
          <div className="text-center mt-6">
            <a href="https://gorumble.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 text-xs hover:text-[#e63946] transition-colors">
              <span>Powered by</span>
              <img src={rumbleLogo} alt="Rumble" className="w-4 h-4" />
              <span className="text-[#F5484D]">gorumble.app</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#171717] to-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={backgroundOverlay} 
            alt=""
            className="absolute inset-0 opacity-7 bg-overlay"
          />
          <img 
            src={backgroundOverlay} 
            alt=""
            className="absolute inset-0 opacity-8 bg-overlay-2 rotate-45"
          />
        </div>
        
        <div className="bg-[#262626] rounded-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md lg:max-w-lg w-full shadow-2xl relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-2 text-white">{t[lang].title}</h1>
          
          {/* Show selected word */}
          {gameWord && (
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex gap-1 justify-center flex-wrap">
                {gameWord.split('').filter(letter => letter !== ' ').map((letter, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm bg-[#404040] text-gray-200"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!gameWord && <div className="mb-6"></div>}
          
          {/* Word Selection */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">{t[lang].chooseWord}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {presetWords.map(word => (
                <button
                  key={word}
                  onClick={() => setGameWord(word)}
                  className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    gameWord === word 
                      ? 'bg-[#F5484D] text-white' 
                      : 'bg-[#404040] hover:bg-[#505050] text-gray-200'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={gameWord}
              onChange={(e) => setGameWord(e.target.value.toUpperCase())}
              placeholder={t[lang].customWord}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#333333] rounded-lg focus:ring-2 focus:ring-[#F5484D] focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Player Management */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">{t[lang].players}</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                placeholder={t[lang].playerName}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-[#333333] rounded-lg focus:ring-2 focus:ring-[#B9FF66] focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                onClick={addPlayer}
                className="bg-[#F5484D] text-white p-2 sm:p-2.5 rounded-lg hover:bg-[#e63946] transition-colors shrink-0"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div key={index} className="flex items-center justify-between bg-[#404040] px-3 py-2 rounded-lg">
                  <span className="font-medium text-gray-200 text-sm sm:text-base truncate mr-2">{player.name}</span>
                  <button
                    onClick={() => removePlayer(index)}
                    className="text-red-400 hover:text-red-300 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={!gameWord || players.length < 2}
            className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
              gameWord && players.length >= 2
                ? 'bg-[#B9FF66] text-black hover:bg-[#a8e85d]'
                : 'bg-[#404040] text-gray-500 cursor-not-allowed'
            }`}
          >
            {t[lang].startGame}
          </button>

          {/* Powered by footer */}
          <div className="text-center mt-8">
            <a href="https://gorumble.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 text-xs hover:text-[#e63946] transition-colors">
              <span>Powered by</span>
              <img src={rumbleLogo} alt="Rumble" className="w-4 h-4" />
              <span className="text-[#F5484D]">gorumble.app</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={backgroundOverlay} 
          alt=""
          className="absolute inset-0 opacity-4 bg-overlay"
        />
        <img 
          src={backgroundOverlay} 
          alt=""
          className="absolute inset-0 opacity-6 bg-overlay-2 rotate-90"
        />
        <img 
          src={backgroundOverlay} 
          alt=""
          className="absolute inset-0 opacity-5 bg-overlay rotate-12"
        />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#262626] rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-2 sm:mb-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white break-words mr-2">Game of {gameWord}</h1>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={resetGame}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          
          <p className="text-left text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{t[lang].tapToAdd}</p>
          
          {/* Show "Back to Leaderboard" button if coming from winner screen */}
          {wasWinner && !winner && (
            <div className="mb-3 sm:mb-4">
              <button
                onClick={() => {
                  // Re-check if there's still a winner
                  const activePlayers = players.filter(p => !p.eliminated);
                  if (activePlayers.length === 1) {
                    setWinner(activePlayers[0].name);
                  }
                }}
                className="w-full bg-[#9747FF] text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold hover:bg-[#8636ee] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>{lang === 'it' ? 'Torna alla Classifica' : 'Back to Leaderboard'}</span>
              </button>
            </div>
          )}
          
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {players.map((player, index) => (
              <div
                key={index}
                className={`bg-[#1a1a1a] p-3 sm:p-4 lg:p-6 rounded-xl transition-all ${
                  player.eliminated 
                    ? 'opacity-50' 
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-white truncate mr-2">{player.name}</h2>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    {player.eliminated && (
                      <span className="text-red-600 font-bold text-xs sm:text-sm">{t[lang].eliminated}</span>
                    )}
                    {!player.eliminated && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          useWildcard(index);
                        }}
                        className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                          player.wildcardUsed 
                            ? 'bg-[#B9FF66] hover:bg-[#a8e85d] text-black' 
                            : 'bg-[#505050] hover:bg-[#606060] text-gray-300'
                        }`}
                        title={player.wildcardUsed ? "Remove wildcard" : "Use wildcard"}
                      >
                        <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                    {player.wildcardUsed && (
                      <span className="text-[#B9FF66] text-xs sm:text-sm hidden sm:inline">{t[lang].wildcardUsed}</span>
                    )}
                  </div>
                </div>
                <div 
                  className="flex gap-1 sm:gap-2 mb-3 cursor-pointer overflow-x-auto"
                  onClick={() => !player.eliminated && addLetter(index)}
                >
                  {gameWord.split('').filter(letter => letter !== ' ').map((letter, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg shrink-0 ${
                        i < player.letters.length
                          ? 'bg-[#F5484D] text-white'
                          : 'bg-[#404040] text-gray-400'
                      }`}
                    >
                      {i < player.letters.length ? letter : '·'}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  {player.letters.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLetter(index);
                      }}
                      className="text-gray-400 hover:text-gray-200 p-1"
                      title="Remove last letter"
                    >
                      <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-xs sm:text-sm px-4">
          {t[lang].gameSaved}
        </p>
        
        {/* Powered by footer */}
        <div className="text-center mt-4 sm:mt-8">
          <a href="https://gorumble.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-600 text-xs hover:text-[#e63946] transition-colors">
            <span>Powered by</span>
            <img src={rumbleLogo} alt="Rumble" className="w-4 h-4" />
            <span className="text-[#F5484D]">gorumble.app</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameOfApp;