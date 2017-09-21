// Dependencies
var $ = require('jquery');

// Polyfills
//require('es5-shim');
require('console-shim');


// App 
var app = {
  // Breakpoint constants
  BREAKPOINT_MOBILE: 0,
  BREAKPOINT_TABLET: 1,
  BREAKPOINT_DESKTOP: 2,

  // Current breakpoint
  breakpoint: -1,

  onPersonalSlide: 0,

  slideTimer: setInterval(function(){ }, 20000),
  // Initializers
  init: function() {
    var self = this;
    // Update the current breakpoint tracking
    self.updateBreakpoint();

    // Scroll to top on page laoad
    self.checkHeightReset();

    $(".resume-slide-out-tab").click(function(e) {
      e.preventDefault();
      if(self.breakpoint == self.BREAKPOINT_MOBILE) {
        elem = $(".click-out-mobile");
      } else {
        elem = $(".click-out-tablet");
      }

      if(!$(".resume-slide-out").hasClass("active")) {
        $(".resume-slide-out .content").addClass("active");
        elem.addClass("active");
      } else {
        $(".resume-slide-out .content").removeClass("active");
        elem.removeClass("active");
      }
    });
    $(".click-out").click(function(e) {
      e.preventDefault();
      console.log("self.breakpoint is " + self.breakpoint);
      if(self.breakpoint == self.BREAKPOINT_MOBILE) {
        elem = $(".click-out-mobile");
      } else {
        elem = $(".click-out-tablet");
      }
      if(elem.hasClass("active")) {
        $(".resume-slide-out .content").removeClass("active");
        elem.removeClass("active");
      }
    });
    $(".family-tab").click(function(e){
      e.preventDefault();
      self.changePersonalSlide(0);
    });
    $(".brewing-tab").click(function(e){
      e.preventDefault();
      self.changePersonalSlide(1);
    });
    $(".code-tab").click(function(e){
      e.preventDefault();
      self.changePersonalSlide(2);
    });
    self.slideTimer = setInterval(function(){ self.changePersonalSlide()}, 20000);

    $(".steam-slide-out-tab").click(function(e) {
      e.preventDefault();
      if($(".steam-slide-out").hasClass("open")) {
        $(".steam-slide-out").removeClass("open");
      } else {
        $(".steam-slide-out").addClass("open");
      }
    });
    setInterval(function() {
      $(".resume-slide-out-tab").addClass("pulse");
      setTimeout(function() {
        $(".resume-slide-out-tab").removeClass("pulse");
      }, 1600);
    }, 15000)
  },
  openResume: function() {
    console.log("click");
    $(".resume-slide-out").addClass("active");
  },
  checkHeightReset: function() {
    var self=this;

    var h = $(window).scrollTop();
    setTimeout(function(e) {
      $('html, body').scrollTop(0);
    },200);
  },
  changePersonalSlide: function(ind) {
    var self = this;
    $(".personal-tab").removeClass("active");
    if(ind == null) {
      switch(this.onPersonalSlide) {
        case 0:
          onSlide = $(".family-section");
          nextSlide = $(".brewing-section");
          onTab = $(".brewing-tab");
          this.onPersonalSlide = 1;
          break;
        case 1:
          onSlide = $(".brewing-section");
          nextSlide = $(".code-section");
          onTab = $(".code-tab");
          this.onPersonalSlide = 2;
          break;
        case 2:
          onSlide = $(".code-section");
          nextSlide = $(".family-section");
          onTab = $(".family-tab");
          this.onPersonalSlide = 0;
          break;
      }

      onSlide.addClass("sliding-out");
      nextSlide.addClass("sliding-in");
      onTab.addClass("active");
      setTimeout(function(){
        onSlide.removeClass("sliding-out");
        onSlide.removeClass("sliding-in");
      }, 2000);

    } else if (this.onPersonalSlide != ind) {
      console.log("in here, ind is " + ind);
      switch(this.onPersonalSlide) {
        case 0:
          onSlide = $(".family-section");
          break;
        case 1:
          onSlide = $(".brewing-section");
          break;
        case 2:
          onSlide = $(".code-section");
          break;
      }
      switch(ind) {
        case 0:
          nextSlide = $(".family-section");
          onTab = $(".family-tab");
          this.onPersonalSlide = 0;
          break;
        case 1:
          nextSlide = $(".brewing-section");
          onTab = $(".brewing-tab");
          this.onPersonalSlide = 1;
          break;
        case 2:
          nextSlide = $(".code-section");
          onTab = $(".code-tab");
          this.onPersonalSlide = 2;
          break;
      }
      onSlide.addClass("sliding-out");
      nextSlide.addClass("sliding-in");
      onTab.addClass("active");
      setTimeout(function(){
        onSlide.removeClass("sliding-out");
        onSlide.removeClass("sliding-in");
      }, 2000);
      
    }

    clearInterval(self.slideTimer);
    self.slideTimer = setInterval(function(){ self.changePersonalSlide()}, 20000);

  },

  // Updating width based variables and layouts
  updateBreakpoint: function() {
    var self = this;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    if(width < 768) {
      self.breakpoint = self.BREAKPOINT_MOBILE;
      console.log("Mobile");
    }
    else if (width < 1120) {
      self.breakpoint = self.BREAKPOINT_TABLET;
      console.log("Tablet");
    }
    else {
      self.breakpoint = self.BREAKPOINT_DESKTOP;
      console.log("Desktop");
    }

  },

  onScroll: function(top) {
    // af parrallax
    if(top > 450 && top <= 850) {
      val = (850 - top) / 4;
      val = val / 2;
      val = 75-val;
      $(".af-container").css("background-position", "50% "  + val + "%")
    }
    // ewu parallax
    if(top > 850 && top <= 1250) {
      val = (1250 - top) / 4;
      val = val / 2;
      val = 75-val;
      $(".ewu-container").css("background-position", "50% "  + val + "%")
    }
    // coding parallax
    if(top > 1250 && top <= 1650) {
      val = (1350 - top);
      val = 100-val;
      $(".rg-container").css("background-position", "50% "  + val + "%")
    }
    if(top > 250  && !$(".moving-af").hasClass("active")) {
      $(".moving-af").addClass("active");
      
    } else if (top <= 250 && $(".moving-af").hasClass("active")) {
      $(".moving-af").removeClass("active");
    }

    if(top > 550  && !$(".moving-ewu").hasClass("active")) {
      $(".moving-ewu").addClass("active");
    } else if (top <= 550 && $(".moving-ewu").hasClass("active")) {
      $(".moving-ewu").removeClass("active");
    }

    if(top > 850  && !$(".moving-rg").hasClass("active")) {
      $(".moving-rg").addClass("active");
    } else if (top <= 850 && $(".moving-rg").hasClass("active")) {
      $(".moving-rg").removeClass("active");
    }
  },
  
};

// Document Ready
$(document).ready(function() {
  //$('html, body').scrollTop(0);
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  if($(window).width() < 320) {
    alert("This site is best viewed at a minimum of 320 width.");
  }
  // Init the app
  app.init();
}); // End .ready
$(window).scroll(function() {
  app.onScroll($(window).scrollTop());
});

// Window resize
$(window).resize(function() {
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if(viewportWidth < 768)
    breakpoint = app.BREAKPOINT_MOBILE;
  else if (viewportWidth < 1120)
    breakpoint = app.BREAKPOINT_TABLET;
  else
    breakpoint = app.BREAKPOINT_DESKTOP;

  // If the width type changed then re-init
  if(app.breakpoint != breakpoint) {
    //app.updateBreakpoint(breakpoint);
  }
});
