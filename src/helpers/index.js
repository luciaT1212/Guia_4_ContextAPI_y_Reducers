export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key, fallback) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : fallback
}