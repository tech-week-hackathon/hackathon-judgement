export const trimString = (string: string, padded: number = 6) => {
  return string
    ? `${string.substring(0, padded)}...${string.substring(string.length-(padded), string.length)}`
    : ''
}
