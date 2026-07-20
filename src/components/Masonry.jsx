import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Masonry.css'

const COLUMN_QUERIES = [
  ['(min-width: 1500px)', 5],
  ['(min-width: 1120px)', 4],
  ['(min-width: 760px)', 3],
  ['(min-width: 480px)', 2],
]

function getColumnCount() {
  return COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches)?.[1] ?? 1
}

function Masonry({
  items,
  className = '',
  gap = 12,
  ease = 'power3.out',
  duration = 0.65,
  stagger = 0.045,
  animateFrom = 'bottom',
  hoverScale = 0.975,
}) {
  const containerRef = useRef(null)
  const itemRefs = useRef(new Map())
  const hasMounted = useRef(false)
  const [width, setWidth] = useState(0)
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const updateColumns = () => setColumns(getColumnCount())
    updateColumns()
    const mediaQueries = COLUMN_QUERIES.map(([query]) => window.matchMedia(query))
    mediaQueries.forEach((query) => query.addEventListener('change', updateColumns))
    return () => mediaQueries.forEach((query) => query.removeEventListener('change', updateColumns))
  }, [])

  useLayoutEffect(() => {
    const element = containerRef.current
    if (!element) return undefined

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { grid, height } = useMemo(() => {
    if (!width) return { grid: [], height: 0 }

    const columnWidth = (width - gap * (columns - 1)) / columns
    const columnHeights = Array.from({ length: columns }, () => 0)
    const grid = items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights))
      const ratio = Number(item.aspectRatio) || 16 / 9
      const itemHeight = columnWidth / ratio
      const x = column * (columnWidth + gap)
      const y = columnHeights[column]

      columnHeights[column] += itemHeight + gap
      return { ...item, x, y, width: columnWidth, height: itemHeight }
    })

    return {
      grid,
      height: Math.max(0, ...columnHeights) - gap,
    }
  }, [columns, gap, items, width])

  useLayoutEffect(() => {
    if (!grid.length) return

    const context = gsap.context(() => {
      grid.forEach((item, index) => {
        const element = itemRefs.current.get(item.id)
        if (!element) return

        const target = { x: item.x, y: item.y, width: item.width, height: item.height }

        if (!hasMounted.current) {
          const initialPosition = {
            top: { x: item.x, y: -item.height - 80 },
            bottom: { x: item.x, y: window.innerHeight + 80 },
            left: { x: -item.width - 80, y: item.y },
            right: { x: window.innerWidth + 80, y: item.y },
            center: { x: width / 2 - item.width / 2, y: height / 2 - item.height / 2 },
          }[animateFrom] ?? { x: item.x, y: item.y + 80 }

          gsap.fromTo(
            element,
            { opacity: 0, x: initialPosition.x, y: initialPosition.y, width: item.width, height: item.height, filter: 'blur(10px)' },
            { opacity: 1, ...target, filter: 'blur(0px)', duration: 0.8, ease, delay: index * stagger }
          )
          return
        }

        gsap.to(element, { ...target, duration, ease, overwrite: 'auto' })
      })
    }, containerRef)

    hasMounted.current = true
    return () => context.revert()
  }, [animateFrom, duration, ease, grid, height, stagger, width])

  const setItemRef = (id) => (element) => {
    if (element) itemRefs.current.set(id, element)
    else itemRefs.current.delete(id)
  }

  const animateHover = (id, scale) => {
    const element = itemRefs.current.get(id)
    if (element) gsap.to(element, { scale, duration: 0.26, ease: 'power2.out', overwrite: 'auto' })
  }

  return (
    <div ref={containerRef} className={`masonry ${className}`.trim()} style={{ height }}>
      {grid.map((item) => {
        const content = (
          <>
            <img src={item.img} alt={item.alt} />
            <span className="masonry-item-scrim" aria-hidden="true" />
            {item.title ? <span className="masonry-item-title">{item.title}</span> : null}
          </>
        )

        const sharedProps = {
          ref: setItemRef(item.id),
          className: 'masonry-item',
          onPointerEnter: () => animateHover(item.id, hoverScale),
          onPointerLeave: () => animateHover(item.id, 1),
        }

        return item.url ? (
          <a key={item.id} {...sharedProps} href={item.url} target="_blank" rel="noreferrer" aria-label={item.title || item.alt}>
            {content}
          </a>
        ) : (
          <div key={item.id} {...sharedProps}>
            {content}
          </div>
        )
      })}
    </div>
  )
}

export default Masonry
