const app = {};
// call to Teleport autocomplete

app.callTeleport = () => {
	TeleportAutocomplete.init('.my-input').on('change', (cityData) => {
		let latitude = cityData.latitude;
		let longitude = cityData.longitude;
		app.callDarkSky(latitude, longitude);
	});
}

// ajax call to Dark Sky
app.callDarkSky = (latitude, longitude) => {
	let keyDarkSky = 'ecb6e7f16bb182021ecf519d1099721a';
	let weather = $.ajax({
		url: `https://api.darksky.net/forecast/${keyDarkSky}/${latitude},${longitude}?units=ca`,
		method: 'GET',
		dataType: 'jsonp'
	}).then((res) => {
		app.currentTemp = Math.round(res.currently.apparentTemperature);
		app.currentIcon = res.currently.icon;
		app.currentWeather = $('<h4>').text(res.currently.summary);
		app.weatherFilter();
	});
}

// a function that filters search results based on currentTemp
app.weatherFilter = () => {
	let foodPicks = [];
	if(app.currentTemp <= 0){
		app.selectedFoods = ['roast', 'pasta', 'chili', 'pot pie', 'stew', 'winter'];
	}
	else if(app.currentTemp > 0 && app.currentTemp <= 10){
		app.selectedFoods = ['soup', 'pizza', 'pumpkin', 'apple', 'slow cooker', 'dumpling', 'spicy', 'autumn'];
	}
	else if(app.currentTemp > 10 && app.currentTemp <= 20){
		app.selectedFoods = ['sushi', 'sandwich', 'breakfast', 'brunch', 'fried', 'spring'];
	}
	else if(app.currentTemp > 20 && app.currentTemp <= 25){
		app.selectedFoods = ['bbq', 'mexican', 'indian', 'greens', 'curry', 'berries'];
	}
	else{
		app.selectedFoods = ['salad', 'ice cream', 'cool', 'cucumber', 'summer', 'watermelon'];
	}
}

// function that chooses a random food category
app.randomCategory = () => {
	app.foodChoice = app.selectedFoods[Math.floor(Math.random()*app.selectedFoods.length)];
}

// a function that gathers dietary restrictions and passes them into an array
app.events = () => {
	let allergyRestrict = [];
	let dietRestrict = [];
	$('.userInfo').on('submit', function(e) {
		e.preventDefault();
		app.randomCategory();
		allergyRestrict = $(".allergy:checked").map(function(){
			return $(this).val();
			}).get();
		dietRestrict = $(".diet:checked").map(function(){
			return $(this).val();
			}).get();
			app.callYummly(app.foodChoice, allergyRestrict, dietRestrict);
	});
	$('#recipeContainer').on('click', '.saveButton', (e) => {
		e.preventDefault();
		app.saveRecipes();
	});
}

// ajax call to Yummly
app.callYummly = (foodChoice, allergyRestrict, dietRestrict) => {
	let idYummly = '95ec33fc';
	let keyYummly = '2410ab65b1957770177d384fa57c6070';
	let urlYummly = 'http://api.yummly.com/v1/api/recipes';
	let recipeYummly = $.ajax({
		url : urlYummly,
		dataType : 'jsonp',
		method: 'GET',
		data: {
			q: app.foodChoice,
			_app_id: idYummly,
			_app_key: keyYummly,
			allowedAllergy: allergyRestrict,
			allowedDiet: dietRestrict,
			excludedCourse: ["course^course-Cocktails", "course^course-Condiments and Sauces", "course^course-Beverages"],
		}
	}).then((res) => {
		let recipeMatches = res.matches;
		let recipeChoice = recipeMatches[Math.floor(Math.random()*recipeMatches.length)];
		let recipeId = recipeChoice.id;
		app.callRecipeInfo(recipeId);
	})
}

// a function to call recipe info for selected item
app.callRecipeInfo = (recipeId) => {
	let idYummly = '95ec33fc';
	let keyYummly = '2410ab65b1957770177d384fa57c6070';
	let urlYummly = `http://api.yummly.com/v1/api/recipe/${recipeId}`;
	let recipeYummly = $.ajax({
		url : urlYummly,
		dataType : 'jsonp',
		method: 'GET',
		data: {
			_app_id: idYummly,
			_app_key: keyYummly
		}
	}).then((res) => {
		app.weatherIcon = {};
			if(app.currentIcon === 'clear-day'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/clear-day.svg');
			}
			else if(app.currentIcon === 'clear-night'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/clear-night.svg');
			}
			else if(app.currentIcon === 'rain'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/clear-rain.svg');
			}
			else if(app.currentIcon === 'snow'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/clear-snow.svg');
			}
			else if(app.currentIcon === 'sleet'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/clear-sleet.svg');
			}
			else if(app.currentIcon === 'wind'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/wind.svg');
			}
			else if(app.currentIcon === 'fog'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/fog.svg');
			}
			else if(app.currentIcon === 'cloudy'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/cloudy.svg');
			}
			else if(app.currentIcon === 'partly-cloudy-day'){
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/partly-cloudy-day.svg');
			}
			else{
				app.weatherIcon = $('<img>').attr('src', 'dev/assets/partly-cloudy-night.svg');
			}
		app.display(res);
	});
}

// General smooth scroll code inspired by: https://css-tricks.com/snippets/jquery/smooth-scrolling/
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function(event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 700, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { 
            return false;
          } else {
            $target.attr('tabindex', '-1'); 
            // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
});

// a function that displays our information on the page
app.display = (res) => {
	$('#weatherContainer').empty();
	$('#weatherContainer').append(`<p>${app.currentTemp}&deg;C</p>`);
	$('#weatherContainer').append(app.currentWeather);
	$('#weatherContainer').append(app.weatherIcon);
	$('#recipeContainer').empty();
	let selectedImage = $('<img>').attr('src', res.images[0].hostedLargeUrl);
	let selectedName = $('<h2>').text(res.name);
	let selectedTime = $('<h4>').text(res.totalTime);
	let selectedUrl = $('<a>').attr('href', res.source.sourceRecipeUrl).text('Link to full recipe');
	$('#recipeContainer').append(selectedImage, selectedName, selectedTime, selectedUrl);
	res.ingredientLines.forEach( (ingredient) => {
		$('#recipeContainer').append(`<p>${ingredient}</p>`);
	});
	let saveButton = $('<button>').addClass('saveButton').text('Save Recipe');
	$('#recipeContainer').append(saveButton);
	app.selectedRecipe = res;
}

// a function that saves a selected recipe to firebase
app.saveRecipes = () => {
	var dbRef = firebase.database().ref();
	dbRef.push(app.selectedRecipe);
}

// a function that initializes our code
app.init = () => {
	app.callTeleport();
	app.events();
};

// document ready
$(app.init);
