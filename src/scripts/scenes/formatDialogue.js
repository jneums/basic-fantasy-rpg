
export default function formatDialogue(dialogue, type) {
  if (typeof dialogue !== 'string') return;

  let charCount;

  if (type === 'quest') {
    charCount = 20;
  } else if (type === 'characterSelection') {
    charCount = 48;
  } else {
    charCount = 40;
  }

  let result = [''];
  let numArr = 0;
  // split up string into array of words:
  const dialogues = dialogue.split(' ');
  // check if adding next word to string will overflow:
  dialogues.forEach((word, i) => {
    // if so, start new array.
    if ((result[numArr] + dialogues[i]).length > charCount) {
      result[++numArr] = dialogues[i] + ' ';
    } else {
      result[numArr] += dialogues[i] + ' ';
    }

  })
  // if not, add it.
  // repeat until string array is empty.
  return result;
}
