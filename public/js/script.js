$(document).ready(function () {
    var myLatLng = {lat: 45.253342, lng: 19.845922};
    var markers = [];
    var polyLines = [];
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Devtech DOO'
    });

    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }


    map.addListener('click', function (event) {
        var clickedLatLng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
        var myArray = [
            myLatLng, clickedLatLng
        ];
        var markersAndLines = function () {
            var marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
            markers.push(marker);
            var poly = new google.maps.Polyline({
                path: myArray,
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 3,
                map: map
            });
            polyLines.push(poly);
        };

        function setMapAndPolyOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                polyLines[i].setMap(map);
            }
        }
        if(markers === null && polyLines === null){
          markersAndLines();
        } else {
            setMapAndPolyOnAll(null);
            markersAndLines();
        }

        var devtech = new google.maps.LatLng(myLatLng);
        var clickedPos = new google.maps.LatLng(clickedLatLng);
        document.getElementById('result').innerHTML = "Distance from Devtech: " + calcDistance(devtech, clickedPos) + " km";
    });

});