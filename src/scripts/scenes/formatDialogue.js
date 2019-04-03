
export default function formatDialogue(dialogue, type) {
  if (typeof dialogue !== 'string') return;

  const charCount = type === 'quest' ? 20 : 40;

  let result = [''];
  let numArr = 0;
  // split up string into array of words:
  const dialogues = dialogue.split(' ');
  // check if adding next word to string will overflow:
  dialogues.forEach((word, i) => {
    // if so, start new array.
    if ((result[numArr] + dialogues[i]).length > charCount) {
      result[++numArr] = dialogues[i];
    } else {
      result[numArr] = result[numArr] + ' ' +dialogues[i];
    }

  })
  // if not, add it.
  // repeat until string array is empty.
  return result;
}
