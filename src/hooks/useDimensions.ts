import { RefObject, useMemo, useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback)
  return () => {
    window.removeEventListener('resize', callback)
  }
}

function useDimensions(ref: RefObject<any>) {
  const dimensions = useSyncExternalStore(subscribe, () =>
    JSON.stringify({
      width: ref.current?.scrollWidth ?? 0,
      height: ref.current?.scrollHeight ?? 0,
    })
  )
  return useMemo(() => JSON.parse(dimensions), [dimensions])
}

export { useDimensions }
