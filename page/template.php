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
		<meta name="author" content="Studio MOTIO, Copyright (c) 2018" />
		<meta name="geo.placename" content="La Rochelle, Charente-Maritime, France" />
		<meta name="application-name" content="Studio MOTIO" />
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
				$gtag = '';

				if (NAME == '404') {
					$gtag .= "gtag('config','UA-90171753-1',{";
					$gtag .= "'page_title':'" . (METADATA[PAGE][0] ?? '') . "',";
					$gtag .= "'page_location':'https://www.studiomotio.com" . (LANGUAGE == 'fr' ? "/404" : "/en/404") . "',";
					$gtag .= "'page_path':'" . (LANGUAGE == 'fr' ? "/404'" : "/en/404'");
					$gtag .= "});";
				} else {
					$gtag = "gtag('config','UA-90171753-1')";
				}
		?>
		<script type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=UA-90171753-1" async></script><script type="text/javascript">window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());<?php echo $gtag; ?></script>
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
		<a href="https://www.cssdesignawards.com/sites/studio-motio/32875" target="_blank" class="wotd" rel="nofollow">
			<svg viewBox="0 0 120 120"><ellipse cx="60" cy="60" rx="59.5" ry="59.7" fill="none"/><path d="M43.6 58.1l.7.1.7.3.5-1.3a4 4 0 0 0-1.9-.4 3 3 0 0 0-1.6.4c-.5.3-.8.6-1 1.1-.2.5-.4 1-.4 1.7 0 1 .2 1.8.7 2.4.5.5 1.2.8 2.1.8.7 0 1.2-.1 1.7-.3v-1.4l-.8.3-.8.1c-.9 0-1.4-.6-1.4-1.8 0-.6.1-1 .3-1.3.5-.5.8-.7 1.2-.7zM51 61.7l-.9-.1-1-.4v1.5l.9.3 1 .1 1.3-.2c.4-.2.6-.4.8-.7.2-.3.3-.6.3-1s-.1-.8-.3-1c-.2-.3-.6-.5-1.1-.8l-1-.5-.2-.3.1-.3.5-.1c.4 0 .9.1 1.5.4l.5-1.3c-.7-.3-1.3-.4-2-.4s-1.3.2-1.7.5c-.4.3-.6.8-.6 1.3l.1.8.4.6c.2.2.5.4.9.5l.8.4.2.2.1.2-.2.3H51zM58.8 61.7l-.9-.1-1-.4v1.5l.9.3 1 .1 1.3-.2c.4-.2.6-.4.8-.7.2-.3.3-.6.3-1s-.1-.8-.3-1c-.2-.3-.6-.5-1.1-.8l-1-.5-.2-.3.1-.3.5-.1c.4 0 .9.1 1.5.4l.5-1.3c-.7-.3-1.3-.4-2-.4s-1.3.2-1.7.5c-.4.3-.6.8-.6 1.3l.1.8.4.6c.2.2.5.4.9.5l.8.4.2.2.1.2-.2.3h-.4zM70.3 59.8a3 3 0 0 0-.8-2.2c-.5-.5-1.3-.8-2.3-.8h-2.1V63h2c1 0 1.8-.3 2.4-.8.5-.6.8-1.4.8-2.4zm-2.1 1.4c-.2.3-.6.4-1.1.4h-.4v-3.5h.5c.5 0 .8.1 1 .4.2.3.3.7.3 1.3.1.6 0 1.1-.3 1.4zM77.8 61.8l.3 1.2h1.8l-2-6.2h-2.2l-2 6.2h1.8l.3-1.2h2zm-1.2-3.3l.1-.7.2.8.2.9.3 1h-1.3l.5-2zM68.3 52.3L61.9 46l-6.3 6.3H52L65.3 39H51.4L38 52.3h-5v.9h54.6v-.9zM33 67.5h19.2l6.2 6.2 6.3-6.2h3.4L54.9 80.6h14l6.9-6.9 6.3-6.2h5.5v-1H33zM20.8 56.6v1.7l-3.7.9-.8.2-.8.1.8.2.8.2 3.6 1v1.7l-7 1.7v-1.4l3.8-.8 1.8-.3-.8-.1-.9-.2-3.9-1.1V59l3.9-.9.8-.2.9-.1-.9-.2-.9-.2-3.8-.9v-1.4l7.1 1.5zM22.4 48.5l-1 3.9-6.7-1.7 1-3.9 1.2.3-.6 2.4 1.5.4.6-2.3 1.2.3-.6 2.3 1.7.4.6-2.4 1.1.3zM17.2 42.7l.9-2c.4-.9.8-1.5 1.3-1.8.4-.3.9-.3 1.5 0 .4.2.6.4.8.7.2.3.2.6.1.9.3-.4.6-.6.9-.6.3-.1.7 0 1.1.2.6.3.9.7 1.1 1.2s0 1.2-.3 1.9l-1.1 2.3-6.3-2.8zm3.1-.2l.4-.8c.2-.4.2-.6.2-.9 0-.2-.2-.4-.4-.5h-.6c-.2.1-.4.4-.5.8l-.3.7 1.2.7zm1 .5l1.6.8.4-.9c.2-.4.2-.7.2-.9-.1-.2-.2-.4-.5-.6-.5-.2-1 0-1.3.7l-.4.9zM28.1 34c.5.4.8.8.8 1.4s-.2 1.2-.7 1.8c-.4.6-.9 1-1.5 1.3l-1.1-.8 1.1-.7.6-.6.3-.7c0-.2-.1-.4-.3-.5L27 35l-.4.1-.9.4-1 .4c-.3.1-.5.1-.8 0-.3 0-.5-.2-.8-.4-.5-.4-.8-.8-.8-1.4 0-.5.2-1.1.6-1.7l.7-.8c.2-.3.6-.4.9-.6l.6 1.1-.8.6-.5.5c-.2.2-.2.4-.2.6 0 .2.1.4.3.5l.3.1.4-.1.9-.5c.6-.3 1.1-.5 1.5-.5l1.1.7zM31.7 32.9L26.8 28l1-1 4.9 4.9-1 1zM37.4 28l-1.2.9-3.4-4.6-1.5 1.1-.7-1 4.2-3.1.7 1-1.5 1.1 3.4 4.6zM44.9 23.8l-3.6 1.7-3-6.3 3.6-1.7.5 1.1-2.3 1.1.7 1.4 2.1-1 .5 1.1-2.1 1 .8 1.6 2.3-1.1.5 1.1zM58.7 17.4c.1 1.1-.1 2.1-.6 2.7s-1.3 1.1-2.3 1.2c-1.1.1-1.9-.1-2.5-.7s-1-1.4-1.1-2.6.1-2.1.6-2.7 1.3-1 2.3-1.2c1.1-.1 1.9.1 2.5.7s1 1.4 1.1 2.6zm-5 .5c.1.8.3 1.3.6 1.7.3.4.8.5 1.4.5 1.2-.1 1.7-1 1.5-2.5-.2-1.6-.8-2.3-2-2.2-.6.1-1 .3-1.3.7s-.3 1-.2 1.8zM63.6 21.1l-1.4-.1.7-6.9 3.9.4-.1 1.2-2.5-.3-.2 1.8 2.3.2-.1 1.2-2.3-.2-.3 2.7zM76.5 24.7l-1.3-.6 2.4-5.2-1.7-.8.5-1.1 4.8 2.2-.5 1.1-1.7-.8-2.5 5.2zM85.1 30.2l-1.2-.9 1.8-2.4-2.2-1.6-1.8 2.4-1.2-.9 4.1-5.6 1.2.9-1.6 2.2 2.2 1.6 1.6-2.2 1.2.9-4.1 5.6zM90.2 35.5l-2.7-3 5.2-4.6 2.7 3-.9.8-1.7-1.9-1.1 1 1.6 1.7-.9.8-1.6-1.7-1.3 1.2 1.7 1.9-1 .8zM100.2 46.4c-1.1.4-2 .5-2.8.1a3.8 3.8 0 0 1-1.9-2.2l-.8-1.8 6.4-2.7.8 2c.4 1 .5 2 .2 2.8a3 3 0 0 1-1.9 1.8zm-.7-1.4c1.4-.6 1.8-1.5 1.3-2.7l-.3-.7-4.2 1.7.2.6c.7 1.3 1.6 1.7 3 1.1zM98.4 54.9l1.5-.8-.4-2.5-1.7-.2-.3-1.6 7.3 1.2.3 1.8-6.4 3.6-.3-1.5zm2.7-1.4l2.4-1.2.4-.2-3.1-.4.3 1.8zM102.8 61.2l2.8 1.5v1.6l-4.2-2.4-2.7-.1v-1.5l2.7.1 4.3-2.2v1.6l-2.9 1.4z"/><g><path d="M31.5 95.9l.8-1.7-2-1.8-1.6 1-1.3-1.1 7-3.9 1.4 1.3-3 7.3-1.3-1.1zm1.4-3l1.2-2.6.2-.5-2.9 1.8 1.5 1.3zM42.8 102.7l-1.6-.8.8-4 .2-.9.3-.9-.5.7-.6.7-2.7 3.1-1.6-.8 1.6-7.6 1.4.7-1 4.1-.6 1.9.5-.7.6-.8 2.9-3.3 1.3.7-.9 4.3-.2.9-.3 1 .6-.8.6-.8 2.7-3.2 1.4.7-4.9 5.8zM53.2 105.5l-.2-1.9-2.7-.5-.9 1.7-1.7-.3 4-6.9 1.9.4 1.2 7.9-1.6-.4zm-.3-3.2l-.3-2.9v-.5l-1.6 3 1.9.4zM60.5 103.1l.1 2.9H59l-.3-7.5 2.2-.1c1 0 1.8.1 2.3.5s.8.9.8 1.7l-.3 1.2c-.2.4-.6.6-1 .8a54 54 0 0 1 2.3 3.2l-1.8.1-1.9-2.8h-.8zm-.1-1.3h.5c.5 0 .9-.1 1.1-.3s.3-.4.3-.8-.1-.6-.4-.7l-1.1-.2h-.5l.1 2zM74 99.8c.3 1.2.2 2.2-.2 3s-1.4 1.4-2.7 1.8l-2 .6-2-7.2 2.3-.6c1.2-.3 2.2-.3 3 .2.7.3 1.3 1 1.6 2.2zm-1.6.4c-.4-1.6-1.3-2.1-2.7-1.8l-.8.2 1.3 4.7.7-.2c1.5-.3 2-1.3 1.5-2.9zM83.1 99.5l-3.8 2.1-3.6-6.6 3.8-2.1.6 1.1-2.4 1.3.8 1.5 2.2-1.2.6 1.1-2.2 1.2.9 1.7 2.4-1.3.7 1.2zM89.2 89.9c.8.9 1.2 1.9 1.1 2.8-.1 1-.6 1.9-1.6 2.7L87 96.9l-5-5.7 1.8-1.5c.9-.8 1.8-1.2 2.8-1.1.9 0 1.8.4 2.6 1.3zM87.9 91c-1.1-1.2-2.1-1.4-3.2-.4l-.6.6 3.2 3.7.5-.4c1.2-1.1 1.2-2.2.1-3.5z"/></g></svg>
		</a>
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
		<?php
			if (ENVIRONMENT == 'prod') {
		?>
		<script type="text/javascript" src="/javascript/app.min.js"></script>
		<?php
			} else {
		?>
		<script type="text/javascript" src="/javascript/mo.min.js"></script>
		<script type="text/javascript" src="/javascript/barba.min.js"></script>
		<script type="text/javascript" src="/javascript/emergence.min.js"></script>
		<script type="text/javascript" src="/javascript/typeit.min.js"></script>
		<script type="text/javascript" src="/javascript/smooth-scrolling.min.js"></script>
		<script type="text/javascript" src="/javascript/script.min.js"></script>
		<?php
			}
		?>
	</body>
</html>
<?php
	}
?>