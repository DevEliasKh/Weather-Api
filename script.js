const searchBtn = document.querySelector('button');
let cityInput = '';
let temp = '';
let cityName = '';
let condition = '';
let weatherImgSrc = '';
searchBtn.addEventListener('click', () => {
	getUserValue();
	showWeather();
});

function getUserValue() {
	const searchBar = document.querySelector('input').value;
	// check for just letter and nothing else
	if (!searchBar) {
		console.log('no value');
	} else {
		cityInput = searchBar;
		console.log(cityInput);
	}
}
async function showWeather() {
	const response = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=abe35ea518404fca9b1122150232907&q=${cityInput}&aqi=no`,
		{ mode: 'cors' }
	);
	const current = response.json().then(function (response) {
		temp = response.current.feelslike_c;
		condition = response.current.condition.text;
		weatherImgSrc = response.current.condition.icon;
		cityName = response.location.name + ' ' + response.location.country;
		DOM();
	});
	function DOM() {
		const weatherImg = document.querySelector('img');
		const location = document.querySelector('.city-name');
		const cityTemp = document.querySelector('.temp');
		const cityCondition = document.querySelector('.condition');
		weatherImg.src = weatherImgSrc;
		location.innerHTML = `<span class="fas fa-map-marker-alt"> </span> ${cityName}`;
		cityTemp.innerText = temp;
		cityCondition.innerText = condition;
	}
}
