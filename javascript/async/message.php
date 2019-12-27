<?php

  // security time limit of 10 seconds
  set_time_limit(10);

  // security checkpoint
  if ($_SERVER['REQUEST_METHOD'] !== 'POST' && !isset($_POST['message'])) {
    return;
  }

  // email checkpoint
  if (preg_match('/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/', $_POST['message']) == false) {
    return;
  }

  // include the site configuration
  require '../../configuration.php';

  // require the composer autoload
  require __DIR__ . '/../../vendor/autoload.php';

  // send the message
  try {

    // add a small delay to the response
    sleep(2);

    // logged the swiftmailer api to the smtp server using ssl
    $transport = new Swift_SmtpTransport(MAIL_SMTP, MAIL_SMTP_PORT, 'ssl');
    $transport->setUsername(MAIL_USERNAME);
    $transport->setPassword(MAIL_PASSWORD);

    // create a mailer instance to send the mail
    $mailer = new Swift_Mailer($transport);

    // compose the message
    $message = new Swift_Message();
    $message->setSubject('Studio MOTIO — Contact form');
    $message->setFrom([MAIL_USERNAME => MAIL_SENDER]);
    $message->setTo('hello@studiomotio.com');
    $message->setBody($_POST['message'], 'text/html');
    $message->setCharset('utf-8');
    $message->setPriority(Swift_Mime_SimpleMessage::PRIORITY_NORMAL);

    // indicate to the contact form that the message has been delivered successfully
    echo $mailer->send($message) !== false ? 'posted' : '';
  } catch(Exception $e) {
    return;
  }
?>
