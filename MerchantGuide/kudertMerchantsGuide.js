	const readline = require('readline');
	
	let isDollarsRegEx = new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+dollars$/i);
	let HowMuchRegEx = new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i);
	let HowManyRegEx = new RegExp(/^how\s+many\s+dollars\s+is\s+([a-z\s]+)[?]$/i);
	let isValidRomanRegEx = new RegExp(/^m{0,3}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/);
	let arrayString = new Array()
	let lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000}
	//***************INICIO DEL PROGRAMA***************************
	async function main(){

		let valor = ''
		function readLine(message){
			const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
			});
			return new Promise(resolve => {
				rl.question(message,name =>{
					resolve(name)
					rl.close()
				})
			})
		}
		let veces = 7
		console.log('****************MERCHANT GUIDE****************')
		console.log('Enter the expressions \n finish process n')
		do{
			let alias = await readLine('ALIAS: ')
			arrayAliases(alias) // ingresar numeros
			veces--
			if(veces== 0 || alias=='n' ) {
				console.log('ENTRA')
				break;
			};
		}while(true);

		console.log('Ingrese frase:')
		do{
			let wordFrase = (await readLine('F:')).toLowerCase();
			if(HowMuchRegEx.exec(wordFrase)!==null){
				howMuchIs(wordFrase)
			}
			else if(isDollarsRegEx.exec(wordFrase)!==null){
				isDollarsValid(wordFrase)

			}else if(HowManyRegEx.exec(wordFrase)!==null){
				howManyDollars(wordFrase)

			}else{
				console.log(`What are you talking about really?`)
				break;
			}

		}while (true);
	}

	function convertRoman(romano) {
		if (isValidRomanRegEx.exec(romano)!==null) {
			romano = romano.toUpperCase()
		    let arabic = 0
		    let i = romano.length
			while (i--) {
				lookup[romano[i]] < lookup[romano[i+1]] ? arabic -= lookup[romano[i]] : arabic += lookup[romano[i]];
			}
			return arabic;

		}else {
			return 0
		}
	  	
	}

	let items= []
	function arrayAliases(word){
		let isValueRegEx = new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i);
		let phrase = word.toLowerCase()
		phrase = isValueRegEx.exec(phrase);
		if (phrase!==null){
			partition = phrase[0].split('is')
			

			let bn = true
			for (var i = 0; i<items.length; i++) {
				if (items.length!==0) {
					if(items[i][0] == partition[0] || items[i][1] == partition[1]){
						items[i][0] = partition[0].trim()
						items[i][1] = partition[1].trim()
						bn = false
					}else{
						bn = true
					}		
						
				}else {
					break;
				}
			}
			if (bn!==false){
				items.push([partition[0].trim(),partition[1].trim()]) // creando array de items
			}
		}else{
			console.log('Frase Incorrecta')
		}
	}

	function convertLanguage(word){
		let expression = word
		expression = expression.split(' ') // divide la expression en arrays
		armaword = ''
		// comvertir expression cua cua en ii 
		for (var i = 0; i < expression.length; i++) {
			for (var j = 0; j < items.length; j++) {
				if(items[j][0]===expression[i])
					armaword += items[j][1]
			}
		}
		return armaword
	}

	function howMuchIs(word){
		let expression = word.toLowerCase()
		expression  = HowMuchRegEx.exec(expression)
		if(expression!==null){
			let partition = expression[1].trim()
			const romanValue = convertRoman(convertLanguage(partition))
			if (romanValue !== 0) {
				console.log(`${partition} is ${romanValue}`)
			}else {
				console.log('expression romana ingresada incorrecta');
			}
			
		}else{
			console.log('Frase expression incorrecta')
		}

	}
	function isDollarsValid(word){
		let expression = word.toLowerCase()
		expression = isDollarsRegEx.exec(expression)

		if(expression!==null){
			let DollarValor = parseFloat(expression[2]).toFixed(2) // Extraer el valor numerico de la frase 
			let partition = expression[1].trim() 
			partition = partition.split(' ') //comveritr en un array los elementos sobrantes
			let unidad = partition.pop() // quitar el ultimo elemento y asignar a una variable
			let wordRoman= partition.join(' ')
			const romanValue = convertRoman(convertLanguage(wordRoman))
			if(romanValue!==0){
				let cadena = `${romanValue},${unidad},${DollarValor}`
				arrayString.push(cadena)
			}else{
				console.log('Expresion romana ingresada incorrecta');
			}

			
		}else {
			console.log('Expresion incorrecta')
		}
	}

	function howManyDollars(word){
		let expression =    word.toLowerCase()
		expression = HowManyRegEx.exec(expression) // pregunta a expression How Many
		if (expression!= null) {
			let partiton = expression[1].trim();
			partiton = partiton.split(' ')
			let unity = partiton.pop()
			let wordRoman= partiton.join(' ')
			const romanValue = convertRoman(convertLanguage(wordRoman))
			if (romanValue!==0) {
				for (var i = 0; i < arrayString.length; i++) {
					let compare = arrayString[i]
					compare = compare.split(',')
					if(unity === compare[1]){
						let ruleOfThree = 0
						ruleOfThree = (romanValue * parseFloat(compare[2])/ parseFloat(compare[0]) )
						console.log(`${wordRoman} ${unity}  is ${ruleOfThree.toFixed(2)} Dollars`)
					}
				}

			}else {
				console.log('Expresion romana ingresada incorrecta');
			}

		}else {
			console.log('Expresion Incorrecta')
		}

	}
	main()

