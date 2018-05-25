<?php
	// requires the site configuration
	require 'configuration.php';

	// defines the site language
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

	// manages 404 requests
	if (!file_exists($path)) {
		$page = LANGUAGE . '/404';
		$path = __DIR__ . '/page/' . $page . '.php';
	}

	// uniformizes the namespace between english and french pages
	$name = str_replace(array(
		LANGUAGE . '/',
		'le-',
		'the-',
		'nos-',
		'our-',
		'legal-'
	), '', $page);

	// specific case for legal notices
	if ($name == 'mentions-legales') {
		$name = 'notices';
	}

	// defines the page, requested file path and namespace
	define('PAGE', $page);
	define('PATH', $path);
	define('NAME', $name);

	// calls the template
	require 'page/template.php';
?>