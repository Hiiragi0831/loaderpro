import helpers from '@scripts/utils/helpers';
import template from './app-template.pug';

function render (container) {
    if (helpers.isDevices()) {
        return container.innerHTML = template({device: helpers.isDevices()});
    }

    return container.innerHTML = template({device: 'desktop'});
}

export function app () {
    const appRootContainer = document.querySelector('.app-js');

    render(appRootContainer);

    helpers.$window.on('resize.helpers', () => {
        setTimeout(() => {
            render(appRootContainer);
        }, 300);
    });
}
