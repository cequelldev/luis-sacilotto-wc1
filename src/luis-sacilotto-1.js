var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
export let ArtGenerator = class ArtGenerator extends LitElement {
    constructor() {
        super(...arguments);
        this.angle = 1.5;
        this.startAngle = 0.0;
        this.sideCount = 4;
        this.moduleMargin = 0;
        this.invert = false;
    }
    render() {
        return html `
            <canvas 
                id="base"
                width="500" 
                height="500">
                Your browser does not support html5 or canvas technologies.
            </canvas>
        `;
    }
    async firstUpdated(_changedProperties) {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            console.log("Canvas not supported");
            return;
        }
        ctx.fillStyle = this.invert ? "black" : "white";
        ctx.fillRect(0, 0, 500, 500);
        let moduleSize = ctx.canvas.width / this.sideCount;
        let radius = moduleSize * 0.5;
        let anglePhase = 2 / this.sideCount;
        ctx.translate(radius, radius);
        ctx.fillStyle = this.invert ? "white" : "black";
        for (let i = 0; i < this.sideCount; i++) {
            for (let j = 0; j < this.sideCount; j++) {
                this.drawShape(ctx, i * moduleSize, j * moduleSize, radius, this.startAngle + i * anglePhase + j * anglePhase);
            }
        }
    }
    drawShape(ctx, x, y, radius, startAngle) {
        ctx.beginPath();
        ctx.arc(x, y, radius - this.moduleMargin, startAngle, startAngle + this.angle * Math.PI);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
    }
};
__decorate([
    query('#base')
], ArtGenerator.prototype, "canvas", void 0);
__decorate([
    property({ type: Number })
], ArtGenerator.prototype, "angle", void 0);
__decorate([
    property({ type: Number })
], ArtGenerator.prototype, "startAngle", void 0);
__decorate([
    property({ type: Number })
], ArtGenerator.prototype, "sideCount", void 0);
__decorate([
    property({ type: Number })
], ArtGenerator.prototype, "moduleMargin", void 0);
__decorate([
    property({ type: Boolean })
], ArtGenerator.prototype, "invert", void 0);
ArtGenerator = __decorate([
    customElement("luis-sacilotto-1")
], ArtGenerator);
