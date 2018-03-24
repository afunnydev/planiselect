//@prepros-prepend libs/bootstrap.min.js
//@prepros-prepend easing.js
//@prepros-prepend libs/jquery-ui.min.js
//@prepros-prepend libs/slick.min.js
//@prepros-prepend jquery.matchHeight.js
//@prepros-prepend libs/hammer.min.js
//@prepros-prepend wow.min.js

$(document).ready(function(){

  new WOW().init();

  // Fancybox
  if(jQuery().fancybox) {
     console.log('Helloooo');
 } else {
  console.log("still not working");
 }
  // Remove placeholder
  $('input,textarea').focus(function(){
     $(this).data('placeholder',$(this).attr('placeholder'))
     $(this).attr('placeholder','');
  });
  $('input,textarea').blur(function(){
     $(this).attr('placeholder',$(this).data('placeholder'));
  });

  var timelineBottom = false,
      timelineTop = false
  $('.timeline li:odd a.open-timeline').click(function(){
    var parentli = $(this).parents('li');
    if (parentli.hasClass('grouped')) {
      parentli.next('li').toggleClass('enlarged');
    }
    $(this).parent().toggleClass('opened');
    if (!timelineBottom) {
      $(".timeline ol").addClass('opened-btm');
      timelineBottom = true;
    } else if ($('.timeline li:odd div.opened a.open-timeline').length == 0) {
      setTimeout(function(){
        $(".timeline ol").removeClass('opened-btm');
      }, 200);
      timelineBottom = false;
    }
  })

  $('.timeline li:even a.open-timeline').click(function(){
    var parentli = $(this).parents('li');
    if (parentli.hasClass('grouped')) {
      parentli.next('li').toggleClass('enlarged');
    }
    $(this).parent().toggleClass('opened');
    if (!timelineTop) {
      $(".timeline ol").addClass('opened-top');
      timelineTop = true;
    } else if ($('.timeline li:even div.opened a.open-timeline').length == 0) {
      setTimeout(function(){
        $(".timeline ol").removeClass('opened-top');
      }, 300);
      timelineTop = false;
    }
  })

});

$(function() {
  setTimeout(function() {
    if (location.hash) {
      /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
      window.scrollTo(0, 0);
      target = location.hash.split('#');
      smoothScrollTo($('#'+target[1]));
    }
  }, 1);
  
  function smoothScrollTo(target) {
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 70
      }, 1000);
    }
  }
});


$(function() {
  $('a[href*="#mas-header"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

 jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('srcset');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});

$(document).on('click', '.yamm .dropdown-menu', function(e) {
  e.stopPropagation()
});

$("#logos-slider").slick({
  // normal options...
  infinite: true,
  dots: true,
  arrows:false,
  slidesToShow: 8,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1099,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },    
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,     
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]


});

// Sticky header
$(window).scroll(function() {
  if ($(this).scrollTop() > 40){  
      $('#mas-header').addClass("sticky");
    }
    else{
      $('#mas-header').removeClass("sticky");
    }
});



/* Init slick slider homepage top */
var activeClass = 'slick-active',
    ariaAttribute = 'aria-hidden';
$( '#hero-slider' )
.on( 'init', function() {
    $( '.slick-dots li:first-of-type' ).addClass( activeClass ).attr( ariaAttribute, false );
} )
.on( 'afterChange', function( event, slick, currentSlide ) {
    var $dots = $( '.slick-dots' );
    $( 'li', $dots ).removeClass( activeClass ).attr( ariaAttribute, true );
    $dots.each( function() {
        $( 'li', $( this ) ).eq( currentSlide ).addClass( activeClass ).attr( ariaAttribute, false );
    } );
} );


    $('#hero-slider').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.hero-slide:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);    
    });
    $('#hero-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
              var $animatingElements = $('div.hero-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
              doAnimations($animatingElements);    
    });
    $('#hero-slider').slick({
       autoplay: true,
       autoplaySpeed: 7000,
       arrows:true,
       dots: false,
       fade: true,
        pauseOnFocus: false,
        pauseOnHover: true,
        pauseOnDotsHover: false,     
    });
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }


 $(function() {
  $('#to-top').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

 // Sticky header
$(window).scroll(function() {
  if ($(this).scrollTop() > 200){  
      $('#to-top').addClass("show-arrow");
    }
    else{
      $('#to-top').removeClass("show-arrow");
    }
});


 // Sticky header
$(window).scroll(function() {
  if ($(this).scrollTop() > 0){  
      $('.inner-header .caption').addClass("blur-this");
    }
    else{
      $('.inner-header .caption').removeClass("blur-this");
    }
});



$(function() {
  $('#contact-info-block .contact-box').matchHeight();
  $('#latest-articles .article-box').matchHeight();
  $('#client-project-description .project-box').matchHeight();
});


$("#clients-slider").slick({
  // normal options...
  infinite: true,
  dots: true,
  arrows:false,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1099,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },    
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,     
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]


});


$("#other-services-slider").slick({
  // normal options...
  infinite: true,
  dots: false,
  arrows:true,
  slidesToShow: 3,
  slidesToScroll: 3,

  responsive: [
    {
      breakpoint: 1099,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,   
      }
    },    
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnFocus: false,
        pauseOnHover:false,
        pauseOnDotsHover: false,     
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]


});

// Menu
$('.menu-btn').click(function(){
    $('.main-menu-sidebar').addClass("menu-active");
    $('.menu-overlay').addClass("active-overlay");
    $('body').toggleClass('body-scroll');
    $(this).toggleClass('open');
});

// Menu
  $('.close-menu-btn').click(function(){
    $('.main-menu-sidebar').removeClass("menu-active");
    $('.menu-overlay').removeClass("active-overlay");
    $('body').toggleClass('body-scroll');
});

    $(function() {
  
      var menu_ul = $('.nav-links > li.has-menu > ul'),
           menu_a  = $('.nav-links > li.has-menu > a');
      
      menu_ul.hide();
    
      menu_a.click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('active')) {
          menu_a.removeClass('active');
          menu_ul.filter(':visible').slideUp('normal');
          $(this).addClass('active').next().stop(true,true).slideDown('normal');
        } else {
          $(this).removeClass('active');
          $(this).next().stop(true,true).slideUp('normal');
        }
      });
    
    });
    
 $(".nav-links > li.has-menu > a ").attr("href","javascript:;");
(function () {

  // VARIABLES
  var timeline = document.querySelector(".timeline ol"),
      elH = document.querySelectorAll(".timeline li > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline li:first-child"),
      lastItem = document.querySelector(".timeline li:last-child"),
      xScrolling = 280,
      disabledClass = "disabled";

  // START
  window.addEventListener("load", init);

  function init() {
    // setEqualHeights(elH);
    animateTl(xScrolling, arrows, timeline);
    setSwipeFn(timeline, arrowPrev, arrowNext);
    setKeyboardFn(arrowPrev, arrowNext);
  }

  // SET EQUAL HEIGHTS
  function setEqualHeights(el) {
    var counter = 0;
    for (var i = 0; i < el.length; i++) {
      var singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }


    for (var _i = 0; _i < el.length; _i++) {
      el[_i].style.height = counter + "px";
    }


  }

  // CHECK IF AN ELEMENT IS IN VIEWPORT
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  // SET STATE OF PREV/NEXT ARROWS
  function setBtnState(el) {
    var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }
      el.disabled = false;
    }
  }

  // ANIMATE TIMELINE
  function animateTl(scrolling, el, tl) {
    var counter = 4;
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function () {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }
        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }
        var sign = this.classList.contains("arrow__prev") ? "" : "-";
        if (counter === 0) {
          tl.style.transform = "translateX(-" + scrolling + "px)";
        } else {
          var tlStyle = getComputedStyle(tl);
          // add more browser prefixes if needed here
          var tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
          var values = parseInt(tlTransform.split(",")[4]) + parseInt("" + sign + scrolling);
          tl.style.transform = "translateX(" + values + "px)";
        }

        setTimeout(function () {
          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        }, 1100);

        counter++;
      });
    }

  }

  // ADD SWIPE SUPPORT FOR TOUCH DEVICES
  function setSwipeFn(tl, prev, next) {
    var hammer = new Hammer(tl);
    hammer.on("swipeleft", function () {
      return next.click();
    });
    hammer.on("swiperight", function () {
      return prev.click();
    });
  }

  // ADD BASIC KEYBOARD FUNCTIONALITY
  function setKeyboardFn(prev, next) {
    document.addEventListener("keydown", function (e) {
      if (e.which === 37 || e.which === 39) {
        var timelineOfTop = timeline.offsetTop;
        var y = window.pageYOffset;
        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }
        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }
  timeline.style.transform = "translateX(-2200px)";
  setBtnState(arrowPrev, false);
  setBtnState(arrowNext);
})();