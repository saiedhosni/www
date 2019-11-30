<?php
  // require the site configuration
  require 'configuration.php';

  // define the site language
  define('LANGUAGE', substr($_SERVER['REQUEST_URI'], 0, 3) != '/en' ? 'fr' : 'en');

  // default page if nothing is specified
  if (!isset($_GET['page'])) {
    if (empty($_GET)) {
      $_GET['page'] = DEFAULT_PAGE;
    } else {
      header('HTTP/1.1 301 Moved Permanently');
      header('Location: /');
      exit();
    }
  }

  // build a predictive page
  $page = $_GET['page'];

  // rewrite french requests
  if (LANGUAGE == 'fr') {
    $page = 'fr/' . $page;
  }

  // rewrite english default page
  if (LANGUAGE == 'en' && $page == 'en') {
    $page = 'en/' . DEFAULT_PAGE;
  }

  // build a predictive path
  $path = __DIR__ . '/page/' . $page . '.php';

  // manage 404 requests
  if (!file_exists($path)) {

    // prevent robots from indexing 404 requests
    header('X-Robots-Tag: noindex');

    $page = LANGUAGE . '/404';
    $path = __DIR__ . '/page/' . $page . '.php';
  }

  // uniformize the namespace between english and french pages
  $name = str_replace([
    LANGUAGE . '/',
    'le-',
    'the-',
    'nos-',
    'our-',
    'legal-'
  ], '', $page);

  // specific case for legal notices
  if ($name == 'mentions-legales') {
    $name = 'notices';
  }

  // define the page, requested file path and namespace
  define('PAGE', $page);
  define('PATH', $path);
  define('NAME', $name);

  // call the template
  require 'page/template.php';
?>
