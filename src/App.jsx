
import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Your first adventure is almost ready.')
  const [food, setFood] = useState({ x: 12, y: 8 })
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState('ready')
  const [highScore, setHighScore] = useState(() => {
    try{
      return Number(localStorage.getItem('riaSnakeHighScore')) || 0
    } catch {
      return 0
    }
  })

  function createFood(currentSnake) {
    const emptyCells = []
    for (let y = 0; y < BOARD_ROWS; y += 1) {
      for (let x = 0; x < BOARD_COLUMNS; x += 1) {
        const occupied = currentSnake.some(segment => segment.x === x && segment.y === y)
       
        if (!occupied) {
          emptyCells.push({ x, y })
        }
      }
    }
    if (emptyCells.length === 0) return null

    const randomIndex = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomIndex]
  }

const BOARD_COLUMNS = 20
const BOARD_ROWS = 16
const GAME_SPEED = 140

const [snake, setSnake] = useState([
  { x: 5, y: 4 },
  { x: 4, y: 4 },
  { x: 3, y: 4 },
])

const [direction, setDirection] = useState({ x: 1, y: 0 })
const [isPlaying, setIsPlaying] = useState(false)

function restartGame() {
  const startingSnake = [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
  ]

  setSnake(startingSnake)
  setDirection({ x: 1, y: 0 })
  setFood(createFood(startingSnake))
  setScore(0)
  setIsPlaying(false)
  setGameStatus('ready')
}

const moveSnake = useCallback(() => {
  if (gameStatus !== 'playing') return

  const head = snake[0]

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  }

  const hitWall =
    newHead.x < 0 ||
    newHead.x >= BOARD_COLUMNS ||
    newHead.y < 0 ||
    newHead.y >= BOARD_ROWS

  if (hitWall) {
    setGameStatus('over')
    setIsPlaying(false)
    return
  }

  const eating = food !== null && newHead.x === food.x && newHead.y === food.y

  const bodyToCheck = eating ? snake : snake.slice(0, -1)

  const hitSelf = bodyToCheck.some(
    (segment) => segment.x === newHead.x && segment.y === newHead.y
  )

  if (hitSelf) {
    setGameStatus('over')
    setIsPlaying(false)
    return
  }

  const newSnake = eating
    ? [newHead, ...snake]
    : [newHead, ...snake.slice(0, -1)]

  setSnake(newSnake)

  if (eating) {
    setScore((previousScore) => {
      const nextScore = previousScore + 2

      setHighScore((previousHighScore) => Math.max(previousHighScore, nextScore))

      return nextScore
    })

    setFood(createFood(newSnake))
  }
}, [direction, food, gameStatus, snake])

    useEffect(() => {
      if (!isPlaying) return
    
      const timerId = setInterval(moveSnake, GAME_SPEED)
    
      return () => clearInterval(timerId)
    }, [isPlaying, moveSnake])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      }

      const nextDirection = directions[event.key]

      if (!nextDirection) return

      event.preventDefault()

      const isReversing =
        nextDirection.x === -direction.x &&
        nextDirection.y === -direction.y

      if (isReversing) return

      setDirection(nextDirection)
      setGameStatus('playing')
      setIsPlaying(true)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [direction])

  useEffect(() => {
    try {
      localStorage.setItem('riaSnakeHighScore', String(highScore))
    } catch {
      // The game can still work if browser storage is unavailable.
    }
  }, [highScore])

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="RiaSnake home">
          <span className="brand-icon">♡</span>
          <span>ria<span className="brand-accent">snake</span></span>
        </a>

        <span className="edition-label">THE LITTLE ARCADE</span>

        <div className="topbar-status">
          <span className="status-dot" />
          READY TO PLAY
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A LITTLE GAME, A LOT OF FUN</p>

          <h1>
            Meet your
            <br />
            <span>new favourite</span>
            <br />
            snake.
          </h1>

          <p className="hero-description">
            Collect treats, grow longer, and see how high
            you can score. A classic arcade game with a
            little RiaSnake magic.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#game-board">
              Explore the game <span aria-hidden="true">↘</span>
            </a>
            <span className="keyboard-hint">MADE FOR YOUR NEXT HIGH SCORE</span>
          </div>

          <div className="mini-stats">
            <div>
              <span className="mini-stat-number">01</span>
              <span className="mini-stat-label">CLASSIC MODE</span>
            </div>
            <div>
              <span className="mini-stat-number">∞</span>
              <span className="mini-stat-label">ROOM TO GROW</span>
            </div>
            <div>
              <span className="mini-stat-number">♡</span>
              <span className="mini-stat-label">MADE WITH LOVE</span>
            </div>
          </div>
        </div>

        <section className="game-card" id="game-board" aria-label="Game preview">
          <div className="game-card-header">
            <div className="game-title">
              <span className="game-heart">♥</span>
              <div>
                <strong>Ria's garden</strong>
                <span className="game-subtitle">CLASSIC MODE</span>
              </div>
            </div>

            <div className="score-display">
              <span>YOUR SCORE</span>
              <strong>{String(score).padStart(3, '0')}</strong>
            </div>
          </div>

          <div className="game-board live-game-board">
            <div className="board-grid" />
            <div
              className="live-grid"
              style={{
                gridTemplateColumns: `repeat(${BOARD_COLUMNS}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_ROWS}, 1fr)`,
              }}
              role="img"
              aria-label="RiaSnake game board"
            >
              {Array.from(
                { length: BOARD_COLUMNS * BOARD_ROWS },
                (_, index) => {
                  const x = index % BOARD_COLUMNS
                  const y = Math.floor(index / BOARD_COLUMNS)

                  const segmentIndex = snake.findIndex(
                    (segment) => segment.x === x && segment.y === y
                  )

                  const isSnake = segmentIndex !== -1
                  const isHead = segmentIndex === 0
                  const isFood = food !== null && x === food.x && y === food.y

                  return (
                    <span
                      key={`${x}-${y}`}
                      className={[
                        'grid-cell',
                        isSnake ? 'snake-cell' : '',
                        isHead ? 'snake-head-cell' : '',
                        isFood ? 'food-cell' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {isHead ? (
                        <span className="live-snake-eyes" aria-hidden="true">
                          ••
                        </span>
                      ) : null}
                      {isFood ? (
                        <span className="food-icon" aria-hidden="true">♥</span>
                      ) : null}
                    </span>
                  )
                }
              )}
            </div>
          </div>

          {gameStatus === 'over' && (
  <div className="game-over-overlay">
    <div className="game-over-card">
      <span className="game-over-heart">♡</span>
      <p className="eyebrow">OH, SNAKE!</p>
      <h2>Game over</h2>
      <p>You scored {score} points.</p>
      <button onClick={restartGame}>
        Play again ↻
      </button>
    </div>
  </div>
)}

          <div className="game-card-footer">
            <div className="legend">
              <span className="legend-dot" />
              <span>Collect treats</span>
            </div>
            <div className="legend">
              <span className="legend-heart">♥</span>
              <span>Grow your snake</span>
            </div>
            <span className="preview-tag">COMING TO LIFE</span>
          </div>
        </section>
      </section>

      <section className="bottom-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR LITTLE ARCADE</p>
            <h2>Simple rules. Happy chaos.</h2>
          </div>
          <span className="heading-doodle" aria-hidden="true">✳</span>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon pink-icon">↗</span>
            <h3>Keep moving</h3>
            <p>Guide your snake around the board and find your next treat.</p>
            <span className="feature-number">01 / MOVE</span>
          </article>

          <article className="feature-card">
            <span className="feature-icon peach-icon">♥</span>
            <h3>Collect the good stuff</h3>
            <p>Every treat brings you closer to your next high score.</p>
            <span className="feature-number">02 / COLLECT</span>
          </article>

          <article className="feature-card">
            <span className="feature-icon lilac-icon">✦</span>
            <h3>Beat your best</h3>
            <p>Challenge yourself, learn the patterns, and try again.</p>
            <span className="feature-number">03 / REPEAT</span>
          </article>
        </div>
      </section>

      <footer className="footer">
        <span>ria<span className="brand-accent">snake</span> ♡</span>
        <span>SMALL STEPS. BIG SCORES.</span>
        <span>MADE FOR FUN ✳</span>
      </footer>

      <div className="dev-note" role="status">
        <span className="status-dot" />
        {message}
        <button
          className="dev-note-button"
          onClick={() =>
            setMessage('Interface milestone complete! Next up: real snake movement.')
          }
        >
          Test the interface
        </button>
      </div>
    </main>
  )
}

export default App
