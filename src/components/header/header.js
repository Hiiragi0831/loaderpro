export const header = () => {
    const headerComponent = document.querySelector('.header');
    const headerMobile = document.querySelector('.header-mobile');
    const bgOverflow = document.querySelector('.bg-overflow');
    const html = document.getElementsByTagName('html')[0];

    function setTopPadding () {
        const w = document.documentElement.scrollTop;

        if (w > 200) {
            headerComponent.classList.add('header--black');
        } else {
            headerComponent.classList.remove('header--black');
        }
    }

    const menuOpen = () => {
        bgOverflow.classList.remove('is-hidden');
        bgOverflow.classList.add('is-active');
        headerMobile.classList.add('is-active');
        html.classList.add('overflow-hidden');
    }

    const menuClose = () => {
        headerMobile.classList.remove('is-active');
        bgOverflow.classList.remove('is-active');

        setTimeout(()=> {
            bgOverflow.classList.add('is-hidden');
            html.classList.remove('overflow-hidden');
        }, 150);
    }

    if (headerComponent.querySelector('[data-large]')) {
        const large = headerComponent.querySelector('[data-large]').parentNode;
        large.querySelector('.header__dropdown').classList.add('header__dropdown--large')
    }

    if (headerComponent && !headerComponent.classList.contains('header--black')) {
        setTopPadding();

        window.addEventListener("scroll", () => {
            setTopPadding();
        });
    }

    document.querySelector('.header__burger').addEventListener('click', () => {
        menuOpen();
    });

    document.querySelector('.header-mobile__close').addEventListener('click', () => {
        menuClose();
    });

    bgOverflow.addEventListener('click', () => {
        menuClose();
    })
}
