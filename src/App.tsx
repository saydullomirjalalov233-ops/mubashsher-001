import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { GameInfo } from './types';
import { ChevronLeft, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MousePointer2, HelpCircle, X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

// --- GAME WRAPPER ---
const GameWrapper = ({ game, onBack }: { game: GameInfo; onBack: () => void }) => {
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <header className="w-full max-w-5xl flex justify-between items-center bg-white px-8 py-4 rounded-[20px] shadow-[0_8px_0_#E5C12D] mb-8">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 px-6 py-2 rounded-xl bg-white border-b-4 border-vibrant-card-shadow hover:bg-zinc-50 transition-all font-black text-xs uppercase tracking-widest text-zinc-800"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>ORQAGA</span>
        </button>
        <div className="text-center flex items-center gap-4">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-black text-vibrant-red uppercase leading-none tracking-tight">{game.title}</h2>
            <p className="text-vibrant-blue text-[9px] tracking-[0.4em] uppercase font-bold mt-1 font-mono">{game.category}</p>
          </div>
          <button 
            onClick={() => setShowInstructions(true)}
            className="p-2 rounded-xl bg-vibrant-orange/10 text-vibrant-orange hover:bg-vibrant-orange/20 transition-all shadow-sm"
            title="Qanday o'ynash kerak?"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-vibrant-blue/10 px-6 py-2 rounded-xl border-l-4 border-vibrant-blue flex flex-col items-end min-w-[120px]">
          <span className="text-vibrant-blue text-[9px] uppercase font-black tracking-widest leading-none mb-1">SCORE</span>
          <span className="text-2xl font-black text-vibrant-blue leading-none">{score}</span>
        </div>
      </header>

      <div className="w-full max-w-7xl min-h-[75vh] bg-white rounded-[3rem] border-t-4 border-x-4 border-b-[16px] border-vibrant-blue flex flex-col items-center justify-center relative shadow-2xl p-4 sm:p-12 overflow-visible">
         <div key={key} className="w-full h-full flex items-center justify-center text-zinc-800 py-10">
           <GameRenderer 
             gameId={game.id} 
             onScoreUpdate={setScore} 
           />
         </div>
        
        {/* Playful corner dots */}
        <div className="absolute top-4 left-4 flex gap-1">
          <div className="w-3 h-3 rounded-full bg-vibrant-red"></div>
          <div className="w-3 h-3 rounded-full bg-vibrant-green"></div>
          <div className="w-3 h-3 rounded-full bg-vibrant-orange"></div>
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <button 
          onClick={() => { setScore(0); setKey(prev => prev + 1); }}
          className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white border-b-8 border-vibrant-card-shadow hover:bg-zinc-50 transition-all group font-black uppercase text-sm tracking-[0.2em] text-zinc-800 shadow-xl active:border-b-4 active:translate-y-1"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
          <span>YANA BIR BOR</span>
        </button>
      </div>

      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setShowInstructions(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] border-b-[12px] border-vibrant-orange p-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vibrant-red via-vibrant-yellow to-vibrant-green" />
              
              <button 
                onClick={() => setShowInstructions(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 transition-all text-zinc-500"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-vibrant-orange/10 flex items-center justify-center mb-6">
                  <HelpCircle className="w-10 h-10 text-vibrant-orange" />
                </div>
                
                <h3 className="text-3xl font-black text-zinc-800 uppercase tracking-tight mb-2">QANDAY O'YNASH KERAK?</h3>
                <p className="text-vibrant-blue font-bold tracking-widest text-[10px] uppercase mb-8">{game.title} - QOIDA VA USULLAR</p>
                
                <div className="bg-zinc-50 rounded-2xl p-6 border-2 border-dashed border-zinc-200 w-full">
                  <p className="text-zinc-600 font-medium leading-relaxed italic text-lg">
                    {game.instructions || game.description}
                  </p>
                </div>

                <button 
                  onClick={() => setShowInstructions(false)}
                  className="mt-8 px-10 py-4 bg-vibrant-green text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#2D8A4E] hover:shadow-[0_4px_0_#2D8A4E] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all w-full"
                >
                  TUSHUNDIM!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- GAME RENDERER & LOGIC ---

const GameRenderer = ({ gameId, onScoreUpdate }: { gameId: string; onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  switch (gameId) {
    case 'clicker':
      return (
        <div className="flex flex-col items-center gap-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onScoreUpdate(s => s + 1)}
            className="w-56 h-56 bg-gradient-to-br from-emerald-400 to-teal-700 rounded-full shadow-[0_0_60px_rgba(16,185,129,0.2)] border-[12px] border-emerald-300/20 flex flex-col items-center justify-center"
          >
            <span className="text-5xl font-black text-white drop-shadow-lg">BOS!</span>
          </motion.button>
          <p className="text-emerald-400 font-black tracking-widest uppercase animate-bounce">Tezroq bosing!</p>
        </div>
      );
    case 'reaction':
      return <ReactionGame onScoreUpdate={onScoreUpdate} />;
    case 'math':
      return <MathGame onScoreUpdate={onScoreUpdate} />;
    case 'rps':
       return <RPSGame onScoreUpdate={onScoreUpdate} />;
    case 'tictactoe':
       return <TicTacToeGame onScoreUpdate={onScoreUpdate} />;
    case 'dice':
       return <DiceGame onScoreUpdate={onScoreUpdate} />;
    case 'coin':
       return <CoinGame onScoreUpdate={onScoreUpdate} />;
    case 'memory':
       return <MemoryGame onScoreUpdate={onScoreUpdate} />;
    case 'aim':
       return <AimTrainer onScoreUpdate={onScoreUpdate} />;
    case 'sudoku':
       return <SudokuGame onScoreUpdate={onScoreUpdate} />;
    case 'whack':
       return <WhackAMole onScoreUpdate={onScoreUpdate} />;
    case 'color-match':
       return <ColorMatch onScoreUpdate={onScoreUpdate} />;
    case '2048':
       return <Game2048 onScoreUpdate={onScoreUpdate} />;
    case 'snake':
       return <SnakeGame onScoreUpdate={onScoreUpdate} />;
    case 'tetris':
       return <TetrisGame onScoreUpdate={onScoreUpdate} />;
    case 'simon':
       return <SimonSays onScoreUpdate={onScoreUpdate} />;
    case 'wordle':
       return <WordGuess onScoreUpdate={onScoreUpdate} />;
    case 'typing':
       return <MonkeyTypeGame onScoreUpdate={onScoreUpdate} />;
    case 'hanoi':
       return <HanoiGame onScoreUpdate={onScoreUpdate} />;
    case 'minesweeper':
       return <MinesweeperGame onScoreUpdate={onScoreUpdate} />;
    case 'trivia':
       return <TriviaGame onScoreUpdate={onScoreUpdate} />;
    case 'blackjack':
       return <BlackjackGame onScoreUpdate={onScoreUpdate} />;
    case 'maze':
       return <MazeGame onScoreUpdate={onScoreUpdate} />;
    case 'anagram':
       return <NatureQuiz onScoreUpdate={onScoreUpdate} />;
    case 'hilo':
       return <HiLoGame onScoreUpdate={onScoreUpdate} />;
    case 'hangman':
       return <ProgrammingQuiz onScoreUpdate={onScoreUpdate} />;
    case 'tower':
       return <TowerStackGame onScoreUpdate={onScoreUpdate} />;
    case 'gravity':
       return <GravityGame onScoreUpdate={onScoreUpdate} />;
    case 'flappy':
       return <FlappyBird onScoreUpdate={onScoreUpdate} />;
    case 'pingpong':
       return <PingPongGame onScoreUpdate={onScoreUpdate} />;
    case 'chess':
       return <ChessGame onScoreUpdate={onScoreUpdate} />;
    case 'anagram':
       return <NatureQuiz onScoreUpdate={onScoreUpdate} />;
    default:
      return (
        <div className="text-center p-12 max-w-sm">
          <div className="w-20 h-20 bg-zinc-800 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl text-zinc-600 font-black">?</span>
          </div>
          <p className="text-zinc-400 mb-8 leading-relaxed font-medium">"{gameId}" o'yini hozirda ishlab chiqilmoqda. Sinov ballarini to'plash uchun quyidagi tugmani bosing.</p>
          <button 
            onClick={() => onScoreUpdate(s => s + 50)}
            className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-95"
          >
            SINOV BALLARI (+50)
          </button>
        </div>
      );
  }
};

// 1. REACTION GAME
const ReactionGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);

  const start = () => {
    setState('waiting');
    const delay = 1500 + Math.random() * 3000;
    setTimeout(() => {
      setState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const click = () => {
    if (state === 'waiting') {
      setState('idle');
      alert("Hali rang o'zgarmadi!");
    } else if (state === 'ready') {
      const diff = Date.now() - startTime;
      setResult(diff);
      onScoreUpdate(s => s + Math.max(1000 - diff, 0));
      setState('result');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center cursor-pointer transition-colors" onClick={() => (state === 'idle' || state === 'result' ? start() : click())}>
      {state === 'idle' && <div className="text-3xl font-black text-center uppercase tracking-widest">Boshlash uchun ekran markaziga bosing</div>}
      {state === 'waiting' && <div className="w-full h-full bg-rose-600 flex items-center justify-center text-5xl font-black italic animate-pulse uppercase">Kuting...</div>}
      {state === 'ready' && <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-8xl font-black uppercase shadow-[inset_0_0_100px_rgba(255,255,255,0.3)]">BOS!</div>}
      {state === 'result' && (
        <div className="text-center">
          <div className="text-10xl font-mono font-black mb-2 text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)] leading-none">{result}</div>
          <div className="text-zinc-400 uppercase tracking-widest font-bold">milli-soniya</div>
          <p className="mt-8 text-zinc-600 font-bold italic">Yana davom etish uchun bosing</p>
        </div>
      )}
    </div>
  );
};

// 2. MATH GAME
const MathGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [input, setInput] = useState('');

  const generate = () => {
    const a = Math.floor(Math.random() * 30) + 5;
    const b = Math.floor(Math.random() * 30) + 5;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let ans = 0;
    if (op === '+') ans = a + b;
    if (op === '-') ans = a - b;
    if (op === '*') ans = a * b;
    setProblem({ a, b, op, ans });
    setInput('');
  };

  React.useEffect(generate, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === problem.ans) {
      alert("Javob To'g'ri!");
      onScoreUpdate(s => s + (problem.op === '*' ? 25 : 10));
      generate();
    } else {
      alert("Xato, boshqattan urinib ko'ring!");
      setInput('');
    }
  };

  return (
    <div className="text-center p-10 w-full text-zinc-900">
       <div className="text-sm uppercase tracking-[0.5em] text-zinc-400 mb-4 font-bold">Misolni yeching</div>
       <div className="text-8xl font-black mb-12 font-mono flex items-center justify-center gap-8">
         <span className="text-zinc-900">{problem.a}</span>
         <span className="text-vibrant-blue">{problem.op}</span>
         <span className="text-zinc-900">{problem.b}</span>
       </div>
       <form onSubmit={check} className="flex flex-col items-center gap-6">
         <div className="relative group">
           <input 
             autoFocus
             placeholder="..."
             className="bg-zinc-100 border-4 border-vibrant-blue/20 rounded-[2rem] px-10 py-6 text-6xl font-mono w-64 text-center outline-none focus:border-vibrant-blue transition-all text-zinc-900 placeholder-zinc-300"
             type="number"
             value={input}
             onChange={e => setInput(e.target.value)}
           />
           <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
             <div className="w-12 h-12 bg-vibrant-blue rounded-full flex items-center justify-center text-white">⏎</div>
           </div>
         </div>
         <button 
           type="submit"
           className="px-10 py-4 bg-vibrant-red text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#C94C4C] active:shadow-none active:translate-y-1 transition-all hover:scale-105"
         >
           Javobni yuborish
         </button>
       </form>
    </div>
  );
};

// 3. ROCK PAPER SCISSORS
const RPSGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const choices = [
    { id: 'tosh', name: 'Tosh', win: 'qaychi', emoji: '🪨', color: 'bg-zinc-500' },
    { id: 'qogoz', name: 'Qog\'oz', win: 'tosh', emoji: '📄', color: 'bg-vibrant-blue' },
    { id: 'qaychi', name: 'Qaychi', win: 'qogoz', emoji: '✂️', color: 'bg-vibrant-red' }
  ];
  const [result, setResult] = useState<string | null>(null);
  const [userChoice, setUserChoice] = useState<any>(null);
  const [pcChoice, setPcChoice] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (choice: any) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setUserChoice(choice);
    setPcChoice(null);
    setResult(null);

    // AI o'ylash simulyatsiyasi
    setTimeout(() => {
      const pc = choices[Math.floor(Math.random() * 3)];
      setPcChoice(pc);

      if (choice.id === pc.id) {
        setResult("Durrang!");
      } else if (choice.win === pc.id) {
        setResult("Yutdingiz!");
        onScoreUpdate(s => s + 50);
      } else {
        setResult("Yutqazdingiz!");
      }
      setIsPlaying(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full p-8 text-zinc-900">
      <div className="flex items-center gap-10 justify-center min-h-[220px]">
        {userChoice && (
          <div className="text-center flex flex-col items-center grayscale-0 transition-all">
             <div className="text-xs font-black text-zinc-400 mb-3 uppercase tracking-widest">Siz</div>
             <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className={`w-32 h-32 rounded-[2.5rem] ${userChoice.color} flex items-center justify-center text-6xl shadow-xl border-b-8 border-black/20`}
             >
               {userChoice.emoji}
             </motion.div>
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className={`text-4xl font-black italic px-4 uppercase tracking-tighter ${
              result === 'Yutdingiz!' ? 'text-vibrant-green' : 
              result === 'Yutqazdingiz!' ? 'text-vibrant-red' : 
              'text-vibrant-orange'
            }`}
          >
            {result}
          </motion.div>
        )}

        {pcChoice ? (
          <div className="text-center flex flex-col items-center">
             <div className="text-xs font-black text-zinc-400 mb-3 uppercase tracking-widest">Bot</div>
             <motion.div 
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className={`w-32 h-32 rounded-[2.5rem] ${pcChoice.color} flex items-center justify-center text-6xl shadow-xl border-b-8 border-black/20`}
             >
               {pcChoice.emoji}
             </motion.div>
          </div>
        ) : userChoice && (
          <div className="text-center flex flex-col items-center opacity-40 animate-pulse">
             <div className="text-xs font-black text-zinc-400 mb-3 uppercase tracking-widest">Bot</div>
             <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-200 border-b-8 border-zinc-300 flex items-center justify-center text-5xl">
               ?
             </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {choices.map(c => (
          <motion.button 
            key={c.id} 
            disabled={isPlaying}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => play(c)} 
            className={`w-28 h-28 rounded-[2rem] bg-white border-2 border-zinc-100 flex flex-col items-center justify-center transition-all shadow-lg active:shadow-sm active:translate-y-1 hover:border-vibrant-blue group`}
          >
            <span className="text-4xl mb-1 grayscale group-hover:grayscale-0 transition-all">{c.emoji}</span>
            <span className="font-black text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-vibrant-blue">{c.name}</span>
          </motion.button>
        ))}
      </div>
      
      {!userChoice && (
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] animate-bounce">Bittasini tanlang!</p>
      )}
    </div>
  );
};

// 4. TIC TAC TOE
const TicTacToeGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(s => s !== null);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    
    const newWinner = calculateWinner(newBoard);
    if (newWinner === 'X') onScoreUpdate(s => s + 100);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-xl font-bold uppercase tracking-[0.2em]">
        {winner ? `${winner} G'ALABA QILDI!` : isDraw ? "DURANG!" : `${xIsNext ? 'X' : 'O'} NAVBATI`}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 bg-zinc-800 rounded-2xl flex items-center justify-center text-5xl font-black hover:bg-zinc-700 transition-colors border-2 border-zinc-700"
          >
            <span className={val === 'X' ? 'text-cyan-400' : 'text-rose-400'}>{val}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 5. DICE GAME
const DiceGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setRolling(false);
        const final = Math.floor(Math.random() * 6) + 1;
        setDice(final);
        onScoreUpdate(s => s + (final * 10));
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <motion.div 
        animate={rolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
        className="w-48 h-48 bg-white text-black rounded-[2rem] flex items-center justify-center text-8xl font-black shadow-2xl"
      >
        {dice}
      </motion.div>
      <button 
        disabled={rolling}
        onClick={roll}
        className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-500 transition-colors disabled:opacity-50 uppercase tracking-widest"
      >
        {rolling ? 'Tashlanmoqda...' : 'Zar tashlash'}
      </button>
    </div>
  );
};

// 6. COIN GAME
const CoinGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [side, setSide] = useState<'RAQAM' | 'GERB'>('RAQAM');
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'RAQAM' : 'GERB';
      setSide(result);
      setFlipping(false);
      onScoreUpdate(s => s + 20);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-48 h-48 [perspective:1000px]">
        <motion.div 
          animate={flipping ? { rotateY: [0, 720] } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center text-4xl font-black border-8 border-yellow-400 shadow-[0_0_50px_rgba(234,179,8,0.3)] text-yellow-900"
        >
          {side}
        </motion.div>
      </div>
      <button 
        disabled={flipping}
        onClick={flip}
        className="px-12 py-5 bg-yellow-600 text-white rounded-2xl font-black text-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 uppercase tracking-widest"
      >
        {flipping ? 'Aylanmoqda...' : 'Tanga tashlash'}
      </button>
    </div>
  );
};

// 7. MEMORY GAME
const MemoryGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const icons = ['🍎', '🍌', '🍓', '🍇', '🍒', '🥥', '🥭', '🥝'];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  React.useEffect(() => {
    const shuffled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((val, id) => ({ id, val }));
    setCards(shuffled);
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]].val === cards[newFlipped[1]].val) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
        onScoreUpdate(s => s + 100);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => handleFlip(card.id)}
          className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${
            flipped.includes(card.id) || solved.includes(card.id) ? 'bg-white text-black rotate-y-180' : 'bg-zinc-800 text-transparent'
          }`}
        >
          {(flipped.includes(card.id) || solved.includes(card.id)) ? card.val : '?'}
        </button>
      ))}
    </div>
  );
};

// 8. AIM TRAINER
const AimTrainer = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [hits, setHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [misses, setMisses] = useState(0);

  const startGame = () => {
    setHits(0);
    setMisses(0);
    setTimeLeft(30);
    setIsPlaying(true);
    moveTarget();
  };

  const moveTarget = () => {
    setTarget({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  };

  const handleHit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    setHits(h => h + 1);
    onScoreUpdate(s => s + 50);
    moveTarget();
  };

  const handleMiss = () => {
    if (!isPlaying) return;
    setMisses(m => m + 1);
  };

  React.useEffect(() => {
    let interval: any;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  return (
    <div className="w-full h-80 relative bg-zinc-900/50 rounded-3xl border-4 border-zinc-800/50 overflow-hidden cursor-crosshair" onClick={handleMiss}>
      {isPlaying ? (
        <>
          <div className="absolute top-4 left-6 flex gap-6 text-[10px] font-black uppercase tracking-widest z-10">
            <div className="text-zinc-500">Vaqt: <span className="text-white">{timeLeft}s</span></div>
            <div className="text-zinc-500">Nishonlar: <span className="text-vibrant-green">{hits}</span></div>
            <div className="text-zinc-500">Xatolar: <span className="text-vibrant-red">{misses}</span></div>
          </div>
          
          <motion.button
            key={hits}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleHit}
            className="w-12 h-12 bg-vibrant-red rounded-full absolute shadow-[0_0_40px_rgba(255,59,48,0.4)] border-4 border-white/20 flex items-center justify-center group"
            style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-6 h-6 border-2 border-white/40 rounded-full" />
            <div className="absolute w-full h-[2px] bg-white/20" />
            <div className="absolute w-[2px] h-full bg-white/20" />
          </motion.button>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/40 backdrop-blur-sm">
          {timeLeft === 0 ? (
            <>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Vaqt Tugadi!</h3>
              <p className="text-zinc-400 font-bold mb-8 uppercase tracking-widest text-xs">Siz {hits} ta nishonni urdingiz</p>
            </>
          ) : (
            <>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Mergan</h3>
              <p className="text-zinc-400 font-bold mb-8 uppercase tracking-widest text-xs">Nishonlarni tez va aniq urishga harakat qiling</p>
            </>
          )}
          <button 
            onClick={startGame}
            className="px-10 py-4 bg-vibrant-red text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#C94C4C] active:translate-y-1 active:shadow-none transition-all hover:scale-105"
          >
            {timeLeft === 0 ? 'QAYTADAN BOSHLASH' : 'O\'YINNI BOSHLASH'}
          </button>
        </div>
      )}
    </div>
  );
};

// 9. SUDOKU (Extremely simplified mini version 4x4)
const SudokuGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [grid, setGrid] = useState([
    [1, null, 3, null],
    [null, 2, null, 4],
    [4, null, 2, null],
    [null, 3, null, 1]
  ]);

  const update = (r: number, c: number, v: string) => {
    const next = grid.map(row => [...row]);
    next[r][c] = parseInt(v) || null;
    setGrid(next as any);
    if (next.flat().every(v => v !== null)) onScoreUpdate(s => s + 200);
  };

  return (
    <div className="grid grid-cols-4 gap-2 bg-zinc-800 p-4 rounded-[2rem]">
      {grid.map((row, r) => row.map((val, c) => (
        <input
          key={`${r}-${c}`}
          className="w-16 h-16 bg-zinc-900 rounded-xl text-center text-3xl font-mono text-white border-2 border-zinc-700 focus:border-cyan-400 outline-none"
          type="number"
          min="1"
          max="4"
          value={val || ''}
          onChange={e => update(r, c, e.target.value)}
        />
      )))}
    </div>
  );
};

// 10. WHACK A MOLE
const WhackAMole = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [active, setActive] = useState<number | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive(Math.floor(Math.random() * 9));
      setTimeout(() => setActive(null), 800);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="w-24 h-24 bg-zinc-800 rounded-full relative overflow-hidden border-b-8 border-black/30">
          <AnimatePresence>
            {active === i && (
              <motion.button
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                onClick={() => { onScoreUpdate(s => s + 50); setActive(null); }}
                className="absolute inset-0 bg-amber-700/80 rounded-full flex items-center justify-center text-5xl"
              >
                🐹
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// 11. COLOR MATCH
const ColorMatch = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const colors = [
    { name: 'Qizil', hex: '#ef4444' },
    { name: 'Ko\'k', hex: '#3b82f6' },
    { name: 'Yashil', hex: '#22c55e' },
    { name: 'Sariq', hex: '#eab308' }
  ];
  const [target, setTarget] = useState({ name: '', hex: '' });
  const [options, setOptions] = useState<any[]>([]);

  const generate = () => {
    const t = colors[Math.floor(Math.random() * colors.length)];
    const displayColor = colors[Math.floor(Math.random() * colors.length)];
    setTarget({ name: t.name, hex: displayColor.hex });
    setOptions([...colors].sort(() => Math.random() - 0.5));
  };

  React.useEffect(generate, []);

  const check = (name: string) => {
    if (name === target.name) {
      onScoreUpdate(s => s + 30);
      generate();
    } else {
      generate();
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="text-7xl font-black uppercase tracking-tighter" style={{ color: target.hex }}>
        {target.name}
      </div>
      <div className="flex gap-4">
        {options.map(o => (
          <button 
            key={o.name} 
            onClick={() => check(o.name)} 
            className="px-10 py-5 bg-white text-zinc-900 rounded-[2rem] font-black transition-all uppercase border-b-8 border-zinc-200 hover:border-vibrant-blue shadow-xl active:translate-y-2 active:border-b-0"
          >
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// 12. 2048 (Simplified)
const Game2048 = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [grid, setGrid] = useState<(number | null)[][]>(Array(4).fill(null).map(() => Array(4).fill(null)));
  const [gameOver, setGameOver] = useState(false);

  const spawn = (currentGrid: (number | null)[][]) => {
    const empty = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!currentGrid[r][c]) empty.push({ r, c });
      }
    }
    if (empty.length === 0) return currentGrid;
    const { r, c } = empty[Math.floor(Math.random() * empty.length)];
    const next = currentGrid.map(row => [...row]);
    next[r][c] = Math.random() < 0.9 ? 2 : 4;
    return next;
  };

  const init = () => {
    let newGrid = Array(4).fill(null).map(() => Array(4).fill(null));
    newGrid = spawn(newGrid);
    newGrid = spawn(newGrid);
    setGrid(newGrid);
    setGameOver(false);
  };

  React.useEffect(init, []);

  const move = (dir: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let newGrid = grid.map(row => [...row]);
    let moved = false;
    let turnScore = 0;

    const rotate = (times: number) => {
      for (let t = 0; t < times; t++) {
        const rotated = Array(4).fill(null).map(() => Array(4).fill(null));
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            rotated[c][3 - r] = newGrid[r][c];
          }
        }
        newGrid = rotated;
      }
    };

    // Normalize to "left" move
    if (dir === 'up') rotate(3);
    if (dir === 'right') rotate(2);
    if (dir === 'down') rotate(1);

    // Slide and merge left
    for (let r = 0; r < 4; r++) {
      let row = newGrid[r].filter(v => v !== null) as number[];
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          row[i] *= 2;
          turnScore += row[i];
          row.splice(i + 1, 1);
          moved = true;
        }
      }
      const newRow = [...row, ...Array(4 - row.length).fill(null)];
      if (newRow.some((v, i) => v !== newGrid[r][i])) moved = true;
      newGrid[r] = newRow;
    }

    // Denormalize
    if (dir === 'up') rotate(1);
    if (dir === 'right') rotate(2);
    if (dir === 'down') rotate(3);

    if (moved) {
      const spawnedGrid = spawn(newGrid);
      setGrid(spawnedGrid);
      onScoreUpdate(s => s + turnScore);
      
      // Check Game Over
      if (!canMove(spawnedGrid)) setGameOver(true);
    }
  };

  const canMove = (g: (number | null)[][]) => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!g[r][c]) return true;
        if (r < 3 && g[r][c] === g[r + 1][c]) return true;
        if (c < 3 && g[r][c] === g[r][c + 1]) return true;
      }
    }
    return false;
  };

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowUp') move('up');
      if (e.key === 'ArrowDown') move('down');
      if (e.key === 'ArrowLeft') move('left');
      if (e.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [grid, gameOver]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-zinc-800 p-4 rounded-[2rem] grid grid-cols-4 gap-3 shadow-2xl relative">
        {grid.map((row, r) => row.map((val, c) => (
          <motion.div
            key={`${r}-${c}-${val}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black transition-all ${
              val === 2 ? 'bg-zinc-200 text-zinc-900' :
              val === 4 ? 'bg-zinc-300 text-zinc-900' :
              val === 8 ? 'bg-vibrant-orange text-white' :
              val === 16 ? 'bg-orange-600 text-white' :
              val === 32 ? 'bg-vibrant-red text-white' :
              val === 64 ? 'bg-rose-700 text-white' :
              val === 128 ? 'bg-yellow-400 text-white text-2xl' :
              val === 256 ? 'bg-yellow-500 text-white text-2xl shadow-[0_0_15px_rgba(234,179,8,0.4)]' :
              val === 512 ? 'bg-yellow-600 text-white text-2xl shadow-[0_0_20px_rgba(234,179,8,0.5)]' :
              val === 1024 ? 'bg-vibrant-blue text-white text-xl' :
              val === 2048 ? 'bg-vibrant-purple text-white text-xl shadow-[0_0_30px_rgba(151,114,251,0.6)]' :
              'bg-zinc-900/50'
            }`}
          >
            {val || ''}
          </motion.div>
        )))}
        
        {gameOver && (
          <div className="absolute inset-0 bg-black/60 rounded-[2rem] flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm z-10">
            <h3 className="text-4xl font-black text-white mb-4 italic uppercase tracking-tighter shadow-sm">O'yin tugadi!</h3>
            <button 
              onClick={init}
              className="px-8 py-3 bg-vibrant-red text-white rounded-xl font-bold uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              QAYTADAN
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-4 md:hidden">
        <button onClick={() => move('left')} className="p-4 bg-white rounded-xl shadow-md">←</button>
        <div className="flex flex-col gap-2">
          <button onClick={() => move('up')} className="p-4 bg-white rounded-xl shadow-md">↑</button>
          <button onClick={() => move('down')} className="p-4 bg-white rounded-xl shadow-md">↓</button>
        </div>
        <button onClick={() => move('right')} className="p-4 bg-white rounded-xl shadow-md">→</button>
      </div>
      <p className="text-vibrant-blue font-black uppercase text-[10px] tracking-widest animate-pulse">Yo'nalish tugmalaridan foydalaning</p>
    </div>
  );
};

// 13. SNAKE GAME
const SnakeGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  React.useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
          onScoreUpdate(s => s + 100);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(move);
  }, [dir, food, gameOver]);

  React.useEffect(() => {
    const handleKey = (e: any) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowUp' && dir.y === 0) setDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && dir.y === 0) setDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && dir.x === 0) setDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && dir.x === 0) setDir({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir]);

  return (
    <div className="relative w-80 h-80 bg-zinc-900 rounded-xl overflow-hidden border-4 border-zinc-800">
      {snake.map((s, i) => <div key={i} className="absolute w-4 h-4 bg-emerald-500 rounded-sm" style={{ left: s.x * 16, top: s.y * 16 }} />)}
      <div className="absolute w-4 h-4 bg-rose-500 rounded-full animate-pulse" style={{ left: food.x * 16, top: food.y * 16 }} />
      {gameOver && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
        <h4 className="text-3xl font-black text-rose-500 mb-2">O'YIN TUGADI!</h4>
        <p className="text-zinc-400">Yana o'ynash uchun pastki tugmani bosing</p>
      </div>}
      <div className="absolute bottom-2 right-2 text-[10px] text-zinc-600 font-bold uppercase">Klaviatura orqali boshqaring</div>
    </div>
  );
};

// 14. TETRIS (Ultra simplified)
// 14. TETRIS
const TetrisGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const COLS = 10;
  const ROWS = 20;
  const INITIAL_SPEED = 800;

  type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

  const TETROMINOS: Record<TetrominoType, { shape: number[][], color: string }> = {
    I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: 'bg-vibrant-teal' },
    J: { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: 'bg-vibrant-blue' },
    L: { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: 'bg-vibrant-orange' },
    O: { shape: [[1, 1], [1, 1]], color: 'bg-vibrant-yellow' },
    S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: 'bg-vibrant-green' },
    T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: 'bg-vibrant-purple' },
    Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: 'bg-vibrant-red' },
  };

  const [grid, setGrid] = useState<string[][]>(Array(ROWS).fill(null).map(() => Array(COLS).fill('')));
  const [active, setActive] = useState<{ pos: { x: number, y: number }, type: TetrominoType, shape: number[][] } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const spawn = () => {
    const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    const type = types[Math.floor(Math.random() * types.length)];
    const tetromino = TETROMINOS[type];
    const newActive = {
      pos: { x: Math.floor(COLS / 2) - 1, y: 0 },
      type,
      shape: tetromino.shape
    };

    if (checkCollision(newActive.pos, newActive.shape, grid)) {
      setGameOver(true);
      return null;
    }
    return newActive;
  };

  const checkCollision = (pos: { x: number, y: number }, shape: number[][], currentGrid: string[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          const newX = pos.x + c;
          const newY = pos.y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX] !== '')) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const startGame = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill('')));
    setGameOver(false);
    setPaused(false);
    setActive(spawn());
  };

  React.useEffect(startGame, []);

  const rotate = (matrix: number[][]) => {
    return matrix[0].map((_, index) => matrix.map(col => col[index]).reverse());
  };

  const move = (dx: number, dy: number) => {
    if (!active || gameOver || paused) return;
    const newPos = { x: active.pos.x + dx, y: active.pos.y + dy };
    if (!checkCollision(newPos, active.shape, grid)) {
      setActive({ ...active, pos: newPos });
      return true;
    } else if (dy > 0) {
      // Piece landed
      lockPiece();
    }
    return false;
  };

  const lockPiece = () => {
    if (!active) return;
    const newGrid = grid.map(row => [...row]);
    active.shape.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val !== 0) {
          const y = active.pos.y + r;
          const x = active.pos.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            newGrid[y][x] = TETROMINOS[active.type].color;
          }
        }
      });
    });

    // Clear lines
    let clearedLines = 0;
    const filteredGrid = newGrid.filter(row => row.some(cell => cell === ''));
    clearedLines = ROWS - filteredGrid.length;
    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(Array(COLS).fill(''));
    }

    if (clearedLines > 0) {
      onScoreUpdate(s => s + (clearedLines === 4 ? 1200 : clearedLines * 200));
    }

    setGrid(filteredGrid);
    const nextPiece = spawn();
    if (nextPiece) {
      setActive(nextPiece);
    }
  };

  const handleRotate = () => {
    if (!active || gameOver || paused) return;
    const newShape = rotate(active.shape);
    if (!checkCollision(active.pos, newShape, grid)) {
      setActive({ ...active, shape: newShape });
    }
  };

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') move(-1, 0);
      if (e.key === 'ArrowRight') move(1, 0);
      if (e.key === 'ArrowDown') move(0, 1);
      if (e.key === 'ArrowUp') handleRotate();
      if (e.key === ' ') {
          // Hard drop
          let y = 0;
          let tempActive = active;
          if (!tempActive) return;
          while (!checkCollision({ x: tempActive.pos.x, y: tempActive.pos.y + y + 1 }, tempActive.shape, grid)) {
              y++;
          }
          const finalPos = { x: tempActive.pos.x, y: tempActive.pos.y + y };
          // Lock immediately
          const newGrid = grid.map(row => [...row]);
          tempActive.shape.forEach((row, r) => {
            row.forEach((v, c) => {
              if (v !== 0) {
                const gy = finalPos.y + r;
                const gx = finalPos.x + c;
                if (gy >= 0 && gy < ROWS) newGrid[gy][gx] = TETROMINOS[tempActive.type].color;
              }
            });
          });
          const filtered = newGrid.filter(r => r.some(c => c === ''));
          const score = (ROWS - filtered.length) * 200;
          while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(''));
          setGrid(filtered);
          onScoreUpdate(s => s + score + y * 2);
          setActive(spawn());
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, grid, gameOver, paused]);

  React.useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      move(0, 1);
    }, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [active, gameOver, paused]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="relative bg-zinc-900 border-[12px] border-zinc-800 rounded-[2rem] p-1 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-10 gap-px bg-zinc-800/40">
          {grid.map((row, y) => row.map((cell, x) => {
            // Check if active piece is here
            let activeColor = '';
            if (active) {
              const r = y - active.pos.y;
              const c = x - active.pos.x;
              if (r >= 0 && r < active.shape.length && c >= 0 && c < active.shape[r].length) {
                if (active.shape[r][c] !== 0) {
                  activeColor = TETROMINOS[active.type].color;
                }
              }
            }
            return (
              <div 
                key={`${x}-${y}`} 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-[4px] border-b-2 border-r-2 border-black/10 ${activeColor || cell || 'bg-zinc-900/90'}`}
              />
            );
          }))}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6 backdrop-blur-md">
            <h3 className="text-4xl font-black text-vibrant-red italic uppercase tracking-tighter mb-6">Tamom!</h3>
            <button 
              onClick={startGame}
              className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#D9D9D9] active:translate-y-1 active:shadow-none transition-all"
            >
              QAYTADAN
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-[2rem] shadow-[0_8px_0_#D9D9D9] flex gap-4">
          <div className="flex flex-col gap-2">
            <button onTouchStart={() => move(-1, 0)} onClick={() => move(-1, 0)} className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center font-black">←</button>
          </div>
          <div className="flex flex-col gap-2">
            <button onTouchStart={() => handleRotate()} onClick={() => handleRotate()} className="w-12 h-12 bg-vibrant-blue text-white rounded-xl flex items-center justify-center font-black">↻</button>
            <button onTouchStart={() => move(0, 1)} onClick={() => move(0, 1)} className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center font-black">↓</button>
          </div>
          <div className="flex flex-col gap-2">
            <button onTouchStart={() => move(1, 0)} onClick={() => move(1, 0)} className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center font-black">→</button>
          </div>
      </div>
      
      <div className="text-[10px] font-black text-vibrant-blue bg-vibrant-blue/10 px-4 py-1 rounded-full uppercase tracking-widest">
        Yo'nalish tugmalari orqali boshqaring
      </div>
    </div>
  );
};

// 15. SIMON SAYS
const SimonSays = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [seq, setSeq] = useState<number[]>([]);
  const [userSeq, setUserSeq] = useState<number[]>([]);
  const [status, setStatus] = useState<'idle' | 'showing' | 'input' | 'over'>('idle');
  const [active, setActive] = useState<number | null>(null);

  const colors = [
    { id: 0, bg: 'bg-emerald-500', shadow: 'shadow-emerald-900/50', active: 'brightness-150 scale-95 shadow-none' },
    { id: 1, bg: 'bg-rose-500', shadow: 'shadow-rose-900/50', active: 'brightness-150 scale-95 shadow-none' },
    { id: 2, bg: 'bg-blue-500', shadow: 'shadow-blue-900/50', active: 'brightness-150 scale-95 shadow-none' },
    { id: 3, bg: 'bg-yellow-500', shadow: 'shadow-yellow-900/50', active: 'brightness-150 scale-95 shadow-none' }
  ];

  const startGame = () => {
    const initial = [Math.floor(Math.random() * 4)];
    setSeq(initial);
    setUserSeq([]);
    setStatus('showing');
    playSeq(initial);
  };

  const nextLevel = () => {
    const next = [...seq, Math.floor(Math.random() * 4)];
    setSeq(next);
    setUserSeq([]);
    setStatus('showing');
    playSeq(next);
  };

  const playSeq = async (s: number[]) => {
    setStatus('showing');
    await new Promise(r => setTimeout(r, 600));
    for (const id of s) {
      setActive(id);
      await new Promise(r => setTimeout(r, 500));
      setActive(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setStatus('input');
  };

  const handleClick = (id: number) => {
    if (status !== 'input') return;
    
    setActive(id);
    setTimeout(() => setActive(null), 150);

    const next = [...userSeq, id];
    setUserSeq(next);

    if (id !== seq[next.length - 1]) {
      setStatus('over');
      return;
    }

    if (next.length === seq.length) {
      onScoreUpdate(s => s + seq.length * 50);
      setTimeout(nextLevel, 800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6">
      <div className="relative">
        <div className="grid grid-cols-2 gap-6 bg-zinc-800 p-8 rounded-[3rem] shadow-2xl border-4 border-zinc-700/50">
          {colors.map((c) => (
            <button
              key={c.id}
              disabled={status !== 'input'}
              onClick={() => handleClick(c.id)}
              className={`w-32 h-32 rounded-3xl transition-all duration-150 ${c.bg} shadow-[0_8px_0_rgba(0,0,0,0.3)] ${c.shadow} ${active === c.id ? c.active : 'hover:brightness-110 active:translate-y-1 active:shadow-none'}`}
            />
          ))}
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-zinc-900 rounded-full border-8 border-zinc-800 flex items-center justify-center shadow-inner">
          <div className="text-center">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Daraja</div>
            <div className="text-2xl font-black text-white">{seq.length}</div>
          </div>
        </div>
      </div>

      <div className="text-center h-12">
        {status === 'idle' && (
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#D9D9D9] active:translate-y-1 active:shadow-none transition-all hover:scale-105"
          >
            BOSHLASH
          </button>
        )}
        {status === 'showing' && (
          <div className="text-vibrant-yellow font-black uppercase tracking-[0.3em] text-xs animate-pulse">Eslab qoling...</div>
        )}
        {status === 'input' && (
          <div className="text-vibrant-green font-black uppercase tracking-[0.3em] text-xs">Sizning navbatingiz!</div>
        )}
        {status === 'over' && (
          <div className="flex flex-col items-center gap-4">
            <div className="text-vibrant-red font-black uppercase tracking-[0.1em] text-xl italic">Xato!</div>
            <button 
              onClick={startGame}
              className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_4px_0_#D9D9D9] active:translate-y-1 active:shadow-none transition-all"
            >
              Qayta urinish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 16. WORD GUESS
const WordGuess = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const WORDS = ["OLMA", "ANOR", "BANAN", "SABZI", "TARVUZ", "QOVUN", "SHAFTOLI", "O'RIK", "UZUM", "BEHI"];
  const [currentWord, setCurrentWord] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [guess, setGuess] = useState("");

  const generate = () => {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(w);
    // Chalkashtirib berish (Shuffle)
    const s = w.split('').sort(() => Math.random() - 0.5).join('');
    setShuffled(s);
    setGuess("");
  };

  React.useEffect(generate, []);

  const check = (e: any) => {
    e.preventDefault();
    if (guess.trim().toUpperCase() === currentWord) {
      alert("To'g'ri!");
      onScoreUpdate(s => s + 500);
      generate();
    } else {
      alert("Xato! Qaytadan urinib ko'ring.");
      setGuess("");
    }
  };

  return (
    <div className="text-center p-6 flex flex-col items-center">
      <div className="text-xs uppercase tracking-[0.4em] text-zinc-400 mb-4 font-black">Harflarni tartiblang</div>
      <div className="text-7xl mb-12 tracking-widest font-black text-vibrant-red uppercase drop-shadow-sm">{shuffled}</div>
      <form onSubmit={check} className="w-full max-w-md flex flex-col gap-6">
        <input 
          autoFocus
          className="bg-zinc-900 border-b-8 border-vibrant-blue rounded-3xl px-10 py-6 text-5xl font-black w-full text-center outline-none focus:scale-105 transition-all text-white placeholder-zinc-700"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="..."
        />
        <button 
          type="submit"
          className="w-full py-6 bg-vibrant-blue text-white rounded-3xl text-2xl font-black uppercase tracking-widest shadow-[0_8px_0_#2B5BB6] active:shadow-none active:translate-y-2 transition-all hover:brightness-110"
        >
          Tekshirish
        </button>
      </form>
    </div>
  );
};

// 17. MONKEY TYPE (Typing Speed Test)
const MonkeyTypeGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const WORD_LIST = [
    "olma", "anor", "behi", "uzum", "shaftoli", "qovun", "tarvuz", "o'rik", "gilos", "anjir",
    "maktab", "ustoz", "kitob", "daftar", "qalam", "bilim", "vatan", "quyosh", "yulduz", "osmon",
    "daryo", "tog'", "dala", "bog'", "gul", "daraxt", "uy", "oila", "aka", "uka", "opa", "singil",
    "salom", "rahmat", "marhamat", "hayr", "yaxshi", "yomon", "katta", "kichik", "issiq", "sovuq",
    "oila", "do'st", "mehnat", "sharaf", "baxt", "omad", "shodlik", "quvonch", "tabassum", "nur"
  ];

  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const generateWords = () => {
    const shuffled = [...WORD_LIST].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 30));
    setUserInput("");
    setWordIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setGameOver(false);
  };

  React.useEffect(generateWords, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver) return;
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(" ")) {
      // Word completed
      const typedWord = value.trim();
      const targetWord = words[wordIndex];
      
      let newCorrect = correctChars;
      if (typedWord === targetWord) {
        newCorrect += targetWord.length + 1; // +1 for space
        onScoreUpdate(s => s + 10);
      }
      
      setCorrectChars(newCorrect);
      setTotalChars(t => t + Math.max(typedWord.length, targetWord.length) + 1);
      
      if (wordIndex === words.length - 1) {
        finishGame();
      } else {
        setWordIndex(i => i + 1);
        setUserInput("");
      }
    } else {
      setUserInput(value);
    }

    // Update live WPM
    if (startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      const currentWpm = Math.round((correctChars / 5) / minutes);
      setWpm(currentWpm > 0 ? currentWpm : 0);
    }
  };

  const finishGame = () => {
    setGameOver(true);
    if (startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      const finalWpm = Math.round((correctChars / 5) / minutes);
      setWpm(finalWpm);
      onScoreUpdate(s => s + finalWpm * 10);
    }
  };

  return (
    <div className="w-full max-w-4xl p-8 flex flex-col gap-12 select-none" onClick={() => inputRef.current?.focus()}>
      <div className="flex justify-between items-end px-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Tezlik</span>
          <span className="text-5xl font-black text-vibrant-yellow font-mono">{wpm}<span className="text-xl text-zinc-600 ml-2">WPM</span></span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Aniqdik</span>
          <span className="text-4xl font-black text-zinc-400 font-mono">{totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100}%</span>
        </div>
      </div>

      <div className="relative leading-[1.6] text-3xl font-mono flex flex-wrap gap-x-4 gap-y-2 h-40 overflow-hidden">
        {words.map((word, idx) => {
          const isCurrent = idx === wordIndex;
          const isFinished = idx < wordIndex;
          
          return (
            <div key={idx} className={`relative ${isCurrent ? 'text-zinc-200' : isFinished ? 'text-zinc-600' : 'text-zinc-800'} transition-colors duration-200`}>
              {word}
              {isCurrent && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-vibrant-yellow transition-all duration-150" 
                  style={{ width: `${(userInput.length / word.length) * 100}%` }} 
                />
              )}
              {/* Character by character rendering for current word would be cooler but this is faster for now */}
            </div>
          );
        })}
        
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl animate-in fade-in zoom-in duration-500">
             <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Ajoyib!</h3>
             <p className="text-vibrant-yellow text-xl font-bold uppercase tracking-widest mb-8">{wpm} WPM</p>
             <button 
               onClick={generateWords}
               className="px-10 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#D9D9D9] active:translate-y-1 active:shadow-none transition-all"
             >
               QAYTADAN
             </button>
          </div>
        )}
      </div>

      <input 
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-10"
        value={userInput}
        onChange={handleInput}
        autoFocus
      />
      
      {!gameOver && !startTime && (
        <p className="text-center text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em] animate-pulse">Yozishni boshlang...</p>
      )}
    </div>
  );
};

// 18. HANOI GAME
const HanoiGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [towers, setTowers] = useState<number[][]>([[3, 2, 1], [], []]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const DISK_COLORS: Record<number, string> = {
    1: 'bg-vibrant-red shadow-[0_4px_0_#C94C4C]',
    2: 'bg-vibrant-blue shadow-[0_4px_0_#2B5BB6]',
    3: 'bg-vibrant-green shadow-[0_4px_0_#3B8E3B]',
    4: 'bg-vibrant-orange shadow-[0_4px_0_#D97706]',
  };

  const handleTowerClick = (towerIdx: number) => {
    if (won) return;

    if (selectedTower === null) {
      if (towers[towerIdx].length > 0) {
        setSelectedTower(towerIdx);
      }
    } else {
      if (selectedTower === towerIdx) {
        setSelectedTower(null);
        return;
      }

      const diskToMove = towers[selectedTower][towers[selectedTower].length - 1];
      const targetTowerTop = towers[towerIdx][towers[towerIdx].length - 1];

      if (!targetTowerTop || diskToMove < targetTowerTop) {
        // Valid move
        const newTowers = towers.map((t, idx) => {
          if (idx === selectedTower) return t.slice(0, -1);
          if (idx === towerIdx) return [...t, diskToMove];
          return t;
        });

        setTowers(newTowers);
        setMoves(m => m + 1);
        setSelectedTower(null);

        // Check win
        if ((towerIdx === 1 || towerIdx === 2) && newTowers[towerIdx].length === 3) {
          setWon(true);
          onScoreUpdate(s => s + 500);
        }
      } else {
        // Invalid move
        setSelectedTower(null);
      }
    }
  };

  const reset = () => {
    setTowers([[3, 2, 1], [], []]);
    setSelectedTower(null);
    setMoves(0);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8 select-none">
      <div className="flex gap-20 items-end h-64">
        {towers.map((tower, idx) => (
          <div 
            key={idx} 
            onClick={() => handleTowerClick(idx)}
            className={`w-32 h-full flex flex-col items-center justify-end relative cursor-pointer group`}
          >
            {/* Tower Pillar */}
            <div className={`absolute bottom-0 w-3 h-48 rounded-t-full transition-colors ${selectedTower === idx ? 'bg-vibrant-red' : 'bg-zinc-800 group-hover:bg-zinc-700'}`} />
            
            {/* Tower Base */}
            <div className={`absolute bottom-0 w-32 h-3 rounded-full transition-colors ${selectedTower === idx ? 'bg-vibrant-red' : 'bg-zinc-800'}`} />

            {/* Disks */}
            <div className="flex flex-col-reverse items-center z-10 w-full mb-3">
              {tower.map((diskSize, dIdx) => (
                <motion.div
                  key={diskSize}
                  layoutId={`disk-${diskSize}`}
                  className={`${DISK_COLORS[diskSize]} h-8 rounded-xl border-2 border-white/20 transition-all flex items-center justify-center text-[10px] font-black text-white/50`}
                  style={{ width: `${30 + diskSize * 20}%` }}
                >
                  {diskSize}
                </motion.div>
              ))}
            </div>

            {/* Selected Indicator */}
            {selectedTower === idx && (
              <motion.div 
                layoutId="selector"
                className="absolute -top-8 w-6 h-6 border-4 border-vibrant-red border-t-transparent animate-spin rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex gap-8">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Yurishlar</span>
              <span className="text-3xl font-black text-white">{moves}</span>
           </div>
        </div>

        {won ? (
          <div className="animate-in zoom-in duration-300">
            <h3 className="text-4xl font-black text-vibrant-green uppercase italic tracking-tighter mb-4">G'ALABA!</h3>
            <button 
              onClick={reset}
              className="px-10 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-black uppercase tracking-widest shadow-[0_6px_0_#D9D9D9] active:translate-y-1 active:shadow-none transition-all"
            >
              QAYTADAN BOSHLASH
            </button>
          </div>
        ) : (
          <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] max-w-xs leading-loose">
            Diskni tanlang va uni boshqa minoraga o'tkazing. Katta diskni kichik disk ustiga qo'yib bo'lmaydi.
          </p>
        )}
      </div>
    </div>
  );
};

// 19. MINESWEEPER
const MinesweeperGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [board, setBoard] = useState(Array(25).fill({ isMine: false, revealed: false }));
  
  React.useEffect(() => {
    const newBoard = Array(25).fill(null).map(() => ({ isMine: Math.random() < 0.2, revealed: false }));
    setBoard(newBoard);
  }, []);

  const reveal = (i: number) => {
    if (board[i].revealed) return;
    const next = [...board];
    next[i] = { ...next[i], revealed: true };
    setBoard(next);
    if (next[i].isMine) {
      alert("BOOM! Mag'lubiyat.");
      onScoreUpdate(0);
    } else {
      onScoreUpdate(s => s + 50);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 bg-zinc-800 p-4 rounded-3xl">
      {board.map((cell, i) => (
        <button
          key={i}
          onClick={() => reveal(i)}
          className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all ${cell.revealed ? (cell.isMine ? 'bg-rose-600' : 'bg-emerald-600') : 'bg-zinc-700 hover:bg-zinc-600'}`}
        >
          {cell.revealed ? (cell.isMine ? '💣' : '💎') : ''}
        </button>
      ))}
    </div>
  );
};

// 20. PROGRAMMING QUIZ
const ProgrammingQuiz = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const QUESTIONS = [
    { 
      q: "HTML nima degani?", 
      a: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Tool Multi Language"], 
      r: 0 
    },
    { 
      q: "JavaScript-da 'const' nima uchun ishlatiladi?", 
      a: ["O'zgaruvchi qiymatini o'zgartirish uchun", "O'zgarmas qiymatlarni e'lon qilish uchun", "Funksiyalarni o'chirish uchun"], 
      r: 1 
    },
    { 
      q: "CSS-da rangni belgilash uchun qaysi xususiyat ishlatiladi?", 
      a: ["font-color", "text-style", "color"], 
      r: 2 
    },
    { 
      q: "React nima?", 
      a: ["Ma'lumotlar bazasi", "JavaScript kutubxonasi", "Dizayn instrumenti"], 
      r: 1 
    },
    { 
      q: "JSON qisqartmasi nima?", 
      a: ["JavaScript Object Notation", "Java Sequential Object Network", "Joint Standard Open Node"], 
      r: 0 
    }
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (i: number) => {
    if (i === QUESTIONS[idx].r) {
      setScore(s => s + 1);
      onScoreUpdate(s => s + 200);
    }
    
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
    } else {
      setGameOver(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="w-full max-w-lg bg-white p-12 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200 text-center">
        <h3 className="text-5xl font-black text-zinc-900 italic uppercase mb-4 tracking-tighter">Tamom!</h3>
        <p className="text-vibrant-blue mb-10 font-black uppercase tracking-[0.2em] text-sm">Natijangiz: {score} / {QUESTIONS.length}</p>
        <button 
          onClick={reset}
          className="w-full py-6 bg-vibrant-blue text-white rounded-3xl font-black uppercase tracking-widest shadow-[0_8px_0_#2B5BB6] active:translate-y-2 active:shadow-none transition-all hover:scale-[1.02]"
        >
          QAYTADAN BOSHLASH
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200">
      <div className="text-center mb-10">
        <div className="text-[10px] font-black text-vibrant-blue uppercase tracking-[0.4em] mb-4">Savol {idx + 1} / {QUESTIONS.length}</div>
        <div className="text-3xl font-black text-zinc-900 leading-tight">"{QUESTIONS[idx].q}"</div>
      </div>
      <div className="flex flex-col gap-4">
        {QUESTIONS[idx].a.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)} 
            className="w-full py-5 px-6 bg-zinc-50 hover:bg-zinc-100 text-left rounded-3xl border-2 border-zinc-100 hover:border-vibrant-blue transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-black text-zinc-600 group-hover:bg-vibrant-blue group-hover:text-white transition-colors">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="font-bold text-zinc-800 group-hover:text-zinc-900">{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 21. TRIVIA GAME
const TriviaGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const QUESTIONS = [
    { q: "O'zbekiston poytaxti qaysi?", a: ["Samarqand", "Toshkent", "Buxoro"], r: 1 },
    { q: "Dunyoning eng baland cho'qqisi qaysi?", a: ["Everest", "K2", "Monblan"], r: 0 },
    { q: "Amir Temur qaysi shahar yaqinida tug'ilgan?", a: ["Samarqand", "Buxoro", "Shahrisabz"], r: 2 },
    { q: "Quyosh sistemasidagi eng katta sayyora qaysi?", a: ["Saturn", "Yupiter", "Mars"], r: 1 },
    { q: "Inson tanasidagi eng katta a'zo qaysi?", a: ["Yurak", "Miya", "Teri"], r: 2 }
  ];
  
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const answer = (i: number) => {
    if (i === QUESTIONS[idx].r) {
      setScore(s => s + 1);
      onScoreUpdate(s => s + 150);
    }
    
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
    } else {
      setGameOver(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="w-full max-w-lg bg-white p-12 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200 text-center">
        <h3 className="text-5xl font-black text-zinc-900 italic uppercase mb-4 tracking-tighter">Yakunlandi!</h3>
        <p className="text-vibrant-blue mb-10 font-black uppercase tracking-[0.2em] text-sm">To'g'ri javoblar: {score} / {QUESTIONS.length}</p>
        <button 
          onClick={reset}
          className="w-full py-6 bg-vibrant-blue text-white rounded-3xl font-black uppercase tracking-widest shadow-[0_8px_0_#2B5BB6] active:translate-y-2 active:shadow-none transition-all hover:scale-[1.02]"
        >
          QAYTADAN BOSHLASH
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200">
      <div className="text-center mb-10">
        <div className="text-[10px] font-black text-vibrant-blue uppercase tracking-[0.4em] mb-4">Savol-Javob {idx + 1} / {QUESTIONS.length}</div>
        <div className="text-3xl font-black text-zinc-900 leading-tight">"{QUESTIONS[idx].q}"</div>
      </div>
      <div className="flex flex-col gap-4">
        {QUESTIONS[idx].a.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => answer(i)} 
            className="w-full py-5 px-6 bg-zinc-50 hover:bg-zinc-100 text-left rounded-3xl border-2 border-zinc-100 hover:border-vibrant-blue transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-black text-zinc-600 group-hover:bg-vibrant-blue group-hover:text-white transition-colors">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="font-bold text-zinc-800 group-hover:text-zinc-900">{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 21. BLACKJACK (Simple)
const BlackjackGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [player, setPlayer] = useState([10, 5]);
  const [sum, setSum] = useState(15);

  const hit = () => {
    const card = Math.floor(Math.random() * 10) + 1;
    const next = [...player, card];
    setPlayer(next);
    const s = next.reduce((a, b) => a + b, 0);
    setSum(s);
    if (s > 21) alert("Busted! 21 dan o'tib ketdi.");
    else if (s === 21) { onScoreUpdate(s => s + 1000); alert("Blackjack!"); }
  };

  return (
    <div className="text-center">
      <div className="text-sm text-zinc-500 uppercase tracking-widest mb-6">Sizning kartalaringiz</div>
      <div className="flex gap-4 justify-center mb-8">
        {player.map((c, i) => <div key={i} className="w-20 h-28 bg-white text-black rounded-xl flex items-center justify-center text-3xl font-black">{c}</div>)}
      </div>
      <div className="text-4xl font-mono mb-8">Jami: <span className={sum > 21 ? 'text-rose-500' : 'text-emerald-400'}>{sum}</span></div>
      <button onClick={hit} className="px-10 py-4 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors">Karta olish</button>
    </div>
  );
};

// 22. MAZE GAME
const MazeGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const SIZE = 10;
  const CELL_SIZE = 60;
  const MAZE = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  ];

  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const move = (dx: number, dy: number) => {
    if (won) return;
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (
      newX >= 0 && newX < SIZE &&
      newY >= 0 && newY < SIZE &&
      MAZE[newY][newX] === 0
    ) {
      setPlayer({ x: newX, y: newY });
      setMoves(m => m + 1);
      if (newX === 9 && newY === 9) {
        setWon(true);
        onScoreUpdate(s => s + 350);
      }
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowUp') move(0, -1);
        if (e.key === 'ArrowDown') move(0, 1);
        if (e.key === 'ArrowLeft') move(-1, 0);
        if (e.key === 'ArrowRight') move(1, 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, won]);

  const reset = () => {
    setPlayer({ x: 0, y: 0 });
    setWon(false);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8 w-full max-w-5xl">
      <div className="relative bg-zinc-900 p-6 rounded-[3.5rem] border-8 border-zinc-800 shadow-2xl overflow-hidden">
        <div 
          className="grid grid-cols-10 gap-2"
          style={{ width: SIZE * CELL_SIZE, height: SIZE * CELL_SIZE }}
        >
          {MAZE.map((row, y) => 
            row.map((cell, x) => (
              <div 
                key={`${x}-${y}`}
                className={`w-full h-full rounded-2xl transition-all duration-300 ${
                  cell === 1 ? 'bg-zinc-800 shadow-inner' : 'bg-zinc-950'
                } flex items-center justify-center relative`}
              >
                {x === 0 && y === 0 && <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl" />}
                {x === 9 && y === 9 && (
                  <div className="animate-pulse flex items-center justify-center">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full shadow-[0_0_30px_#10b981]" />
                  </div>
                )}
                {player.x === x && player.y === y && (
                  <motion.div 
                    layoutId="player"
                    className="w-12 h-12 bg-cyan-500 rounded-full shadow-[0_0_25px_#06b6d4] z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))
          )}
        </div>

        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-[3rem] z-20">
            <h3 className="text-7xl font-black text-emerald-500 mb-8 uppercase italic tracking-tighter drop-shadow-2xl">YUTDINGIZ!</h3>
            <button 
              onClick={reset}
              className="px-16 py-6 bg-white text-black rounded-3xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              YANA O'YNASH
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="grid grid-cols-3 gap-6">
          <div />
          <button onClick={() => move(0, -1)} className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all shadow-xl text-white"><ArrowUp size={36} /></button>
          <div />
          <button onClick={() => move(-1, 0)} className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all shadow-xl text-white"><ArrowLeft size={36} /></button>
          <button onClick={() => move(0, 1)} className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all shadow-xl text-white"><ArrowDown size={36} /></button>
          <button onClick={() => move(1, 0)} className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all shadow-xl text-white"><ArrowRight size={36} /></button>
        </div>
        
        <div className="flex gap-12 text-center bg-zinc-900/50 px-12 py-6 rounded-[2.5rem] border border-white/5">
          <div>
            <div className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">YURISHLAR HISOBI</div>
            <div className="text-6xl font-black text-white italic tracking-tighter">{moves}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 23. ANAGRAM GAME
// 23. NATURE QUIZ
const NatureQuiz = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const QUESTIONS = [
    { 
      q: "Dunyodagi eng katta okean qaysi?", 
      a: ["Atlantika okeani", "Tinch okeani", "Hind okeani"], 
      r: 1 
    },
    { 
      q: "Qaysi sayyora 'Qizil sayyora' deb ataladi?", 
      a: ["Venera", "Mars", "Yupiter"], 
      r: 1 
    },
    { 
      q: "Eng katta sutemizuvchi hayvon qaysi?", 
      a: ["Fil", "Ko'k kit", " Jirafa"], 
      r: 1 
    },
    { 
      q: "O'simliklar fotosintez jarayonida nimani ajratib chiqaradi?", 
      a: ["Karbonat angidrid", "Kislorod", "Azot"], 
      r: 1 
    },
    { 
      q: "Yerning tabiiy yo'ldoshi nima?", 
      a: ["Quyosh", "Oyni", "Mars"], 
      r: 1 
    }
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (i: number) => {
    if (i === QUESTIONS[idx].r) {
      setScore(s => s + 1);
      onScoreUpdate(s => s + 250);
    }
    
    if (idx < QUESTIONS.length - 1) {
      setIdx(idx + 1);
    } else {
      setGameOver(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="w-full max-w-lg bg-white p-12 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200 text-center">
        <h3 className="text-5xl font-black text-zinc-900 italic uppercase mb-4 tracking-tighter">Tabiat!</h3>
        <p className="text-vibrant-green mb-10 font-black uppercase tracking-[0.2em] text-sm">Natijangiz: {score} / {QUESTIONS.length}</p>
        <button 
          onClick={reset}
          className="w-full py-6 bg-vibrant-green text-white rounded-3xl font-black uppercase tracking-widest shadow-[0_8px_0_#3B8E3B] active:translate-y-2 active:shadow-none transition-all hover:scale-[1.02]"
        >
          QAYTADAN BOSHLASH
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-[2.5rem] shadow-2xl border-b-[8px] border-zinc-200">
      <div className="text-center mb-10">
        <div className="text-[10px] font-black text-vibrant-green uppercase tracking-[0.4em] mb-4">Savol {idx + 1} / {QUESTIONS.length}</div>
        <div className="text-3xl font-black text-zinc-900 leading-tight">"{QUESTIONS[idx].q}"</div>
      </div>
      <div className="flex flex-col gap-4">
        {QUESTIONS[idx].a.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)} 
            className="w-full py-5 px-6 bg-zinc-50 hover:bg-zinc-100 text-left rounded-3xl border-2 border-zinc-100 hover:border-vibrant-green transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-black text-zinc-600 group-hover:bg-vibrant-green group-hover:text-white transition-colors">
                {String.fromCharCode(65 + i)}
              </div>
              <span className="font-bold text-zinc-800 group-hover:text-zinc-900">{opt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 24. FLAPPY BIRD
const FlappyBird = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [birdY, setBirdY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<{ x: number; topHeight: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const GRAVITY = 0.6;
  const JUMP = -8;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 160;
  const PIPE_SPEED = 3.5;
  const CONTAINER_HEIGHT = 500;
  const CONTAINER_WIDTH = 400;

  const jump = () => {
    if (gameOver) {
      reset();
      return;
    }
    if (!gameStarted) setGameStarted(true);
    setVelocity(JUMP);
  };

  const reset = () => {
    setBirdY(250);
    setVelocity(0);
    setPipes([]);
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
  };

  React.useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setBirdY(y => {
        const newY = y + velocity;
        if (newY <= 0 || newY >= CONTAINER_HEIGHT - 30) {
          setGameOver(true);
          return y;
        }
        return newY;
      });
      setVelocity(v => v + GRAVITY);

      setPipes(currentPipes => {
        let newPipes = currentPipes.map(p => ({ ...p, x: p.x - PIPE_SPEED }));
        
        // Remove off-screen pipes
        if (newPipes.length > 0 && newPipes[0].x < -PIPE_WIDTH) {
          newPipes.shift();
          setScore(s => {
            const newScore = s + 1;
            onScoreUpdate(prev => prev + 50);
            return newScore;
          });
        }

        // Add new pipe
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CONTAINER_WIDTH - 200) {
           newPipes.push({
             x: CONTAINER_WIDTH,
             topHeight: Math.random() * (CONTAINER_HEIGHT - PIPE_GAP - 100) + 50
           });
        }

        return newPipes;
      });

      // Collision detection
      pipes.forEach(p => {
        if (
          p.x < 80 + 30 && 
          p.x + PIPE_WIDTH > 80 && 
          (birdY < p.topHeight || birdY + 30 > p.topHeight + PIPE_GAP)
        ) {
          setGameOver(true);
        }
      });

    }, 24);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, velocity, birdY, pipes]);

  return (
    <div 
      className="relative bg-sky-300 rounded-[2.5rem] overflow-hidden shadow-2xl border-b-[8px] border-sky-400 select-none cursor-pointer"
      style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
      onClick={jump}
    >
      {/* Background clouds */}
      <div className="absolute top-20 left-10 w-24 h-12 bg-white/40 rounded-full blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-16 bg-white/40 rounded-full blur-xl" />

      {/* Pipes */}
      {pipes.map((p, i) => (
        <React.Fragment key={i}>
          {/* Top Pipe */}
          <div 
            className="absolute bg-emerald-500 border-x-4 border-b-8 border-emerald-600 rounded-b-2xl shadow-lg"
            style={{ left: p.x, top: 0, width: PIPE_WIDTH, height: p.topHeight }}
          />
          {/* Bottom Pipe */}
          <div 
            className="absolute bg-emerald-500 border-x-4 border-t-8 border-emerald-600 rounded-t-2xl shadow-lg"
            style={{ left: p.x, top: p.topHeight + PIPE_GAP, width: PIPE_WIDTH, height: CONTAINER_HEIGHT - (p.topHeight + PIPE_GAP) }}
          />
        </React.Fragment>
      ))}

      {/* Bird */}
      <motion.div 
        className="absolute left-20 w-12 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-zinc-900 shadow-xl overflow-hidden"
        style={{ top: birdY }}
        animate={{ rotate: velocity * 2 }}
      >
        <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full">
           <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
        </div>
        <div className="absolute bottom-1 right-0 w-6 h-4 bg-orange-500 rounded-full rotate-12" />
        <div className="absolute left-0 w-6 h-4 bg-white/50 rounded-full -rotate-12" />
      </motion.div>

      {/* UI */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-white text-center"
          >
            <div className="text-6xl font-black italic uppercase tracking-tighter mb-4 drop-shadow-2xl">UCHISH!</div>
            <p className="font-bold uppercase tracking-[0.3em] text-xs">Boshlash uchun bosing</p>
          </motion.div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
           <div className="text-white text-center p-8 bg-zinc-900 rounded-[2rem] border-b-[8px] border-black shadow-2xl">
              <div className="text-4xl font-black italic uppercase mb-2">TAMOM!</div>
              <div className="text-vibrant-yellow text-5xl font-black mb-6 drop-shadow-lg">{score}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                QAYTADAN
              </button>
           </div>
        </div>
      )}

      <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
        <span className="text-7xl font-black text-white/50 drop-shadow-lg">{score}</span>
      </div>
    </div>
  );
};

// 25. HILO GAME
const HiLoGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [num, setNum] = useState(50);
  
  const guess = (type: 'hi' | 'lo') => {
    const next = Math.floor(Math.random() * 100);
    const win = (type === 'hi' && next > num) || (type === 'lo' && next < num);
    if (win) onScoreUpdate(s => s + 100);
    setNum(next);
  };

  return (
    <div className="text-center">
       <div className="text-9xl font-black mb-12 font-mono text-zinc-200">{num}</div>
       <div className="flex gap-6">
         <button onClick={() => guess('hi')} className="flex-1 py-6 bg-emerald-600 rounded-3xl text-2xl font-black uppercase italic tracking-widest hover:scale-105 active:scale-95 transition-all">KATTAROQ</button>
         <button onClick={() => guess('lo')} className="flex-1 py-6 bg-rose-600 rounded-3xl text-2xl font-black uppercase italic tracking-widest hover:scale-105 active:scale-95 transition-all">KICHIKROQ</button>
       </div>
       <p className="mt-8 text-zinc-500 font-bold">Keyingi son qanaqa bo'ladi deb o'ylaysiz?</p>
    </div>
  );
};

// 26. PING PONG
const PingPongGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [ball, setBall] = useState({ x: 500, y: 300, dx: 7, dy: 7 });
  const [paddleY, setPaddleY] = useState(240);
  const [aiPaddleY, setAiPaddleY] = useState(240);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const WIDTH = 1000;
  const HEIGHT = 600;
  const PADDLE_H = 120;
  const PADDLE_W = 15;
  const BALL_SIZE = 18;

  const reset = () => {
    setBall({ x: 500, y: 300, dx: Math.random() > 0.5 ? 8 : -8, dy: (Math.random() - 0.5) * 12 });
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
  };

  React.useEffect(() => {
    if (!gameStarted || gameOver) return;

    const loop = setInterval(() => {
      setBall(b => {
        let { x, y, dx, dy } = b;
        x += dx;
        y += dy;

        // Top/Bottom walls
        if (y <= 0 || y >= HEIGHT - BALL_SIZE) dy *= -1;

        // Left Paddle (Player)
        if (x <= PADDLE_W + 20 && y >= paddleY && y <= paddleY + PADDLE_H) {
          dx *= -1.08; // Speed up
          x = PADDLE_W + 21;
          setScore(s => s + 1);
          onScoreUpdate(s => s + 50);
        }

        // Right Paddle (AI)
        if (x >= WIDTH - PADDLE_W - 20 - BALL_SIZE && y >= aiPaddleY && y <= aiPaddleY + PADDLE_H) {
          dx *= -1.08;
          x = WIDTH - PADDLE_W - 21 - BALL_SIZE;
        }

        // Score / Game Over
        if (x < 0) {
          setGameOver(true);
        }
        if (x > WIDTH) {
          // AI missed (reset ball to center)
          dx *= -1;
          x = WIDTH / 2;
        }

        return { x, y, dx, dy };
      });

      // AI movement
      setAiPaddleY(prev => {
        const diff = (ball.y - (prev + PADDLE_H / 2)) * 0.12;
        return Math.max(0, Math.min(HEIGHT - PADDLE_H, prev + diff));
      });

    }, 16);

    return () => clearInterval(loop);
  }, [gameStarted, gameOver, ball.y, paddleY, aiPaddleY]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    const y = clientY - rect.top - PADDLE_H / 2;
    setPaddleY(Math.max(0, Math.min(HEIGHT - PADDLE_H, y)));
  };

  return (
    <div className="flex flex-col items-center gap-12 p-8 w-full">
      <div 
        className="relative bg-slate-950 rounded-[3.5rem] border-8 border-slate-900 overflow-hidden cursor-none shadow-2xl"
        style={{ width: WIDTH, height: HEIGHT }}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onClick={() => !gameStarted && setGameStarted(true)}
      >
        {/* Net */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-4 border-dashed border-slate-800/50 -translate-x-1/2" />

        {/* Player Paddle */}
        <div 
          className="absolute left-6 w-4 bg-cyan-400 rounded-full shadow-[0_0_30px_#22d3ee] border-2 border-white/20"
          style={{ top: paddleY, height: PADDLE_H }}
        />

        {/* AI Paddle */}
        <div 
          className="absolute right-6 w-4 bg-rose-500 rounded-full shadow-[0_0_30px_#f43f5e] border-2 border-white/20"
          style={{ top: aiPaddleY, height: PADDLE_H }}
        />

        {/* Ball */}
        <motion.div 
          className="absolute bg-white rounded-full shadow-[0_0_25px_white]"
          style={{ left: ball.x, top: ball.y, width: BALL_SIZE, height: BALL_SIZE }}
        />

        {/* Overlay */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="text-center">
              <h3 className="text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">PING PONG</h3>
              <p className="text-cyan-400 font-black uppercase tracking-[0.5em] animate-pulse">BOSHLASH UCHUN BOSING</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl">
            <h3 className="text-8xl font-black text-rose-500 mb-6 uppercase italic drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]">O'YIN TUGADI</h3>
            <div className="text-white text-4xl font-bold mb-10">HISOB: {score}</div>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="px-16 py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              QAYTADAN
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-24 mt-8">
        <div className="text-center">
          <div className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">BALLINGIZ</div>
          <div className="text-7xl font-black text-zinc-100 tracking-tighter drop-shadow-lg">{score}</div>
        </div>
      </div>
    </div>
  );
};

// 27. TOWER STACK (MINORA)
const TowerStackGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [blocks, setBlocks] = useState<{ x: number; w: number; color: string }[]>([
    { x: 100, w: 200, color: 'bg-zinc-700' }
  ]);
  const [currentX, setCurrentX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);

  const CONTAINER_W = 600;
  const COLORS = [
    'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 
    'bg-emerald-500', 'bg-cyan-500', 'bg-blue-500', 'bg-violet-500'
  ];

  const reset = () => {
    setBlocks([{ x: 150, w: 300, color: 'bg-zinc-700' }]);
    setCurrentX(0);
    setDirection(1);
    setGameOver(false);
    setPlaying(false);
    setSpeed(4);
  };

  React.useEffect(() => {
    if (!playing || gameOver) return;

    const interval = setInterval(() => {
      setCurrentX(x => {
        let nextX = x + direction * speed;
        const currentW = blocks[blocks.length - 1].w;
        
        if (nextX <= 0) {
          nextX = 0;
          setDirection(1);
        } else if (nextX + currentW >= CONTAINER_W) {
          nextX = CONTAINER_W - currentW;
          setDirection(-1);
        }
        return nextX;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [playing, gameOver, direction, speed, blocks]);

  const placeBlock = () => {
    if (gameOver) {
      reset();
      return;
    }
    if (!playing) {
      setPlaying(true);
      return;
    }

    const lastBlock = blocks[blocks.length - 1];
    const leftBound = lastBlock.x;
    const rightBound = lastBlock.x + lastBlock.w;
    
    const newLeft = Math.max(currentX, leftBound);
    const newRight = Math.min(currentX + lastBlock.w, rightBound);
    const newWidth = newRight - newLeft;

    if (newWidth <= 0) {
      setGameOver(true);
      return;
    }

    const nextBlock = {
      x: newLeft,
      w: newWidth,
      color: COLORS[blocks.length % COLORS.length]
    };

    setBlocks([...blocks, nextBlock]);
    onScoreUpdate(s => s + 100);
    setSpeed(s => Math.min(12, s + 0.23));
    setCurrentX(newLeft);
  };

  const visibleBlocks = blocks.slice(-12);

  return (
    <div className="flex flex-col items-center gap-12 p-8 w-full max-w-5xl">
      <div 
        className="relative bg-zinc-950 w-full max-w-[600px] h-[750px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-zinc-900 cursor-pointer"
        onClick={placeBlock}
      >
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
        
        <div className="absolute inset-x-0 bottom-0 flex flex-col-reverse p-14 pb-12">
           {visibleBlocks.map((b, i) => (
             <motion.div 
               key={i}
               className={`h-[45px] rounded-2xl shadow-xl border-b-4 border-black/30 ${b.color}`}
               style={{ width: b.w, marginLeft: b.x, marginBottom: 6 }}
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
             />
           ))}

           {!gameOver && playing && (
             <div 
               className={`h-[45px] rounded-2xl shadow-2xl opacity-90 border-b-4 border-black/30 ${COLORS[blocks.length % COLORS.length]}`}
               style={{ width: blocks[blocks.length - 1].w, marginLeft: currentX, marginBottom: 6 }}
             />
           )}
        </div>

        {!playing && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-20">
            <div className="text-center">
              <div className="text-7xl font-black italic text-white mb-6 drop-shadow-2xl tracking-tighter">MINORA</div>
              <div className="px-10 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 inline-block">
                <p className="text-white font-black uppercase tracking-[0.4em] text-xs animate-pulse">BOSHLASH UCHUN BOSING</p>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xl z-20 p-8">
            <div className="text-center bg-zinc-900/90 backdrop-blur-2xl p-12 rounded-[3rem] border-t border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-sm">
              <h3 className="text-5xl font-black text-rose-500 mb-2 uppercase italic tracking-tighter">QULADI!</h3>
              <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">QAVATLAR SONI</div>
              <div className="text-white text-9xl font-black mb-10 drop-shadow-lg">{blocks.length - 1}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="w-full py-6 bg-white text-black rounded-3xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl"
              >
                QAYTADAN
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-14 right-14 flex flex-col items-end z-20">
          <div className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">QAVATLAR</div>
          <div className="text-7xl font-black text-white italic drop-shadow-2xl tracking-tighter">{blocks.length - 1}</div>
        </div>
      </div>
    </div>
  );
};

// 28. GRAVITY RUNNER
const GravityGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> }) => {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gravity, setGravity] = useState(1); // 1 = down, -1 = up
  const [posY, setPosY] = useState(150);
  const [obstacles, setObstacles] = useState<{ id: number; x: number; top: boolean }[]>([]);
  const [velocity, setVelocity] = useState(0);

  const WIDTH = 600;
  const HEIGHT = 300;
  const PLAYER_SIZE = 30;
  const OBSTACLE_W = 40;
  const OBSTACLE_H = 60;

  const reset = () => {
    setPlaying(false);
    setGameOver(false);
    setScore(0);
    setGravity(1);
    setPosY(HEIGHT - PLAYER_SIZE - 20);
    setObstacles([]);
    setVelocity(0);
  };

  const jump = () => {
    if (gameOver) return;
    if (!playing) {
      setPlaying(true);
      return;
    }
    // Jump only if near ground
    if (posY >= HEIGHT - PLAYER_SIZE - 25) {
      setVelocity(-14);
    }
  };

  React.useEffect(() => {
    if (!playing || gameOver) return;

    const gameLoop = setInterval(() => {
      // 1. Update Physics (Constant gravity downwards)
      const gravityForce = 0.8;
      setVelocity(v => {
        const newV = v + gravityForce;
        return Math.max(-15, Math.min(15, newV));
      });

      setPosY(y => {
        let nextY = y + velocity;
        // Collision with floor
        if (nextY >= HEIGHT - PLAYER_SIZE - 20) {
          nextY = HEIGHT - PLAYER_SIZE - 20;
          setVelocity(0);
        }
        // Ceiling limit
        if (nextY <= 20) {
          nextY = 20;
          setVelocity(0);
        }
        return nextY;
      });

      // 2. Obstacles (Only on ground now for jumping game)
      setObstacles(obs => {
        const nextObs = obs
          .map(o => ({ ...o, x: o.x - (5 + score / 500) }))
          .filter(o => o.x > -OBSTACLE_W);

        // Spawn logic
        if (nextObs.length === 0 || nextObs[nextObs.length - 1].x < WIDTH - 250) {
          if (Math.random() < 0.03) {
            nextObs.push({
              id: Date.now(),
              x: WIDTH,
              top: false // All obstacles on ground for jumping
            });
          }
        }

        // Collision Check
        for (const o of nextObs) {
          const horizontalMatch = (o.x < 40 + PLAYER_SIZE - 5) && (o.x + OBSTACLE_W > 40 + 5);
          const verticalMatch = posY + PLAYER_SIZE > HEIGHT - OBSTACLE_H - 20;

          if (horizontalMatch && verticalMatch) {
            setGameOver(true);
            return obs;
          }
        }

        return nextObs;
      });

      setScore(s => {
        const newS = s + 1;
        if (newS % 100 === 0) onScoreUpdate(v => v + 10);
        return newS;
      });

    }, 20);

    return () => clearInterval(gameLoop);
  }, [playing, gameOver, gravity, velocity, posY, score]);

  // Keyboard support for space
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [playing, gameOver, posY]);

  return (
    <div className="flex flex-col items-center gap-12 p-8 w-full max-w-5xl">
      <div 
        className="relative bg-zinc-900 w-full max-w-[1000px] h-[500px] rounded-[3.5rem] border-8 border-zinc-800 overflow-hidden cursor-pointer shadow-inner"
        onClick={jump}
      >
        {/* Bounds */}
        <div className="absolute inset-x-0 top-0 h-10 bg-zinc-800" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-zinc-800" />

        {/* Player */}
        <motion.div 
          className="absolute left-10 w-12 h-12 rounded-xl bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.6)] border-4 border-white/20"
          style={{ top: posY }}
          animate={{ rotate: velocity * 2.5 }}
        />

        {/* Obstacles */}
        {obstacles.map(o => (
          <div 
            key={o.id}
            className="absolute bg-rose-500 rounded-xl shadow-[0_0_25px_#f43f5e] border-4 border-white/10"
            style={{ 
              left: o.x, 
              width: OBSTACLE_W, 
              height: OBSTACLE_H, 
              top: HEIGHT - OBSTACLE_H - 40 
            }}
          />
        ))}

        {!playing && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
            <h3 className="text-6xl font-black text-white italic mb-6 uppercase drop-shadow-2xl">GRAVITATSIYA</h3>
            <div className="px-10 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <p className="text-white font-black uppercase tracking-[0.4em] animate-pulse">SAKRASH UCHUN BOSING</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
            <h3 className="text-7xl font-black text-rose-500 mb-6 italic uppercase drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]">TALAFOT!</h3>
            <div className="text-white text-5xl font-black mb-10 uppercase tracking-tighter">MASOFA: {Math.floor(score/10)}m</div>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="px-16 py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              QAYTADAN
            </button>
          </div>
        )}

        <div className="absolute top-14 right-14 text-right">
          <div className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">MASOFA</div>
          <div className="text-6xl font-black text-white italic tracking-tighter drop-shadow-lg">{Math.floor(score/10)}m</div>
        </div>
      </div>
      
      <div className="flex gap-4 items-center text-zinc-500 font-bold uppercase text-xs tracking-[0.3em]">
        <MousePointer2 size={24} />
        <span>BOSISH YOKI PROBEL ORQALI SAKRANG</span>
      </div>
    </div>
  );
};

const ChessGame = ({ onScoreUpdate }: { onScoreUpdate: React.Dispatch<React.SetStateAction<number>> } ) => {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState("Oq rang yuradi");

  function makeAMove(move: any) {
    try {
      const result = game.move(move);
      if (result) {
        setGame(new Chess(game.fen()));
        
        if (game.isCheckmate()) {
          setStatus(`${game.turn() === 'w' ? 'Qora' : 'Oq'} yutdi! MOT!`);
          onScoreUpdate(s => s + 500);
        } else if (game.isDraw()) {
          setStatus("Durang!");
        } else if (game.isCheck()) {
          setStatus(`${game.turn() === 'w' ? 'Oq' : 'Qora'} shohiga SHAX!`);
        } else {
          setStatus(`${game.turn() === 'w' ? 'Oq' : 'Qora'} rang yuradi`);
        }
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to queen for simplicity
    });

    return move;
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="bg-vibrant-blue/10 px-6 py-2 rounded-xl border-l-4 border-vibrant-blue w-full text-center">
        <span className="text-vibrant-blue font-black uppercase tracking-widest leading-none block mb-1">HOLAT</span>
        <span className="text-xl font-black text-zinc-800">{status}</span>
      </div>

      <div className="w-full aspect-square bg-white rounded-2xl shadow-2xl p-2 border-4 border-zinc-100 overflow-hidden">
        {/* @ts-ignore */}
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>

      <button 
        onClick={() => {
          setGame(new Chess());
          setStatus("Oq rang yuradi");
        }}
        className="px-8 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl font-bold transition-all flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        YANGI O'YIN
      </button>
    </div>
  );
};

// --- APP ---
export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-cyan-500/30 flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Dashboard onSelectGame={setSelectedGame} />
          </motion.div>
        ) : (
          <motion.div key="game" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}>
            <GameWrapper game={selectedGame} onBack={() => setSelectedGame(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="pb-32 pt-24 flex flex-col items-center justify-center text-center gap-8 border-t-8 border-white/5 bg-black/60 mt-auto px-6 overflow-hidden">
        <motion.div 
          animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-3xl sm:text-7xl font-black tracking-[0.1em] uppercase text-zinc-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          © 2026 SUPER O'YINLAR MARKAZI
        </motion.div>
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="text-xl sm:text-3xl font-black uppercase tracking-[0.6em] text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] font-mono"
        >
          najot portal games premium
        </motion.div>

        <div className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-zinc-400 mt-8 flex flex-col items-center gap-4">
          <motion.div 
            animate={{ x: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2"
          >
            <span className="opacity-30">ASOSOCHI:</span>
            <span className="text-white border-b-4 border-vibrant-blue pb-1">Mubashshir Sadriddinov</span>
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex items-center gap-4"
          >
            <div className="h-1 w-20 bg-zinc-800 rounded-full"></div>
            <span className="tracking-[0.5em]">DASTURCHI</span>
            <div className="h-1 w-20 bg-zinc-800 rounded-full"></div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

