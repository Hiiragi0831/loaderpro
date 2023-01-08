export const header = () => {
    const headerComponent = document.querySelector('.header');
    const headerMobile = document.querySelector('.header-mobile');
    const bgOverflow = document.querySelector('.bg-overflow');

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
        document.getElementsByTagName('html')[0].classList.add('overflow-hidden');
    }

    const menuClose = () => {
        headerMobile.classList.remove('is-active');
        bgOverflow.classList.remove('is-active');

        setTimeout(()=> {
            bgOverflow.classList.add('is-hidden');
            document.getElementsByTagName('html')[0].classList.remove('overflow-hidden');
        }, 150);
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
