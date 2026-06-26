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
              waveSpeedX={0.016}
              waveSpeedY={0.008}
              waveAmpX={24}
              waveAmpY={12}
              friction={0.92}
              tension={0.01}
              paused={paused}
              interactive={!paused}
              maxCursorMove={54}
              xGap={16}
              yGap={38}
            />
          </Suspense>
        ) : null}
      </div>
      <div className="hero-stage-layer hero-stage-layer--content">{children}</div>
    </div>
  )
}

export default HeroBackground
