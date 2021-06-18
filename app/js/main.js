window.addEventListener('DOMContentLoaded', () => {
	let menuBtn = function () {
		let burger = document.querySelector('.header__nav-btn');
		let menu = document.querySelector('.header-mobile');
		let menuLinks = document.querySelectorAll('.header-mobile-menu__link');

		burger.addEventListener('click', () => {
			menu.classList.toggle('active');
			burger.classList.toggle('active');

			menuLinks.forEach((link) => {
				link.addEventListener('click', () => {
					menu.classList.remove('active');
					burger.classList.remove('active');
					document.body.style.overflow = '';
				});
			});
			// Блокировать прокрутку экрана при активном Меню
			if (menu.classList.contains('active')) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		});
	};

	let modalCalc = () => {
		let furnitureHeader = document.querySelectorAll('.furniture-cards__header');
		let furnitureBtn = document.querySelectorAll('.furniture-cards__btn');
		let modalImg = document.querySelector('.modal-cal__img');
		let modalText = document.querySelector('.modal-calc__text');

		function modalInner(target) {
			for (let i = 0; i < furnitureHeader.length; i++) {
				if (furnitureHeader[i].dataset.id == target) {
					switch (furnitureHeader[i].dataset.id) {
						case 'ldsp':
							modalText.innerHTML = 'Кухни из ЛДСП';
							modalImg.src = 'img/furniture/ldsp.jpg';
							break;
						case 'mdf':
							modalText.innerHTML = 'Кухни из МДФ';
							modalImg.src = 'img/furniture/mdf.jpg';
							break;
						case 'emal':
							modalText.innerHTML = 'Кухни покрытые эмалью';
							modalImg.src = 'img/furniture/emal.jpg';
							break;
						case 'blum':
							modalText.innerHTML = 'Кухни с фурнитурой Blum';
							modalImg.src = 'img/furniture/blum.jpg';
							break;
						case 'het':
							modalText.innerHTML = 'Кухни с фурнитурой Hettich';
							modalImg.src = 'img/furniture/hettich.png';
							break;
						case 'boyard':
							modalText.innerHTML = 'Кухни с фурнитурой BOYARD';
							modalImg.src = 'img/furniture/boyard.png';
							break;
					}
				}
			}
		}
		modalInner();

		furnitureBtn.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				const target = event.target.dataset.id;
				modalInner(target);
			});
		});
	};

	let modal = () => {
		let connectBtn = document.querySelectorAll('.modal-open');
		connectBtn.forEach((btn) => {
			btn.addEventListener('click', () => {
				if (btn.dataset.connect == 'calc') {
					openModal('.modal--calc');
				} else if (btn.dataset.connect == 'callback') {
					openModal('.modal--callback');
				}
			});
		});
		function openModal(window) {
			let modalWindow = document.querySelector(window);
			modalWindow.style.opacity = 1;
			modalWindow.style.visibility = 'visible';
			document.body.style.overflow = 'hidden';
		}
		function closeModal(window) {
			window.style.opacity = 0;
			window.style.visibility = 'hidden';
			document.body.style.overflow = '';
		}
		document.addEventListener('click', (event) => {
			let target = event.target;
			if (target.classList.contains('modal__close') || target.classList.contains('modal__overlay')) {
				let parent = target.closest('.modal');
				closeModal(parent);
				document.body.style.overflow = '';
			}
		});
	};
	modal();
	menuBtn();
	modalCalc();

	// Input Masks
	// VMasker(document.querySelectorAll('input[type="tel"]')).maskPattern('+9 (999) 999-99-99');

	// let animatedItem = document.querySelectorAll('.animate__animated');
	// animatedItem.forEach((item) => {
	// 	item.style.opacity = 0;
	// 	let effect = item.dataset.effect;
	// 	var waypoint = new Waypoint({
	// 		element: item,
	// 		handler: function (direction) {
	// 			if (effect === 'fadeInUp') {
	// 				item.classList.add('animate__fadeInUp');
	// 			} else if (effect === 'fadeInLeft') {
	// 				item.classList.add('animate__fadeInLeft');
	// 			} else if (effect === 'fadeInRight') {
	// 				item.classList.add('animate__fadeInRight');
	// 			} else if (effect === 'flipInX') {
	// 				item.classList.add('animate__flipInX');
	// 				item.style.opacity = 1;
	// 			} else if (effect === 'zoomIn') {
	// 				item.classList.add('animate__zoomIn');
	// 				item.style.opacity = 1;
	// 			} else if (effect === 'pulse') {
	// 				item.classList.add('animate__pulse');
	// 				item.style.opacity = 1;
	// 			}
	// 		},
	// 		offset: '75%',
	// 	});
	// });

	// Табы в блоке Services
	// function tabs(tabsSelector) {
	// 	const tabs = document.querySelectorAll(tabsSelector),
	// 		tabsContent = document.querySelectorAll('.description__item'),
	// 		tabsParent = document.querySelector('#services__tabs');

	// 	function hideTabsContent() {
	// 		tabsContent.forEach((content) => {
	// 			content.style.display = 'none';
	// 		});

	// 		tabs.forEach((item) => {
	// 			item.classList.remove('services__tabs-item--active');
	// 		});
	// 	}

	// 	function showTabs(i = 0) {
	// 		tabsContent[i].style.display = 'block';
	// 		tabs[i].classList.add('services__tabs-item--active');
	// 	}

	// 	hideTabsContent();
	// 	showTabs();

	// 	tabsParent.addEventListener('click', (event) => {
	// 		const target = event.target;

	// 		if (target && target.classList.contains(tabsSelector.slice(1))) {
	// 			tabs.forEach((item, i) => {
	// 				if (target == item) {
	// 					hideTabsContent();
	// 					showTabs(i);
	// 				}
	// 			});
	// 		}
	// 	});
	// }
	// tabs('.services__tabs-item');
});
