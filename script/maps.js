function initMap() {
        var uluru = {lat: 47.808742, lng: 35.18036129999996};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }