export const dekebabNames = (names: string[]): string[] => {
  const clearNames: string[] = Array.from({ length: names.length })
  for (let i = 0; i < names.length; i++) {
    clearNames[i] = dekebabName(names[i])
  }
  return clearNames
}

export const dekebabName = (name: string): string => {
  const tokens = name.split('-')
  for (let j = 0; j < tokens.length; j++) {
    tokens[j] =
      tokens[j].charAt(0)?.toUpperCase() + tokens[j].slice(1) ?? tokens[j]
  }
  return tokens.join(' ')
}
