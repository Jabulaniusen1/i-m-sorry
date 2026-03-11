import { useRef, useState } from 'react'
import './App.css'

const SORRY_GIF = 'https://media1.tenor.com/m/gB-Q-FUWS-8AAAAd/i-am-so-sorry-apology.gif'
const YES_GIF = 'https://media.tenor.com/9euVF1XwE_YAAAAj/bunny-bunnies.gif'

const steps = [
  {
    title: 'I cheated, and I am truly sorry.',
    body:
      'I broke your trust. That is on me. I am not going to minimize it or make excuses. What I did was wrong, and I understand how deeply it hurt you.',
    gif: SORRY_GIF,
    note: 'You did not deserve that. I own it, fully and honestly.'
  },
  {
    title: 'I want us back to the way we were.',
    body:
      'I miss the way we laughed, the way we felt safe with each other, the way our love felt like home. I want us to find our way back to that if you are willing.',
    gif: SORRY_GIF,
    note: 'I am ready to rebuild with patience, respect, and truth.'
  },
  {
    title: 'I need you in my life.',
    body:
      'You are important to me in a way I cannot replace. I need your presence, your voice, your heart. I am asking for a chance to love you better and to be better.',
    gif: SORRY_GIF,
    note: 'I know I have to earn this, and I am ready to start.'
  },
  {
    title: 'I will make things right with actions.',
    body:
      'If you allow it, I will rebuild trust through patience, honesty, and consistency. I will respect your boundaries and your timing, and I will show you change, not just promise it.',
    gif: SORRY_GIF,
    note: 'You come first. Always. I will show up in the ways you need.'
  },
  {
    title: 'If you are open to it…',
    body:
      'I would love the chance to listen, to understand, and to love you better. I will respect your decision either way.',
    gif: SORRY_GIF,
    note: 'Whenever you want to talk, I will be there with an open heart.'
  }
]

const noTexts = [
  'No',
  'Please babe 😢',
  "I\'m sorry! 😭",
  'Forgive me! 😭',
  'Please... 😢',
  'Just one chance 😭',
  'I need you 😢',
  'Okay...'
]

function App() {
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noClicks, setNoClicks] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [saidYes, setSaidYes] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const audioRef = useRef(null)
  const step = steps[index]
  const isLastStep = index === steps.length - 1

  const goNext = () => setIndex((current) => Math.min(current + 1, steps.length - 1))
  const goBack = () => setIndex((current) => Math.max(current - 1, 0))

  const handleStart = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
    } catch (err) {
      // Even if autoplay fails, we still continue with the experience.
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStarted(true)
    }, 10000)
  }

  const handleNo = () => {
    setNoClicks((current) => Math.min(current + 1, 7))
  }

  const handleYes = () => {
    if (saidYes || celebrating) return
    setCelebrating(true)
    setTimeout(() => {
      setCelebrating(false)
      setSaidYes(true)
    }, 4000)
  }

  const noScale = Math.max(0.4, 1 - noClicks * 0.1)
  const yesScale = 1 + noClicks * 0.08
  const noLabel = noTexts[Math.min(noClicks, noTexts.length - 1)]
  const hideNo = noClicks >= 7

  return (
    <div className="page">
      <audio
        ref={audioRef}
        preload="none"
        src="/Sofia_Carson_-_Cant_Help_Falling_In_Love_CeeNaija.com_.mp3"
      />

      {!started && !loading && (
        <div className="gate" role="dialog" aria-modal="true">
          <div className="gate-card">
            <p className="eyebrow">Before you read</p>
            <h1>Press play first</h1>
            <p className="lead">
              I want you to read this while listening to our song. When you are ready, press play
              and the letter will open.
            </p>
            <button className="btn solid" onClick={handleStart}>
              Play and open the letter
            </button>
            <p className="gate-note">If the song does not play, tap the button again.</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="gate" role="dialog" aria-modal="true">
          <div className="loader-card">
            <div className="pulse" />
            <p className="loader-title">Loading your letter...</p>
            <p className="loader-note">Stay with me for a moment.</p>
          </div>
        </div>
      )}

      <div className={started ? 'content fade-in' : 'content blurred'} aria-hidden={!started}>
        <div className="bg-shape one" aria-hidden="true" />
        <div className="bg-shape two" aria-hidden="true" />
        <div className="bg-shape three" aria-hidden="true" />

        {!showFinal && (
          <>
            <header className="hero">
              <p className="eyebrow">For you</p>
              <h1>I am sorry. I love you.</h1>
              <p className="lead">
                This is my honest apology. I cheated, and I hurt you. I am not asking you to forget
                the past. I am asking you to see the effort I am ready to give, gently and consistently.
              </p>
              <div className="signature">— Jabulani (Your man)</div>
            </header>

            <section className="carousel">
              <div className="step-card" key={step.title}>
                <div className="step-copy">
                  <span className="eyebrow">Step {index + 1} of {steps.length}</span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.note && <p className="note">{step.note}</p>}
                </div>

                <div className="step-media">
                  {step.gif && (
                    <div className="gif-frame">
                      <img src={step.gif} alt="Sorry gif" />
                    </div>
                  )}
                </div>
              </div>

              <div className="controls">
                <button className="btn ghost" onClick={goBack} disabled={index === 0}>
                  Back
                </button>
                <div className="dots" role="tablist" aria-label="Steps">
                  {steps.map((_, dotIndex) => (
                    <button
                      key={`dot-${dotIndex}`}
                      className={`dot ${dotIndex === index ? 'active' : ''}`}
                      onClick={() => setIndex(dotIndex)}
                      aria-label={`Go to step ${dotIndex + 1}`}
                      aria-pressed={dotIndex === index}
                    />
                  ))}
                </div>
                {isLastStep ? (
                  <button className="btn solid" onClick={() => setShowFinal(true)}>
                    Finish
                  </button>
                ) : (
                  <button className="btn solid" onClick={goNext}>
                    Next
                  </button>
                )}
              </div>
            </section>

            <section className="promise-grid">
              <div className="promise-card">
                <h3>My promises</h3>
                <ul>
                  <li>I will show up with consistent care.</li>
                  <li>I will be honest and transparent.</li>
                  <li>I will be accountable and do the work.</li>
                  <li>I will respect your boundaries and pace.</li>
                </ul>
              </div>
              <div className="promise-card soft">
                <h3>A gentle note</h3>
                <p>
                  I know trust is rebuilt slowly. I am not rushing you. I am here, and I am ready to
                  prove this with steady actions, not just words.
                </p>
              </div>
            </section>
          </>
        )}

        {showFinal && (
          <section className="choice fade-in">
            <h2>Forgiven me yet babe?</h2>
            <p>
              I will respect your answer. I just want you to know how much I need you in my life.
            </p>
            <div className="choice-buttons">
              <button
                className="btn solid choice-yes"
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYes}
              >
                Yes
              </button>
              {!hideNo && (
                <button
                  className="btn ghost choice-no"
                  style={{ transform: `scale(${noScale})` }}
                  onClick={handleNo}
                >
                  {noLabel}
                </button>
              )}
            </div>
            {celebrating && (
              <div className="celebrate" role="status" aria-live="polite">
                <div className="confetti">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={`confetti-${i}`} />
                  ))}
                </div>
                <p>Celebrating us...</p>
              </div>
            )}
            {saidYes && (
              <div className="yes-reveal">
                <img
                  src={YES_GIF}
                  alt="Bunny love celebration"
                />
                <h3>I love you so much.</h3>
                <p>
                  You are my heart, and I am willing to do whatever it takes to make this right.
                  I will keep showing up, proving it, and loving you the way you deserve.
                </p>
              </div>
            )}
          </section>
        )}

        <footer className="footer">
          Made with care and an honest heart.
        </footer>
      </div>
    </div>
  )
}

export default App
