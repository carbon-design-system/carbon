/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Elements/IBM Plex',
  argTypes: {
    fontWeight: {
      control: {
        type: 'radio',
      },
      defaultValue: 'Regular',
      mapping: {
        Light: 300,
        Regular: 400,
        SemiBold: 600,
      },
      options: ['Light', 'Regular', 'SemiBold'],
    },
  },
};

export const IBMPlexMono = (args) => {
  return (
    <code dir="auto" style={args} className="text-mono">
      This paragraph is in English and goes left to right.
    </code>
  );
};

export const IBMPlexSansArabic = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-arabic">
      هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.
    </p>
  );
};

export const IBMPlexSansDevanagari = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-devanagari">
      कराना अपने सिद्धांत भेदनक्षमता गुजरना विनिमय पेदा ध्येय संपादक आशाआपस ।क
      सक्षम नयेलिए सोफ़्टवेर सुस्पश्ट संभव जिसकी औषधिक संपादक प्रतिबध उपलब्धता
      कैसे पढने विभाग पुर्णता गोपनीयता विवरन दिशामे प्रेरना व्याख्या भाषए ऎसाजीस
      आधुनिक विकेन्द्रित कैसे बनाति परस्पर मुख्यतह अनुवादक उन्हे बारे लेकिन रखति
      मानसिक जानकारी विभाग उसके जिम्मे सिद्धांत प्राथमिक समाज सारांश दुनिया
      आवश्यकत ध्वनि विषय औषधिक ब्रौशर उसीएक् असक्षम आवश्यकत कार्यसिधान्तो देखने
      जिवन
    </p>
  );
};

export const IBMPlexSansHebrew = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-hebrew">
      גם החלה ואלקטרוניקה שער, כתב החול משפטית אדריכלות אם. אנא אודות חרטומים
      דת, אחר תחבורה מדריכים דת. ראשי ומהימנה לרפובליקה כדי גם, של בקר מתוך
      ביוני, ויקימדיה בהיסטוריה אם מלא. הבהרה הספרות האטמוספירה או אחר, את ביוני
      תאולוגיה אנא, סדר ב לתרום בחירות בלשנות.
    </p>
  );
};

export const IBMPlexSansThaiLooped = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-thai-looped">
      ลักษณะของตัวพิมพ์แต่ละตัวสามารถแสดงออกได้ถึงระดับเสียง
    </p>
  );
};

export const IBMPlexSansThai = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans-thai">
      ลักษณะของตัวพิมพ์แต่ละตัวสามารถแสดงออกได้ถึงระดับเสียง
    </p>
  );
};

export const IBMPlexSans = (args) => {
  return (
    <p dir="auto" style={args} className="text-sans">
      This paragraph is in English and goes left to right.
    </p>
  );
};

export const IBMPlexSerif = (args) => {
  return (
    <p dir="auto" style={args} className="text-serif">
      This paragraph is in English and goes left to right.
    </p>
  );
};
