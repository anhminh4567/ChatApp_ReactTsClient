export function getEnumStringFromNumber<T extends Record<number, string>>(
  value: number,
  enumObj: T
): string | null {
  return enumObj[value] || null;
}
