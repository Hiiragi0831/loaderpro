export const modal = () => {
    const modalElement = document.querySelectorAll('[data-modal]');
    const bgOverflow = document.querySelector('.bg-overflow');
    const html = document.getElementsByTagName('html')[0];

    const modalOpen = (el) => {
        bgOverflow.classList.remove('is-hidden');
        bgOverflow.classList.add('is-active');
        el.classList.add('is-active');
        html.classList.add('overflow-hidden');
    }

    const modalClose = (el) => {
        el.classList.remove('is-active');
        bgOverflow.classList.remove('is-active');

        setTimeout(()=> {
            bgOverflow.classList.add('is-hidden');
            html.classList.remove('overflow-hidden');
        }, 150);
    }

    if (modalElement) {
        modalElement.forEach((modal) => {
            const id = modal.dataset.modal;
            const modalEl = document.querySelector(`[data-modalid="${id}"]`)

            modal.addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log(id)
                modalOpen(modalEl);
            });

            modalEl.querySelector('.modal__close').addEventListener('click', () => {
                modalClose(modalEl);
            });

            bgOverflow.addEventListener('click', () => {
                modalClose(modalEl);
            })
        })
    }
}
