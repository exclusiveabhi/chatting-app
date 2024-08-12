export function convertToTitleCase(str) {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, function (s) {
      return s.toUpperCase();
    }); // Capitalize the first letter
}
