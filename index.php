<?php
	// requires the site configuration
	require 'configuration.php';

	// defines the site language
	define('LANGUAGE', substr($_SERVER['REQUEST_URI'], 0, 3) != '/en' ? 'fr' : 'en');

	// default page if nothing is specified
	if (!isset($_GET['page'])) {
		$_GET['page'] = DEFAULT_PAGE;
	}

	// builds a predictive page
	$page = $_GET['page'];

	// rewrites french requests
	if (LANGUAGE == 'fr') {
		$page = 'fr/' . $page;
	}

	// rewrites english default page
	if (LANGUAGE == 'en' && $page == 'en') {
		$page = 'en/' . DEFAULT_PAGE;
	}

	// builds a predictive path
	$path = __DIR__ . '/page/' . $page . '.php';

	// http header for 404 requests
	if (!file_exists($path)) {
		header('HTTP/1.1 404 Not Found');
		$page = LANGUAGE . '/404';
		$path = __DIR__ . '/page/' . $page . '.php';
	}

	// defines the page and requested file path
	define('PAGE', $page);
	define('PATH', $path);

	// calls the template
	require 'page/template.php';
?>