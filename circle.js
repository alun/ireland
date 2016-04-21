let C1 = "#f77f00",
    C2 = "#ffffff",
    C3 = "#009e60"

function rand(length = 1) {
  return length * Math.random()
}

function randomColor(but) {
  var a = [C1, C2, C3], idx = a.indexOf(but)
  if (but && idx > -1) {
    a.splice(idx, 1)
  }
  idx = Math.floor(rand(a.length))
  return a[idx]
}

class Circle {

  constructor(args) {
    let paper = this.paper = args.paper,
        width = args.width,
        height = this.height = args.height,
        circle = this.circle = paper.circle(
          args.offset + width * Math.random(),
          args.height * Math.random(),
          height / 50 + 10 * Math.random()
        )
    this.colorize(args.color)
    circle.node.style.cursor = 'pointer'

    circle.mouseover(() => {
      if (circle.x1 !== undefined) {
        return
      }

      this.colorize(randomColor(circle.color))
      this.pop()
      this.renew()

      let color = circle.color,
        lane = (color == C1 ? 0 : color == C2 ? 1 : 2)
      this.moveTo(
        width * (lane + Math.random())
      )
    })

    this.renew()
  }
  moveTo(x) {
    this.circle.x1 = x
  }
  colorize(color) {
    this.circle.attr("fill", color)
    this.circle.attr("stroke", randomColor(color))
    this.circle.color = color
  }
  pop() {
    let node = this.circle.node
    node.parentNode.appendChild(node)
  }
  renew() {
    let circle = this.circle
    circle.x0 = circle.attr('cx')
    circle.y0 = circle.attr('cy')
    circle.radius = this.height / 40 + 30 * Math.random()
    circle.cycle =  20 + 20 * Math.random()
    circle.dispersion = 3 * Math.random()
    circle.direction = Math.random() > 0.5 ? 1 : -1
  }
  animate(args) {
    let frame = args.frame,
        circle = this.circle,
        x = circle.attr('cx'),
        y = circle.attr('cy')

    if (circle.x1) {
      if (!circle.frameStart) {
        circle.frameStart = frame;
        circle.attr({opacity: rand(0.8)})
      }
      var phase = (frame - circle.frameStart) / circle.cycle;
      x = circle.x0 + (circle.x1 - circle.x0) * phase;
      if (phase > 1) {
        x = circle.x0 = circle.x1
        delete circle.x1
        delete circle.frameStart
        circle.attr({opacity: 1})
      }
    }
    else {
      x = circle.x0;
    }

    x = x + circle.radius * Math.cos(2 * Math.PI * frame / circle.cycle * circle.direction);
    y = circle.y0 + circle.radius * Math.sin(2 * Math.PI * frame / circle.cycle * circle.direction);

    circle.attr('cx', x + circle.dispersion * Math.sin(-Math.PI + 2 * Math.PI * Math.random()));
    circle.attr('cy', y + circle.dispersion * Math.sin(-Math.PI + 2 * Math.PI * Math.random()));
  }
}

((_) => {
  _.C1 = C1
  _.C2 = C2
  _.C3 = C3
})(Circle)

module.exports = Circle
