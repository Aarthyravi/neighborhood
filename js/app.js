var initialLocation = [
  {
    title: 'Laurelwood Elementary School',
    location: {lat: 37.3431,lng: -122.0022},
  },
  {
   title: 'Kaiser Permanente Medical Center',
   location: {lat: 37.336,lng: -121.9979},
 },

 {
   title: 'Lucky SuperMarket',
   location: {lat: 37.3540, lng: -121.9980},
 },
 {
   title: 'Peterson Middle School',
   location: {lat: 37.3497, lng: -122.0072},
 },
 {
   title: 'Pomeroy Elementary School',
   location: {lat: 37.3480, lng: -121.9870},
 },
 {
   title: 'Full Circle Farm',
   location: {lat: 37.3459, lng: -122.0061},
 },
 {
   title: 'Santa clara High School',
   location: {lat:37.3455, lng: -121.9819},
 },

 {
   title: 'Pruneridge Golf Club',
   location: {lat: 37.3319, lng: -121.9631},
 },
 {
   title: 'California\'s Great America',
   location: {lat: 37.3979, lng: -121.9743},
 },
 {
   title: 'Rancho San Antonio County Park',
   location: {lat: 37.3329, lng: -122.0870},
 }
];

var locationInfo = function(data){
  this.title = (data.title);
  this.location = (data.location);
  this.marker =  (data.marker);
  this.visible = ko.observable(true);

  this.showMarker = ko.computed(function() {
    if(this.visible() === true) {
      if(this.marker){
       this.marker.setVisible(true);
    }}else {
      this.marker.setVisible(false);
    }
    return true;
	},this);

};

var infowindow;

var map;

// Create a new blank array for all the listing markers.
var markers = [];

var ViewModel = function(){
  var self = this;
  this.searchTitle = ko.observable('');

  this.locationList = ko.observableArray([]);

  initialLocation.forEach(function(locationItem){
    self.locationList.push(new locationInfo(locationItem));
  });

  this.changeLocation = function(clickLocation) {
    populateInfoWindow(clickLocation.marker, infowindow);
  };

  // Creates the search function to return matching list items and markers.
  this.List = ko.computed( function() {
    var filter = self.searchTitle().toLowerCase();
    if (!filter) {
      self.locationList().forEach(function(locationItem){
        locationItem.visible(true);
    });
      return self.locationList();
    }
    else{
      return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
        var string = locationItem.title.toLowerCase();
        var result = (string.search(filter) >= 0);
        locationItem.visible(result);
        return result;
      });
    }
  },self);
};

  function initMap(){
  // Initialize Google map
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3541, lng: -121.9552},
    zoom: 13
  });

  // Initialize infowindow
  infowindow = new google.maps.InfoWindow();

 // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < initialLocation.length; i++) {

    // Get the position from the location array.
    var position = initialLocation[i].location;
    var title = initialLocation[i].title;

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Add marker as a property of each Location.
    vm.locationList()[i].marker = marker;

    // Push the marker to our array of markers.
    markers.push(marker);

  // Create an onclick event to open an infowindow at each marker.
  marker.addListener('click', clickMarker);
 }

   function clickMarker() {
       populateInfoWindow(this, infowindow);
   }
}

  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  function populateInfoWindow(marker, infowindow) {

  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('');

      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
      // Foursquare API
    var foursquareUrl = "https://api.foursquare.com/v2/venues/search?query="+
     marker.title +'&ll=' + marker.position.lat() + ',' +marker.position.lng()+
    '&client_id=WZBPPUK0LEKJUVBPOK33MHS5EZZNNYNJ0XYLKYEA1BE5JPT3' +
    '&client_secret=IIFBYWMNBO0KIZ0XJKO5BIWQ1BHFGJZZQKGEL4E1ZUUY4T5F&v=20170711';
    var foursquareRequestTimeout = setTimeout(function(){
        window.alert("Failed to get Foursquare resources");
    }, 8000);

    $.ajax({
      url: foursquareUrl,
      dataType: "json",
      success: function(data){
        var fourSq = data.response.venues[0];
        infowindow.setContent('<div><h3>' + fourSq.name + '</h3>' +
           fourSq.location.address + '</div><div>' +
           fourSq.location.city +'</div>');

        clearTimeout(foursquareRequestTimeout);
      }
    });


     // Open the infowindow on the correct marker
      infowindow.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
     	}, 2100);

    }
  }

// Initialize the Knockout View Model
var vm = new ViewModel();
ko.applyBindings(vm);

//Error handling
function errorHandling() {
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}
