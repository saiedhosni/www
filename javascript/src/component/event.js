'use strict';

import mojs from '@mojs/core';
import { body, device } from 'utils/global';
import { motio } from 'utils/motio';
import { dot } from 'component/dot';

export function bindLogos(transitionCompleted) {

  // manage all logos animations
  Array.from(body.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'footer .logo' : '.logo')).forEach(function(logo) {

    // mojs options and objects for the "mouseenter/mouseleave logo" tween
    const letter = logo.querySelector('.motion-letter');
    const length = letter.getTotalLength();

    const letterOptions = {
      playstate: false,
      el: letter,
      strokeDasharray: length,
      transformOrigin: '109.2px 13.2px',
      duration: 700,
      easing: mojs.easing.quint.inout
    };

    let letterIn = new mojs.Html(
      mojs.helpers.extend({
        strokeDashoffset: { [length] : length * 2 },
        angleZ: { 90 : 360 }
      }, letterOptions)
    );

    let letterOut = new mojs.Html(
      mojs.helpers.extend({
        strokeDashoffset: { 0 : length },
        angleZ: { 0 : 180 },
        onComplete: function() {
          this._props.playstate = false;
          letterIn.play();
        }
      }, letterOptions)
    );

    // hide the "o" letter of the logo on enter
    logo.addEventListener('mouseenter', function() {
      letterOut._props.playstate = true;
      letterOut.play();
    });

    // show the "o" letter of the logo on leave
    logo.addEventListener('mouseleave', function() {
      if (letterOut._props.playstate === true) {
        letterOut.playBackward();
      }
    });
  });
}

export function bindFooter() {

  // manage the footer scroll animation
  let throttle;
  let scrollY = 0;
  let visibility = false;

  // bind the scroll event to hide/show the footer content
  window.addEventListener('scroll', function() {
    scrollY = window.scrollY;
    window.cancelAnimationFrame(throttle);

    // display the footer content and animate the footer logo depending on the scroll position
    throttle = window.requestAnimationFrame(function() {
      if (Math.floor(scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) >= (device.large ? 98 : 95)) {
        if (!visibility) {
          body.querySelector('footer').classList.add('show');
          visibility = true;
        }
      } else {
        if (visibility) {
          body.querySelector('footer').classList.remove('show');
          visibility = false;
        }
      }
    });
  });
}

export function bindTabKey() {

  // bind the keydown event to store the tab key event
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
      motio.tabKeyEvent = true;
    }
  });

  // bind the keyup event to clear the tab key event
  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 9) {
      motio.tabKeyEvent = false;
    }
  });
}

export function bindLinks(transitionCompleted) {

  // bind the mouseenter/mouseleave/click/focus events of all links to increase/decrease the dot size, avoid page reload on same urls and manage tab focus event
  Array.from(body.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'main a, main .button' : 'a, .button')).forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      dot.classList.add('link');
    });

    link.addEventListener('mouseleave', function() {
      dot.classList.remove('link');
    });

    link.addEventListener('click', function(e) {
      dot.classList.remove('link');
      link.blur();

      // prevent the user to reload the page if another link is clicked during a page transition
      if (motio.transitionEngaged) {
        e.preventDefault();
        e.stopPropagation();
      }

      // prevent the user to reload the page if the location is the same
      if (this.href === window.location.href) {
        e.preventDefault();

        // do nothing if the user is already at the top of the page
        if (window.scrollY === 0) {
          return;
        }

        // automatically scroll to the top of the page on same location
        setTimeout(function () {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }, 500);
      }
    });

    link.addEventListener('focus', function() {

      // exit if the event is not provided by the user keyboard tabulation key
      if (!motio.tabKeyEvent) {
        return;
      }

      if (link.parentNode.classList.contains('media')) {
        return;
      }

      // highlight the current link if needed
      if (link.classList.contains('need-highlight')) {
        link.classList.add('highlight');
      }

      // calculate the offset top to scroll
      let offsetTop = 0;

      if (link.classList.contains('in-footer')) {
        offsetTop = body.scrollHeight;
      } else {
        let element = link;

        do {
          offsetTop += element.offsetTop || 0;
          element = element.offsetParent;
        } while(element);

        offsetTop = offsetTop - window.innerHeight * 0.5;
      }

      // scroll to the specified offset
      window.scroll({
        top: offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    });

    link.addEventListener('blur', function() {

      // clean the highlight class for specific links
      if (link.classList.contains('need-highlight')) {
        link.classList.remove('highlight');
      }
    });
  });

  // bind the mouseenter and mouseleave events of all white sections and footer to support the dot circle fill transition
  if (!device.blend) {
    Array.from(body.querySelectorAll('section.white, footer.white')).forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        dot.classList.add('blend');
      });

      element.addEventListener('mouseleave', function() {
        dot.classList.remove('blend');
      });
    });

    Array.from(body.querySelectorAll('header, .media')).forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        dot.classList.add('blend-extended');
      });

      element.addEventListener('mouseleave', function() {
        dot.classList.remove('blend-extended');
      });
    });
  }
}

export function bindIsolation() {

  // bind the mouseenter and mouseleave events of all mask element to prevent the user from displaying the oposite color of the vibrant color on svg elements
  Array.from(body.querySelectorAll('.isolation, .isolated line, .isolated ellipse')).forEach(function(element) {
    element.addEventListener('mouseenter', function() {
      dot.classList.add('isolate');
    });

    element.addEventListener('mouseleave', function() {
      dot.classList.remove('isolate');
    });
  });
}

// create a text effect on the main title
export function bindTextEffect() {

  // get the title
  let element = body.querySelector('h1');

  // exit if there is no title on the page
  if (element === null) {
    return;
  }

  // cut the title in multiple words
  let words = element.innerText.match(/[^\s]+/g);

  // backup the title
  let title = element.innerHTML;

  // clean the title
  element.innerHTML = '';

  // loop through each words and cut each characters in multiple span, discarding spaces
  words.forEach(function(word) {
    word = word.replace(/[^\s]/g, '<span class="char">$&</span>');
    element.innerHTML += `<span class="word">${word}</span> `;
  });

  // check if the user is on the index page
  let home = body.getAttribute('data-page') === 'index';

  // create the timeline
  let textTween = new mojs.Timeline({
    delay: home ? 900 : 0,
    onStart: function() {
      setTimeout(function () {

        // discard shift effect if a transition is engaged before the page is fully loaded
        if (motio.transitionEngaged) {
          return;
        }

        Array.from(body.querySelectorAll('.shift')).forEach(function(element) {
          element.classList.remove('shift');
        });
      }, 550);
    },
    onComplete: function() {
      element.innerHTML = title;
      element.style.willChange = 'auto';
    }
  });

  // independantly animate each characters
  Array.from(body.querySelectorAll('.char')).forEach(function(char) {
    textTween.add(new mojs.Html({
      el: char,
      y: { 50 : 0 },
      easing: mojs.easing.quint.out,
      duration: 1000,
      delay: 'rand(100, 300)',
      isForce3d: true
    }));
  });

  textTween.play();
}
