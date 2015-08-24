$(document).ready(function() {

  /***********************
        Stop Watch
  ************************/

  var minutes = seconds = milliseconds = 0;
  var prev_minutes = prev_seconds = prev_milliseconds = undefined;
  var timeUpdate;

  // Start/Pause/Resume button onClick
  $("#start_pause_resume").button().click(function() {
    // Start button
    if ($(this).text() == "Start") { // check button label
      $(this).html("<span class='ui-button-text'>Pause</span>");
      updateTime(0, 0, 0, 0);
    }
    // Pause button
    else if ($(this).text() == "Pause") {
      clearInterval(timeUpdate);
      $(this).html("<span class='ui-button-text'>Resume</span>");
    }
    // Resume button
    else if ($(this).text() == "Resume") {
      prev_hours = parseInt($("#hours").html());
      prev_minutes = parseInt($("#minutes").html());
      prev_seconds = parseInt($("#seconds").html());
      prev_milliseconds = parseInt($("#milliseconds").html());

      updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds);

      $(this).html("<span class='ui-button-text'>Pause</span>");
    }
  });

  // Reset button onClick
  $("#reset").click(function() {
    if (timeUpdate) clearInterval(timeUpdate);
    setStopwatch(0, 0, 0, 0);
    $("#start_pause_resume").html("<span class='ui-button-text'>Start</span>");
  });

  // Update time in stopwatch periodically - every 25ms
  function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds) {
    var startTime = new Date(); // fetch current time

    timeUpdate = setInterval(function() {
      var timeElapsed = new Date().getTime() - startTime.getTime(); // calculate the time elapsed in milliseconds

      // calculate hours
      hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;

      // calculate minutes
      minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
      if (minutes > 60) minutes %= 60;

      // calculate seconds
      seconds = parseInt(timeElapsed / 1000) + prev_seconds;
      if (seconds > 60) seconds %= 60;

      // calculate milliseconds
      milliseconds = timeElapsed + prev_milliseconds;
      if (milliseconds > 1000) milliseconds %= 1000;

      // set the stopwatch
      setStopwatch(hours, minutes, seconds, milliseconds);

    }, 25); // update time in stopwatch after every 25ms

  }

  // Set the time in stopwatch
  function setStopwatch(hours, minutes, seconds, milliseconds) {
    $("#hours").html(prependZero(hours, 2));
    $("#minutes").html(prependZero(minutes, 2));
    $("#seconds").html(prependZero(seconds, 2));
    $("#milliseconds").html(prependZero(milliseconds, 3));
  }

  // Prepend zeros to the digits in stopwatch
  function prependZero(time, length) {
    time = new String(time);
    return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
  }
});
/***********************
      Datepicker
************************/

$(function() {
  $("#datepicker").datepicker();
});


/*************************************
        ~~~  Autocomplete ~~~
**************************************/

$(function() {
   var availableTags = [
     "An example of..",
     "Example of...",
     "Example of a treatment...",
     "Example of a treatment for tests...",
     "The example of...",
     "Treatments for tests examples..."
   ];
   function split( val ) {
     return val.split( /,\s*/ );
   }
   function extractLast( term ) {
     return split( term ).pop();
   }

   $( ".tags" )
     // don't navigate away from the field on tab when selecting an item
     .bind( "keydown", function( event ) {
       if ( event.keyCode === $.ui.keyCode.TAB &&
           $( this ).autocomplete( "instance" ).menu.active ) {
         event.preventDefault();
       }
     })
     .autocomplete({
       minLength: 0,
       source: function( request, response ) {
         // delegate back to autocomplete, but extract the last term
         response( $.ui.autocomplete.filter(
           availableTags, extractLast( request.term ) ) );
       },
       focus: function() {
         // prevent value inserted on focus
         return false;
       },
       select: function( event, ui ) {
         var terms = split( this.value );
         // remove the current input
         terms.pop();
         // add the selected item
         terms.push( ui.item.value );
         // add placeholder to get the comma-and-space at the end
         terms.push( "" );
         this.value = terms.join( ", " );
         return false;
       }
     });
 });

/***********************
       On page Load
************************/
$('.one').css('visibility', 'visible');
$('.two').css('visibility', 'hidden');
$('.three').css('visibility', 'hidden');
$('.four').css('visibility', 'hidden');
$('.initial-action-items').hide();
$('.doctor-time-log').hide();
$('.date-time-log').hide();
$('.doctor-time-log').css('visibility', 'hidden');
$('.date-time-log').css('visibility', 'hidden');
$('.span-header').addClass('bigger-width');

/***********************
 Monthly Progress Update
************************/
$(".box-1").click(function() {
  $('.one').css('visibility', 'visible');
  $('.two').css('visibility', 'hidden');
  $('.three').css('visibility', 'hidden');
  $('.four').css('visibility', 'hidden');
  $('.right-column-1').removeClass('span12');
  $('.initial-patient-centered-care-plan').show();
  $('.doctor-time-log').hide();
  $('.date-time-log').hide();
  $('.doctor-time-log').css('visibility', 'hidden');
  $('.date-time-log').css('visibility', 'hidden');
  $('.span-header').addClass('bigger-width');
  $('.initial-action-items').hide();
  $('.current-monthly-update').show();
  $('.left-column-1').removeClass('increase-height');
});

/***********************
   Monthly Call Review
************************/
$(".box-2").click(function() {
  $('.current-monthly-update').show();
  $('.initial-action-items').hide();
  $('.initial-patient-centered-care-plan').hide();
  $('.current-monthly-update').addClass('span12');
  $('.two').css('visibility', 'visible');
  $('.one').css('visibility', 'hidden');
  $('.three').css('visibility', 'hidden');
  $('.four').css('visibility', 'hidden');
  $('.doctor-time-log').show();
  $('.date-time-log').show();
  $('.doctor-time-log').css('visibility', 'visible');
  $('.date-time-log').css('visibility', 'visible');
  $('.span-header').removeClass('bigger-width');
  $('.one').css('visibility', 'hidden');
  $('.left-column-1').removeClass('increase-height');
});

/********************************
  Monthly Recommendations Review
*********************************/
$(".box-3").click(function() {
  $('.current-monthly-update').removeClass('span12');
  $('.initial-patient-centered-care-plan').hide();
  $('.initial-action-items').show();
  $('.three').css('visibility', 'visible');
  $('.one').css('visibility', 'hidden');
  $('.two').css('visibility', 'hidden');
  $('.four').css('visibility', 'hidden');
  $('.initial-action-items').removeClass('floatright');
  $('.initial-patient-centered-care-plan').removeClass('floatleft');
  $('.current-monthly-update').show();
  $('.doctor-time-log').hide();
  $('.date-time-log').hide();
  $('.doctor-time-log').css('visibility', 'hidden');
  $('.date-time-log').css('visibility', 'hidden');
  $('.span-header').addClass('bigger-width');
  $('.one').css('visibility', 'hidden');
  $('.left-column-1').addClass('increase-height');
});

/********************************
  Initial Recommendations Review
*********************************/
$(".box-4").click(function() {
  $('.four').css('visibility', 'visible');
  $('.one').css('visibility', 'hidden');
  $('.three').css('visibility', 'hidden');
  $('.two').css('visibility', 'hidden');
  $('.current-monthly-update').hide();
  $('.initial-action-items').show();
  $('.initial-action-items').addClass('floatright');
  $('.initial-patient-centered-care-plan').show();
  $('.initial-patient-centered-care-plan').addClass('floatleft');
  $('.doctor-time-log').show();
  $('.date-time-log').show();
  $('.doctor-time-log').css('visibility', 'hidden');
  $('.date-time-log').css('visibility', 'hidden');
  $('.span-header').addClass('bigger-width');
  $('.one').css('visibility', 'hidden');
  $('.initial-patient-centered-care-plan').removeClass('increase-height');
});

/*****************************************
  Current Monthly Update Navigation Tabs
******************************************/
$(".tab-2").click(function() {
  $('.monthly-care').show();
  $('.monthly-call').css('visibility', 'hidden');
});

$('.tab-1').addClass('clicked');
$(".tab-1").click(function() {
  $(this).addClass("clicked");
  $('.tab-2').removeClass('clicked');
  $('.tab-3').removeClass('clicked');
});

$(".tab-2").click(function() {
  $(this).addClass("clicked");
  $('.tab-1').removeClass('clicked');
  $('.tab-3').removeClass('clicked');
});

$(".tab-3").click(function() {
  $(this).addClass("clicked");
  $('.tab-1').removeClass('clicked');
  $('.tab-2').removeClass('clicked');
});

$('ul.tabs li').click(function() {
  var tab_id = $(this).attr('data-tab');
  $('ul.tabs li').removeClass('current');
  $('.tab-content').removeClass('current');
  $(this).addClass('current');
  $("#" + tab_id).addClass('current');
});


// Adds a delete class to the item clicked
$('.fa-times-circle').click(function() {
  $(this).parent().parent().addClass('to-delete');
});

// If YES on Are You Sure? then animates and removes item
var myFunction = function() {
  $('.yes-button').click(function() {
    $('.to-delete').hide('slow', function() {
      $(this).remove();
    });
  });
};

// changes the bootstrap select to the custom selectpicker
$(".chosen-select").chosen({
  placeholder_text_multiple: "Select a few Conditions"
});

// add the animation to the modal
$(".modal").each(function(index) {
  $(this).on('show.bs.modal', function(e) {
    var open = $(this).attr('data-easein');
    if (open == 'shake') {} else {
      $('.modal-dialog').velocity('transition.' + open);
    }
  });
});

$('.datetimepicker').datetimepicker({
  timepicker: false,
  format: 'm/d/Y'
});
