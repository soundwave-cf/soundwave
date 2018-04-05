'use strict';

let homeView = {};

homeView.hideForm = function() {
  console.log('hidddden');
  $('form').hide();
};



$('.signup').on('click', function(){
  $('h1').hide();
  $('form').show();
});

$('.signin').on('click', function(){
  $('h1').hide();
  $('form').attr('method', 'get');
  $('#button').prop('value', 'sign in');
  $('form').show();
});

$(document).ready(function() {
  homeView.hideForm();
});



