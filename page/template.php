<?php
	if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
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
		<link rel="prefetch" href="/font/sailec-light.woff" />
		<link rel="prefetch" href="/font/sailec-bold.woff" />
		<?php
			if (ENVIRONMENT == 'prod') {
		?>
		<script type="text/javascript">(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create','UA-90171753-1', 'auto');ga('send','pageview');</script>
		<?php
			}
		?>
	</head>
	<body id="barba-wrapper" data-page="<?php echo NAME; ?>" data-color="<?php echo NAME == 'index' || NAME == 'services' ? 'base' : 'contrast'; ?>">
		<div class="preload"></div>
		<?php
			require_once 'module/header.php';
			require_once 'module/media.php';
		?>
<?php
	}
?>
<main class="barba-container" data-namespace="<?php echo NAME; ?>" data-title="<?php echo METADATA[PAGE][0] ?? ''; ?>">
	<div class="smooth-scroll">
	<?php
		require_once PATH;
	?>
	</div>
	<?php
		require_once 'module/footer.php';
	?>
</main>
<?php
	if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
		<div class="dot"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="5.15"/></svg></div>
		<script type="text/javascript" src="/javascript/mo.min.js"></script>
		<script type="text/javascript" src="/javascript/barba.min.js"></script>
		<script type="text/javascript" src="/javascript/emergence.min.js"></script>
		<script type="text/javascript" src="/javascript/typeit.min.js"></script>
		<script type="text/javascript" src="/javascript/smooth-scrolling.min.js"></script>
		<script type="text/javascript" src="/javascript/script.min.js"></script>
	</body>
</html>
<?php
	}
?>