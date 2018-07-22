/* eslint-env browser, jquery */
(() => {
	if (window.location.search === '?success') {
		$('#main').html('<h1 class="title is-2">Thanks for the feedback!</h1><p>You will now be redirected to my website.');

		setTimeout(() => {
			window.location.href = 'https://sindresorhus.com';
		}, 3000);
	}

	// Borrow the navbar from the main site
	$('#nav-container').load('https://sindresorhus.com/contact .hero-head', () => {
		$('#nav-container').toggleClass('visible');
	});

	// Form validation
	$('button[type="submit"]').on('click', event => {
		$(event.target)
			.closest('form')
			.find('[required]')
			.addClass('required');
	});

	const params = new URL(location.href).searchParams;

	if (params.has('product')) {
		const title = `Feedback for ${params.get('product')}`;
		$('#main h1').text(title);
		$('title').text(title);
	}

	const form = $('#feedback-form');

	// Include all the existing search params
	for (const [key, value] of params) {
		if (key === 'nameField') {
			form.find('[name="name"]').val(value);
			continue;
		}

		if (key === 'emailField') {
			form.find('[name="email"]').val(value);
			continue;
		}

		if (key === 'messageField') {
			form.find('[name="message"]').val(value).get(0).setSelectionRange(0, 0);
			continue;
		}

		if (key === 'extraInfo') {
			form.append(
				$(`<textarea style="display:none" readonly name="${key}"></textarea>`).text(value)
			);
			continue;
		}

		form.append(
			$(`<input type="hidden" name="${key}">`).val(value)
		);
	}

	form.on('submit', () => {
		// Note: Intentionally not using template strings
		// here as CloudFlare removes space inside them...
		const product = params.has('product') ? (': ' + params.get('product')) : '';
		const message = form.find('[name="message"]').val().slice(0, 100);
		const subject = 'Feedback' + product + ' - ' + message;
		form.prepend(
			$(`<input type="hidden" name="_subject">`).val(subject)
		);
	});
})();

// For the imported navbar
(() => {
	// Burger menu toggle
	$(document).on('click', '.navbar-burger', () => {
		$('.navbar-burger, .navbar-menu').toggleClass('is-active');
	});
})();
