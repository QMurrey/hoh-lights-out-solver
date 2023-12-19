"use strict";
(function HOH9Squares() {
	for (let square of document.querySelectorAll('.square')) {
		square.addEventListener('mouseup', e => e.target.classList.toggle('active'));
	}

	document.querySelector('.calculate').addEventListener('mouseup', findAnswer);


	function findAnswer() {
		const result = [];
		let answerFound = false,
			j = 0;

		function findAnswerEngine(currentField) {
			/* Можно подсчитывать кол-во квадратов и запускать с определённой глубины
			function sumSquares(squares) {
				let result = 0;
				for (let i = 0, l = squares.length; i < l; i += 1) {
					result += squares[i].reduce((sum, cur) => sum += cur);
				}
				return result;
			} */
			function findAnswerLoop(currentField, depth, curDepth = 0) {
				// Если сейчас на нужной глубине, то проверяем 9
				if (curDepth === depth) {
					for (let i = 1; i <= 9; i += 1) {
						j++;
						const checker = toggleByThree(currentField, i);
						if (check(checker)) {
							result.push(i);
							return true;
						}
					}
				// Если нет, то на каждом ходу углубляемся и чекаем уже там
				} else {
					for (let i = 1; i <= 9; i += 1) {
						j++;
						const checker = toggleByThree(currentField, i);
						if (findAnswerLoop(checker, depth, curDepth + 1)) {
							result.push(i);
							return true;
						}
					}
				}
			}

			for (let i = 0; i <= 5; i += 1) {
				if (findAnswerLoop(currentField, i)) break;
			}
		}
		findAnswerEngine(organizeByThree(document.querySelectorAll('.square')));


		if (result[0] !== undefined) {
			const output = result.reverse().join(', ');
			document.querySelector('.output-message').innerHTML =
			`Нажми / Press ${output}.<br>Ходов проверено / Moves checked: ${j}`
		} else {
			document.querySelector('.output-message').innerHTML =
			`За 6 ходов не решить =(<br>Too bad, you can't solve this in 6 moves =(<br>Moves checked: ${j}`
		}
	}




	function organizeByThree(squares) {
		let result = [[], [], []],
			row = 0;

		for (let i = 0, l = squares.length; i < l; i += 1) {
			row = Math.floor(i / 3);
			squares[i].classList.contains('active') ? result[row].push(1) : result[row].push(0);
		}

		return result;
	}

	function toggleByThree(arr, i) {
		i -= 1;
		let row = Math.floor(i / 3),
			col = i % 3;

		// Перестраиваем массив, чтобы сбросить ссылки
		arr = JSON.parse(JSON.stringify(arr));

		// +!1 => 0
		// +!0 => 1

		// console.log("1\n", debugger_toString(arr));
		arr[row][col] = +!arr[row][col];
		if (row > 0) { arr[row - 1][col] = +!arr[row - 1][col] }
		if (row < 2) { arr[row + 1][col] = +!arr[row + 1][col] }
		if (col > 0) { arr[row][col - 1] = +!arr[row][col - 1] }
		if (col < 2) { arr[row][col + 1] = +!arr[row][col + 1] }
		// console.log("2\n", debugger_toString(arr));

		return arr;
	}

	function check(checker) {
		if (checker.reduce((sum, current) => sum + current.reduce((sum, current) => sum + current, 0), 0) === 9) {
			return true;
		}
		return false;
	}


	function debugger_toString(arr) {
		return arr.join(', \n');
	}
})()