import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("luiz-sacilotto-1")
export class LuizSacilotto1 extends LitElement {
    /**
     * Here I defined every parameter for the art generator. And I defined it as private
     * because I don't want to expose it to the user. I want to expose the properties through
     * getter and setters, and use them to validade and trigger the generation of the art.
     * It's more performatic than listen for a change in the property;
     * 
     * The variables is:
     * - renderSize:   The size of the canvas RENDER AREA;
     *                   The minimum value is 100px;
     * - angle:        The angle (in radians) of the shape(module);
     *                    The minimum value is 0; and the maximum value is 2;
     * - startAngle:   The start angle (in radians) of the shape(module);
     *                   The minimum value is 0; and the maximum value is 2;
     * - sideCount:    The number of modules in the side of the grid. e.g. 4 means 4x4 grid;
     *                    The minimum value is 4;
     * - moduleMargin: The margin between the modules (aka. gap);
     *                    The minimum value is 0; and the maximum value is half of the module size;
     * - invert:       Invert the colors;
     */
    private __renderSize:   number = 500;
    private __angle:        number = 1.5;
    private __startAngle:   number = 0.0;
    private __sideCount:    number = 4;
    private __moduleMargin: number = 0.0;
    private __invert:       boolean = false;

    private __moduleSize: number = 0;
    private radius: number = 0;
    private anglePhase: number = 0;

    private get moduleSize(): number {
        return this.__moduleSize;
    }
    private set moduleSize(value: number) {
        this.__moduleSize = value;
        this.updateRadius();
    }

    @property({ type: Number }) 
    get renderSize(): number {
        return this.__renderSize;
    }
    set renderSize(value: number) {
        this.__renderSize = Math.max(value, 100);
        this.updateModuleSize();
        this.generate();
    }
    
    @property({ type: Number }) 
    get angle(): number {
        return this.__angle
    }
    set angle(value: number) {
        this.__angle = Math.min(Math.max(value, 0.0), 2.0);
        this.generate();
    }
    
    @property({ type: Number }) 
    get startAngle(): number {
        return this.__startAngle;
    }
    set startAngle(value: number) {
        this.__startAngle = Math.min(Math.max(value, 0.0), 2.0);
        this.generate();
    }
    
    @property({ type: Number }) 
    get sideCount(): number {
        return Math.max(this.__sideCount, 4);
    }
    set sideCount(value: number) {
        this.__sideCount = value;
        this.updateModuleSize();
        this.updateAnglePhase();
        this.generate();
    }
    
    @property({ type: Number }) 
    get moduleMargin(): number {
        return Math.min(Math.max(this.__moduleMargin, 0), this.moduleSize*0.5);
    }
    set moduleMargin(value: number) {
        this.__moduleMargin = value;
        this.generate();
    }
    
    @property({ type: Boolean }) 
    get invert(): boolean {
        return this.__invert;
    }
    set invert(value: boolean) {
        this.__invert = value;
        this.generate();
    }

    /**
     * I detached the canvas RENDER SIZE from the final image result size.
     * It's because I want to generate a bigger image and then scale it down just to improve
     * the quality of the final image. But I'll not crave the values. I'll delegate to the final user.
     */
    static override styles = css`
        #base {
            width: var(--luis-sacilotto-1-size, 1000px);
            height: var(--luis-sacilotto-1-size, 1000px);
        }
    `;

    private ctx: CanvasRenderingContext2D | null = null;

    /**
     * Here is the canvas element that I'll use to draw the art.
     */
    @query('#base') canvas!: HTMLCanvasElement;

    override render() {
        return html`
            <canvas 
                id="base"
                width="${this.renderSize}" 
                height="${this.renderSize}">
                <slot></slot>
            </canvas>
        `;
    }
    
    protected override async firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
        // Just get the 
        this.ctx = this.canvas.getContext("2d");

        if(!this.ctx) {
            console.log("Canvas not supported");
            return;
        }

        this.generate();
    }

    private generate(): void {
        if(!this.ctx) return;

        // Clear background
        this.ctx.fillStyle = this.invert? "black" : "white";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Translate the origin of the canvas to avoid to clip the first modules
        this.ctx.translate(this.radius, this.radius);

        // Draw the modules incrementing the angle in each iteration
        this.ctx.fillStyle = this.invert? "white" : "black";
        for(let i=0 ; i<this.sideCount; i++) {
            for(let j=0; j<this.sideCount; j++) {
                this.drawShape(this.ctx, 
                    i*this.moduleSize, j*this.moduleSize, 
                    this.radius, 
                    this.startAngle + i*this.anglePhase + j*this.anglePhase);
            }
        }
        
        // Clear the translation
        this.ctx.translate(-this.radius, -this.radius);
    }

    private updateModuleSize(): void {
        this.moduleSize = this.renderSize/this.sideCount;
    }

    private updateRadius(): void {
        this.radius = this.moduleSize*0.5;
    }

    private updateAnglePhase(): void {
        this.anglePhase = 2/this.sideCount;
    }

    private drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number): void {
        ctx.beginPath();
        ctx.arc(
            x, y, 
            radius-this.moduleMargin, 
            startAngle, startAngle+this.angle * Math.PI);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
    }
}
