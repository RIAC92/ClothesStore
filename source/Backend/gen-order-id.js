function base37(input) {
    if (typeof (input) !== 'number') {
        return null
    }

    let characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    //console.log(characters.length)
    let base = characters.length;
    let num = parseInt(input);
    let convertNum = [];
    do {
        convertNum.unshift(num % base);
        num = Math.floor(num / base);
    } while (num > base)//end while
    convertNum.unshift(num);
   
    numberStr = convertNum.map(i => characters[i]);

    return numberStr.join("");
}//end base37


module.exports= {
    base37
}



