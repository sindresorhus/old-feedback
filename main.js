/* eslint-env browser, jquery */
(function () {
	'use strict';

	// Super ugly, but who cares
	// Intentionally using older JS syntax here as I want to ensure this works
	if (window.location.search === '?success') {
		$('#main').html('<h1 class="title is-2">Thanks for the feedback!</h1><p>You will now be redirected to my website.');

		setTimeout(function () {
			window.location.href = 'https://sindresorhus.com';
		}, 3000);
	}
})();

(() => {
	'use strict';

	$('button[type="submit"]').on('click', event => {
		$(event.target)
			.closest('form')
			.find('[required]')
			.addClass('required');
	});

	const params = new URL(location.href).searchParams;

	if (params.has('product')) {
		$('#main h1 > span').text(` · ${params.get('product')}`);
	}

	const form = $('#feedback-form');

	// Include all the existing search params
	for (const [key, val] of params) {
		form.append(`<input type="hidden" name="${key}" value="${val}">`);
	}

	form.on('submit', () => {
		const product = params.has('product') ? ` · ${params.get('product')}` : '';
		const message = form.find('[name="message"]').val().slice(0, 100);
		const subject = `Feedback${product} - ${message}`;
		form.append(`<input type="hidden" name="_subject" value="${subject}">`);
	});
})();
