const renderDefaultPin = (cords, mapEl) => {
  let pinSize = [64, 64];
  let offsetPin = [-32, -32];

  return new window.ymaps.Placemark(cords, null, {
    iconLayout: 'default#image',
    iconImageHref: mapEl.dataset.iconPin,
    iconImageSize: pinSize,
    iconImageOffset: offsetPin,
    cursor: 'grab',
  });
};

const initCustomPin = (ymap, mapEl, type) => {
  const placeCords = mapEl.dataset.mapPlaceCords.split(',');

  switch (type) {
    default:
      ymap.geoObjects.add(renderDefaultPin(placeCords, mapEl));
      break;
  }
};

export {initCustomPin};
