function capitaliseText(text: string) {
  let displayText = ''
  text
    .split(' ')
    .forEach(
      (word) => (displayText += word[0].toUpperCase() + word.slice(1) + ' ')
    )
  return displayText
}
export { capitaliseText }
