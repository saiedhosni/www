<?php
	$color = in_array(PAGE, [
		'fr/contact',
		'en/contact',
		'fr/mentions-legales',
		'en/legal-notices'
	]) ? 'black' : 'white';
?>
<footer class="row column expanded <?php echo $color; ?>">
	<div class="row align-center">
		<div class="column small-12 medium-5 medium-offset-0 large-4 large-offset-2">
			<p class="no-margin"><strong><?php echo LANGUAGE == 'fr' ? 'Alors, on travaille ensemble ?' : 'So, do we work together?'; ?></strong></p>
			<a href="<?php echo LANGUAGE == 'fr' ? '/contact' : '/en/contact'; ?>" class="underline button big">
				<svg><use xlink:href="/picture/sprite.svg#arrow-right" /></svg><?php echo LANGUAGE == 'fr' ? 'Briefez nous !' : 'Brief us!'; ?>
			</a>
		</div>
		<div class="column small-12 medium-4 large-6">
			<svg class="logo"><use xlink:href="/picture/sprite.svg#logo-studiomotio" /></svg>
			<address>
				<p class="no-margin">17000 La Rochelle<?php echo LANGUAGE == 'en' ? ', France' : ''; ?></p>
				<p class="no-margin"><a href="mailto:hello@studiomotio.com" target="_blank" class="underline">hello@studiomotio.com</a></p>
			</address>
		</div>
	</div>
	<div class="row align-center">
		<div class="column medium-9 medium-offset-0 large-offset-6 large-6">
			<p class="copyright"><small>Copyright Studio MOTIO &reg; &ndash; <?php echo LANGUAGE == 'fr' ? '<a href="/mentions-legales" class="underline">Mentions légales</a>' : '<a href="/en/legal-notices" class="underline">Legal notices</a>'; ?></small></p>
		</div>
	</div>
</footer>