// let str = '"\n\n" "\n" "\n" "\n" "\nTurkish" "Journal" "of" "Fisheries" "and" "Aquatic" ';

// str = str.replace(/(\r\n|\n|\r|"")/gm,'');

let r = [
	{'1':'Hello'},
	{'2':'Bollo'}
]


r = [...r,{...r[1],'2.1':'li holo'}];
console.log(r);