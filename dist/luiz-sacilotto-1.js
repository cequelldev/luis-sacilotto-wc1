import { css as u, LitElement as d, html as g } from "lit";
import { property as n, query as _, customElement as p } from "lit/decorators.js";
var m = Object.defineProperty, c = Object.getOwnPropertyDescriptor, r = (t, e, a, h) => {
  for (var i = h > 1 ? void 0 : h ? c(e, a) : e, l = t.length - 1, o; l >= 0; l--)
    (o = t[l]) && (i = (h ? o(e, a, i) : o(i)) || i);
  return h && i && m(e, a, i), i;
};
let s = class extends d {
  constructor() {
    super(...arguments), this.__renderSize = 500, this.__angle = 1.5, this.__startAngle = 0, this.__sideCount = 4, this.__moduleMargin = 0, this.__invert = !1, this.__moduleSize = 0, this.radius = 0, this.anglePhase = 0, this.ctx = null;
  }
  get moduleSize() {
    return this.__moduleSize;
  }
  set moduleSize(t) {
    this.__moduleSize = t, this.updateRadius();
  }
  get renderSize() {
    return this.__renderSize;
  }
  set renderSize(t) {
    this.__renderSize = Math.max(t, 100), this.updateModuleSize(), this.generate();
  }
  get angle() {
    return this.__angle;
  }
  set angle(t) {
    this.__angle = Math.min(Math.max(t, 0), 2), this.generate();
  }
  get startAngle() {
    return this.__startAngle;
  }
  set startAngle(t) {
    this.__startAngle = Math.min(Math.max(t, 0), 2), this.generate();
  }
  get sideCount() {
    return Math.max(this.__sideCount, 4);
  }
  set sideCount(t) {
    this.__sideCount = t, this.updateModuleSize(), this.updateAnglePhase(), this.generate();
  }
  get moduleMargin() {
    return Math.min(Math.max(this.__moduleMargin, 0), this.moduleSize * 0.5);
  }
  set moduleMargin(t) {
    this.__moduleMargin = t, this.generate();
  }
  get invert() {
    return this.__invert;
  }
  set invert(t) {
    this.__invert = t, this.generate();
  }
  render() {
    return g`
            <canvas 
                id="base"
                width="${this.renderSize}" 
                height="${this.renderSize}">
                <slot></slot>
            </canvas>
        `;
  }
  async firstUpdated(t) {
    if (this.ctx = this.canvas.getContext("2d"), !this.ctx) {
      console.log("Canvas not supported");
      return;
    }
    this.generate();
  }
  generate() {
    if (this.ctx) {
      this.ctx.fillStyle = this.invert ? "black" : "white", this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.translate(this.radius, this.radius), this.ctx.fillStyle = this.invert ? "white" : "black";
      for (let t = 0; t < this.sideCount; t++)
        for (let e = 0; e < this.sideCount; e++)
          this.drawShape(
            this.ctx,
            t * this.moduleSize,
            e * this.moduleSize,
            this.radius,
            this.startAngle + t * this.anglePhase + e * this.anglePhase
          );
      this.ctx.translate(-this.radius, -this.radius);
    }
  }
  updateModuleSize() {
    this.moduleSize = this.renderSize / this.sideCount;
  }
  updateRadius() {
    this.radius = this.moduleSize * 0.5;
  }
  updateAnglePhase() {
    this.anglePhase = 2 / this.sideCount;
  }
  drawShape(t, e, a, h, i) {
    t.beginPath(), t.arc(
      e,
      a,
      h - this.moduleMargin,
      i,
      i + this.angle * Math.PI
    ), t.lineTo(e, a), t.closePath(), t.fill();
  }
};
s.styles = u`
        #base {
            width: var(--luiz-sacilotto-1-size, 1000px);
            height: var(--luiz-sacilotto-1-size, 1000px);
        }
    `;
r([
  n({ type: Number })
], s.prototype, "renderSize", 1);
r([
  n({ type: Number })
], s.prototype, "angle", 1);
r([
  n({ type: Number })
], s.prototype, "startAngle", 1);
r([
  n({ type: Number })
], s.prototype, "sideCount", 1);
r([
  n({ type: Number })
], s.prototype, "moduleMargin", 1);
r([
  n({ type: Boolean })
], s.prototype, "invert", 1);
r([
  _("#base")
], s.prototype, "canvas", 2);
s = r([
  p("luiz-sacilotto-1")
], s);
export {
  s as LuizSacilotto1
};
