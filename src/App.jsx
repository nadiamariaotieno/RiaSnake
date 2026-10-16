
import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Your first adventure is almost ready.')

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
              <strong>000</strong>
            </div>
          </div>

          <div className="game-board" aria-label="Decorative preview of the game board">
            <div className="board-grid" />

            <div className="decorative-snake" aria-hidden="true">
              <span className="snake-segment snake-head">
                <span className="snake-eye" />
                <span className="snake-eye" />
              </span>
              <span className="snake-segment" />
              <span className="snake-segment" />
              <span className="snake-segment" />
              <span className="snake-segment" />
              <span className="snake-segment" />
            </div>

            <div className="food strawberry" aria-hidden="true">♥</div>
            <div className="food sparkle sparkle-one" aria-hidden="true">✦</div>
            <div className="food sparkle sparkle-two" aria-hidden="true">✧</div>

            <div className="board-overlay">
              <span className="overlay-sparkle">✳</span>
              <h2>A sweet little challenge</h2>
              <p>The game begins one step at a time.</p>
              <span className="preview-label">GAME PREVIEW</span>
            </div>
          </div>

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
