 /*global $*/

 var snow = [1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282];
 var rain = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276, ];

 var intervalId = "";

 var query;
 // $(document).ready(function() {

 $('#searchbar').keypress(function(e) {

  var key = e.which;
  if (key === 13) {
   $('#button').click();

   return true;
  }
 });

 function letItRain() {
  console.log('its raining');

  var x = Math.floor(Math.random() * parseInt($('body').css('width'), 10)) + 1;
  $('#holder').append("<div class='raindrop' style='left: " + x + "px;'></div>");

  $('.raindrop').animate({
   top: "100%",
   left: "+=200px"
  }, 1000, function() {

   $(this).remove();
  });


 }

 function letItSnow() {


  var x = Math.floor(Math.random() * parseInt($('body').css('width'), 10)) + 1;
  $('#holder').append("<div class='snowflake' style='left: " + x + "px;'></div>");

  $('.snowflake').animate({
   top: "100%",
   left: "+=50px",

  }, 5000, function() {

   $(this).remove();

  });
 }

 $("#button").click(function btnPress() {
  $(".snowflake").stop(true, true);
  $(".raindrop").stop(true, true);
  clearInterval(intervalId);
  query = $("#searchbar").val();

  // query = query.replaceWith(" ", "%40");
  console.log(query);



  $.getJSON("https://api.apixu.com/v1/current.json?key=02c4be0ac51d4560a24175540172304&q=" + query + "&days=1", function(response) {



   // if (response.current.precip_in > 0) {
   var isSnowing = snow.indexOf(response.current.condition.code);
   var isRaining = rain.indexOf(response.current.condition.code);

   console.log('code', response.current.condition.code);
   console.log('snow', isSnowing);
   console.log('rain', isRaining);

   if (isSnowing > -1) {
    intervalId = setInterval("letItSnow()", 1);
    letItSnow();
   }
   else if (isRaining > -1) {
    intervalId = "";
    intervalId = setInterval("letItRain()", 1);
    console.log(intervalId);
    letItRain();
   }

   // }
   if ($(".snowflake").is(":animated") && response.current.temp_f > 32) {
    $(".snowflake").stop(true, true);
    clearInterval(intervalId);
   }

   console.log($(".raindrop").is(":animated"), response.current.precip_in < 0.01, intervalId);

   if ($(".raindrop").is(":animated") && response.current.precip_in < 0.01) {
    $(".raindrop").stop(true, true);
    clearInterval(intervalId);
   }
   console.log(response.current.precip_in)
    // if (response.current.precip_in > 0) {
    //  for (var i = 0; i < rain.length; i++) {

   //   if (rain[i] === response.current.condition.code || response.current.temp_f > 32) {
   //    intervalId = ""; 
   //    intervalId = setInterval("letItRain()", 1);
   //   letItRain();


   //   }
   //  }
   //  for (var i = 0; i < snow.length; i++) {
   //   if (snow[i] === response.current.condition.code) {
   //    intervalId = "";
   //    intervalId = setInterval("letItSnow()", 1);
   //    letItSnow();
   //   }

   //  }

   //  console.log(response.current.condition.code);

   // }

   // if ($(".snowflake").is(":animated") || $(".raindrop").is(":animated")) {

   //  if (response.current.precip_in === 0) {

   //   $("#holder").hide();
   //   $(".snowflake").stop(true, false);
   //   $(".raindrop").stop(true, false);

   //  }
   //  else {
   //   $("#holder").show();
   //  }

   //  if ($(".snowflake").is(":animated") && response.current.temp_f > 32) {
   //   $(".snowflake").finish(true, true);

   //  }

   // }
   // if ($(".snowflake").is(":animated") && $(".raindrop").is(":animated")) {

   // }
   $("#searchbar").val(response.location.name + ", " + response.location.country);
   $("#lastUpdate").text(response.current.last_updated);
   $("#tempC").text(response.current.temp_c + "°C");
   $("#tempF").text(response.current.temp_f + "°F");
   $("#img").attr("src", response.current.condition.icon);
   $("#text").text(response.current.condition.text);
   $("#windSpeedMPH").text("Wind Speed: " + response.current.wind_mph + " mph");
   $("#windSpeedKPH").text("Wind Speed: " + response.current.wind_kph + " kph");
   $("#rainInch").text(response.current.precip_in + " inches of rain");
   $("#humidity").text("Humidity: " + response.current.humidity + "%");
   $("#realTempC").text(response.current.feelslike_c + "°C Real Feel");
   $("#realTempF").text(response.current.feelslike_f + "°F Real Feel");


   if (response.current.feelslike_f < 79) {
    $("#smell").text("Not likely to smell");
   }
   else if (response.current.feelslike_f > 80 && response.current.feelslike_f < 85) {
    $("#smell").text("Least likely to smell");
   }
   else if (response.current.feelslike_f > 86 && response.current.feelslike_f < 90) {
    $("#smell").text("Likely to smell");
   }
   else if (response.current.feelslike_f > 91 && response.current.feelslike_f < 100) {
    $("#smell").text("In danger of stink");
   }
   else if (response.current.feelslike_f > 100) {
    $("#smell").text("Most likely to smell");
   }


  });

 });
 
