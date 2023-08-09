import { html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("luis-sacilotto-1")
export class ArtGenerator extends LitElement {
    @query('#base') canvas!: HTMLCanvasElement;

    @property({ type: Number }) angle: number = 1.5;
    @property({ type: Number }) startAngle: number = 0.0;
    @property({ type: Number }) sideCount: number = 4;
    @property({ type: Number }) moduleMargin: number = 0;
    @property({ type: Boolean }) invert: boolean = false;

    render() {
        return html`
            <canvas 
                id="base"
                width="500" 
                height="500">
                Your browser does not support html5 or canvas technologies.
            </canvas>
        `;
    }
    
    protected async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
        const ctx = this.canvas.getContext("2d");

        if(!ctx) {
            console.log("Canvas not supported");
            return;
        }

        ctx.fillStyle = this.invert? "black" : "white";
        ctx.fillRect(0, 0, 500, 500);

        let moduleSize = ctx.canvas.width/this.sideCount;
        let radius = moduleSize*0.5;
        let anglePhase = 2/this.sideCount;

        ctx.translate(radius, radius);
        ctx.fillStyle = this.invert? "white" : "black";
        for(let i=0 ; i<this.sideCount; i++) {
            for(let j=0; j<this.sideCount; j++) {
                this.drawShape(ctx, 
                    i*moduleSize, j*moduleSize, 
                    radius, 
                    this.startAngle+i*anglePhase+j*anglePhase);
            }
        }
    }
    
    private drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number): void {
        ctx.beginPath();
        ctx.arc(x, y, radius-this.moduleMargin, startAngle, startAngle+this.angle * Math.PI);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "luis-sacilotto-1": ArtGenerator;
    }
}