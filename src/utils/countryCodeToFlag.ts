export const countryCodeToFlag = (countryCode: string) => {
  const codePoints = [...countryCode.toUpperCase()].map(
    (char) => 0x1f1e6 + char.charCodeAt(0) - "A".charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
};
