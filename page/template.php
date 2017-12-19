<!doctype html>
<html lang="<?php echo LANGUAGE; ?>">
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
		<link type="text/css" rel="stylesheet" media="all" href="/style/foundation.min.css" />
		<link type="text/css" rel="stylesheet" media="all" href="/style/default.min.css" />
		<link rel="prefetch" href="/style/foundation.min.css" />
		<link rel="prefetch" href="/font/sailec-thin.woff" />
		<link rel="prefetch" href="/font/sailec-thin.ttf" />
		<link rel="prefetch" href="/font/sailec-light.woff" />
		<link rel="prefetch" href="/font/sailec-light.ttf" />
		<link rel="prefetch" href="/font/sailec-bold.woff" />
		<link rel="prefetch" href="/font/sailec-bold.ttf" />
		<?php
			if (ENVIRONMENT == 'prod') {
		?>
		<script type="text/javascript">(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-90171753-1', 'auto');ga('send','pageview');</script>
		<?php
			}
		?>
	</head>
	<?php
		$has_footer = !in_array(PAGE, [
			'fr/index',
			'en/index'
		]);
	?>
	<body class="<?php echo $has_footer ? 'has-footer' : '' ?>" id="barba-wrapper">
		<?php
			require_once 'module/header.php';
			require_once 'module/media.php';
		?>
		<main class="barba-container">
			<?php
				require_once PATH;

				if ($has_footer) {
					require_once 'module/footer.php';
				}
			?>
		</main>
		<script type="text/javascript" src="/javascript/mo.min.js"></script>
		<script type="text/javascript" src="/javascript/barba.min.js"></script>
		<script type="text/javascript" src="/javascript/script.min.js"></script>
	</body>
</html>