const app = {};

// Edamam variables
app.idEdamam = 'a4156de2';
app.keyEdamam = '10efc6df5c7cbcd8288887ca0f20e58c';
app.urlEdamam = 'https://api.edamam.com/search';

// ajax call to Edamam
app.callEdamam = () => {
	var recipeEdamam = $.ajax({
		url: app.urlEdamam,
		dataType: 'json'
		method: 'GET'
		data: {
			q: 'soup',
			app_id: app.idEdamam,
			app_key: app.keyEdamam
		}
	}).then((res) => {
		console.log(res)
	});
}

// Yummly variables
app.idYummly = '95ec33fc';
app.keyYummly = '2410ab65b1957770177d384fa57c6070';
app.urlYummly = 'http://api.yummly.com/v1';

// ajax call to Yummly
app.callYummly = () => {
	var recipeYummly = $.ajax({
		url : app.urlYummly,
		dataType : 'json',
		method: 'GET',
		data: {
			q: 'soup',
			_app_id: app.idYummly,
			_app_key: app.keyYummly
		}
	}).then((res) => {
		console.log(res);
	})
}

// initialize code
app.init = () => {
	app.callEdamam();
	app.getData();
};

// document ready
$(app.init);

