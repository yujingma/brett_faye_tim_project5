const app = {};

// call to Teleport autocomplete
app.callTeleport = () => {
	TeleportAutocomplete.init('.my-input').on('change', (cityData) => {
		var latitude = cityData.latitude;
		var longitude = cityData.longitude;
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
		var currentTemp = res.currently.apparentTemperature;
		app.weatherFilter(currentTemp);
	});
}

// a function that filters search results based on currentTemp
app.weatherFilter = (currentTemp) => {
	var foodPicks = [];
	if(currentTemp <= 0){
		var selectedFoods = ['roast', 'pasta', 'chili', 'pot pie', 'stew', 'winter'];
	}
	else if(currentTemp > 0 && currentTemp <= 10){
		var selectedFoods = ['soup', 'pizza', 'pumpkin', 'apple', 'slow cooker', 'dumpling', 'spicy', 'autumn'];
	}
	else if(currentTemp > 10 && currentTemp <= 20){
		var selectedFoods = ['sushi', 'sandwich', 'breakfast', 'brunch', 'fried', 'spring'];
	}
	else if(currentTemp > 20 && currentTemp <= 25){
		var selectedFoods = ['bbq', 'mexican', 'indian', 'greens', 'curry', 'berries'];
	}
	else{
		var selectedFoods = ['salad', 'ice cream', 'cool', 'cucumber', 'summer', 'watermelon'];
	}
	var foodChoice = selectedFoods[Math.floor(Math.random()*selectedFoods.length)];
	app.callYummly(foodChoice);
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


// a function that gathers dietary restrictions and passes them into an array
app.events = () => {
	var dietRestrict = [];
	$('.my-input').on('change', () => {
		app.callDarkSky();
	});
	$('form').on('submit', (e) => {
		e.preventDefault();
		if($('.check').is(':checked') == true){
			$(this).val().push(dietRestrict);
		}
	});
	console.log(dietRestrict);
}


// ajax call to Yummly
app.callYummly = (foodChoice) => {
	var idYummly = '95ec33fc';
	var keyYummly = '2410ab65b1957770177d384fa57c6070';
	var urlYummly = 'http://api.yummly.com/v1/api/recipes';
	var recipeYummly = $.ajax({
		url : urlYummly,
		dataType : 'jsonp',
		method: 'GET',
		data: {


			q: foodChoice,
			_app_id: idYummly,
			_app_key: keyYummly,
			excludedCourse: ["course^course-Cocktails", "course^course-Condiments and Sauces"],
			// allowedAllergy: "394^Peanut-Free", "395^Tree Nut-Free", "393^Gluten-Free", "398^Seafood-Free", "396^Dairy-Free", "397^Egg-Free", "400^Soy-Free", "399^Sesame-Free", "401^Sulfite-Free"
			// allowedDiet: "386^Vegan", "387^Lacto-ovo vegetarian", "403^Paleo"
		}
	}).then((res) => {

	

		var recipeMatches = res.matches;
		var recipeChoice = recipeMatches[Math.floor(Math.random()*recipeMatches.length)];
		console.log(recipeChoice);
	})

}

// initialize code
app.init = () => {
	app.callTeleport();
	app.callYummly();
};

$(app.init);

