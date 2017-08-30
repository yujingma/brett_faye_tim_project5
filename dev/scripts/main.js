// console.log("It's working!");

// console.log("Hello");

$(function(){



getCity = function(){
	TeleportAutocomplete.init('.my-input').on('change', function(cityData){
		var latitude = cityData.latitude;
		var longitude = cityData.longitude;
		console.log(`The cities latitude is ${latitude} and it's longitude is ${longitude}`);
		getWeather(latitude, longitude);
	});
}

getCity();

// var latitude = 43.65;
// var longitude = -79.38;


getWeather = function(latitude, longitude) {
var key = 'ecb6e7f16bb182021ecf519d1099721a';
	$.ajax({
	url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
	method: 'GET',
	dataType: 'jsonp',
	data: {
		format: 'jsonp'
	}
}).then(function(res) {
  console.log(res);
});


};

// $.ajax({
// 	url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
// 	method: 'GET',
// 	dataType: 'jsonp',
// 	data: {
// 		format: 'jsonp'
// 	}
// }).then(function(res) {
//   console.log(res);
// });

});