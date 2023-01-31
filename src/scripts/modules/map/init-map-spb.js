import {initCustomPin} from './init-custom-pin';

const mediaPoint = window.matchMedia('(max-width: 1023px)');
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const touchMediaPoint = window.matchMedia('(pointer: coarse)');

let myMap;
let mapCenter;
let mapZoom;
let behaviorsMap;

const init = (map) => {
  myMap = new window.ymaps.Map(map, {
    center: mapCenter,
    zoom: mapZoom,
    controls: [],
    behaviors: behaviorsMap,
  }, {
    suppressMapOpenBlock: true,
  });

  initCustomPin(myMap, map);
};

const breakpointChecker = () => {
  const mapEls = document.querySelectorAll('[data-map="spb"]');

  if (!mapEls.length) {
    return;
  }

  if (mediaPoint.matches) {
    if (myMap) {
      myMap.destroy();
    }
  } else {
    if (myMap) {
      myMap.destroy();
    }
  }

  mapEls.forEach((mapEl) => {
    window.ymaps.ready(() => {
      if (mediaPoint.matches) {
        mapCenter = mapEl.dataset.mapPlaceCords.split(',');
        behaviorsMap = ['multiTouch'];
        mapZoom = 17;
        init(mapEl);
      } else {
        mapCenter = mapEl.dataset.mapPlaceCords.split(',');
        behaviorsMap = ['drag', 'multiTouch'];
        mapZoom = 17;
        init(mapEl);
      }
    });
  });
};

const initMapSpb = () => {
  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapSpb};
