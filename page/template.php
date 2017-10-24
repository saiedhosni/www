<!doctype html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />
		<meta name="robots" content="all" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
		<meta name="keywords" content="studio, motio, interactive, design, creative, web, motion, digital, development" />
		<meta name="description" content="<?php echo METADATA[PAGE][1] ?? ''; ?>" />
		<meta name="author" content="Studio Motio, Copyright (c) 2017" />
		<meta name="geo.placename" content="La Rochelle, Charente-Maritime, France" />
		<meta name="application-name" content="Studio Motio" />
		<meta name="theme-color" content="#000" />
		<title><?php echo METADATA[PAGE][0] ?? ''; ?></title>
		<link rel="icon" href="/picture/favicon.ico" type="image/x-icon" />
		<link rel="preload" href="/style/foundation.min.css" as="style" onload="this.rel='stylesheet'" />
		<link type="text/css" rel="stylesheet" media="all" href="/style/foundation.min.css" />
		<link type="text/css" rel="stylesheet" media="all" href="/style/default.min.css" />
		<link rel="preload" href="/font/sailec-thin.woff" as="font" type="font/woff" />
		<link rel="preload" href="/font/sailec-thin.ttf" as="font" type="font/ttf" />
		<link rel="preload" href="/font/sailec-light.woff" as="font" type="font/woff" />
		<link rel="preload" href="/font/sailec-light.ttf" as="font" type="font/ttf" />
		<link rel="preload" href="/font/sailec-bold.woff" as="font" type="font/woff" />
		<link rel="preload" href="/font/sailec-bold.ttf" as="font" type="font/ttf" />
		<?php
			if (ENVIRONMENT == 'prod') {
		?>
		<script type="text/javascript">(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-90171753-1', 'auto');ga('send','pageview');</script>
		<?php
			}
		?>
	</head>
	<body>
		<?php
			require_once 'module/header.php';
			require_once 'module/media.php';
			require_once PATH;
			require_once 'module/footer.php';
		?>
	</body>
	<script type="text/javascript" src="/javascript/mo.min.js"></script>
	<script type="text/javascript" src="/javascript/script.min.js"></script>
</html>