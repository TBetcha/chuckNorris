/** @format */

//DOM stuff

document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
	console.log('gettt');
	//theres only one input so I could just say ipnut, but no
	const number = document.querySelector('input[type="number"]').value;
	console.log(number);

	const xhr = new XMLHttpRequest();

	xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

	//what do I want to do with the data?
	xhr.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);

			let output = '';

			if (response.type === 'success') {
				//API is formatted with return as obj(type, value)
				//we only want value that has array
				response.value.forEach(function (joke) {
					//we only want the joke part out of our response
					//append it each loop through
					output += `<li>${joke.joke}</li>`;
				});
			} else {
				output += `<li>Something went wrong</li>`;
			}
			document.querySelector('.jokes').innerHTML = output;
		}
	};

	xhr.send();

	e.preventDefault();
}
