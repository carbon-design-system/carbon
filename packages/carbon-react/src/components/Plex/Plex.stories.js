/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React from 'react';

export default {
  title: 'Elements/Plex',
  argTypes: {
    fontWeight: {
      defaultValue: 'Regular',
      options: [
        'Thin',
        'Extra Light',
        'Light',
        'Regular',
        'Text',
        'Medium',
        'SemiBold',
        'Bold',
      ],
      mapping: {
        Thin: 100,
        'Extra Light': 200,
        Light: 300,
        Regular: 400,
        Text: 450,
        Medium: 500,
        SemiBold: 600,
        Bold: 700,
      },
      control: { type: 'radio' },
    },
    fontSize: {
      defaultValue: 16,
      control: { type: 'range', min: 12, max: 54, step: 4 },
    },
  },
};

export const IBMPlexMono = (args) => {
  return (
    <>
      <code className="text-mono" style={args}>
        This paragraph is in English and is monospaced.
      </code>
      <p
        className="text-mono"
        style={{
          ...args,
          fontStyle: 'italic',
        }}>
        This paragraph is in English and is monospaced and italic.
      </p>
    </>
  );
};

export const IBMPlexSansArabic = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Arabic',
      }}>
      المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل
      لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب
      الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد
      أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة،
      وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو
      الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.
    </p>
  );
};

export const IBMPlexSansCondensed = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Condensed',
      }}>
      This paragraph is in English and correctly goes left to right.
    </p>
  );
};

export const IBMPlexSansDevanagari = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Devanagari',
      }}>
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
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Hebrew',
      }}>
      גם החלה ואלקטרוניקה שער, כתב החול משפטית אדריכלות אם. אנא אודות חרטומים
      דת, אחר תחבורה מדריכים דת. ראשי ומהימנה לרפובליקה כדי גם, של בקר מתוך
      ביוני, ויקימדיה בהיסטוריה אם מלא. הבהרה הספרות האטמוספירה או אחר, את ביוני
      תאולוגיה אנא, סדר ב לתרום בחירות בלשנות.
    </p>
  );
};

export const IBMPlexSansJP = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans JP',
      }}>
      新しい時代のこころを映すタイプフェイスデザイン
    </p>
  );
};

export const IBMPlexSansKR = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans KR',
      }}>
      동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.
    </p>
  );
};

export const IBMPlexSansThaiLooped = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Thai Looped',
      }}>
      ลักษณะของตัวพิมพ์แต่ละตัวสามารถแสดงออกได้ถึงระดับเสียง
    </p>
  );
};

export const IBMPlexSansThai = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Thai',
      }}>
      ลักษณะของตัวพิมพ์แต่ละตัวสามารถแสดงออกได้ถึงระดับเสียง
    </p>
  );
};

export const IBMPlexSansVariable = (args) => {
  return (
    <p
      dir="auto"
      style={{
        ...args,
        fontFamily: 'IBM Plex Sans Variable',
      }}>
      This paragraph is in English and correctly goes left to right.
    </p>
  );
};

export const IBMPlexSans = (args) => {
  return (
    <>
      <p
        dir="auto"
        style={{
          ...args,
          fontFamily: 'IBM Plex Sans',
        }}>
        This paragraph is in English and correctly goes left to right.
      </p>
      <p style={{ ...args, fontFamily: 'IBM Plex Sans', fontStyle: 'italic' }}>
        This text is italic
      </p>
    </>
  );
};

export const IBMPlexSerif = (args) => {
  return (
    <>
      <p
        dir="auto"
        style={{
          ...args,
          fontFamily: 'IBM Plex Serif',
        }}>
        This paragraph is in English and correctly goes left to right.
      </p>
      <p style={{ ...args, fontFamily: 'IBM Plex Serif', fontStyle: 'italic' }}>
        This text is italic
      </p>
    </>
  );
};
