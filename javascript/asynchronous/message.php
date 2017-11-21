<?php
	// security checkpoint
	if ($_SERVER['REQUEST_METHOD'] !== 'POST' && !isset($_POST['message'])) {
		return;
	}

	// includes the site configuration
	require '../../configuration.php';

	// includes swiftmailer autoloader
	require '../../api/swiftmailer/autoload.php';

	// sends the message
	try {

		// adds a small delay to the response
		sleep(2);

		// logged the swiftmailer api to the smtp server using ssl
		$transport = new Swift_SmtpTransport(MAIL_SMTP, MAIL_SMTP_PORT, 'ssl');
		$transport->setUsername(MAIL_USERNAME);
		$transport->setPassword(MAIL_PASSWORD);

		// creates a mailer instance to send the mail
		$mailer = new Swift_Mailer($transport);

		// composes the message
		$message = new Swift_Message();
		$message->setSubject('Studio MOTIO — Contact form');
		$message->setFrom([MAIL_USERNAME => MAIL_SENDER]);
		$message->setTo('hello@studiomotio.com');
		$message->setBody($_POST['message'], 'text/html');
		$message->setCharset('utf-8');
		$message->setPriority(Swift_Mime_SimpleMessage::PRIORITY_NORMAL);

		// indicates to the contact form that the message has been delivered successfully
		echo $mailer->send($message) !== false ? 'posted' : '';
	} catch(Exception $e) {

		// logs the exception
		file_put_contents(__DIR__ . '/log/message.log', date('j M Y H:i:s') . ' —— ' . $e->getMessage() . "\n", FILE_APPEND);
	}
?>