import { Suspense, lazy } from 'react'

const Waves = lazy(() => import('./Waves'))

function HeroBackground({ variant = 'waves', paused = false, className, children }) {
  return (
    <div className={`hero-stage ${className ?? ''}`}>
      <div className="hero-stage-layer hero-stage-layer--base">
        {variant === 'waves' ? (
          <Suspense fallback={null}>
            <Waves
              className="hero-stage-background hero-stage-background--waves"
              lineColor="rgba(245, 245, 243, 0.26)"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={28}
              waveAmpY={14}
              friction={0.92}
              tension={0.01}
              paused={paused}
              maxCursorMove={0}
              xGap={14}
              yGap={34}
            />
          </Suspense>
        ) : null}
      </div>
      <div className="hero-stage-layer hero-stage-layer--content">{children}</div>
    </div>
  )
}

export default HeroBackground
