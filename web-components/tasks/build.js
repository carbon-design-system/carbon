import mdx from "@mdx-js/esbuild";
import { context, build } from 'esbuild';
import CleanCSS from 'clean-css';
import del from 'del';
import parseArgs from 'minimist';
import { sassPlugin } from 'esbuild-sass-plugin';

const args = parseArgs(process.argv.slice(2), {
  boolean: true,
});

(async () => {
  const { globby } = await import('globby');
  const destinationPath = 'es';
  const isRelease = process.env.RELEASE || false;

  /* This is for using inside Storybook for demonstration purposes. */
  const cssHoverClassAdder = (content) => content.replace(/.*:hover[^{]*/g, matched => {
    // Replace :hover with special class. (There will be additional classes for focus, etc. Should be implemented in here.)
    const replacedWithNewClass = matched.replace(/:hover/, '.__ONLY_FOR_STORYBOOK_DEMONSTRATION_HOVER__')
    // Concat strings
    return replacedWithNewClass.concat(', ', matched);
  });

  const cssCleaner = (content) => {
    const { styles, errors, warnings } = new CleanCSS({ level: 0 }).minify(content);
    if (errors.length) {
      console.error(errors);
    }
    if (warnings.length) {
      console.warn(warnings);
    }
    return styles;
  };

  const cssTransformers = [];

  if (!isRelease) {
    // Add hover class for demonstration purposes, only if it's not a release build.
    cssTransformers.push(cssHoverClassAdder);
  }

  cssTransformers.push(cssCleaner);

  // const cssPluginOptions = {
  //   filter: /components\/.*\.css$/,
  //   transform: (content) => cssTransformers.reduce((result, transformer) => transformer(result), content)
  // };

  try {
    const buildOptions = {
      entryPoints: [
        // 'src/baklava.ts',
        // 'src/baklava-react.ts',
        // 'src/localization.ts',
        'src/index.ts',
        ...(await globby([
          // 'src/generated/**/*.ts',
          'src/components/**/!(*.(test|d)).ts',
          // 'src/themes/*.css',
          // 'src/components/**/*.svg',
        ])),
      ],
      loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.svg': 'file',
      },
      outdir: destinationPath,
      assetNames: 'assets/[name]',
      bundle: true,
      sourcemap: true,
      format: 'esm',
      target: ['es2020', 'chrome73', 'edge79', 'firefox63', 'safari12'],
      splitting: true,
      metafile: true,
      minify: true,
      plugins: [
        // litCssPlugin(cssPluginOptions),
        mdx(),
        sassPlugin(),
      ],
    };


    // if (args.serve) {
    //   const servedir = 'playground';

    //   let ctx = await context({
    //     ...buildOptions,
    //     outdir: `${servedir}/dist`
    //   });

    //   const { host, port } = await ctx.serve(
    //     {
    //       servedir,
    //       host: 'localhost',
    //     }
    //   );

    //   console.log(`Playground is served on http://${host}:${port}`);

    //   return;
    // }

    const { errors, warnings, metafile } = await build(buildOptions);

    if (errors.length > 0) {
      console.table(errors);
      console.error('Build Failed!');
      return;
    }

    if (warnings.length > 0) {
      console.warn('Warnings:');
      console.table(warnings);
    }

    const analyzeResult = Object.entries(metafile.outputs)
      .map(([fileName, data]) => ({
        fileName,
        size: `${(data.bytes / 1024).toFixed(2)} KB`,
        bytes: data.bytes,
      }))
      .filter(
        ({ fileName }) =>
          !/icon\/icons\/.*\.js/.test(fileName) &&
          (fileName.endsWith('.js') || fileName.endsWith('.css'))
      );

    analyzeResult.push({
      fileName: 'TOTAL',
      size: `${(analyzeResult.reduce((acc, { bytes }) => acc + bytes, 0) / 1024).toFixed(2)} KB`,
    })

    del(`${destinationPath}/components/icon/icons`);
    console.table(analyzeResult, ['fileName', 'size']);

    console.info('Build Done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
