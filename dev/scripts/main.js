var yummlyApp = {};
yummlyApp.yumUrl = 'http://api.yummly.com/v1';
yummlyApp.yumKey = '2410ab65b1957770177d384fa57c6070';
yummlyApp.yumId = '95ec33fc';



yummlyApp.getData = function(){
	// make an ajax request
	var receipe = $.ajax({
	      url : `http://api.yummly.com/v1/api/recipes`,
	      dataType : 'json',
	      method: 'GET',
	      data: {
	      	  q: 'onion soup',
	          _app_id: yummlyApp.yumId,
	          _app_key: yummlyApp.yumKey
	      }

		}).then(function(res) {
			console.log(res);
		})
}



// var genres = ["Horror", "Comedy", "Drama", "Action", "Suspense", "Documentary"];

// genres.forEach(function(genre) {
//     $('.movieGenres').append('<p>' + genre + '</p>');
// });

// console.log(genres);



$(function(){
	yummlyApp.getData();
});
