# Neighborhood Map
  * Here I have developed a single-page application featuring a map of neighborhood
     * index.html file is used to open this app.
     * js folder contains app.js that has used to Design MVVM pattern,to create Knockout framework, and handling ajax request.
     * js folder must contain jquery.min.js that has used to ajax request and knockout-3.4.2.js used to MVVM pattern. 
  * Google map loaded from Maps API.
  * App display the locations by default when the page is loaded.
  * Clicking a marker on the map open the information window (infowindow) about the location.
  * Clicking a name in the list View open the information window(infowindow) for the asoociated marker.
  * The list of locations can be filterable with a text input.Filtering the list also filters the markers on the map. 
  * Added functionality using third-party APIs to provide information when a map marker or list view entry is clicked.
    (location name,location address & location city)
 
App visit is here <https://aarthyravi.github.io/neighborhood/> 

# Setup
Download the Knockout framework. 

Knockout used to handle the list, filter.

# Foursquare API(Third Party API)
  I have implemented (FourSquare API) third-party APIs that provide additional information about each of these locations.
  
      var foursquareUrl = "https://api.foursquare.com/v2/venues/search?query="
        + marker.title +'&ll=' + marker.position.lat() + ',' +marker.position.lng()+
       '&client_id=WZBPPUK0LEKJUVBPOK33MHS5EZZNNYNJ0XYLKYEA1BE5JPT3\
        &client_secret=IIFBYWMNBO0KIZ0XJKO5BIWQ1BHFGJZZQKGEL4E1ZUUY4T5F&v=20170711';
  
# Error handle
  An Error message is displayed notifying the user that the data can't be loaded,  
  
       var foursquareRequestTimeout = setTimeout(function(){
        window.alert("Failed to get Foursquare resources");
       }, 8000);
