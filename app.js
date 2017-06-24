$(function() {


	// DOM is now ready


	//instead of $ for jquery, 500px uses _
	//init is initialize
	//set ups 500px libary through the JS SDK key
	_500px.init({
		sdk_key: '193dea0226da9b162cbb44d987eab44f80acf5a6'
  	});



//QUESTION 1 CODE

	$('#nearby-photos').on('click', function(){

		$('.loading-one').show();

		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};

		function success(pos) {
		  var crd = pos.coords;

			// console.log('Your current position is:');
			// console.log(`Latitude : ${crd.latitude}`);
			console.log('Your Latitude is ' + crd.latitude)
			console.log(`Longitude: ${crd.longitude}`);
			// console.log(`More or less ${crd.accuracy} meters.`);

			var lat = crd.latitude;
			var long =crd.longitude;

			var searchOptions = {
					geo: lat + ', ' + long + ', ' + '25mi',
					only: '9',
					image_size: 3,
					//The number of results to return. Can not be over 100, default 20.
					rpp: 28,
					sort: 'highest_rating'

			};
		

			_500px.api('/photos/search', searchOptions, function(resp){

					//shows the class below
					$('.image-results-view-first').show();
					
					
					var photos = resp.data.photos;
					for(var i=0; i<photos.length; i++){

						//make new variable called newImg that is assigned dynamically to made element img that has its src attr assigned to the photo's url for the current loop iteration using the attr method
						var newImg = $('<img>').attr('src', photos[i].image_url).addClass('image');

						//appends newImg var to element with class name of images
						$('.more-images').append(newImg);

						$('.loading-one').hide();

					}


			});
		};

		function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);

	

	});


//QUESTION 2 CODE

	$('#get-photos').on('click', function(){

		$('.loading-two').show();
		
		//how to pull in value of longitude and latitude from html by getting element by an ID and calling val()
		var long = $('#longitude').val();
		var lati = $('#latitude').val();

		var searchOptions = {
					geo: lati + ', ' + long + ', ' + '25mi',
					only: '21',
					image_size: 3,
					//The number of results to return. Can not be over 100, default 20.
					rpp: 28,
					sort: 'highest_rating'

		};

		_500px.api('/photos/search', searchOptions, function(resp){

			//shows the class below
			$('.image-results-view-second').show();
			
			var photos = resp.data.photos;
			for(var i=0; i<photos.length; i++){

				//make new variable called newImg that is assigned dynamically to made element img that has its src attr assigned to the photo's url for the current loop iteration using the attr method
				var newImg = $('<img>').attr('src', photos[i].image_url).addClass('image');

				//appends newImg var to element with class name of images
				$('.even-more-images').append(newImg);

				console.log(i);
				console.log(photos)

				$('.loading-two').hide();
			}


		});
	
	});



	//grab login id from html and passes into function (Higher oder function)
	$('#login').click(function(){
		_500px.login();
	});

	//when authorization is obtained, perform the function
	//authorization obtained is specific to 500px, you can find documentation in each apps js guide
	_500px.on('authorization_obtained', function(){
		
		//test
		console.log("authorized successfully");
		//hides button
		$('#login').hide();


			//how to find geo location
			navigator.geolocation.getCurrentPosition(function(pos){


				//variables to get lat and long 
				var lat = pos.coords.latitude;
				var long = pos.coords.longitude;

				//all the parameters you want to pull in, corresponds to the documentation
				//pulls in photo based on lat and long
				var searchOptions = {
					geo: lat + ', ' + long + ', ' + '25mi',
					only: 'landscapes',
					image_size: 3,
					//The number of results to return. Can not be over 100, default 20.
					rpp: 28,
					sort: 'highest_rating'

				};

				console.log(searchOptions);

					//corresponds to the documentation, another function
					//we have the info from 500px, we can access it now below
					_500px.api('/photos/search', searchOptions, function(resp){

						//shows the class below
						$('.image-results-view').show();
						
						var photos = resp.data.photos;
						for(var i=0; i<photos.length; i++){

							//make new variable called newImg that is assigned dynamically to made element img that has its src attr assigned to the photo's url for the current loop iteration using the attr method
							var newImg = $('<img>').attr('src', photos[i].image_url).addClass('image');

							//appends newImg var to element with class name of images
							$('.images').append(newImg);

						}


					});
			});
		
	});

});





