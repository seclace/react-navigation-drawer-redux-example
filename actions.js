export const increment = 'increment'
export const decrement = 'decrement'

export function addCount () {
  return {
    type: increment,
  }
}

export function reduceCount () {
  return {
    type: decrement,
  }
}
