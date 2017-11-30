<header class="row expanded collapse align-justify">
	<div class="column shrink">
		<div class="row collapse align-middle">
			<div class="column">
				<a href="<?php echo LANGUAGE == 'fr' ? '/' : '/en'; ?>">
					<svg class="logo"><use xlink:href="/picture/sprite.svg#logo-studiomotio" /></svg>
				</a>
			</div>
			<div class="column">
				<nav>
					<input type="checkbox" id="trigger" class="menu-trigger show-for-small-only">
					<label for="trigger" class="menu-button show-for-small-only"><span></span></label>
					<ul class="menu">
						<li class="<?php echo PAGE == 'fr/le-studio' || PAGE == 'en/the-studio' ? 'active' : ''; ?>"><a href="<?php echo LANGUAGE == 'fr' ? '/le-studio' : '/en/the-studio'; ?>" class="underline">Studio</a></li>
						<!-- <li><a href="<?php echo LANGUAGE == 'fr' ? '/nos-services' : '/en/our-services'; ?>" class="underline">Services</a></li> -->
						<li class="<?php echo PAGE == 'fr/contact' || PAGE == 'en/contact' ? 'active' : ''; ?>"><a href="<?php echo LANGUAGE == 'fr' ? '/contact' : '/en/contact'; ?>" class="underline">Contact</a></li>
						<li class="show-for-small-only">
							<ul class="lang">
								<li class="<?php echo LANGUAGE == 'fr' ? 'active' : ''; ?>"><a href="/" class="underline">Fr</a></li>
								<li class="<?php echo LANGUAGE == 'en' ? 'active' : ''; ?>"><a href="/en" class="underline">En</a></li>
							</ul>
							<ul class="social">
								<li><a href="https://www.facebook.com/studiomotio" target="_blank" class="underline"><svg><use xlink:href="/picture/sprite.svg#logo-facebook" /></svg></a></li>
								<li><a href="https://www.twitter.com/studiomotio" target="_blank" class="underline"><svg><use xlink:href="/picture/sprite.svg#logo-twitter" /></svg></a></li>
								<li><a href="https://www.instagram.com/studiomotio" target="_blank" class="underline"><svg><use xlink:href="/picture/sprite.svg#logo-instagram" /></svg></a></li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
	<div class="column shrink hide-for-small-only">
		<ul class="lang">
			<li class="<?php echo LANGUAGE == 'fr' ? 'active' : ''; ?>"><a href="/" class="underline">Fr</a></li>
			<li class="<?php echo LANGUAGE == 'en' ? 'active' : ''; ?>"><a href="/en" class="underline">En</a></li>
		</ul>
	</div>
</header>