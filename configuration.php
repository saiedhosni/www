<?php
	// engine configuration
	define('DEFAULT_PAGE', 'index');
	
	// defines current environment
	define('ENVIRONMENT', substr($_SERVER['HTTP_HOST'], -4) == '.dev' ? 'dev' : 'prod');
?>