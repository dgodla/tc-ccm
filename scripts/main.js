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



  /***********************
        Datepicker
  ************************/

  $(function() {
    $("#datepicker").datepicker();
  });


  /***********************
         Navigation
  ************************/

  $('.two').css('visibility', 'hidden');
  $('.three').css('visibility', 'hidden');
  $('.four').css('visibility', 'hidden');
  $('.monthly-rec').hide();

  $(".box-1").click(function() {
    $('.two').css('visibility', 'hidden');
    $('.three').css('visibility', 'hidden');
    $('.four').css('visibility', 'hidden');
    $('.monthly-rec').css('visibility', 'hidden');
    $('.monthly-progress').show();
    $('.right-column-1').removeClass('span12');
    $('.left-column-1').show();
  });

  $(".box-2").click(function(){
    $('.right-column-1').addClass('span12');
    $('.left-column-1').hide();
    $('.two').css('visibility','visible');
    $('.one').css('visibility', 'hidden');
    $('.three').css('visibility', 'hidden');
    $('.four').css('visibility', 'hidden');
  });

  $(".box-3").click(function() {
    $('.left-column-1').show();
    $('.right-column-1').removeClass('span12');
    $('.monthly-progress').hide();
    $('.monthly-rec').show();
    $('.three').css('visibility','visible');
    $('.one').css('visibility', 'hidden');
    $('.two').css('visibility', 'hidden');
    $('.four').css('visibility', 'hidden');
  });

  $(".box-4").click(function() {
    $('.four').css('visibility','visible');
    $('.one').css('visibility', 'hidden');
    $('.three').css('visibility', 'hidden');
    $('.two').css('visibility', 'hidden');
    // $('.monthly-rec').hide();
    $('.initial-action-items').addClass('floatright');
    $('.monthly-progress').show();
    $('.currently-monthly-update').hide();
    $('.initial-patient-centered-care-plan').addClass('floatleft');


  });

  $(".tab-2").click(function() {
    $('.monthly-care').show();
    $('.monthly-call').css('visibility', 'hidden');
    $('.time-log').css('visibility', 'hidden');
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


  $('.box-1').click(function(){
    if ( $('.one').css('visibility') == 'hidden' )
      $('.one').css('visibility','visible');
    else
      $('.one').css('visibility','hidden');
  });

    $(".chosen-select").chosen({
      placeholder_text_multiple: "Select a few Conditions"
    });
  // changes the bootstrap select to the custom selectpicker


    // add the animation to the modal
    $(".modal").each(function(index) {
      $(this).on('show.bs.modal', function(e) {
        var open = $(this).attr('data-easein');
        if (open == 'shake') {
        } else {
          $('.modal-dialog').velocity('transition.' + open);
        }
      });
    });

    $('.datetimepicker').datetimepicker({
      timepicker:false,
      format:'m/d/Y'
    });


});
