<?php
  // engine configuration
  define('DEFAULT_PAGE', 'index');

  // define current environment
  define('ENVIRONMENT', substr($_SERVER['HTTP_HOST'], -6) == '.local' ? 'dev' : 'prod');

  // site metadata (suffix)
  define('META_SUFFIX', ' &ndash; Studio MOTIO &reg;');

  // site metadata (title, description)
  define('METADATA', [
    'fr/index' => [
      'Studio MOTIO &reg; &ndash; Design interactif et développement web à La Rochelle',
      'Studio de design interactif et développement web, basé à La Rochelle. Nous concevons et réalisons des solutions digitales sur mesure, dans le but d\'offrir une expérience utilisateur intuitive, moderne et de qualité.'
    ],
    'fr/le-studio' => [
      'Le studio' . META_SUFFIX,
      'Studio motio est un studio français spécialisé dans le design interactif et le développement web, basé à La Rochelle.'
    ],
    'fr/nos-services' => [
      'Nos services' . META_SUFFIX,
      'L\'art de la création, l\'animation et de l\'interaction sur mesure, au bon endroit et au bon moment, notre spécialité !'
    ],
    'fr/contact' => [
      'Contact' . META_SUFFIX,
      'Envie de nous confier votre projet, lancer un nouveau site web ou construire une identité de marque mémorable, laissez-nous un petit mot. Nous serions ravis de travailler avec vous !'
    ],
    'fr/mentions-legales' => [
      'Mentions légales' . META_SUFFIX,
      'Informations techniques et mentions légales relatives au site du studio.'
    ],
    'fr/404' => [
      'Oops!' . META_SUFFIX,
      'La page que vous recherchez est introuvable : elle a peut être été renommée, déplacée ou supprimée.'
    ],
    'en/index' => [
      'Studio MOTIO &reg; &ndash; Interactive design and creative web studio from La Rochelle',
      'France-based interactive design and creative web studio, from La Rochelle. We design and build tailor-made digital solutions, to offer intuitive, modern and quality user experience.'
    ],
    'en/the-studio' => [
      'The studio' . META_SUFFIX,
      'Studio motio is a france-based interactive design and creative web studio, from La Rochelle.'
    ],
    'en/our-services' => [
      'Our services' . META_SUFFIX,
      'The art of creation, animation and interaction tailored to the right place and the right time, our specialty!'
    ],
    'en/contact' => [
      'Contact' . META_SUFFIX,
      'Want to entrust us with your project, launch a new website or build a memorable brand identity, please leave us a note. We would be delighted to work with you!'
    ],
    'en/legal-notices' => [
      'Legal notices' . META_SUFFIX,
      'Technical information and legal notices about the studio website.'
    ],
    'en/404' => [
      'Oops!' . META_SUFFIX,
      'The page you are looking for is unavailable: it may have been renamed, moved or deleted.'
    ]
  ]);

  // swiftmailer module
  define('MAIL_SMTP', 'ssl0.ovh.net');
  define('MAIL_SMTP_PORT', 465);
  define('MAIL_USERNAME', 'roboto@studiomotio.com');
  define('MAIL_PASSWORD', '*****');
  define('MAIL_SENDER', 'Roboto');
?>
