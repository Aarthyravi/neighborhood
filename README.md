# Neighborhood Map
  Here I have developed a single-page application featuring a map of neighborhood
  
including: map markers to identify popular locations.

A search function to easily discover these locations, and a listview to support simple browsing of all locations. 

# Setup
Download the Knockout framework. 

Knockout used to handle the list, filter.

# Foursquare API(Third Party API)
  I have implemented (FourSquare API) third-party APIs that provide additional information about each of these locations.
  
# Error handle
  An Error message is displayed notifying the user that the data can't be loaded,  
   var foursquareUrl = "https://api.foursquare.com/v2/venues/search?query="+ marker.title +'&ll=' + marker.position.lat() + ',' +marker.position.lng()+'&client_id=WZBPPUK0LEKJUVBPOK33MHS5EZZNNYNJ0XYLKYEA1BE5JPT3&client_secret=IIFBYWMNBO0KIZ0XJKO5BIWQ1BHFGJZZQKGEL4E1ZUUY4T5F&v=20170711';
    var foursquareRequestTimeout = setTimeout(function(){
        window.alert("Failed to get Foursquare resources");
    }, 8000);
