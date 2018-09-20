'use strict';

const fontFamilies = require('./fontFamilies');
const { getTypeSize, rem } = require('./scale');

const tokens = {
  heading: [
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      size: rem(getTypeSize(2)),
      lineHeight: rem(18),
      letterSpacing: '0.01rem',
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      size: rem(getTypeSize(3)),
      lineHeight: rem(22),
      letterSpacing: 0,
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 600,
      size: rem(getTypeSize(3)),
      lineHeight: rem(22),
      letterSpacing: 0,
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      size: rem(getTypeSize(5)),
      lineHeight: rem(26),
      letterSpacing: 0,
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      size: rem(getTypeSize(8)),
      lineHeight: rem(40),
      letterSpacing: 0,
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      size: rem(getTypeSize(10)),
      lineHeight: rem(50),
      letterSpacing: 0,
    },
  ],
  body: [
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      fontSize: rem(getTypeSize(1)),
      lineHeight: rem(16),
      letterSpacing: '0.02rem',
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      fontSize: rem(getTypeSize(2)),
      lineHeight: rem(20),
      letterSpacing: '0.01rem',
    },
    {
      fontFamily: fontFamilies.sans,
      fontWeight: 400,
      fontSize: rem(getTypeSize(3)),
      lineHeight: rem(24),
      letterSpacing: 0,
    },
  ],
  code: [
    {
      fontFamily: fontFamilies.mono,
      fontWeight: 400,
      fontSize: rem(getTypeSize(1)),
      lineHeight: rem(16),
      letterSpacing: '0.01rem',
    },
    {
      fontFamily: fontFamilies.mono,
      fontWeight: 400,
      fontSize: rem(getTypeSize(2)),
      lineHeight: rem(20),
      letterSpacing: '0.01rem',
    },
  ],
};

module.exports = tokens;
