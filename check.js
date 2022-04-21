let str = '"\n\n" "\n" "\n" "\n" "\nTurkish" "Journal" "of" "Fisheries" "and" "Aquatic" ';

str = str.replace(/(\r\n|\n|\r|"")/gm,'');

console.log(str);