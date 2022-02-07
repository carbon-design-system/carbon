const PackageType = new GraphQLObjectType({
  name: 'Package',
  fields: () => ({
    react: {
      type: ReactExportsType,
    },
    scss: {
      type: SassExportsType,
    },
  }),
});

const ReactExportsType = new GraphQLObjectType({
  name: 'ReactExports',
  fields: () => ({
    exported: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    components: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentType)),
    },
    props: {
      type: new GraphQLNonNull(new GraphQLList(ReactPropType)),
    },
  }),
});

const ReactComponentType = new GraphQLObjectType({
  name: 'ReactComponent',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    props: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentPropType)),
    },
    // TODO: type (functional, class, forwardRef)
  }),
});

const ReactPropType = new GraphQLObjectType({
  name: 'ReactProp',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    components: {
      type: new GraphQLNonNull(new GraphQLList(ReactComponentType)),
    },
  }),
});

const ReactComponentPropType = new GraphQLObjectType({
  name: 'ReactComponentProp',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const SassExportsType = new GraphQLObjectType({
  name: 'SassExports',
  fields: () => ({
    exported: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    files: {
      type: new GraphQLNonNull(new GraphQLList(SassFileType)),
    },
  }),
});

const SassFileType = new GraphQLObjectType({
  name: 'SassFile',
  fields: () => ({
    filepath: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (exportType) => {
        return path.relative(exportType.rootDirectory, exportType.filepath);
      },
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    stats: {
      type: new GraphQLNonNull(SassExportStats),
      resolve: createCachedResolver({
        key: (exportType) => exportType.filepath,
        value: async (exportType) => {
          try {
            const result = sass.compile(exportType.filepath, {
              loadPaths: [
                path.join(exportType.rootDirectory, 'node_modules'),
                path.resolve(
                  exportType.rootDirectory,
                  '..',
                  '..',
                  'node_modules'
                ),
              ],
            });
            const stats = cssstats(result.css);
            return stats;
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
      }),
    },
  }),
});

const SassExportStats = new GraphQLObjectType({
  name: 'SassExportStats',
  fields: () => ({
    gzipSize: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    rules: {
      type: new GraphQLObjectType({
        name: 'SassExportRules',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          size: {
            type: new GraphQLObjectType({
              name: 'SassExportRulesSize',
              fields: () => ({
                average: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                max: {
                  type: new GraphQLNonNull(GraphQLInt),
                },
              }),
            }),
          },
        }),
      }),
    },
    selectors: {
      type: new GraphQLObjectType({
        name: 'SassExportSelectors',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          class: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          type: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          pseudoClass: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          pseudoElement: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          specificity: {
            type: new GraphQLObjectType({
              name: 'SassExportSelectorsSpecificity',
              fields: () => ({
                average: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                max: {
                  type: new GraphQLNonNull(GraphQLInt),
                },
              }),
            }),
          },
        }),
      }),
    },
    declarations: {
      type: new GraphQLObjectType({
        name: 'SassExportDeclarations',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          unique: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          uniqueToTotalRatio: {
            type: GraphQLFloat,
            resolve: (root) => {
              if (isNaN(root.uniqueToTotalRatio)) {
                return null;
              }

              return root.uniqueToTotalRatio;
            },
          },
        }),
      }),
    },
    mediaQueries: {
      type: new GraphQLObjectType({
        name: 'SassExportMediaQueries',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          unique: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          values: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
          },
        }),
      }),
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
