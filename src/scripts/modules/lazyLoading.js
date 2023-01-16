import lazySizes from 'lazysizes';

export const lazyLoading = () => {
    lazySizes.cfg.lazyClass = 'js-lazy';
    lazySizes.cfg.preloadAfterLoad = true;
};
