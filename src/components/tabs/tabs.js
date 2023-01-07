export const tab = () => {
    const tabs = document.querySelectorAll('.tabs');
    if (tabs) {
        tabs.forEach((item) => {
            const titles = item.querySelectorAll('.tabs__title');
            const descriptions = item.querySelectorAll('.tabs__description');

            titles.forEach((i) => {
                i.addEventListener('click', () => {
                    titles.forEach((e) => {
                        e.classList.remove('is-active');
                    });

                    descriptions.forEach((j) => {
                        j.classList.remove('is-active');

                        if (i.dataset.item === j.dataset.item) {
                            i.classList.add('is-active');
                            j.classList.add('is-active');
                        }
                    })
                });
            });
        });
    }
}
