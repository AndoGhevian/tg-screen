import { generate } from "random-words";

export const randomPhrase = () => generate({
  exactly: 1,
  wordsPerString: 2,
  formatter: (word, index) => {
    return index === 0
      ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
      : word;
  },
})[0]
