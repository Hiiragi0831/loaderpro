import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

export const slider = () => {
    if (document.querySelector(".slider__logo")) {
        const logo = new Swiper('.slider__logo .swiper', {
            modules: [Pagination],
            spaceBetween: 7,
            pagination: {
                el: '.slider__logo .swiper-pagination',
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
    }
}
