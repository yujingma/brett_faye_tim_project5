const app = {};

// call to Teleport autocomplete
app.callTeleport = () => {
	TeleportAutocomplete.init('.my-input').on('change', (cityData) => {
		var latitude = cityData.latitude;
		var longitude = cityData.longitude;
		console.log(`The city's latitude is ${latitude} and its longitude is ${longitude}`);
		app.callDarkSky(latitude, longitude);
	});
}
// ajax call to Dark Sky
app.callDarkSky = (latitude, longitude) => {
	var keyDarkSky = 'ecb6e7f16bb182021ecf519d1099721a';
	var weather = $.ajax({
		url: `https://api.darksky.net/forecast/${keyDarkSky}/${latitude},${longitude}`,
		method: 'GET',
		dataType: 'jsonp',
	}).then((res) => {
		console.log(res);
	});
}

// ajax call to Edamam
app.callEdamam = () => {
	var idEdamam = 'a4156de2';
	var keyEdamam = '10efc6df5c7cbcd8288887ca0f20e58c';
	var urlEdamam = 'https://api.edamam.com/search';
	var recipeEdamam = $.ajax({
		url: urlEdamam,
		dataType: 'json',
		method: 'GET',
		data: {
			q: 'soup',
			app_id: idEdamam,
			app_key: keyEdamam
		}
	}).then((res) => {
		console.log(res)
	});
}

// ajax call to Yummly
app.callYummly = () => {
	var idYummly = '95ec33fc';
	var keyYummly = '2410ab65b1957770177d384fa57c6070';
	var urlYummly = 'http://api.yummly.com/v1/api/recipes';
	var recipeYummly = $.ajax({
		url : urlYummly,
		dataType : 'json',
		method: 'GET',
		data: {
			q: 'soup',
			_app_id: idYummly,
			_app_key: keyYummly
		}
	}).then((res) => {
		console.log(res);
	})
}

// initialize code
app.init = () => {
	app.callTeleport();
	app.callDarkSky();
	app.callEdamam();
	app.callYummly();
};

// document ready
$(app.init);

