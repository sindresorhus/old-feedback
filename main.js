/* eslint-env browser, jquery */

window.sk=window.sk||function(){(sk.q=sk.q||[]).push(arguments)};

(() => {
	const icons = {
		'Dato': 'https://sindresorhus.com/assets/dato/icon.png',
		'Gifski': 'https://sindresorhus.com/assets/gifski/icon.png',
		'Kap': 'https://sindresorhus.com/assets/kap/icon.png',
		'Black Out': 'https://sindresorhus.com/assets/black-out/icon.png',
		'HEIC Converter': 'https://sindresorhus.com/assets/heic-converter/icon.png',
		'Shareful': 'https://sindresorhus.com/assets/shareful/icon.png',
		'Lungo': 'https://sindresorhus.com/assets/lungo/icon.png',
		'Touch Bar Simulator': 'https://sindresorhus.com/touch-bar-simulator/assets/images/logo.png',
		'Battery Indicator': 'https://sindresorhus.com/assets/battery-indicator/icon.png',
		'Caprine': 'https://sindresorhus.com/caprine/images/Icon.png',
		'Blear': 'https://sindresorhus.com/assets/blear/icon.png',
		'Plash': 'https://sindresorhus.com/assets/plash/icon.png',
		'Pasteboard Viewer': 'https://sindresorhus.com/assets/pasteboard-viewer/icon.png',
		'Jiffy': 'https://sindresorhus.com/assets/jiffy/icon.png'
	};

	const repoUrls = {
		'Gifski': 'https://github.com/sindresorhus/Gifski',
		'Shareful': 'https://github.com/sindresorhus/Shareful',
		'Plash': 'https://github.com/sindresorhus/Plash',
		'Pasteboard Viewer': 'https://github.com/sindresorhus/Pasteboard-Viewer'
	};

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
		const product = params.get('product');
		const title = `Feedback for ${product}`;

		$('#main h1').text(title);
		$('title').text(title);

		if (icons[product]) {
			$('#app-icon').css('display', 'flex').attr('src', icons[product]);
		}

		if (product in repoUrls) {
			const repoUrl = repoUrls[product];
			const searchParams = new URLSearchParams();
			searchParams.append('body', `
<!--
Provide your feedback below. Include as many details as possible.
-->



---
${params.get('metadata') || ''}
			`.trim());

			const url = `${repoUrl}/issues/new?${searchParams}`;

			$('#additional-info').show().html(`
				If you have a GitHub user, <a href="${url}">open an issue on the repo</a> instead.
			`);
		}
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

	const getSubject = () => {
		// Note: Intentionally not using template strings
		// here as CloudFlare removes space inside them...
		const product = params.has('product') ? (': ' + params.get('product')) : '';
		const message = form.find('[name="message"]').val().slice(0, 100);
		return 'Feedback' + product + ' - ' + message;
	};

	sk('form', '#feedback-form', {
		id: '374a60e0f07a',
		data: {
			_subject: getSubject
		},
		onSuccess() {
			$('#main').html('<h1 class="title is-2">Thanks for the feedback!</h1><p>You will now be redirected to my website.');

			setTimeout(() => {
				window.location.href = 'https://sindresorhus.com';
			}, 3000);
		}
	});
})();

// For the imported navbar
(() => {
	// Burger menu toggle
	$(document).on('click', '.navbar-burger', () => {
		$('.navbar-burger, .navbar-menu').toggleClass('is-active');
	});
})();
