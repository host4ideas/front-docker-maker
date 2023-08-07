export const enumFromStringValue = <T>(
  enm: { [s: string]: T },
  value: string
): T | undefined => {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : undefined
}

export const removeArrayItem = <T>(arr: T[], item: T) => {
  const index = arr.indexOf(item)

  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
