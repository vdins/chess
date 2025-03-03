import { useEffect, useState } from 'react';
import { database } from '../lib/firebase';
import { ref, onValue, set } from 'firebase/database';

export default function ChessBoard() {
  const [gameState, setGameState] = useState(null);
  const [gameId, setGameId] = useState('game1'); // Untuk demo

  useEffect(() => {
    // Mendengarkan perubahan pada game state di Firebase
    const gameRef = ref(database, `games/${gameId}`);
    
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameState(data);
      } else {
        // Inisialisasi game baru jika tidak ada
        const initialState = {
          board: initialChessBoard(),
          currentTurn: 'white',
          moves: []
        };
        set(gameRef, initialState);
        setGameState(initialState);
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  // Fungsi untuk menginisialisasi papan catur
  const initialChessBoard = () => {
    // Representasi sederhana dari papan catur
    // 'p' = pion, 'r' = benteng, 'n' = kuda, 'b' = gajah, 'q' = menteri, 'k' = raja
    // Huruf besar untuk putih, huruf kecil untuk hitam
    return [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
  };

  // Jika game state masih dimuat
  if (!gameState) return <div>Memuat papan catur...</div>;

  return (
    <div className="chess-container">
      <h1>Catur Online</h1>
      <div className="chess-board">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((piece, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`board-square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`}
              >
                {piece && <div className="chess-piece">{getPieceSymbol(piece)}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <p>Giliran: {gameState.currentTurn === 'white' ? 'Putih' : 'Hitam'}</p>
      </div>

      <style jsx>{`
        .chess-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }
        .chess-board {
          display: flex;
          flex-direction: column;
          border: 2px solid #333;
        }
        .board-row {
          display: flex;
        }
        .board-square {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
        }
        .light { background-color: #f0d9b5; }
        .dark { background-color: #b58863; }
        .chess-piece {
          cursor: pointer;
        }
        .game-info {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// Fungsi untuk menampilkan simbol bidak
function getPieceSymbol(piece) {
  const symbols = {
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
  };
  return symbols[piece] || '';
}
