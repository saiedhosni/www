<footer class="row column expanded white">
	<div class="row">
		<div class="column large-4 large-offset-2">
			<p class="no-margin"><strong><?php echo LANGUAGE == 'fr' ? 'Alors, on travaille ensemble ?' : 'So, do we work together?'; ?></strong></p>
			<a href="<?php echo LANGUAGE == 'fr' ? '/contact' : '/en/contact'; ?>" class="underline button big">
				<svg><use xlink:href="/picture/sprite.svg#arrow-right" /></svg><?php echo LANGUAGE == 'fr' ? 'Briefez nous !' : 'Brief us!'; ?>
			</a>
		</div>
		<div class="column">
			<svg class="logo"><use xlink:href="/picture/sprite.svg#logo-studiomotio" /></svg>
			<address>
				<p class="no-margin">17000 La Rochelle<?php echo LANGUAGE == 'en' ? ' &ndash; France' : ''; ?></p>
				<p class="no-margin"><a href="mailto:hello@studiomotio.com" target="_blank" class="underline">hello@studiomotio.com</a></p>
			</address>
		</div>
	</div>
	<div class="row">
		<div class="column large-offset-6 shrink">
			<p><small>Copyright Studio MOTIO &reg; &ndash; <?php echo LANGUAGE == 'fr' ? '<a href="/mentions-legales" class="underline">Mentions légales</a>' : '<a href="/en/legal-notices" class="underline">Legal notices</a>'; ?></small></p>
		</div>
	</div>
</footer>