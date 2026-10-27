import { createContext, useContext } from 'react'

export const RocketTransitionContext = createContext(null)

export function useRocketTransition() {
  return useContext(RocketTransitionContext)
}
