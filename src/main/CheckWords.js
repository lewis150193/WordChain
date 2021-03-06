const GetData = require('../main/GetData');
class CheckWordsList {
    //Gets all the words with a difference of one from array.
    static checkClosestWords(head, arrayOfWords) {
        const wordsAccept = [];
        arrayOfWords.forEach( word => {
          if(this.getDifferenceBetweenTwoWords(head,word) === true){
              wordsAccept.push(word)
          }
        });
        return wordsAccept;
    }


    //Checks the difference between two words.
   static getDifferenceBetweenTwoWords(head,word) {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
            if(head[i] === word[i]){
                count++
            }
        }
        if(head.length - count === 1) return true;

    }

    //Returns words which are characters in the same place as the last word.
    static returnsWord (lastWord,arr,startWord) {
        const newArr = [];
        arr.map( word => {
            for (let i = 0; i < word.length; i++) {
                //If current word in array has the char in the same place as the last word.
                if(word[i] === lastWord[i]){
                    //If the startWord (head of the chain) char is not equal to current word char
                    // (So it doesn't return words that has already looked at.)
                    //So it wont accidently return the head word
                    if(startWord[i] !== word[i]) {
                        newArr.push(word)
                    }
                }
            }
        });
        return newArr;
    }
    async checkIfWordHasFurtherMatchingWords(word, lastWord) {
//Check if this word returns an array of words or a word.
        const data = await GetData.getDataFromFile('./50kwords.txt');
        const wordsOfLength = await GetData.returnWordsOfLength(word, data);
        const shortenedList = await CheckWordsList.checkClosestWords(word, wordsOfLength);
        const returnsWords = await CheckWordsList.returnsWord(lastWord, shortenedList, word);
        return returnsWords;
    }

    //Need a function which will check ahead to see if the word has a follow up.
   async getOneWord (arr,lastWord) {
        if(arr.length === 1){
            return arr[0]
        } else {
            //Loop through the array.
            for (let i = 0; i < arr.length; i++) {
            //Take the first word.
              let word =  arr[i];
                const returnsWords = await this.checkIfWordHasFurtherMatchingWords(word, lastWord);
                //If it does return that word to the chain else move on to next word in the chain.
                if(returnsWords.length > 0){
               return arr[i]
              }
            }
            }
        }

}
module.exports = CheckWordsList;

