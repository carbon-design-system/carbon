/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Opt in to `enable-v12-tabs-contained-layer` and remove the `Layer` that was
 * placed directly inside a `TabPanel` of contained or vertical tabs.
 *
 * Transforms:
 *
 * <Tabs>
 *   <TabList contained>...</TabList>
 *   <TabPanels>
 *     <TabPanel>
 *       <Layer>...</Layer>
 *     </TabPanel>
 *   </TabPanels>
 * </Tabs>
 *
 * Into:
 *
 * <FeatureFlags enableV12TabsContainedLayer>
 *   <Tabs>
 *     <TabList contained>...</TabList>
 *     <TabPanels>
 *       <TabPanel>...</TabPanel>
 *     </TabPanels>
 *   </Tabs>
 * </FeatureFlags>
 *
 * The transform is conservative. A `Tabs` is left untouched, and reported,
 * when any of its `TabPanel`s has a `Layer` directly inside it that cannot be
 * removed safely (the `Layer` has props such as `level`, or sits next to other
 * children), because enabling the flag there would change the layer level.
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

const FLAG_PROP = 'enableV12TabsContainedLayer';
const CARBON_REACT = '@carbon/react';
const TABS_ELEMENTS = ['Tabs', 'TabsVertical'];

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Resolve local names of the Carbon components so that same-named components
  // from other libraries are never touched.
  const local = {};
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value;
    if (typeof source !== 'string' || !source.startsWith(CARBON_REACT)) {
      return;
    }
    (path.node.specifiers || []).forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier') {
        local[specifier.imported.name] = specifier.local
          ? specifier.local.name
          : specifier.imported.name;
      }
    });
  });

  const tabsNames = TABS_ELEMENTS.map((name) => local[name]).filter(Boolean);
  if (tabsNames.length === 0) {
    return null;
  }

  const evaluateFlag = (openingElement, flagName) => {
    const attr = (openingElement.attributes || []).find(
      (a) => a.type === 'JSXAttribute' && a.name.name === flagName
    );
    if (!attr) {
      return { present: false, enabled: false, dynamic: false };
    }
    if (attr.value === null || attr.value === undefined) {
      return { present: true, enabled: true, dynamic: false, node: attr };
    }
    if (attr.value.type === 'JSXExpressionContainer') {
      const expr = attr.value.expression;
      if (
        (expr.type === 'BooleanLiteral' || expr.type === 'Literal') &&
        typeof expr.value === 'boolean'
      ) {
        return {
          present: true,
          enabled: expr.value,
          dynamic: false,
          node: attr,
        };
      }
      return { present: true, enabled: false, dynamic: true, node: attr };
    }
    return { present: true, enabled: false, dynamic: true, node: attr };
  };

  const wrapperName = local.FeatureFlags || 'FeatureFlags';

  const isElement = (node, name) =>
    node.type === 'JSXElement' &&
    name !== undefined &&
    node.openingElement.name.type === 'JSXIdentifier' &&
    node.openingElement.name.name === name;

  const isFragment = (node) =>
    node.type === 'JSXFragment' ||
    (node.type === 'JSXElement' &&
      ((node.openingElement.name.type === 'JSXIdentifier' &&
        node.openingElement.name.name === 'Fragment') ||
        (node.openingElement.name.type === 'JSXMemberExpression' &&
          node.openingElement.name.property.name === 'Fragment')));

  const isWhitespaceText = (node) =>
    node.type === 'JSXText' && node.value.trim() === '';

  // `contained` is only treated as set for the bare attribute or `{true}`.
  const hasContainedProp = (element) =>
    element.openingElement.attributes.some(
      (attr) =>
        attr.type === 'JSXAttribute' &&
        attr.name.name === 'contained' &&
        (attr.value === null ||
          attr.value === undefined ||
          (attr.value.type === 'JSXExpressionContainer' &&
            attr.value.expression.type === 'BooleanLiteral' &&
            attr.value.expression.value === true) ||
          (attr.value.type === 'JSXExpressionContainer' &&
            attr.value.expression.type === 'Literal' &&
            attr.value.expression.value === true))
    );

  // Mirrors the runtime detection in `Tabs`: a direct child (looking through
  // fragments) that is a `TabListVertical` or a `TabList` with `contained`.
  const hasContainedTabList = (children) =>
    children.some((child) => {
      if (isFragment(child)) {
        return hasContainedTabList(child.children || []);
      }
      return (
        isElement(child, local.TabListVertical) ||
        (isElement(child, local.TabList) && hasContainedProp(child))
      );
    });

  const isTabsElement = (node) =>
    node.type === 'JSXElement' && tabsNames.some((n) => isElement(node, n));

  // Walks up to the closest Tabs/TabsVertical so that a nested `Tabs` inside a
  // `TabPanel` keeps its own panels.
  const closestTabs = (path) => {
    let current = path.parent;
    while (current) {
      if (isTabsElement(current.node)) {
        return current.node;
      }
      current = current.parent;
    }
    return null;
  };

  const closestPanel = (path) => {
    let current = path.parent;
    while (current) {
      if (isElement(current.node, local.TabPanel)) {
        return current.node;
      }
      current = current.parent;
    }
    return null;
  };

  let changed = false;
  let needsFeatureFlagsImport = false;

  const closestWrapper = (path) =>
    j(path).closest(j.JSXElement, {
      openingElement: { name: { name: wrapperName } },
    });

  // Decide what to do with every panel of a contained Tabs before changing
  // anything, so that a Tabs is either fully migrated or left alone.
  const analyze = (tabsPath) => {
    const tabsNode = tabsPath.node;
    const panels = j(tabsPath)
      .find(j.JSXElement)
      .filter(
        (path) =>
          isElement(path.node, local.TabPanel) && closestTabs(path) === tabsNode
      )
      .paths();

    const removals = [];
    let blocked = false;

    const wrapper = closestWrapper(tabsPath);
    if (wrapper.size() > 0) {
      const wrapperNode = wrapper.get().node;
      const release = evaluateFlag(
        wrapperNode.openingElement,
        'enableV12Release'
      );
      const specific = evaluateFlag(wrapperNode.openingElement, FLAG_PROP);

      if (release.dynamic || specific.dynamic) {
        blocked = true;
      }
    }

    panels.forEach((panelPath) => {
      const significant = panelPath.node.children.filter(
        (child) => !isWhitespaceText(child)
      );
      const layers = significant.filter((child) =>
        isElement(child, local.Layer)
      );

      if (layers.length === 0) {
        // A deeper `Layer` (inside a wrapper element or a conditional) would
        // end up one level deeper once the panel adds its own, so it needs a
        // manual review.
        const hasNestedLayer =
          local.Layer !== undefined &&
          j(panelPath)
            .find(j.JSXElement)
            .filter(
              (path) =>
                isElement(path.node, local.Layer) &&
                closestPanel(path) === panelPath.node
            )
            .size() > 0;

        if (hasNestedLayer) {
          blocked = true;
        }
        return;
      }

      const [layer] = layers;
      const removable =
        significant.length === 1 &&
        layer.openingElement.attributes.length === 0;

      if (removable) {
        removals.push({ panel: panelPath.node, layer });
      } else {
        blocked = true;
      }
    });

    return { removals, blocked };
  };

  const containedTabs = [];
  root.find(j.JSXElement).forEach((tabsPath) => {
    if (
      isTabsElement(tabsPath.node) &&
      hasContainedTabList(tabsPath.node.children)
    ) {
      containedTabs.push(tabsPath);
    }
  });

  const analysis = new Map(
    containedTabs.map((tabsPath) => [tabsPath.node, analyze(tabsPath)])
  );
  const blockedTabs = containedTabs.filter(
    (tabsPath) => analysis.get(tabsPath.node).blocked
  );

  const blockedWrappers = blockedTabs
    .map((path) => closestWrapper(path))
    .filter((wrapper) => wrapper.size() > 0)
    .map((wrapper) => wrapper.get().node);

  containedTabs.forEach((tabsPath) => {
    const tabsNode = tabsPath.node;
    const { removals, blocked } = analysis.get(tabsNode);

    if (blocked) {
      if (typeof api.report === 'function') {
        const { line } = tabsNode.loc ? tabsNode.loc.start : { line: '?' };
        api.report(
          `${fileInfo.path}:${line} skipped: a TabPanel has a Layer that ` +
            'cannot be removed safely. Remove it by hand, then enable ' +
            `${FLAG_PROP}.`
        );
      }
      return;
    }

    removals.forEach(({ panel, layer }) => {
      panel.children = layer.children || [];
    });

    // Opt in to the flag.
    const wrapper = closestWrapper(tabsPath);

    // An existing wrapper is only reused when no skipped Tabs lives under it,
    // because the flag applies to everything inside the wrapper and would
    // stack the automatic Layer on that Tabs' manual one.
    const reusableWrapper =
      wrapper.size() > 0 && !blockedWrappers.includes(wrapper.get().node);

    if (reusableWrapper) {
      const wrapperNode = wrapper.get().node;
      const release = evaluateFlag(
        wrapperNode.openingElement,
        'enableV12Release'
      );
      const specific = evaluateFlag(wrapperNode.openingElement, FLAG_PROP);

      if (release.enabled || specific.enabled) {
        // Already enabled, do nothing to wrapper, but removals are processed
      } else if (specific.present) {
        // Explicitly false, so we turn it to true!
        specific.node.value = null;
        changed = true;
      } else {
        // Not present and not enabled, so we append the attribute
        wrapperNode.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier(FLAG_PROP))
        );
        changed = true;
      }
    } else {
      // Clear the "parenthesized" extra flag so recast does not print the
      // inner JSXElement as `(<Tabs>...)` when used inside an arrow-function
      // body that previously had wrapping parentheses.
      if (tabsNode.extra) {
        tabsNode.extra = { ...tabsNode.extra, parenthesized: false };
      }

      j(tabsPath).replaceWith(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxIdentifier(wrapperName),
            [j.jsxAttribute(j.jsxIdentifier(FLAG_PROP))],
            false
          ),
          j.jsxClosingElement(j.jsxIdentifier(wrapperName)),
          [tabsNode]
        )
      );
      needsFeatureFlagsImport = true;
      changed = true;
    }

    if (removals.length > 0) {
      changed = true;
    }
  });

  if (!changed) {
    return null;
  }

  // Drop the `Layer` import if it is no longer used.
  if (local.Layer) {
    const stillUsed =
      root
        .find(j.Identifier, { name: local.Layer })
        .filter((path) => path.parent.node.type !== 'ImportSpecifier')
        .size() > 0;

    if (!stillUsed) {
      root.find(j.ImportDeclaration).forEach((path) => {
        const source = path.node.source.value;
        if (typeof source !== 'string' || !source.startsWith(CARBON_REACT)) {
          return;
        }
        path.node.specifiers = (path.node.specifiers || []).filter(
          (specifier) =>
            !(
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'Layer'
            )
        );
        if (path.node.specifiers.length === 0) {
          j(path).remove();
        }
      });
    }
  }

  // Import `FeatureFlags` from `@carbon/react` when a wrapper was added.
  if (needsFeatureFlagsImport && !local.FeatureFlags) {
    const carbonImport = root.find(j.ImportDeclaration, {
      source: { value: CARBON_REACT },
    });

    if (carbonImport.size() > 0) {
      carbonImport
        .get()
        .node.specifiers.push(j.importSpecifier(j.identifier('FeatureFlags')));
    } else {
      const featureFlagsImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('FeatureFlags'))],
        j.literal(CARBON_REACT)
      );
      const lastImport = root.find(j.ImportDeclaration).at(-1);

      if (lastImport.size() > 0) {
        lastImport.insertAfter(featureFlagsImport);
      } else {
        root.get().node.program.body.unshift(featureFlagsImport);
      }
    }
  }

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
