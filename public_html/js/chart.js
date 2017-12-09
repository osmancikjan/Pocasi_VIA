/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var OWAPIKey = "73c3dfb882d4d07cb88c145db4eea22e";

var temps = [];
var times = [];

function loadGraph(city, lang) {
    
    loadDataForCity(city, lang);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                    label: "Teplota",
                    backgroundColor: '#4286f4',
                    borderColor: '#222',
                    data: temps
                }]
        },

        // Configuration options go here
        options: {}
    });
}

function loadDataForCity(name, lang) {
    $.ajax({
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + name + "&lang=" + lang + "&units=metric&cnt=9&appid=" + OWAPIKey,
        success: function (data) {
            for (var i = 0; i < data.list.length; i++) {
                temps[i] = data.list[i].main.temp;
                var seconds = data.list[i].dt;
                var date = new Date(seconds * 1000);
                var hour = pad(date.getHours());
                var minute = pad(date.getMinutes());
                var stringTime = (hour.toString() + ":" + minute.toString());
                console.log(stringTime);
                times[i] = stringTime;
                // console.log(data.list[i].dt_txt + ": " + data.list[i].main.temp);
            }
            //console.log(data.list[0].main.temp);
        }
    });
}