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
		console.log(res)
	});
}

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

// initialize code
app.init = () => {
	app.callEdamam();
	yummlyApp.getData();
};

// document ready
$(app.init);

