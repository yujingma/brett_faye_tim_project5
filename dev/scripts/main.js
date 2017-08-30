const app = {};

// Edamam variables
app.idEdamam = 'a4156de2';
app.keyEdamam = '10efc6df5c7cbcd8288887ca0f20e58c';
app.urlEdamam = 'https://api.edamam.com/search';
app.queryEdamam = 'soup';

// ajax call to Edamam
app.callEdamam = () => {
	$.ajax({
		url: `${app.urlEdamam}?q=${app.queryEdamam}&app_id=${app.idEdamam}&app_key=${app.keyEdamam}&health=vegetarian`,
		method: 'GET'
	}).then((res) => {
		// console.log(res)
	});
}

// Yummly variables
app.idYummly = '86703d55';
app.keyYummly = '643f0b6adeda2bf621d4915673aece42';
app.urlYummly = 'http://api.yummly.com/v1';
app.queryYummly = 'soup';

// ajax call to Yummly
app.callYummly = () => {
	$.ajax({
		url: `${app.urlYummly}?q=${app.queryYummly}&app_id=${app.idYummly}&app_key=${app.keyYummly}`,
		method: 'GET'
	}).then((res) => {
		console.log(res)
	});
}

// initialize code
app.init = () => {
	app.callEdamam();
};

// document ready
$(app.init);