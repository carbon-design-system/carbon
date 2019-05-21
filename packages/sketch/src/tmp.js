// TMP
const icon = meta[0];
const Icon = () => (
  <SVG
    width={icon.size}
    height={icon.size}
    viewBox={`0 0 ${icon.size} ${icon.size}`}
    name={icon.basename}>
    <SVG.G>
      {icon.descriptor.content.map((descriptor, index) => {
        const { elem, attrs, content } = descriptor;
        const SVGComponent = SVGNodeReference[elem];

        if (Array.isArray(content)) {
          return (
            <SVGNodeReference key={index} {...attrs}>
              {content.map(createIconPath)}
            </SVGNodeReference>
          );
        }

        return <SVGComponent key={index} {...attrs} />;
      })}
    </SVG.G>
    <SVG.Rect width={icon.size} height={icon.size} opacity="0" />
  </SVG>
);

ReactSketch.render(<Icon />, page);

const paths = page.layers.flatMap(iconGroup => {
  const group = iconGroup.layers[0].layers[0].layers[0];
  iconGroup.remove();
  return group.layers.map(path => path.duplicate());
});

let maxWidth = -Infinity;
let maxHeight = -Infinity;

for (const path of paths) {
  if (path.frame.width > maxWidth) {
    maxWidth = path.frame.width;
  }
  if (path.frame.height > maxHeight) {
    maxHeight = path.frame.height;
  }
}

const deltaX = (icon.size - maxWidth) / 2;
const deltaY = (icon.size - maxHeight) / 2;
const fillShape = new Shape({
  name: 'Fill',
  frame: new Rectangle(deltaX, deltaY, maxWidth, maxHeight),
  layers: paths,
  style: sharedStyle.style,
  sharedStyleId: sharedStyle.id,
});

const artboard = new SymbolMaster({
  name: ['category', icon.basename].join('/'),
  frame: new Rectangle(0, 0, icon.size, icon.size),
  parent: page,
  layers: [fillShape],
});

console.log('Done!');
