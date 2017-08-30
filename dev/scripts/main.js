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
		url: `https://api.darksky.net/forecast/${keyDarkSky}/${latitude},${longitude}?units=ca`,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			q: 'soup',
			app_id: app.idEdamam,
			app_key: app.keyEdamam,
			health: ['gluten-free']
		}

	}).then((res) => {
		console.log(res);
	});
}

// ajax call to Edamam
// app.callEdamam = () => {
// 	var idEdamam = 'a4156de2';
// 	var keyEdamam = '10efc6df5c7cbcd8288887ca0f20e58c';
// 	var urlEdamam = 'https://api.edamam.com/search';
// 	var recipeEdamam = $.ajax({
// 		url: urlEdamam,
// 		dataType: 'json',
// 		method: 'GET',
// 		data: {
// 			q: 'soup',
// 			app_id: idEdamam,
// 			app_key: keyEdamam
// 		}
// 	}).then((res) => {
// 		console.log(res)
// 	});
// }

// Yummly variables
app.idYummly = '95ec33fc';
app.keyYummly = '2410ab65b1957770177d384fa57c6070';
app.urlYummly = 'http://api.yummly.com/v1/api/recipes';
// app.urlExclude = 'http://api.yummly.com/v1/api/metadata/ingredient';

// ajax call to Yummly
app.callYummly = () => {
	var idYummly = '95ec33fc';
	var keyYummly = '2410ab65b1957770177d384fa57c6070';
	var urlYummly = 'http://api.yummly.com/v1/api/recipes';
	var recipeYummly = $.ajax({
		url : urlYummly,
		dataType : 'jsonp',
		method: 'GET',
		data: {
			q: ['sour','pie'],
			_app_id: idYummly,
			_app_key: keyYummly,
			allowedCourse: "course^course-Cocktails",
			allowedAllergy: "401^Sulfite-Free"
			// allowedAllergy: "394^Peanut-Free", "395^Tree Nut-Free", "393^Gluten-Free", "398^Seafood-Free", "396^Dairy-Free", "397^Egg-Free", "400^Soy-Free", "399^Sesame-Free", "401^Sulfite-Free"
			// allowedDiet: "386^Vegan", "387^Lacto-ovo vegetarian", "403^Paleo"
		}
	}).then((res) => {
		console.log(res);
	})	
}

// initialize code
app.init = () => {
	app.callTeleport();
	app.callDarkSky();
	// app.callEdamam();
	app.callYummly();
};

$(app.init);

