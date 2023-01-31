import {addMarkers} from './init-map';
import {initMapZoom} from './init-map-zoom';

const markerIcon = '/assets/images/icons/map-pin.svg';
const markerActiveIcon = '/assets/images/icons/map-pin-active.svg';
const mediaPoint = window.matchMedia('(max-width: 1023px)');
let myMap;

const onMarkerEvent = (e) => {
  if (e.get('type') === 'mouseenter') {
    e.get('target').options.set('iconImageHref', markerActiveIcon);
  } else {
    e.get('target').options.set('iconImageHref', markerIcon);
  }
};

const addEventHandler = (markerCollection, markers) => {
  markerCollection.events.add('click', (e) => {
    const target = e.get('target');

    if (mediaPoint.matches) {
      const mapBlock = document.querySelector('.map-business');
      mapBlock.classList.add('is-active');
    }

    const id = markerCollection.toArray().findIndex((marker) => marker === target);
  });
};

const setActiveMarker = (collection, id) => {
  const collectionArr = collection.toArray();

  collectionArr.forEach((item) => {
    item.balloon.close();
    item.options.set('iconImageHref', markerIcon);
  })

  const marker = collectionArr[id];
  marker.options.set('iconImageHref', markerActiveIcon);
  marker.balloon.open();
};

const setSlideChangeHandler = (collection) => {
  const pins = document.querySelectorAll('.map-control__link');

  if (pins.length) {
    pins.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const id = (e.target.id).match(/\d+/g);

        setActiveMarker(collection, String(...id));
      })
    })
  }
};

const init = (mapEl) => {
  myMap = new window.ymaps.Map('map', {
    center: [55.57, 42.05],
    zoom: 10,
    controls: [],
    behaviors: mediaPoint.matches ? ['multiTouch'] : ['drag', 'multiTouch'],
  }, {
    searchControlProvider: 'yandex#search',
    suppressMapOpenBlock: true,
  });

  if (mapEl.hasAttribute('data-markers')) {
    const url = mapEl.getAttribute('data-markers');

    fetch(url)
        .then((response) => response.json())
        .then(({markers}) => {
          const collection = addMarkers({
            markers,
            mapInstance: myMap,
            isBalloon: true,
          });

          if (markers.length === 1) {
            collection.toArray()[0].balloon.open();
          }

          window.addEventListener('resize', (e) => {
            collection.toArray().forEach((marker) => {
              if (marker.balloon.isOpen()) {
                marker.balloon.open();
              }
            });
          });

          myMap.events.add('click', (e) => {
            e.get('target').balloon.close();
          });

          collection.toArray().forEach((marker) => {
            marker.events.add(['mouseenter', 'mouseleave'], onMarkerEvent);
          });

          addEventHandler(collection, markers);
          setSlideChangeHandler(collection);
        });
  }

  initMapZoom(myMap, mapEl);

  const objectManager = new window.ymaps.ObjectManager();
  // Загрузим регионы.
  window.ymaps.borders.load('RU', {
    lang: 'ru',
    quality: 2,
  }).then(function (result) {
    myMap.geoObjects.add(objectManager);
  });
};

const breakpointChecker = () => {
  if (myMap) {
    if (mediaPoint.matches) {
      myMap.behaviors.disable('drag');
    } else {
      myMap.behaviors.enable('drag');
    }
  }
};

const initMapGeography = () => {
  const mapEl = document.querySelector('.map-geography');

  if (!mapEl) {
    return;
  }

  window.ymaps.ready(() => {
    init(mapEl);
  });

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapGeography};
