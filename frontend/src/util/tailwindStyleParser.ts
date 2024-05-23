export const PrependChildSelector = (
  childElement: string,
  selector: string,
  styleList: string
): string => {
  const selectionPrefix = `[&${selector}${childElement}]:`
  const styleTokens = styleList.split(' ')
  for (let i = 0; i < styleTokens.length; i++) {
    styleTokens[i] = selectionPrefix + styleTokens[i]
  }
  return styleTokens.join(' ')
}
