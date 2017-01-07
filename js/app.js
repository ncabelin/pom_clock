$(function() {

  var sessionLength = $("#sessionLength"),
      sessionBreak = $('#sessionBreak'),
      sliderSession = $("#sliderSession"),
      sliderBreak = $("#sliderBreak"),
      sliders = $(".sliders");

  // input counters
  var sessionMin = $("#sessionMin"), // session minute amount
      sessionSec = $("#sessionSec"), // session seconds amount4
      breakMin = $("#breakMin"), // session seconds
      breakSec = $("#breakSec"), // break seconds
      start = false;

  // audio
  var bell = document.getElementById("bell"),
      civil = document.getElementById("civil"),
      click = document.getElementById("click");

  // buttons
  var startTime = $("#startTime"),
      pauseTime = $("#pauseTime"),
      clearTime = $("#clearTime");

  var myVar, timeMinutes, timeSeconds, initialTime, sliderSessionSet, sliderBreakSet,
      session = true,
      pause = false;

  // input fields grouped by session and break
  var sessT = $(".sess"),
      breakT = $(".break");

  // jQuery UI slider invoked
  sliderSession.slider({
    range: "max",
    min: 1,
    max: 60,
    value: 25,
    slide: function(event, ui) {
      sessionMin.val(ui.value);
    }
  });

  sliderBreak.slider({
    range: "max",
    min: 1,
    max: 60,
    value: 5,
    slide: function(event, ui) {
      breakMin.val(ui.value);
    }
  });

  function getValues() {
    sliderSessionSet = sliderSession.slider("value");
    sliderBreakSet = sliderBreak.slider("value");
  }

  // reset gets current slider values in minutes and passes to input counters
  function reset() {
    getValues();
    sessionMin.val( sliderSessionSet );
    sessionSec.val(0);
    breakMin.val( sliderBreakSet );
    breakSec.val(0);
  }

  reset();

  // converts seconds to minutes and seconds format
  function displayTime() {
    timeMinutes = Math.floor(initialTime/60);
    timeSeconds = initialTime - timeMinutes * 60;
    if (session) {
      sessionMin.val(timeMinutes);
      sessionSec.val(timeSeconds);
    } else {
      breakMin.val(timeMinutes);
      breakSec.val(timeSeconds);
    }
  }

  // initially pause button will be invisible, while play button will be visible
  pauseTime.css("display","none");

  // start click
  startTime.click(function() {
    bell.play();
    startTime.css("display","none");
    pauseTime.css("display","inline");
    pause = false;
    sliderSession.slider("disable");
    sliderBreak.slider("disable");

    // start has been pushed once
    if (!start) {
      if (session) {
        // session timer
        breakT.css("opacity", 0.1);
        getValues();
        initialTime = sliderSessionSet * 60;
      } else {
        // break timer
        sessT.css("opacity", 0.1);
        getValues();
        initialTime = sliderBreakSet * 60;
      }

      // starts countdown
      myVar = setInterval(beginTime, 1000);
      start = true;
    }
  });

  function beginTime() {
    if (initialTime === 0) {
      civil.play();
      // if session is false (breaktime), turn session field opaque, begin session
      if (!session) {
        breakT.css("opacity", 0.1);
        sessT.css("opacity", 1);
        initialTime = sliderSessionSet * 60;
        session = true;
      } else {
      // if session is true (sessiontime), turn break field opaque, begin break
        breakT.css("opacity", 1);
        sessT.css("opacity", 0.1);
        initialTime = sliderBreakSet * 60;
        session = false;
      }
    }

    // countdown if not paused
    if (!pause) {
        initialTime--;
        displayTime();
    }

  }

  pauseTime.click(function() {
    civil.pause();
    click.play();
    pause = true;
    startTime.css("display","inline");
    pauseTime.css("display","none");
  });

  clearTime.click(function() {
    clearInterval(myVar);
    breakT.css("opacity", 1);
    sessT.css("opacity", 1);
    click.play();
    startTime.css("display","inline");
    pauseTime.css("display","none");
    pause = true;
    sliderSession.slider("enable");
    sliderBreak.slider("enable");
    breakMin.val(0);
    breakSec.val(0);
    start = false;
    reset();
  });


});
