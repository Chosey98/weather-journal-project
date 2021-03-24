/* Global Variables */

// the auth variable for openweather API
const auth = '89a4ffeac4081aa6dbebdd33fbe7476f';

// The url used to fetch data from openweather API
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Adding event listener for the generate button that gets the user input and then sends a request to get temperature then posts it to the server then fetches it and displays it.
document.getElementById('generate').addEventListener('click', async (e) => {
	const postalCode = document.getElementById('zip').value;
	let unit;
	document.getElementsByName('units').forEach((rb) => {
		if (rb.checked) {
			unit = rb.value;
		}
	});
	const feelings = document.getElementById('feelings').value;
	const tempData = await getTemp(url, postalCode, auth, unit);
	await postData('http://localhost:8080/postData', {
		temperature: tempData.main.temp,
		date: newDate,
		userResponse: feelings,
	});
	await updateUI(unit);
});

// getTemp function to GET temperature from the openweather API

async function getTemp(url, postalCode, auth, unit) {
	const res = await fetch(
		`${url}${postalCode},us&appid=${auth}&units=${unit}`
	);
	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

// postData function to POST data to the server
async function postData(url, data) {
	const postReq = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return;
}

// updateUI function to fetch data from the server and display them on the website
async function updateUI(unit) {
	const req = await fetch('http://localhost:8080/all');
	try {
		const data = await req.json();
		document.getElementById('date').innerHTML = data.date;
		document.getElementById('temp').innerHTML = `${data.temperature} ${
			unit == 'imperial' ? '°F' : '°C'
		}`;
		document.getElementById('content').innerHTML = data.userResponse;
	} catch (error) {
		console.error(error);
	}
}
