/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var OWAPIKey = "73c3dfb882d4d07cb88c145db4eea22e";
var map;
var cities = [];
var lang = document.documentElement.lang;

$(function () {
    $(window).load(function () {
        document.getElementById("weather-main-card").hidden = true;
        initMap();
    });
});


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

            cities.push('{"name":"' + field.name_cs + '","lat":' + field.lat + ',"lng":' + field.lng + '},');
            var pos = {lat: field.lat, lng: field.lng};

            //add marker
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: field.name_cs,
                icon: 'img/icons/icon_place.png'
            });

            //Informations Window showing
            var infowindow = new google.maps.InfoWindow({});
            
            google.maps.event.addListener(marker, 'click', (function (marker, i) { //TODO weather showing
                return function () {
                    document.getElementById("weather-main-card").hidden = false;
                    infowindow.setContent('<div class="row"><div class="col-2"><h4 class="location'+i+'"></h4></div><div class="col-2"><h5 class="temperature'+i+'"></h5></div></div>');
                    infowindow.open(map, marker);
                    loadWeatherForCityLatLng(field.lat, field.lng, i);
                };
            })(marker, i));
        });
    });
}

function loadWeatherForCityLatLng(lat, lng, index) {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&lang="+lang+"&units=metric&appid="+OWAPIKey,
        success: function (data) {
            console.log(data);
            var SunriseSec = data["sys"].sunrise;
            var SunriseDate = new Date(SunriseSec * 1000);
            var Vychod = SunriseDate.toLocaleTimeString();
            var VychodH = SunriseDate.getHours();
            var VychodM = SunriseDate.getMinutes();

            var SunsetSec = data["sys"].sunset;
            var SunsetDate = new Date(SunsetSec * 1000);
            var Zapad = SunsetDate.toLocaleTimeString();
            var ZapadH = SunsetDate.getHours();
            var ZapadM = SunsetDate.getMinutes();
            
            var locElement = document.getElementsByClassName("current-weather-location");
            locElement[0].innerHTML = data["name"];
            
            var locInfoWindowElement = document.getElementsByClassName("location"+index);
            locInfoWindowElement[0].innerHTML = data["name"];

            $('.current-weather-image').attr("src", "img/icons/"+data["weather"][0].main + ".svg");
            
            $('.current-weather-description').text(data["weather"][0].description);
            
            var tempInfoWindowElement = document.getElementsByClassName("temperature"+index);
            tempInfoWindowElement.innerHTML = Math.round(data["main"].temp) + "°C";
            
            var tempElement = document.getElementsByClassName("current-weather-temperature");
            tempElement[0].innerHTML = "Teplota: <b>" + Math.round(data["main"].temp) + "°C</b>";
            console.log('<img src="img/icons/arrow.png" style="height: 1em; width: auto; transform: rotate('+data["wind"].deg+'deg);"/>');
            
            var windArrowElement = document.getElementsByClassName("current-weather-wind");
            
            windArrowElement[0].innerHTML = 'Směr větru: &nbsp; <i class="fa fa-long-arrow-up" style="transform: rotate('+data["wind"].deg+'deg);"></i><br>' + " Rychlost: <b>" + data["wind"].speed + " m/s</b>";
            
           /* $('.weather-max-temperature').append(data["main"].temp_max + "°C");
            $('.desc').append(data["weather"][0].description);
            $('.weather-humidity').append(data["main"].humidity + "%");
            $('.weather-sunrise').append(VychodH + ":" + pad(VychodM));
            $('.weather-sunset').append(ZapadH + ":" + pad(ZapadM));
*/
           // getSVG(data["weather"][0].id, VychodH, ZapadH);
        }
    });
}