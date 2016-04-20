let Raphael = require('raphael'),
    Circle = require('./circle'),
    elem = document.createElement('div'),
    ready

ready = new Promise(function (resolve, reject) {
  if (document.readyState == 'loading') {
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        setTimeout(() => resolve(), 0)
        document.onreadystatechange = undefined
      }
    }
  }
  else {
    resolve()
  }
})

ready.then(() => {
  document.body.appendChild(elem)
  document.body.style.margin = 0

  render()
})

function render() {

  window.onresize = (event) => {
  }

  let html = document.getElementsByTagName('html')[0],
      viewWidth = html.clientWidth,
      viewHeight = html.clientHeight,
      height = viewHeight,
      width = height / 2,
      amount = 100,
      container = elem,
      paper = Raphael(container, 3 * width, height)

  function drawLine(color, offset, width) {
    var circles = [],
        i = 0
    for (; i < amount; i++) {
      let circle = new Circle({paper, color, offset, width, height})
      circles.push(circle)
    }
    return circles
  }

  var circles = drawLine(Circle.C1, 0, width).concat(
    drawLine(Circle.C2, 1 * width, width)
  ).concat(
    drawLine(Circle.C3, 2 * width, width)
  )

  for (var i = 0, l = circles.length; i < l; i++) {
    var idx = Math.floor(l * Math.random())
    circles[idx].pop()
  }

  let frame = 0

  function animate() {
    circles.forEach((circle) => {
      circle.animate({frame})
    })
    frame++
    setTimeout(animate, 30)
  }

  animate()
}

