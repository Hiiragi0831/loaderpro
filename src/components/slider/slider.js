import Swiper, { Pagination, Grid, Navigation, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';

export const slider = () => {
    if (document.querySelector(".slider__logo")) {
        document.querySelectorAll(".slider__logo").forEach((s) => {
            const logo = new Swiper(s.querySelector('.swiper'), {
                modules: [Pagination],
                spaceBetween: 7,
                pagination: {
                    el: s.querySelector('.swiper-pagination'),
                },
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                    },

                    1024: {
                        slidesPerView: 4,
                    }
                }
            });

            logo.init();
        })
    }

    if (document.querySelector(".slider__logo-two")) {
        const logoTwo = new Swiper('.slider__logo-two .swiper', {
            modules: [Pagination, Grid],
            pagination: {
                el: '.slider__logo-two .swiper-pagination',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    grid: {
                        rows: 3,
                    },
                },

                1024: {
                    slidesPerView: 5,
                    slidesPerColumn: 3,
                    grid: {
                        rows: 3,
                    },
                },

                1440: {
                    slidesPerView: 7,
                    grid: {
                        rows: 3,
                    },
                }
            }
        });

        logoTwo.init();
    }

    if (document.querySelector(".slider__popular")) {
        const popular = new Swiper('.slider__popular .swiper', {
            modules: [Pagination],
            spaceBetween: 7,
            pagination: {
                el: '.slider__popular .swiper-pagination',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },

                1024: {
                    slidesPerView: 4,
                }
            }
        });

        popular.init();
    }

    if (document.querySelector(".slider__video")) {
        const video = new Swiper('.slider__video .swiper', {
            modules: [Pagination],
            spaceBetween: 7,
            pagination: {
                el: '.slider__video .swiper-pagination',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },

                1024: {
                    slidesPerView: 3,
                }
            }
        });

        video.init();
    }

    if (document.querySelector(".slider__command")) {
        const command = new Swiper('.slider__command .swiper', {
            modules: [Pagination],
            spaceBetween: 7,
            pagination: {
                el: '.slider__command .swiper-pagination',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },

                1024: {
                    slidesPerView: 3,
                }
            }
        });

        command.init();
    }

    if (document.querySelector(".commodity__swiper")) {
        const commoditySwiperThumbs = new Swiper(".commodity__swiper-thumbs", {
            spaceBetween: 1,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const commoditySwiper = new Swiper(".commodity__swiper", {
            modules: [Navigation, Thumbs],
            spaceBetween: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: commoditySwiperThumbs,
            },
        });

        commoditySwiper.init();
    }
}
