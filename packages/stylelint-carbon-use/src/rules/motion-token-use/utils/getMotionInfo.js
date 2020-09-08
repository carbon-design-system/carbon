import { motionTokens } from './initMotionTokens';

export default function getMotionInfo() {
  return {
    tokens: [
      {
        source: 'Motion',
        accept: true,
        values: motionTokens,
      },
    ],
    functions: [
      //   {
      //     source: "Motion",
      //     accept: true,
      //     values: motionFunctions,
      //   },
    ],
  };
}
