<?php
	// engine configuration
	define('DEFAULT_PAGE', 'index');
	define('DEFAULT_LANGUAGE', 'fr');
	
	// defines current environment
	define('ENVIRONMENT', substr($_SERVER['HTTP_HOST'], -4) == '.dev' ? 'dev' : 'prod');
?>