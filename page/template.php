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
		<link rel="icon" href="picture/favicon.ico" type="image/x-icon" />
		<link type="text/css" rel="stylesheet" media="all" href="/style/style.min.css" />
	</head>
	<body>
		<?php
			require_once 'module/header.php';
			require_once PATH;
			require_once 'module/footer.php';
		?>
	</body>
</html>