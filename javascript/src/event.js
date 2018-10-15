'use strict';

import mojs from 'mo-js';
import {body, device} from './global.js';
import {motio} from './motio.js';
import {dot} from './dot.js';

export function bindLogos(transitionCompleted) {

  // manages all logos animations
  Array.from(document.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'footer .logo' : '.logo')).forEach(function(logo) {

    // mojs options and objects for the "mouseenter/mouseleave logo" tween
    const letter = logo.querySelector('.motion-letter');
    const length = letter.getTotalLength();

    const letterOptions = {
      playstate: false,
      el: letter,
      strokeDasharray: length,
      transformOrigin: '109.2px 13.2px',
      duration: 700,
      easing: mojs.easing.expo.inout
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

    // hides the "o" letter of the logo on enter
    logo.addEventListener('mouseenter', function() {
      letterOut._props.playstate = true;
      letterOut.play();
    });

    // shows the "o" letter of the logo on leave
    logo.addEventListener('mouseleave', function() {
      if (letterOut._props.playstate === true) {
        letterOut.playBackward();
      }
    });
  });
}

export function bindFooter() {

  // manages the footer scroll animation
  let throttle;
  let scrollY = 0;
  let visibility = false;

  // binds the scroll event to hide/show the footer content
  window.addEventListener('scroll', function() {
    scrollY = window.scrollY;
    window.cancelAnimationFrame(throttle);

    // displays the footer content and animate the footer logo depending on the scroll position
    throttle = window.requestAnimationFrame(function() {
      if (Math.floor(scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) >= (device.large ? 98 : 95)) {
        if (!visibility) {
          document.querySelector('footer').classList.add('show');
          visibility = true;
        }
      } else {
        if (visibility) {
          document.querySelector('footer').classList.remove('show');
          visibility = false;
        }
      }
    });
  });
}

export function bindTabKey() {

  // binds the keydown event to store the tab key event
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
      motio.tabKeyEvent = true;
    }
  });

  // binds the keyup event to clear the tab key event
  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 9) {
      motio.tabKeyEvent = false;
    }
  });
}

export function bindLinks(transitionCompleted) {

  // binds the mouseenter/mouseleave/click/focus events of all links to increase/decrease the dot size, avoid page reload on same urls and manages tab focus event
  Array.from(document.querySelectorAll(typeof transitionCompleted !== 'undefined' ? 'main a, main .button' : 'a, .button')).forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      dot.classList.add('link');
    });

    link.addEventListener('mouseleave', function() {
      dot.classList.remove('link');
    });

    link.addEventListener('click', function(e) {
      dot.classList.remove('link');
      link.blur();

      // prevents the user to reload the page if the location is the same
      if (this.href === window.location.href) {
        e.preventDefault();

        // do nothing if the user is already at the top of the page
        if (window.scrollY === 0) {
          return;
        }

        // automatically scrolls to the top of the page on same location
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

      // exits if the event is not provided by the user keyboard tabulation key
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

      // calculates the offset top to scroll
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

      // scrolls to the specified offset
      window.scroll({
        top: offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    });

    link.addEventListener('blur', function() {

      // cleans the highlight class for specific links
      if (link.classList.contains('need-highlight')) {
        link.classList.remove('highlight');
      }
    });
  });

  // binds the mouseenter and mouseleave events of all white sections and footer to support the dot circle fill transition
  if (!device.blend) {
    Array.from(document.querySelectorAll('section.white, footer.white')).forEach(function(element) {
      element.addEventListener('mouseenter', function() {
        dot.classList.add('blend');
      });

      element.addEventListener('mouseleave', function() {
        dot.classList.remove('blend');
      });
    });

    Array.from(document.querySelectorAll('header, .media')).forEach(function(element) {
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

  // binds the mouseenter and mouseleave events of all mask element to prevent the user from displaying the oposite color of the vibrant color on svg elements
  Array.from(document.querySelectorAll('.isolation, .isolated line, .isolated ellipse')).forEach(function(element) {
    element.addEventListener('mouseenter', function() {
      dot.classList.add('isolate');
    });

    element.addEventListener('mouseleave', function() {
      dot.classList.remove('isolate');
    });
  });
}

// creates a text effect on the main title
export function bindTextEffect() {

  // gets the title
  let element = document.querySelector('h1');

  // exits if there is no title on the page
  if (element === null) {
    return;
  }

  // cuts the title in multiple words
  let words = element.innerText.match(/[a-zA-Zéçà',!&-]+(\s)?/g);

  // backups the title
  let title = element.innerHTML;

  // cleans the title
  element.innerHTML = '';

  // loops through each words and cuts each characters in multiple span
  words.forEach(function(word) {
    word = word.replace(/([^x00-x80 ]|\w|'|,|!|&|-)/g, '<span class="char">$&</span>');
    element.innerHTML += `<span class="word">${word}</span> `;
  });

  // checks if the user is on the index page
  let home = body.getAttribute('data-page') === 'index';

  // creates the timeline
  let textTween = new mojs.Timeline({
    delay: home ? 1100 : 0,
    onStart: function() {
      setTimeout(function () {

        // discards shift effect if a transition is engaged before the page is fully loaded
        if (motio.transitionEngaged) {
          return;
        }

        Array.from(document.querySelectorAll('.shift')).forEach(function(element) {
          element.classList.remove('shift');
        });
      }, home ? 700 : 550);
    },
    onComplete: function() {
      element.innerHTML = title;
      element.style.willChange = 'auto';
    }
  });

  // independantly animates each characters
  Array.from(document.querySelectorAll('.char')).forEach(function(char) {
    textTween.add(new mojs.Html({
      el: char,
      y: { 50 : 0 },
      easing: mojs.easing.expo.out,
      duration: 1000,
      delay: 'rand(100, 300)',
      isForce3d: true
    }));
  });

  textTween.play();
}
