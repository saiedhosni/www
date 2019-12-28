<?php
  if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
<!doctype html>
<html lang="<?php echo LANGUAGE; ?>">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="all" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content="studio, motio, interactive, design, creative, web, motion, digital, development" />
    <meta name="description" content="<?php echo METADATA[PAGE][1] ?? ''; ?>" />
    <meta name="author" content="Studio MOTIO, Copyright (c) 2019" />
    <meta name="geo.placename" content="La Rochelle, Charente-Maritime, France" />
    <meta name="application-name" content="Studio MOTIO" />
    <meta name="theme-color" content="#000" />
    <title><?php echo METADATA[PAGE][0] ?? ''; ?></title>
    <link rel="icon" href="/picture/favicon.ico" type="image/x-icon" />
    <link type="text/css" rel="stylesheet" media="all" href="/style/default<?php echo ENVIRONMENT == 'prod' ? '.min' : ''; ?>.css" />
    <link rel="prefetch" href="/font/sailec-thin.woff" />
    <link rel="prefetch" href="/font/sailec-light.woff" />
    <link rel="prefetch" href="/font/sailec-bold.woff" />
  </head>
  <body id="barba-wrapper" data-page="<?php echo NAME; ?>" data-color="<?php echo NAME == 'index' || NAME == 'services' ? 'base' : 'contrast'; ?>">
    <div class="preload"></div>
    <?php
      require_once 'layout/header.php';
      require_once 'layout/media.php';
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
    require_once 'layout/footer.php';
  ?>
</main>
<?php
  if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
    <div class="dot"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="5.15"/></svg></div>
    <script src="/javascript/app<?php echo ENVIRONMENT == 'prod' ? '.min' : ''; ?>.js"></script>
  </body>
</html>
<?php
  }
?>
