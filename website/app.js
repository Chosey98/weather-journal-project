/* Global Variables */

// the auth variable for open weather api
const auth = '89a4ffeac4081aa6dbebdd33fbe7476f';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Adding event listener for the generate button
document.getElementById('generate').addEventListener('click', async (e) => {
	const postalCode = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;
	const tempData = await getTemp(url, postalCode, auth);
	await postData('http://localhost:8080/postData', {
		temperature: tempData.main.temp,
		date: newDate,
		userResponse: feelings,
	});
	await updateUI();
});

async function getTemp(url, postalCode, auth) {
	const res = await fetch(`${url}${postalCode},us&appid=${auth}`);
	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

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

async function updateUI() {
	const req = await fetch('http://localhost:8080/all');
	try {
		const data = await req.json();
		document.getElementById('date').innerHTML = data.date;
		document.getElementById('temp').innerHTML = data.temperature;
		document.getElementById('content').innerHTML = data.userResponse;
	} catch (error) {
		console.error(error);
	}
}
