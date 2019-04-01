export default function compressImage (dataUrl) {
  return new Promise(function (resolve, reject) {
    if (!dataUrl) return
    const MAX_SIDE = 720
    const image = new Image()
    image.onload = function () {
      const imageH = image.height
      const imageW = image.width
      let picH, picW
      if (imageH > MAX_SIDE || imageW > MAX_SIDE) {
        const radio = imageH / imageW
        if (imageH >= imageW) {
          picH = MAX_SIDE
          picW = Math.round(MAX_SIDE / radio)
        } else {
          picW = MAX_SIDE
          picH = Math.round(MAX_SIDE * radio)
        }
      } else {
        picH = imageH
        picW = imageW
      }
      const mimeType = _getImageType(dataUrl)
      let r = 1
      const cvs = _getCanvas(picW * r, picH * r)
      cvs.getContext('2d').drawImage(image, 0, 0, picW * r, picH * r)
      let newImageData = cvs.toDataURL(mimeType)
      resolve(newImageData)
    }
    image.src = dataUrl
  })
}

function _getCanvas (width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function _getImageType (str) {
  let mimeType = 'image/jpeg'
  const outputType = str.match(/(image\/[\w]+)\.*/)[0]
  if (typeof outputType !== 'undefined') {
    mimeType = outputType
  }
  return mimeType
}
