'use strict';

import { head, body } from 'utils/global';

// define the Google Tag identifier
export const GTAG = 'UA-90171753-1';

// init the site traffic component
export function init() {

  // prevent the component initialization if the site is not in production
  if (build.environment !== 'production') {
    console.log(`The traffic component is disable on ${build.environment} environment`);
    return;
  }

  // load the Google Analytics API
  let script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG}`;
  head.appendChild(script);

  // init the Google Tag service
  window.dataLayer = window.dataLayer || [];

  // define the gtag function
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // set the current date
  gtag('js', new Date());
}

// push the traffic with the Google Analytics API
export function push() {

  // check if the gtag function is defined
  if (typeof gtag !== 'function') {
    return;
  }

  // detect if the user is on the 404 page
  let notFound = body.getAttribute('data-page') === '404';
  let langFr = document.documentElement.lang === 'fr';

  // push the data on Google Analytics
  gtag('config', GTAG, {
    'page_title': document.title,
    'page_location': notFound ? location.href.replace(location.pathname, langFr ? '/404' : '/en/404') : location.href,
    'page_path': notFound ? (langFr ? '/404' : '/en/404') : location.pathname
  });
}
