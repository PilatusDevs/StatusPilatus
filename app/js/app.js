"use strict";

function change_page(){
  /*
  * On click on a href in the sidebar this switch statement
  * will decide which page should be loaded or what other
  * action should be executed
  */
  $('a[href="#tab"]').click(function() {
    $(".page-header h1").text($(this).text());

    switch ($(this).text()) {
      case 'CPU':
        alert('CPU shit laden');
        break;
      case 'GPU':
        alert('GPU shit laden');
        break;
      case 'HDD':
        alert('Enzovoorts');
        break;
      case 'OS':
        alert('Enzovoorts');
        break;
      case 'Network':
        alert('Enzovoorts');
        break;
      default:
      alert('Nobody Wins!');
    }
  });
}

$( document ).ready( change_page );
