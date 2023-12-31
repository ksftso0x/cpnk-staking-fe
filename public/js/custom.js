$(function(){
    AOS.init({
      duration: 1200,
      disable: 'mobile',
    });
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 1) {
          $(".header").addClass("sticky");
      } else {
          $(".header").removeClass("sticky");
      }
  });
   $('.mobileMenu').click(function(){
    $('.mobileMenuFixed').addClass('active');
  });
  $('.closeMenu').click(function(){
    $('.mobileMenuFixed').removeClass('active');
  });
});
$(function(){
  $('.btnClosePopup').click(function(){
    $('.whiteListPop').fadeOut();
  });
});
$(document).ready(function () {
  $('.sliderTeam').slick({
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows:false
        }
      }
    ]
  });
});

$(function(){
  $('.itemThumbnail').click(function(){
    $('.itemThumbnail').removeClass('active');
    $(this).addClass('active');
      var getImg = $(this).find('img').attr('data-src');
      $('.centerLarge img').attr('src', getImg);
  });
});

 $(function(){
  $('.btnMenu').click(function(){
    $('.btnMenu i').toggleClass('fa fa-bars fa fa-times');
    $('.mobileMenu').toggleClass('active');
  });
  $('.mobileMenu li').click(function(){
    $('.btnMenu i').toggleClass('fa fa-bars fa fa-times');
    $('.mobileMenu').toggleClass('active');
  });
});
$(function(){
  $('.tilt').UniversalTilt();
});
/* ===== For menu animation === */
$(".navbar-toggler").click(function(){
    $(".navbar-toggler").toggleClass("open");
    $(".navbar-toggler .stick").toggleClass("open");
    $('body,html').toggleClass("open-nav");
});


// Navbar end


if ($(".wow").length) {
  // wow animation
  var wow = new WOW(
    {
      boxClass: 'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0,          // distance to the element when triggering the animation (default is 0)
      mobile: true,       // trigger animations on mobile devices (default is true)
      live: true,       // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();
}
// one page scroll menu link
$('.rightMenu li a[href*="#"], .scroll-text').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    $('.rightMenu li a').each(function () {
        $(this).parent('li').removeClass('active');
    });
    $(this).parent('li').addClass('active');
    var target = this.hash, $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - $(".header").outerHeight()
    }, 500, 'swing', function () {
        window.location.href.substr(0, window.location.href.indexOf('#'));
        $(document).on("scroll", onScroll);
    });
});
let ticking = false;
let last_known_scroll_position = 0;
let updatePath = false;

const element = document.querySelector('svg');
const path = element.querySelector('path')
let totalLength = 0;

initPath(path)

function initPath(path){
   totalLength = path.getTotalLength();
   path.style.strokeDasharray = `${totalLength}`;
   path.style.strokeDashoffset = totalLength;
}


function handleEntries(entries) {
  console.log(entries)
   entries.forEach(entry => {
    console.log(entry)
    if(entry.isIntersecting) {
      console.log(entry.target)
    }
    
  })
}

let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
    if(entry.isIntersecting){
      console.log(entry);
      updatePath = true;
    } else {
      updatePath = false;
    }
    });
  }, {rootMargin: "0px 0px 0px 0px"});


  observer.observe(element);

function doSomething(scroll_pos) {
  if(!updatePath) {
    return;
  }
  window.requestAnimationFrame(()=>{
    const center = window.innerHeight / 2;
    const boundaries = path.getBoundingClientRect();
    const top = boundaries.top;
    const height = boundaries.height;
    const percentage = (center - top ) / height;
    const drawLength = percentage > 0 ? totalLength * percentage : 0;
    path.style.strokeDashoffset = drawLength < totalLength ? totalLength - drawLength : 0;
 
  })

}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});


var element_position = $('.numberItem').offset().top;

$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = element_position;

    if(y_scroll_pos > scroll_pos_test) {
        $('.itemRoadMap').addClass('active');
    }
    else{
      $('.itemRoadMap').removeClass('active');
    }
});
if ($(".splitAnim").length) {
  inView('.splitAnim')
      .on('enter', function(el) {
          if (el.classList.contains("splitAnim") && !el.classList.contains("active")) {
              var tl = gsap.timeline(),
                  mySplitText = new SplitText(el, { type: "words,chars" }),
                  chars = mySplitText.chars; //an array of all the divs that wrap each character
              gsap.set(el, { perspective: 400 });
              tl.from(chars, { duration: 0.45, opacity: 0, y: 50, transformOrigin: "50% 50%", ease: "back", stagger: 0.07 }, "+=0");
          }
          if (el.classList.contains("splitAnim")) {
              el.classList.add("active");
          }
      })
}
