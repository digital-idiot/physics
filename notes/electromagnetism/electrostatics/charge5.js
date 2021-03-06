Charge.clickStart("charge5")

function charges5(el) {
  const q = []; //holds the charges
  Charge.setup(el, q);

  let pause = false;
  el.addEventListener("mouseleave", function () {
    pause = true;
  });
  el.addEventListener("mouseenter", function () {
    Charge.setCanvas(el);
    if (pause) requestAnimationFrame(cycle);
    pause = false;
  });

  const separation = 30;
  const lenX = 13
  const lenY = 4;
  const offx = canvas.width / 2 - ((lenX - 1) * separation) / 2;
  const offy = canvas.height / 2 - ((lenY - 1) * separation) / 2;
  for (let i = 0; i < lenX; ++i) {
    for (let j = 0; j < lenY; ++j) {
      if (!(j % 2)) {
        q[q.length] = new Charge("p", {
          x: i * separation + offx,
          y: j * separation + offy
        });
        q[q.length] = new Charge("e", {
          x: i * separation + offx,
          y: j * separation + offy
        });
      } else {
        q[q.length] = new Charge("p", {
          x: i * separation + offx + separation / 2,
          y: j * separation + offy
        });
        q[q.length] = new Charge("e", {
          x: i * separation + offx + separation / 2,
          y: j * separation + offy
        });
      }
    }
  }

  function cycle() {
    if (!pause) {
      Charge.physicsAll(q);
      Charge.bounds(q);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Charge.vectorField(q);
      ctx.globalAlpha = 0.5;
      Charge.drawAll(q);
      ctx.globalAlpha = 1;
      requestAnimationFrame(cycle);
    }
  }
  requestAnimationFrame(cycle);
}