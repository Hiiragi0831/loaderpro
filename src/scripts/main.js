// не трогать этот импорт, он нужен для работы css
// можно добавить несколько файлов, они будут работать независимо друг от друга
import '@styles/vendor.scss';
import '@styles/main.scss';

import {vhFix} from '@scripts/vendor/vh-fix';
import {lazyLoading} from '@scripts/modules/lazyLoading';
import {slider} from "@components/slider/slider";
import {tab} from "@components/tabs/tabs";
import {header} from "@components/header/header";
import {modal} from "@components/modal/modal";
import {initMaps} from '@scripts/modules/map/main';
import {animate} from '@components/animate/animate';
import {initQty} from '@components/field-num/field-num';

import 'fslightbox';

vhFix();
lazyLoading();
slider();
tab();
header();
modal();
animate();
initQty();

if (document.querySelector(".map-geography")) {
    // initMaps();
}
