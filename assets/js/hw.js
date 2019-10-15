//Institute Variables
var topics = ["die hard"];

//Functions

	function renderButtons () {
		$(".buttons-view").empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("topic btn btn-default");
			newButton.attr("data-name", topics[i]);
			newButton.text(topics[i]);
			$(".buttons-view").append(newButton);
		}
	};

	$("#add-topic").on("click", function (event) {
		event.preventDefault();
		var topic = $("#topic-input").val().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=20";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(ans) {

	        if (ans.data.length == 0) {
	        	alert("No Gifs found for topic");
	        }
			else if (topics.indexOf(topic) != -1) {
				alert("Topic already exists");
			}
			else {
				topics.push(topic);
				renderButtons();
			}

		});
	});

	function showGif () {
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=20";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(ans) {

          console.log(ans);

          $(".gif-place").empty();
          for (var i = 0; i < ans.data.length; i++) {
          	var gHt = $("<div>");
          	gHt.addClass("gHt");
          	gHt.html("<p>Rating: " + ans.data[i].rating + "</p>");

          	var gifImage = $("<img src='" + ans.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

          	var img = $("<div>");
          	img.addClass("play");
          	img.attr("data-state", "still");
          	img.attr("data-name", topic);
          	
          	$(img).append(gifImage);
          	$(gHt).append(img);
          	$(".gif-place").append(gHt);
          }

        });
	};




	$(document).on("click", ".topic", showGif);


//Running Code
renderButtons();
 