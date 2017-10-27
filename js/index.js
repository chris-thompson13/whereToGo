

var uluru = {
  lat: -25.363,
  lng: 131.044
};
var lost;
var guessedLetters =[];
var resultLength;
var typeArray = ["restaurant","bar","cafe","park", "food"]
var map;
var dollars = 50
var correct
var start2 = document.getElementById('start1')
var infowindow;
var gameLocation;
var word;
var zoom = 5
var zoom2 = 15
var pos;
var wordLocation;
var pinned = false;
var letters;
var lettersObject = [{}]
var place;
var answerMarker;
var spacing = .00;
var addSpacing = .001;
var currentLetter;
var spacesAdded = false;

var started = false;

var colorsArray = ["#0D47A1","#F50057","#D500F9","#455A64","#F4511E","#00695C","#FF4081"];


var mapStyle = [
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "stylers": [
            {
                "saturation": -70
            },
            {
                "lightness": 37
            },
            {
                "gamma": 1.15
            }
        ]
    },
    {
        "elementType": "labels",
        "stylers": [
            {
                "gamma": 0.26
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "lightness": 0
            },
            {
                "saturation": 0
            },
            {
                "hue": "#ffffff"
            },
            {
                "gamma": 0
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "saturation": 0
            },
            {
                "hue": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -50
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    }
]


var randomIndex = Math.floor((Math.random() * resultLength));

var randomType = Math.floor((Math.random() * typeArray.length));

function randIndex() {

  // Only change code below this line.

  return Math.floor((Math.random() * 20) + 1);
}
function randColor() {

  // Only change code below this line.

  return Math.floor((Math.random() * colorsArray.length))
}

function randType() {

  // Only change code below this line.

  return Math.floor((Math.random() * typeArray.length) + 1);
}

function randDollar() {

  // Only change code below this line.

  return Math.floor((Math.random() * 10) + 1);
}


head.style.backgroundColor = colorsArray[randColor()]
start3.style.backgroundColor = colorsArray[randColor()]

start1.style.backgroundColor = colorsArray[randColor()]
pano.style.display = "none";
preGame.style.display = "none";

function displayModal(){
  startMod.style.display = "block"
}
function closeMod(){
  console.log("hide")
  startMod.style.display = "none"
}
function closeMod2(){
  console.log("hide")
  message.style.display = "none"
}

function displayMessage(messageString){
  message.style.display = "block"
  newMessage.innerHTML = messageString

}

letterGuess.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        validate(e);
        console.log("enter")
    }
});

function validate(e) {
      addLetters()
    //validation of the input...
}

function initMap() {
  randIndex()
  randType()


  var test = {
    lat: 42.345573,
    lng: -71.098326
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: test,
    zoom: 14,
    styles: mapStyle

  });

  var me = new google.maps.Marker({
    map: map,
    icon: {
      url: './imgs/user.png',
      anchor: new google.maps.Point(0, 10),
      scaledSize: new google.maps.Size(70, 70)
    },
    title: 'me',
    animation: google.maps.Animation.DROP


  });






  infoWindow = new google.maps.InfoWindow;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };



      infoWindow.open(map);
      map.setCenter(pos);
      me.setPosition(pos);
      pano.style.display = "block"
      load.style.display = "none";






    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }



}
function reset(){
  if (started == false){
    newGame()
    start2.textContent = "Restart"
    started = true

  }else{
    location.reload()
  }
}

function newGame(){
  randType();
  randIndex();

 newType = typeArray[randType()]
  var request = {
    location: pos,
    radius: '5000',
    type: [newType]
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  console.log('testing123')



}


function newGame2(){
  randType();
  randIndex();

  while (markers.length > 0) {
      markers.pop().setMap(null);
  }
  markers.length = 0;

 newType = typeArray[randType()]
  var request = {
    location: pos,
    radius: '5000',
    type: [newType]
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  console.log('testing123')



}


function callback(results, status) {

  if (status == google.maps.places.PlacesServiceStatus.OK && pinned == false) {
    resultLength = results.length;
    place = results[randIndex()];
    console.log(place = results[randIndex()])
    addMarker(place);
    word = place.name;
    letters = word.split('');
    wordLocation = place.geometry.location;
    pinned = true;
    pano.innerHTML += "<div id ='pano'><p>Type of venue - " + place.types[0] + "</p></div>"
    map.setCenter(place.geometry.location);
    for (var i = 0; i < letters.length; i++) {
      lettersObject.push({
        letter: letters[i].toUpperCase(),
        distance: (letters.length - i) * addSpacing});
        if (letters[i] !== " "){
        var latlng = new google.maps.LatLng(answerMarker.position.lat(), answerMarker.position.lng() - ((letters.length - i) * addSpacing));

        var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          icon: {
            url: './imgs/thin.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(25, 25)
          },

          animation: google.maps.Animation.DROP





      })
    } else {

      var latlng = new google.maps.LatLng(answerMarker.position.lat(), answerMarker.position.lng() - ((letters.length - i) * addSpacing));

      var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        visible: false,
        icon: {
          url: './imgs/final.png',
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(25, 25)
        },

        animation: google.maps.Animation.DROP





    })


    }

    }

  }
}


function addMarker(place) {
  console.log(place.name)
  map.setCenter(place.geometry.location)
  map.setZoom(15)

  gameLocation = place.geometry.location;

  answerMarker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: './imgs/star.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(45, 45)
    },

    animation: google.maps.Animation.DROP,
    label: {
      text: '*',
      color: "white"
    }



  });

  google.maps.event.addListener(answerMarker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      } else {
        infoWindow.setContent(result.name);
        infoWindow.open(map, answerMarker);
      }
    });
  });

  preGame.style.display = "inline-block";

}


function addLetters() {
  correct =false
  go.style.backgroundColor = colorsArray[randColor()]
  var currentGuess = letterGuess.value.toUpperCase()
  console.log(currentGuess)
if (currentGuess !== "" && currentGuess !== " " && guessedLetters.includes(currentGuess) == false){
  guessedLetters.push(currentGuess)
  for(var i = 0; i < lettersObject.length; i++){

  if (currentGuess == lettersObject[i].letter){
    correct = true
  var latlng = new google.maps.LatLng(answerMarker.position.lat(), answerMarker.position.lng() - lettersObject[i].distance);








  console.log('test')
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    icon: {
      url: './imgs/cirle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(25, 25)
    },

    animation: google.maps.Animation.DROP,
    label: {
      text: lettersObject[i].letter,
      color: "white"
    }



  });
  console.log(latlng)
  map.setCenter(latlng)
  map.setZoom(15)

}
} if (correct == true){
  displayMessage("Nice you might find it!")

} else {
  lost = randDollar()
  dollars = dollars - lost
  dollar.textContent = "$" + dollars + "left"
  displayMessage("Wrong letter, someone stole " + "$"+ lost +"  from your wallet!")

}
document.getElementById('block').innerHTML += "<button class = 'letters'><font color = '" + colorsArray[randColor()] + "'>-" + letterGuess.value.toUpperCase() + "-</button>"
console.log("p")
letterGuess.value = ""
} else {

  displayMessage("Please choose a letter you haven't picked before or give your final guess")

}
}

displayModal()
