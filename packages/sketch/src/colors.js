import { colors } from '@carbon/colors';
import { formatTokenName } from '@carbon/themes';
import sketch from 'sketch';
import {
  Artboard,
  Page,
  Rectangle,
  Shape,
  ShapePath,
  SharedStyle,
  Style,
  SymbolMaster,
} from 'sketch/dom';

export function render(context) {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  // const sharedStyle = SharedStyle.fromStyle({
  // name: 'test-01',
  // style: {
  // fills: [
  // {
  // color: '#000000',
  // fillType: Style.FillType.Color,
  // },
  // ],
  // },
  // document: context.document,
  // });

  console.log(context.document.documentData().layerStyles());
  return;

  const PAGE_NAME = 'Color';
  let [page] = Array.from(context.document.pages()).filter(page => {
    return '' + page.name() === PAGE_NAME;
  });

  if (!page) {
    page = new Page({
      name: PAGE_NAME,
      parent: context.document,
    });
  }

  page.selected = true;

  if (Array.isArray(page.layers) && page.layers.length !== 0) {
    for (let i = page.layers().count() - 1; i >= 0; i--) {
      const layer = page.layers().objectAtIndex(i);
      layer.removeFromParent();
    }
  }

  const { black, white, orange, yellow, ...swatches } = colors;
  const swatchNames = Object.keys(swatches);
  const ARTBOARD_WIDTH = 40;
  const ARTBOARD_HEIGHT = 40;
  const ARTBOARD_MARGIN = 8;

  for (let i = 0; i < swatchNames.length; i++) {
    const swatch = swatchNames[i];
    const grades = Object.keys(swatches[swatch]);

    for (let j = 0; j < grades.length; j++) {
      const grade = grades[j];
      const name = formatTokenName(swatch);
      const colorName = `${name}-${grade}`;
      const rectangle = new ShapePath({
        name: colorName,
        frame: new Rectangle(0, 0, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
        shapeType: ShapePath.ShapeType.Rectangle,
        style: sharedStyle,
        // style: {
        // fills: [
        // {
        // color: swatches[swatch][grade],
        // fillType: Style.FillType.Color,
        // },
        // ],
        // },
      });

      const artboard = new SymbolMaster({
        name: `color/${name}/${name}-${grade}`,
        parent: page,
        frame: new Rectangle(
          ARTBOARD_HEIGHT * j + ARTBOARD_MARGIN * j,
          ARTBOARD_HEIGHT * i + ARTBOARD_MARGIN * i,
          40,
          40
        ),
        layers: [rectangle],
      });
      // console.log(formatTokenName(swatch), grade);
    }
  }
}
