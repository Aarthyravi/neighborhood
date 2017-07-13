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
  
       var foursquareRequestTimeout = setTimeout(function(){
        window.alert("Failed to get Foursquare resources");
    }, 8000);
