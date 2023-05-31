// import { Button } from '@carbon/react';
import React from 'react';

export default function App() {
  return (
    <div>
      <h3>V10 motion tokens</h3>
      <div className="motion">
        <div className="circle fast-01">$fast-01</div>
        <div className="circle fast-02">$fast-02</div>
        <div className="circle moderate-01">$moderate-01</div>
        <div className="circle moderate-02">$moderate-02</div>
        <div className="circle slow-01">$slow-01</div>
        <div className="circle slow-02">$slow-02</div>
      </div>
      <h3>V10 layout tokens</h3>
      <div className="layout">
        <div className="layout-row">
          <p>$layout-01:</p>
          <div className="layout-01" />
        </div>
        <div className="layout-row">
          <p>$layout-02:</p>
          <div className="layout-02" />
        </div>
        <div className="layout-row">
          <p>$layout-03:</p>
          <div className="layout-03" />
        </div>
        <div className="layout-row">
          <p>$layout-04:</p>
          <div className="layout-04" />
        </div>
        <div className="layout-row">
          <p>$layout-05:</p>
          <div className="layout-05" />
        </div>
        <div className="layout-row">
          <p>$layout-06:</p>
          <div className="layout-06" />
        </div>
        <div className="layout-row">
          <p>$layout-07:</p>
          <div className="layout-07" />
        </div>
      </div>
      <h3>V10 type tokens</h3>
      <h4>Body styles</h4>
      Token: <p className="caption-01">$caption-01</p>
      Token: <p className="caption-02">$caption-02</p>
      Token: <p className="body-short-01">$body-short-01</p>
      Token: <p className="body-short-02">$body-short-02</p>
      Token: <p className="body-long-01">$body-long-01</p>
      Token: <p className="body-long-02">$body-long-02</p>
      <h4>Fixed heading styles</h4>
      Token: <p className="productive-heading-01">$productive-heading-01</p>
      Token: <p className="productive-heading-02">$productive-heading-02</p>
      Token: <p className="expressive-heading-01">$expressive-heading-01</p>
      Token: <p className="expressive-heading-02">$expressive-heading-02</p>
      Token: <p className="productive-heading-03">$productive-heading-03</p>
      Token: <p className="productive-heading-04">$productive-heading-04</p>
      Token: <p className="productive-heading-05">$productive-heading-05</p>
      Token: <p className="productive-heading-06">$productive-heading-06</p>
      Token: <p className="productive-heading-07">$productive-heading-07</p>
      <h4>Fluid heading styles</h4>
      Token: <p className="expressive-heading-03">$expressive-heading-03</p>
      Token: <p className="expressive-heading-04">$expressive-heading-04</p>
      Token: <p className="expressive-heading-05">$expressive-heading-05</p>
      Token: <p className="expressive-heading-06">$expressive-heading-06</p>
      <h4>Fluid display styles</h4>
      Token: <p className="expressive-paragraph-01">$expressive-paragraph-01</p>
      Token: <p className="quotation-01">$quotation-01</p>
      Token: <p className="quotation-02">$quotation-02</p>
      Token: <p className="display-01">$display-01</p>
      Token: <p className="display-02">$display-02</p>
      Token: <p className="display-03">$display-03</p>
      Token: <p className="display-04">$display-04</p>
    </div>
  );
}
