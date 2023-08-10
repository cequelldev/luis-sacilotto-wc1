import { LitElement, PropertyValueMap } from "lit";
export declare class LuizSacilotto1 extends LitElement {
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
    private __renderSize;
    private __angle;
    private __startAngle;
    private __sideCount;
    private __moduleMargin;
    private __invert;
    private __moduleSize;
    private radius;
    private anglePhase;
    private get moduleSize();
    private set moduleSize(value);
    get renderSize(): number;
    set renderSize(value: number);
    get angle(): number;
    set angle(value: number);
    get startAngle(): number;
    set startAngle(value: number);
    get sideCount(): number;
    set sideCount(value: number);
    get moduleMargin(): number;
    set moduleMargin(value: number);
    get invert(): boolean;
    set invert(value: boolean);
    /**
     * I detached the canvas RENDER SIZE from the final image result size.
     * It's because I want to generate a bigger image and then scale it down just to improve
     * the quality of the final image. But I'll not crave the values. I'll delegate to the final user.
     */
    static styles: import("lit").CSSResult;
    private ctx;
    /**
     * Here is the canvas element that I'll use to draw the art.
     */
    canvas: HTMLCanvasElement;
    render(): import("lit-html").TemplateResult<1>;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void>;
    private generate;
    private updateModuleSize;
    private updateRadius;
    private updateAnglePhase;
    private drawShape;
}
