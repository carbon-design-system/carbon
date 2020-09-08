import { typeFunctions } from './initTypeTokens';

export default function getTypeInfo(options) {
  return {
    // There are no type tokens that are used directly
    // Types are applied via mixins and functions
    tokens: [
      //   {
      //     source: "Type",
      //     accept: true,
      //     values: typeTokens,
      //   },
    ],
    functions: typeFunctions.map((item) => {
      const result = {
        source: 'Type',
        accept: options[item.accept],
        values: [item.name],
      };

      return result;
    }),
  };
}
