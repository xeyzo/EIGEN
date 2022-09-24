function longer(word1, word2) {
    return (word1.length > word2.length) ? word1 : word2;
  }
  
  function longestWord(str) {
    const words = str.split(' ');
    return words.reduce(longer);
  }

  const sentence = "Saya sangat senang mengerjakan soal algoritma"


  console.log(longestWord(sentence))