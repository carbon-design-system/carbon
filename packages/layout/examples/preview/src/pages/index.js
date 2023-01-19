import {useState} from "react";
import * as CarbonLayout from "@carbon/layout";
import { paramCase } from "change-case";

export default function IndexPage() {
  return (
    <>
      <h1>Layout package basic examples</h1>

      <article>
        <header>
          <h2>Convert</h2>
        </header>
        <p>Used for converting from pixel values to rem or em values.</p>
        <div>
          <div class="convert-box"></div>
        </div>
      </article>

      <article>
        <header>
          <h2>Spacing scale</h2>
        </header>
        <p>Provides the steps in the scale used for spacing internal, and external, to a component.</p>
        <div>
          <h3>Fixed</h3>
          <ol class="spacing-scale">
            <li class="fixed-spacing-scale-1"></li>
            <li class="fixed-spacing-scale-2"></li>
            <li class="fixed-spacing-scale-3"></li>
            <li class="fixed-spacing-scale-4"></li>
            <li class="fixed-spacing-scale-5"></li>
            <li class="fixed-spacing-scale-6"></li>
            <li class="fixed-spacing-scale-7"></li>
            <li class="fixed-spacing-scale-8"></li>
            <li class="fixed-spacing-scale-9"></li>
          </ol>
        </div>
        <div>
          <h3>Fluid</h3>
          <ol class="spacing-scale">
            <li class="fluid-spacing-scale-1"></li>
            <li class="fluid-spacing-scale-2"></li>
            <li class="fluid-spacing-scale-3"></li>
            <li class="fluid-spacing-scale-4"></li>
          </ol>
        </div>
      </article>
    </>
  );
}
