import React, {
  useState,
  CSSProperties,
  useEffect,
  FC,
  useRef,
  createRef,
  useMemo,
} from 'react'
import { useDimensions } from '@/hooks/useDimensions'

interface TypewriterProps {
  text: string
  delay: number
}

const Typewriter: FC<TypewriterProps> = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFirst, setFirst] = useState(true)

  const containerRef = useRef(null)
  const innerRef = useRef(null)

  const { width: containerWidth } = useDimensions(containerRef)
  const { width: innerWidth } = useDimensions(innerRef)

  const style = useMemo(
    () =>
      ({
        animationDuration:
          containerWidth < innerWidth ? `${currentText.length / 15}s` : 'unset',
        '--my-scroll-var': `${containerWidth}px`,
      }) as CSSProperties,
    [containerWidth, innerWidth, currentText]
  )

  useEffect(() => {
    if (isFirst) {
      setCurrentText(text)
      setFirst(false)
      return
    }

    if (currentIndex === 0) {
      setCurrentText('')
    }
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return text !== currentText ? (
    <span className="type-effect">{currentText}</span>
  ) : (
    <div className="type-writer-scroll" ref={containerRef}>
      <div className="type-writer-inner">
        <div className="type-writer-text" ref={innerRef} style={style}>
          {text}
        </div>
      </div>
    </div>
  )
}

export default Typewriter
