export function validateInput(text) {
  if (text.length === 0) {
    return "Invalid data was found in the input field";
  } else {
    return null;
  }
}
