/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var OWAPIKey = "73c3dfb882d4d07cb88c145db4eea22e";
var map;
var citiesNamesCS = [];
var citiesNamesEN = [];
var allCityNames = [];
var allCityCodes = [];
var language = 'cz';
var index = 0;

$(function () {
    $(window).ready(function () {
        initBox();
        languageSwitcher(document.documentElement.lang);
        localize(language);
        $('#weather-main-card').hide();
        $('#naseptavac').hide();

        //JSON load
        $.getJSON("data/CZ.json", function (json) {
            //each field select
            $.each(json, function (i, field) {
                allCityNames.push(field.name);
                allCityCodes.push(field.id);
            });
        });
        $('#search-button').on('click', function () {
            $('#naseptavac').hide();
            var e = document.getElementById("naseptavac");
            if (e.selectedIndex !== -1) {
                var selected = e.options[e.selectedIndex].text;
                loadWeatherByCityName(selected, language);
            } else {
                if (language === 'cz') {
                    alert("Město nebylo vybráno");
                }
                if (language === 'en') {
                    alert("City not selected");
                }
            }
        });
        $('#input-value').on('input', function () {
            var input = $(this).val();
            $('#naseptavac').show();
            var cmd = '';

            for (var item in allCityNames) {
                if (allCityNames[item].toLowerCase().includes(input)) {
                    cmd = cmd + '<option value="' + allCityCodes[item] + '">' + allCityNames[item] + '</option>';
                }
            }
            document.getElementById("naseptavac").innerHTML = cmd;
        });
    });
});

function languageSwitcher(lang) {
    if (lang === 'cz' || lang === 'cs') {
        document.getElementById('czswitch').classList.remove('btn-secondary');
        document.getElementById('czswitch').classList.add('btn-primary');
        document.getElementById('czswitch').textContent = 'Česky';
        document.getElementById('enswitch').classList.remove('btn-primary');
        document.getElementById('enswitch').classList.add('btn-secondary');
        document.getElementById('enswitch').textContent = 'Anglicky';
        this.language = 'cz';
        localize(lang);
    }
    if (lang === 'en') {
        document.getElementById('czswitch').classList.remove('btn-primary');
        document.getElementById('czswitch').classList.add('btn-secondary');
        document.getElementById('czswitch').textContent = 'Czech';
        document.getElementById('enswitch').classList.add('btn-primary');
        document.getElementById('enswitch').classList.remove('btn-secondary');
        document.getElementById('enswitch').textContent = 'English';
        this.language = 'en';
        localize(lang);
    }
    showLocalStoredCities();
    var name = document.getElementById("current-city-weather").innerHTML;
    loadWeatherByCityName(name, language);
}

function localize(lang) {
    if (lang === 'cz' || lang === 'cs') {
        lang = 'cz';
        $('#fav-heading').text('Oblíbená místa:');
        $('#input-value').attr('placeholder', 'Město');
        $('#search-button').text('Vybrat');
        $('.current-temp').text('Zobrazit graf teploty');
    }
    if (lang === 'en') {
        $('#fav-heading').text('Favourite places:');
        $('#input-value').attr('placeholder', 'City');
        $('#search-button').text('Select');
        $('.current-temp').text('Show temperature graph');
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function loadWeatherByCityName(city, lang) {
    console.log(lang);
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=" + lang + "&units=metric&appid=" + OWAPIKey,
        success: function (data) {
            var sunriseSec = data["sys"].sunrise;
            var SunriseDate = new Date(sunriseSec * 1000);
            var sunriseHours = SunriseDate.getHours();
            var sunriseMinutes = SunriseDate.getMinutes();

            var sunsetSec = data["sys"].sunset;
            var sunsetDate = new Date(sunsetSec * 1000);
            var sunsetHours = sunsetDate.getHours();
            var sunsetMinutes = sunsetDate.getMinutes();


            $('#current-city-weather').text(city);
            $('.current-weather-image').attr("src", "img/icons/" + data["weather"][0].main + ".svg");

            $('.current-weather-description').text(data["weather"][0].description);

            var tempElement = document.getElementsByClassName("current-weather-temperature");
            tempElement[0].innerHTML = "Teplota: <b>" + Math.round(data["main"].temp) + "°C</b>";

            var windArrowElement = document.getElementsByClassName("current-weather-wind");

            windArrowElement[0].innerHTML = 'Směr větru: &nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate(' + data["wind"].deg + 'deg);"></i><br>' + " Rychlost větru: <b>" + data["wind"].speed + " m/s</b>";


            var sunriseSunsetElement = document.getElementsByClassName("current-weather-sunrise-sunset");
            sunriseSunsetElement[0].innerHTML = 'Východ slunce: ' + sunriseHours + ':' + pad(sunriseMinutes) + '</br>' + 'Západ slunce: ' + sunsetHours + ':' + pad(sunsetMinutes);

            var code = data["id"];

            if (localStorage.getItem(city)) {
                $('.add').hide();
                $('.rmv').show();
                $('.rmv').text("Smazat");
                $('.rmv').attr("onClick", 'removeFavourite("' + city + '",' + code + ');');
            } else {
                $('.add').show();
                $('.rmv').hide();
                $('.add').text("Uložit");
                $('.add').attr("onClick", 'saveFavourite("' + city + '",' + code + ');');
            }
            $('#weather-main-card').show();
        }
    });
}

function showLocalStoredCities() {
    document.getElementById("accordionF").innerHTML = '';
    index = 0;
    for (var klic in localStorage) {
        loadStoredCitiesDatas(klic, index);
        index = index + 1;
    }
}

function loadStoredCitiesDatas(name, x) {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&lang=" + this.language + "&units=metric&appid=" + OWAPIKey,
        success: function (data) {
            var sunriseSec = data["sys"].sunrise;
            var SunriseDate = new Date(sunriseSec * 1000);
            var sunriseHours = SunriseDate.getHours();
            var sunriseMinutes = SunriseDate.getMinutes();

            var sunsetSec = data["sys"].sunset;
            var sunsetDate = new Date(sunsetSec * 1000);
            var sunsetHours = sunsetDate.getHours();
            var sunsetMinutes = sunsetDate.getMinutes();
            document.getElementById('accordionF').innerHTML += '<div class="card"  style=" background-color: #ff7f00; color:white">' +
                    '<div class="card-header" role="tab" id="heading' + x + '">' +
                    '<h5 class="mb-0">' +
                    '<a data-toggle="collapse" id="favourite-city-' + x + '" href="#collapse' + x + '" aria-expanded="true" aria-controls="collapse' + x + '">' +
                    '</a>' +
                    '</h5>' +
                    '</div>' +
                    '<div id="collapse' + x + '" class="collapse" role="tabpanel" aria-labelledby="heading' + x + '" data-parent="#accordionF">' +
                    '<div class="card-body">' +
                    '<img class="card-img-top weather-image-' + x + '" src="..." alt="Card image cap" style="height: 10rem;">' +
                    '<div class="card-block">' +
                    '<p class="card-text weather-description-' + x + '"></p>' +
                    '</div>' +
                    '<ul class="list-group list-group-flush">' +
                    '<li class="list-group-item weather-temperature-' + x + '" style="background-color: #ff7f00">Temp</li>' +
                    '<li class="list-group-item weather-wind-' + x + '" style="background-color: #ff7f00">Wind</li>' +
                    '<li class="list-group-item weather-sunrise-sunset-' + x + '" style="background-color: #ff7f00">Sunrise: , sunset: </li>' +
                    '</ul>' +
                    '<div class="card-block buttons-div">' +
                    '<button type="button" class="btn btn-success add' + x + '"></button>' +
                    '<button type="button" class="btn btn-danger rmv' + x + '"></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    ' </div>';

            var cityEName = '#favourite-city-' + x;

            var windEName = "weather-wind-" + x;
            var tempEName = "weather-temperature-" + x;
            var imageEName = '.weather-image-' + x;
            var descEName = '.weather-description-' + x;
            var sunEName = "weather-sunrise-sunset-" + x;

            $(cityEName).text(name);

            $(imageEName).attr("src", "img/icons/" + data["weather"][0].main + ".svg");

            //    $('#city-weather-'+i).text(key);

            $(descEName).text(data["weather"][0].description);

            var tempElement = document.getElementsByClassName(tempEName);
            tempElement[0].innerHTML = "Teplota: <b>" + Math.round(data["main"].temp) + "°C</b>";


            var windArrowElement = document.getElementsByClassName(windEName);

            windArrowElement[0].innerHTML = 'Směr větru: &nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate(' + data["wind"].deg + 'deg);"></i><br>' + " Rychlost větru: <b>" + data["wind"].speed + " m/s</b>";


            var sunriseSunsetElement = document.getElementsByClassName(sunEName);
            sunriseSunsetElement[0].innerHTML = 'Východ slunce: ' + sunriseHours + ':' + pad(sunriseMinutes) + '</br>' + 'Západ slunce: ' + sunsetHours + ':' + pad(sunsetMinutes);

            var code = data["id"];

            $('.add' + x).hide();
            $('.rmv' + x).show();
            $('.rmv' + x).text("Smazat");
            $('.rmv' + x).attr("onClick", 'removeFavourite("' + name + '",' + code + ');');
        }
    });
}

function saveFavourite(name, code) {
    localStorage.setItem(name, code);
    $('.add').text("Remove from favourites");
    $('.add').attr("onClick", 'removeFavourite("' + name + '",' + code + ');');
    initBox();
    showLocalStoredCities();
    $('#weather-main-card').hide();
    localize(language);
}

function removeFavourite(name, code) {
    localStorage.removeItem(name);
    $('.add').text("Add to favourites");
    $('.add').attr("onClick", 'saveFavourite("' + name + '",' + code + ');');
    initBox();
    showLocalStoredCities();
    $('#weather-main-card').hide();
    localize(language);
}

function initBox() {
    document.getElementById("accordion").innerHTML = '<div class="card" id="weather-main-card" style=" background-color: #023e58; color:white">' +
            '<div class="card-header" role="tab" id="headingOne">' +
            '<h5 class="mb-0">' +
            '<a data-toggle="collapse show" id="current-city-weather" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> ' +
            '</a>' +
            '</h5>' +
            '</div>' +
            '<div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">' +
            '<div class="card-body">' +
            '<img class="card-img-top current-weather-image" src="..." alt="Card image cap" style="height: 10rem;">' +
            '<div class="card-block">' +
            '<p class="card-text current-weather-description"></p>' +
            '</div>' +
            '<ul class="list-group list-group-flush">' +
            '<li class="list-group-item current-weather-temperature" style="background-color: #023e58">Temp</li>' +
            '<li class="list-group-item current-weather-wind" style="background-color: #023e58">Wind</li>' +
            '<li class="list-group-item current-weather-sunrise-sunset" style="background-color: #023e58">Sunrise: , sunset: </li>' +
            '<button class="btn btn-primary current-temp" type="button" data-toggle="collapse" data-target="#collapseGraph" aria-expanded="false" aria-controls="collapseGraph">' +
            'Button with data-target' +
            '</button>' +
            '<div class="collapse" id="collapseGraph">' +
            '<div class="card card-body">' +
            '<canvas id="myChart"></canvas>' +
            '</div>' +
            '</div>' +
            '</ul>' +
            '<div class="card-block buttons-div">' +
            '<button type="button" class="btn btn-success add"></button>' +
            '<button type="button" class="btn btn-danger rmv"></button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div><h4 id="fav-heading">Favourite Places</h4>';
}

function initMap() {

    var styledMapType = new google.maps.StyledMapType(
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ], {name: "Styled Map"});

    var uluru = {lat: 49.9028435, lng: 15.5542621};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    //JSON load
    $.getJSON("data/cities.json", function (json) {

        //each field select
        $.each(json, function (i, field) {

            citiesNamesCS.push(field.name_cs);
            citiesNamesEN.push(field.name_en);
            var pos = {lat: field.lat, lng: field.lng};

            //add marker
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: citiesNamesCS[i],
                icon: 'img/icons/icon_place.png'
            });

            //Informations Window showing
            // var infowindow = new google.maps.InfoWindow({});

            google.maps.event.addListener(marker, 'click', (function (marker, i) { //TODO weather showing
                return function () {
                    console.log(language);
                    loadWeatherByCityName(citiesNamesEN[i], language);
                    loadGraph(citiesNamesEN[i],language);
                    $('#weather-main-card').show();
                    localize(this.language);
                };
            })(marker, i));

        });
    });
}
