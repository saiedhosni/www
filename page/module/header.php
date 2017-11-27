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
					<ul>
						<li><a href="<?php echo LANGUAGE == 'fr' ? '/le-studio' : '/en/the-studio'; ?>" class="underline">Studio</a></li>
						<!-- <li><a href="<?php echo LANGUAGE == 'fr' ? '/nos-services' : '/en/our-services'; ?>" class="underline">Services</a></li> -->
						<li><a href="<?php echo LANGUAGE == 'fr' ? '/contact' : '/en/contact'; ?>" class="underline">Contact</a></li>
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