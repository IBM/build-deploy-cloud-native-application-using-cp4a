$(document).ready(function() {
    var resultElement = $('#resultDiv');
    resultElement.html('');
    $('#btnSubmit').click(function() {

        var city = $('#city');
        city.html('');

        var sunrise;
        var sunset;

        var getCity = $('#getCity').val();
        var lat = $('#lat').val();
        var lon = $('#lon').val();

        var Data;
        if (!$.trim(getCity)) {
            Data = {
                lat: lat,
                lon: lon
            }
        }
        if (!$.trim(lat)) {
            Data = {
                getCity: getCity
            }
        }
        if (!$.trim(lon)) {
            Data = {
                getCity: getCity
            }
        }
        if ($.trim(getCity) && $.trim(lat) || $.trim(getCity) && $.trim(lon) || $.trim(getCity) && $.trim(lat) && $.trim(lon)) {
            alert("Enter Either City Name or Latitude and Longitude not both!");
            $('#getCity').val("");
            $('#lat').val("");
            $('#lon').val("");
        }

        $
            .ajax({
                url: '/getWeather',
                method: 'get',
                data: Data,
                dataType: 'json',
                success: function(
                    response) {
                    if (response.message != null) {
                        resultElement
                            .html(response.message);
                    } else {

                        celcius = response.main.temp - 273.15;
                        celciusmin = response.main.temp_min - 273.15;
                        celciusmax = response.main.temp_max - 273.15;

                        sunrise = response.sys.sunrise;
                        sunset = response.sys.sunset;
                        epoch = response.timezone;

                        var date = new Date(sunrise * 1000);
                        var timeSunrise = date.toLocaleTimeString();

                        var date2 = new Date(sunset * 1000);
                        var timeSunset = date2.toLocaleTimeString();

                        var date3 = new Date(epoch * 1000);
                        var timeZoneString = date3.toGMTString();
                        var timezone = timeZoneString.substr(timeZoneString.length - 12);

                        resultElement
                            .html('<div class=\"panel panel-default\">' +
                                '<div class=\"panel-heading\" align=\"center\">Current Weather in ' +
                                response.name + ', ' + response.sys.country +
                                '</div>' +
                                '<div class=\"panel-body\" align=\"center\">' +
                                '<img src=\"http://openweathermap.org/img/wn/' +
                                response.weather[0].icon + '@2x.png\">' + '<h4>' + parseInt(celcius) + ' °C</h4>' +
                                '<table class="table"> \
                                                <tbody>' +
                                '<tr> <td> Minimum : </td> <td>' + parseInt(celciusmin) + ' °C</td>' +
                                '<td> Maximum : </td> <td>' + parseInt(celciusmax) + ' °C</td>' +
                                '</tr> <tr> <td> Pressure : </td> <td>' + response.main.pressure + ' hpa </td>' +
                                '<td> Humidity : </td> <td>' + response.main.humidity + ' % </td> </tr>' +
                                '<tr> <td> Sunrise : </td> <td>' + timeSunrise + ' hrs</td>' +
                                '<td> Sunset : </td> <td>' + timeSunset + ' hrs</td>' +
                                '<tr> <td> Weather Description : </td> <td>' + response.weather[0].description + '</td>' +
                                '<td></td> <td></td> </tr>' +
                                '<tr> <td> Time Zone : </td> <td>' + timezone + '</td> <td></td> <td></td></tr>' +
                                '</tbody> </table> </div>'
                            );

                        $('#getCity').val(response.name);
                        $('#lat').val(response.coord.lat);
                        $('#lon').val(response.coord.lon);
                    }
                },
                error: function(err) {
                    alert(err.message);
                }
            });
    });
    $('#btnGetLocation').click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert(" Detect Location not supported ");
        }
    });

});

function showPosition(position) {
    $('#lat').val(position.coords.latitude);
    $('#lon').val(position.coords.longitude);
    document.getElementById("btnSubmit").click();
}