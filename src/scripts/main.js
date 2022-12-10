// не трогать этот импорт, он нужен для работы css
// можно добавить несколько файлов, они будут работать независимо друг от друга
import '@styles/vendor.scss';
import '@styles/main.scss';

import '@scripts/utils/helpers';
import '@scripts/modules/social';
import {vhFix} from '@scripts/vendor/vh-fix';
import {actualYear} from '@scripts/modules/actualYear';
// import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';
import lazyLoading from '@scripts/modules/lazyLoading';
import header from '@components/header/header';
import {app} from '@components/app/app';

vhFix();
actualYear();
// objectFitImages();
// objectFitVideos();
lazyLoading.init();
header.init();
app();
