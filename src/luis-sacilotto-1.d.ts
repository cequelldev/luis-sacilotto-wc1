import { LitElement, PropertyValueMap } from "lit";
export declare class ArtGenerator extends LitElement {
    canvas: HTMLCanvasElement;
    angle: number;
    startAngle: number;
    sideCount: number;
    moduleMargin: number;
    invert: boolean;
    render(): import("lit-html").TemplateResult<1>;
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void>;
    private drawShape;
}
declare global {
    interface HTMLElementTagNameMap {
        "luis-sacilotto-1": ArtGenerator;
    }
}
//# sourceMappingURL=luis-sacilotto-1.d.ts.map