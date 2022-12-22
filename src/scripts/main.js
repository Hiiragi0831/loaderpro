// не трогать этот импорт, он нужен для работы css
// можно добавить несколько файлов, они будут работать независимо друг от друга
import '@styles/vendor.scss';
import '@styles/main.scss';

import {vhFix} from '@scripts/vendor/vh-fix';
import lazyLoading from '@scripts/modules/lazyLoading';
import {slider} from "../components/slider/slider";

vhFix();
lazyLoading.init();
slider();
