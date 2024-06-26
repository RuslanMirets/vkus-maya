import Swiper from "swiper";
import {
	Navigation,
	Pagination,
	EffectFade,
	FreeMode,
	Autoplay,
} from "swiper/modules";

Swiper.use([Navigation, Pagination, EffectFade, FreeMode, Autoplay]);

// Webp check
(function () {
	const webpCheck = (callback) => {
		var webP = new Image();
		webP.onload = webP.onerror = () => {
			callback(webP.height == 2);
		};
		webP.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	};

	webpCheck((support) => {
		if (support == true) {
			document.querySelector("html").classList.add("webp");
		} else {
			document.querySelector("html").classList.add("no-webp");
		}
	});
})();

// Mobile check
(function () {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(userAgent)) {
		document.querySelector("html").classList.add("page--android");
		return "Android";
	}

	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		document.querySelector("html").classList.add("page--ios");
		return "iOS";
	}

	return "unknown";
})();

// Disable and enable scroll
let scrollPosition;
const disableScroll = () => {
	scrollPosition = window.scrollY;

	const fixBlocks = document?.querySelectorAll(".fixed-block");
	const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;
	fixBlocks.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	});

	document.body.style.paddingRight = paddingOffset;
	document.body.classList.add("dis-scroll");
	document.body.dataset.position = scrollPosition;
	document.body.style.top = `-${scrollPosition}px`;
};
const enableScroll = () => {
	const fixBlocks = document?.querySelectorAll(".fixed-block");
	fixBlocks.forEach((el) => {
		el.style.paddingRight = "0px";
	});
	document.body.style.paddingRight = "0px";

	document.body.style.top = "auto";
	document.body.classList.remove("dis-scroll");
	window.scrollTo({ top: parseInt(scrollPosition, 10), left: 0 });
	document.body.removeAttribute("data-position");
};

// Modal
(function () {
	const showModal = (overlay) => {
		overlay.classList.add("modal-overlay--active");
		disableScroll();
	};

	const closeModal = (overlay) => {
		overlay.classList.remove("modal-overlay--active");
		enableScroll();
	};

	const openButtons = document.querySelectorAll("[data-modal-path]");

	openButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const target = button.getAttribute("data-modal-path");

			if (target) {
				const modal = document.querySelector(`[data-modal-target="${target}"]`);
				const overlay = modal.querySelector(".modal-overlay");
				const closeButton = modal.querySelector(".modal-close");

				showModal(overlay);

				window.onclick = function (event) {
					if (event.target == overlay) {
						closeModal(overlay);
					}
				};

				closeButton?.addEventListener("click", (e) => {
					closeModal(overlay);
				});

				document.addEventListener("keydown", (e) => {
					if (e.key === "Escape") {
						closeModal(overlay);
					}
				});
			}
		});
	});
})();

// Call modal form
(function () {
	const forms = document.querySelectorAll(".call-modal");

	forms.forEach((form) => {
		const info = form.querySelector(".form-modal__info");
		const success = form.querySelector(".form-modal__success");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			// const formData = new FormData(e.target);
			// const formProps = Object.fromEntries(formData);
			// console.log(formProps);

			info.classList.remove("form-modal__info--active");
			success.classList.add("form-modal__success--active");
		});

		const successButtons = form.querySelector(".form-modal__success-button");
		successButtons.addEventListener("click", (e) => {
			info.classList.add("form-modal__info--active");
			success.classList.remove("form-modal__success--active");
		});
	});
})();

// Price list modal form
(function () {
	const forms = document.querySelectorAll(".price-list-modal");

	forms.forEach((form) => {
		const info = form.querySelector(".form-modal__info");
		const success = form.querySelector(".form-modal__success");
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			info.classList.remove("form-modal__info--active");
			success.classList.add("form-modal__success--active");
		});

		const successButtons = form.querySelector(".form-modal__success-button");
		successButtons.addEventListener("click", (e) => {
			info.classList.add("form-modal__info--active");
			success.classList.remove("form-modal__success--active");
		});
	});
})();

// Header sticky
(function () {
	const header = document.querySelector(".header");

	window.addEventListener("scroll", (e) => {
		header.classList.toggle("header--sticky", window.scrollY > 0);
	});
})();

// Burger
(function () {
	const header = document.querySelector(".header");
	const burger = document?.querySelector("[data-burger]");
	const menu = document?.querySelector("[data-menu]");

	burger?.addEventListener("click", (e) => {
		header.classList.toggle("header--shadow");
		burger?.classList.toggle("burger--active");
		menu?.classList.toggle("menu--active");

		if (menu.classList.contains("menu--active")) {
			disableScroll();
		} else {
			enableScroll();
		}
	});

	const submenuLinks = document.querySelectorAll(".menu a");

	submenuLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			const clickedElement = e.target;
			const parentContainsClickedElement = link.contains(clickedElement);

			if (parentContainsClickedElement) {
				if (clickedElement === link && link.contains(clickedElement)) {
					header.classList.remove("header--shadow");
					const submenu = link.closest(".menu");
					submenu.classList.remove("menu--active");
					burger?.classList.remove("burger--active");
					enableScroll();
				}
			}
		});
	});

	function removeActiveClassesOnLargeScreen() {
		const screenWidth = window.innerWidth;
		const largeScreenWidth = 1200;

		if (screenWidth >= largeScreenWidth) {
			header.classList.remove("header--shadow");
			menu.classList.remove("menu--active");
			burger?.classList.remove("burger--active");
			enableScroll();
			document.querySelectorAll(".menu__submenu").forEach((submenu) => {
				submenu.classList.remove("menu__submenu--active");
			});
		}
	}

	window.addEventListener("load", removeActiveClassesOnLargeScreen);
	window.addEventListener("resize", removeActiveClassesOnLargeScreen);
})();

// Mobile submenu
(function () {
	const submenuButtons = document?.querySelectorAll(".menu__arrow");

	submenuButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();

			button.parentElement.nextElementSibling.classList.add(
				"menu__submenu--active"
			);

			button.parentElement.parentElement
				?.querySelector(".menu__submenu-back")
				?.addEventListener("click", (e) => {
					button?.parentElement.nextElementSibling.classList.remove(
						"menu__submenu--active"
					);
				});
		});
	});
})();

// Intro slider
(function () {
	const swiper = new Swiper(".intro__swiper", {
		slidesPerView: 1,
		spaceBetween: 0,
		effect: "fade",
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".intro__swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".intro__swiper-button-next",
			prevEl: ".intro__swiper-button-prev",
		},
	});
})();

// Category tabs
(function () {
	const tabs = document.querySelector(".tabs-products");
	const tabsButton = document.querySelectorAll(".tabs-products__button");
	const tabsContent = document.querySelectorAll(".tabs-products__content");

	if (tabs) {
		tabs.addEventListener("click", (e) => {
			if (e.target.classList.contains("tabs-products__button")) {
				const tabsPath = e.target.dataset.tabsPath;
				tabsButton.forEach((el) => {
					el.classList.remove("tabs-products__button--active");
				});
				document
					.querySelector(`[data-tabs-path="${tabsPath}"]`)
					.classList.add("tabs-products__button--active");
				tabsHandler(tabsPath);
			}
		});

		const tabsHandler = (path) => {
			tabsContent.forEach((el) => {
				el.classList.remove("tabs-products__content--active");
			});
			document
				.querySelector(`[data-tabs-target="${path}"]`)
				.classList.add("tabs-products__content--active");
		};
	}
})();

// Tabs products swiper
(function () {
	new Swiper(".tabs-products__swiper", {
		slidesPerView: 2,
		spaceBetween: 24,
		pagination: {
			el: ".tabs-products__swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".tabs-products__swiper-button-next",
			prevEl: ".tabs-products__swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 57,
			},
		},
	});
})();

// History swiper
(function () {
	new Swiper(".history__swiper", {
		slidesPerView: 2,
		spaceBetween: 0,
		freeMode: true,
		pagination: {
			el: ".history__swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".history__swiper-button-next",
			prevEl: ".history__swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 6,
			},
		},
	});
})();
