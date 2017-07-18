/*
 * Open the drawer when the menu icon is clicked.
 */
var menu = document.querySelector('#menu');
var drawer = document.querySelector('.nav');
menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});
$( '.nav li' ).on("click", function(){
  $('.nav').removeClass('open');
});
