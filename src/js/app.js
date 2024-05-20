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

// Scrollbar width
const scrollbarWidthHandler = () => {
	const getScrollbarWidth = () => {
		const outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.position = "absolute";
		outer.style.top = "-9999px";
		document.body.appendChild(outer);

		const widthNoScroll = outer.offsetWidth;
		outer.style.overflow = "scroll";

		const inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		const widthWithScroll = inner.offsetWidth;
		document.body.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	};

	const updateScrollbarWidth = () => {
		let scrollbarWidth = getScrollbarWidth();
		console.log(scrollbarWidth);
	};

	let scrollbarWidth = getScrollbarWidth();
	window.addEventListener("load", updateScrollbarWidth);
	window.addEventListener("resize", updateScrollbarWidth);

	return scrollbarWidth;
};
const scrollbarWidth = scrollbarWidthHandler();

// Modal
(function () {
	const showModal = (overlay) => {
		document.body.classList.add("dis-scroll");
		console.log(scrollbarWidth);
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		overlay.classList.add("modal-overlay--active");
	};

	const closeModal = (overlay) => {
		document.body.classList.remove("dis-scroll");
		document.body.style.paddingRight = `0px`;
		overlay.classList.remove("modal-overlay--active");
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
						console.log(overlay);
						closeModal(overlay);
					}
				});
			}
		});
	});
})();

// Burger
(function () {
	const burger = document?.querySelector("[data-burger]");
	const menu = document?.querySelector("[data-mobile-menu]");

	burger?.addEventListener("click", (e) => {
		burger?.classList.toggle("burger--active");
		menu?.classList.toggle("mobile-menu--active");
		document.body.classList.toggle("dis-scroll");
	});

	const submenuLinks = document.querySelectorAll(".mobile-menu a");

	submenuLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			const submenu = link.closest(".mobile-menu");
			submenu.classList.remove("mobile-menu--active");
			burger?.classList.remove("burger--active");
			document.body.classList.remove("dis-scroll");
		});
	});

	function removeActiveClassesOnLargeScreen() {
		const screenWidth = window.innerWidth;
		const largeScreenWidth = 1200;

		if (screenWidth >= largeScreenWidth) {
			if (menu.classList.contains("mobile-menu--active")) {
				menu.classList.remove("mobile-menu--active");
				burger?.classList.remove("burger--active");
				document.body.classList.remove("dis-scroll");
			}
		}
	}

	window.addEventListener("load", removeActiveClassesOnLargeScreen);
	window.addEventListener("resize", removeActiveClassesOnLargeScreen);
})();

// Mobile submenu
(function () {
	const submenuButtons = document?.querySelectorAll(".mobile-menu__button");

	submenuButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			button?.nextElementSibling.classList.add("mobile-menu__submenu--active");

			button.parentElement
				?.querySelector(".mobile-menu__submenu-back")
				?.addEventListener("click", (e) => {
					button?.nextElementSibling.classList.remove(
						"mobile-menu__submenu--active"
					);
				});
		});
	});
})();

// Desktop submenu
(function () {
	const submenuButtons = document?.querySelectorAll(".menu__button");

	submenuButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			button.classList.toggle("menu__button--active");
			button?.nextElementSibling.classList.toggle("menu__submenu--active");
		});

		document.addEventListener("click", (e) => {
			const submenu = button?.nextElementSibling;
			if (!submenu.contains(e.target) && e.target !== button) {
				submenu.classList.remove("menu__submenu--active");
				button.classList.remove("menu__button--active");
			}
		});
	});

	const submenuLinks = document.querySelectorAll(".menu__submenu a");

	submenuLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			const submenu = link.closest(".menu__submenu");
			const button = submenu.previousElementSibling;
			submenu.classList.remove("menu__submenu--active");
			button.classList.remove("menu__button--active");
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
window.openCategoryTab = function openCategoryTab(event, tabId) {
	const tabs = document.getElementsByClassName("categories-products__item");
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].classList.remove("active");
	}

	event.currentTarget.classList.add("active");

	const tabContents = document.getElementsByClassName("content-products");
	for (let i = 0; i < tabContents.length; i++) {
		tabContents[i].classList.remove("active");
	}

	const tabContent = document.getElementById(tabId);
	tabContent.classList.add("active");
};

// Products swiper
(function () {
	new Swiper(".products__swiper", {
		slidesPerView: 2,
		spaceBetween: 24,
		pagination: {
			el: ".products__swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".products__swiper-button-next",
			prevEl: ".products__swiper-button-prev",
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
