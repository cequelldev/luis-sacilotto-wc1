# Luiz Sacilotto - Web Component Art Generator I

![Visualization](/doc-assets/generator.png)

## Install

First install the dependencies

```bash
npm i lit @cequelldev/luiz-sacilotto-1
```

## How to use
```html
<luiz-sacilotto-1 
    renderSize="1000"
    angle="0.25" 
    startAngle="0.0"
    sideCount="10"
    moduleMargin="2"
    invert>
</luiz-sacilotto-1>
```

Parameters:

* **renderSize**: The size of the canvas RENDER AREA; The minimum is 100px;
* **angle**: The angle (in radians) of the shape(module). The minimum value is 0, and the maximum value is 2;
* **startAngle**: The start angle (in radians) of the shape(module). The minimum value is 0. and the maximum value is 2;
* **sideCount**: The number of modules in the side of the grid. e.g. 4 means 4x4 grid. The minimum value is 4;
* **moduleMargin**: The margin between the modules (aka. gap). The minimum value is 0, and the maximum value is half of the module size;
* **invert**: Invert the colors.

## Style

You can resize the component by setting the width and height through css with:

```css
luiz-sacilotto-1 {
    --luiz-sacilotto-1-size: 500px;
}
```

## Recommendations

It's recommendend that the **renderArea** parameter is set to the doubleof the  **--luiz-sacilotto-1-size** css variable. It will improve the resolution of the final image.

