export function limitText(text, maxLength) {
  if (text.length <= maxLength) {
    return text; // Return the original text if it's within the limit
  } else {
    return text.substring(0, maxLength) + "..."; // Return the substring with ellipsis
  }
}
