import {initCustomPin} from './init-custom-pin';

const mediaPoint = window.matchMedia('(max-width: 767px)');
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
  let mapEl;

  if (!mapEl) {
    return;
  }

  window.ymaps.ready(() => {
    if (mediaPoint.matches) {
      if (myMap) {
        myMap.destroy();
      }

      mapCenter = mapEl.dataset.mapPlaceCords.split(',');
      behaviorsMap = ['multiTouch'];
      mapZoom = 13;

      init(mapEl);
    } else {
      if (myMap) {
        myMap.destroy();
      }

      mapCenter = mapEl.dataset.mapPlaceCords.split(',');
      behaviorsMap = ['drag', 'multiTouch'];
      mapZoom = 13;
      init(mapEl);
    }
  });
};


const addMarkers = ({markers, mapInstance, collection, isBalloon}) => {
  const markerCollection = collection ? collection : new window.ymaps.GeoObjectCollection(null);

  const MyBalloonLayout = window.ymaps.templateLayoutFactory.createClass(
    '<div class="popover">' +
      // '<a class="close" href="#">&times;</a>' +
      // '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize]]' +
      '</div>' +
    '</div>',
    {
      build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = this.getParentElement().querySelector('.popover');

          this.applyElementOffset();

          // this._$element.find('.close')
          //     .on('click', $.proxy(this.onCloseClick, this));
      },

      applyElementOffset: function () {

        let topCoord = -this._$element.offsetHeight / 2;
        let leftCoord = this._$element.offsetWidth;

        this._$element.setAttribute("style", `top: ${topCoord}px; left: 0;`);
      },

      // onCloseClick: function (e) {
      //     e.preventDefault();

      //     this.events.fire('userclose');
      // },

      getShape: function () {
          // if(!this._isElement(this._$element)) {
          //     return MyBalloonLayout.superclass.getShape.call(this);
          // }

          // var position = this._$element.position();

          return new window.ymaps.shape.Rectangle(new window.ymaps.geometry.pixel.Rectangle([
              [this._$element.offsetLeft, this._$element.offsetTop], [
                this._$element.offsetLeft + this._$element.offsetWidth,
                  this._$element.offsetTop + this._$element.offsetHeight
              ]
          ]));
      },

      // _isElement: function (element) {
      //     return element && element[0] && element.find('.arrow')[0];
      // }
  });

  const MyBalloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
    `<div class="map-balloon">
      <h3 class="map-balloon__title">$[properties.balloonTitle]</h3>
      <div class="factoid">
        <div class="factoid__title">$[properties.balloonFactoidTitle]</div>
        <div class="factoid__status">$[properties.balloonFactoidStatus]</div>
      </div>
    </div>`
  );

  markers.forEach((marker) => {
    const balloonOptions = (marker.factoid && isMobile) ? {
      marker,
      // balloonContentBody: balloonLayout,
      balloonTitle: marker.name,
      balloonFactoidTitle: marker.factoid.title,
      balloonFactoidValue: marker.factoid.value,

    } : (marker.factoid && !isMobile) ? {
      marker,
      // balloonContentBody: balloonLayout,
      balloonTitle: marker.name,
      balloonFactoidTitle: marker.factoid.title,
      balloonFactoidStatus: marker.factoid.status,
    } : {
      marker,
    };

    let mainOptions = isMobile ? {
      iconLayout: 'default#image',
      iconImageHref: './assets/images/icons/map-pin.svg',
      iconImageSize: isMobile ? [40, 56] : [52, 74],
      iconImageOffset: [-24, -24],
      balloonCloseButton: isMobile,
      balloonOffset: isMobile ? [-102, 0] : [-125, 0],
      balloonMaxWidth: 1000,
      balloonMaxHeight: 1000,
      hideIconOnBalloonOpen: false,
      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
    } : {
      iconLayout: 'default#image',
      iconImageHref: './assets/images/icons/map-pin.svg',
      iconImageSize: isMobile ? [40, 56] : [52, 74],
      iconImageOffset: [-24, -24],
      // balloonCloseButton: isMobile,
      balloonOffset: isMobile ? [-102, 0] : [44, 4],
      balloonMaxWidth: 1000,
      balloonMaxHeight: 1000,
      hideIconOnBalloonOpen: false,
      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
    };

    if (!isBalloon) {
      mainOptions = isMobile ? {
        iconLayout: 'default#image',
        iconImageHref: './assets/images/icons/map-pin.svg',
        iconImageSize: isMobile ? [40, 56] : [52, 74],
        iconImageOffset: [-24, -24],
        balloonCloseButton: isMobile,
        balloonOffset: isMobile ? [-102, 0] : [-125, 0],
        balloonMaxWidth: 1000,
        balloonMaxHeight: 1000,
        hideIconOnBalloonOpen: false,
        balloonShadow: false,
      } : {
        iconLayout: 'default#image',
        iconImageHref: './assets/images/icons/map-pin.svg',
        iconImageSize: isMobile ? [40, 56] : [52, 74],
        iconImageOffset: [-24, -24],
        // balloonCloseButton: isMobile,
        balloonOffset: isMobile ? [-102, 0] : [44, 4],
        balloonMaxWidth: 1000,
        balloonMaxHeight: 1000,
        hideIconOnBalloonOpen: false,
        balloonShadow: false,
      };
    }

    const markerObj = new window.ymaps.Placemark(marker.coords, balloonOptions, mainOptions);

    markerCollection.add(markerObj);

    if (marker.factoid) {
      const group = markerObj.events.group();

      const breakpointCheckerInner = () => {

        if (touchMediaPoint.matches) {
          group.removeAll();
        } else {
          group.add('mouseenter', (e) => {
            markerObj.balloon.open();
          });

          group.add('mouseleave', (e) => {
            markerObj.balloon.close();
          });
        }
      }

      breakpointCheckerInner();
      touchMediaPoint.addListener(breakpointCheckerInner);
    }
  });

  mapInstance.geoObjects.add(markerCollection);
  mapInstance.setBounds(mapInstance.geoObjects.getBounds());

  return markerCollection;
};

const initMap = () => {
  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMap, addMarkers};
