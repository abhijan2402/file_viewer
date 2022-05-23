const resizeImg = (event, img) => {
  var resize = 150; // resize amount in percentage
  var origH = img.clientHeight; // original image height
  var origW = img.clientWidth; // original image width
  var mouseX = event.x;
  var mouseY = event.y;
  var newH = origH * (resize / 100) + "px";
  var newW = origW * (resize / 100) + "px";

  // Set the new width and height
  img.style.height = newH;
  img.style.width = newW;

  var c = img.parentNode;

  // Work out the new center
  c.scrollLeft = mouseX * (resize / 100) - newW / 2 / 2;
  c.scrollTop = mouseY * (resize / 100) - newH / 2 / 2;
};

const resizePDF = (event, canvasList) => {
  //
};

export { resizeImg };
