export default function IndexPage() {
  return (
    <>
      <h1>Experimental CSS Grid</h1>
      <section>
        <h2>Wide</h2>
        <div class="bx--css-grid">
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Narrow</h2>
        <div class="bx--css-grid bx--css-grid--narrow">
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Condensed</h2>
        <div class="bx--css-grid bx--css-grid--condensed">
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Full Width</h2>
        <div class="bx--css-grid bx--css-grid--full-width">
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
          <div class="bx--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Responsive</h2>
        <div class="bx--css-grid">
          <div class="bx--sm:col-span-2 bx--md:col-span-4 bx--lg:col-span-6">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 6 of 16</p>
          </div>
          <div class="bx--sm:col-span-2 bx--md:col-span-2 bx--lg:col-span-3">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div class="bx--sm:col-span-0 bx--md:col-span-2 bx--lg:col-span-3">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-4">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 0 of 8</p>
            <p>Large: Span 4 of 16</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Subgrid</h2>
        <div class="bx--css-grid">
          <div class="bx--sm:col-span-2 bx--md:col-span-4 bx--lg:col-span-3">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div class="bx--sm:col-span-2 bx--md:col-span-4 bx--lg:col-span-10">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 10 of 16</p>
            <div class="example bx--subgrid">
              <div class="bx--sm:col-span-1 bx--md:col-span-1 bx--lg:col-span-2">
                <p>sm=1</p> <p>md=1</p> <p>lg=2</p>
              </div>
              <div class="bx--sm:col-span-1 bx--md:col-span-1 bx--lg:col-span-2">
                <p>sm=1</p> <p>md=1</p> <p>lg=2</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-1 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=1</p> <p>lg=1</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-1 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=1</p> <p>lg=1</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
            </div>
          </div>
          <div class="bx--sm:col-span-0 bx--md:col-span-0 bx--lg:col-span-3">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 0 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Mixed Grid Modes</h2>
        <div class="bx--css-grid">
          <div class="bx--sm:col-span-1 bx--md:col-span-2 bx--lg:col-span-4">
            <div class="bx--css-grid--narrow bx--subgrid">
              <div class="bx--sm:col-span-1 bx--md:col-span-2 bx--lg:col-span-4">
                <p>narrow</p>
              </div>
            </div>
          </div>
          <div class="bx--sm:col-span-3 bx--md:col-span-6 bx--lg:col-span-12">
            <div class="bx--css-grid--condensed bx--subgrid">
              <div class="bx--sm:col-span-3 bx--md:col-span-6 bx--lg:col-span-12">
                <p>condensed</p>
              </div>
            </div>
          </div>
          <div class="bx--sm:col-span-1 bx--md:col-span-2 bx--lg:col-span-4">
            <div class="bx--css-grid--condensed bx--subgrid">
              <div class="bx--sm:col-span-1 bx--md:col-span-2 bx--lg:col-span-4">
                <p>condensed</p>
              </div>
            </div>
          </div>
          <div class="bx--sm:col-span-3 bx--md:col-span-6 bx--lg:col-span-12">
            <div class="bx--css-grid--narrow bx--subgrid">
              <div class="bx--sm:col-span-3 bx--md:col-span-6 bx--lg:col-span-12">
                <p>narrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Offset</h2>
        <div class="bx--css-grid">
          <div class="bx--sm:col-start-4 bx--sm:col-end-5 bx--md:col-start-7 bx--md:col-end-9 bx--lg:col-start-13 bx--lg:col-end-17"></div>
          <div class="bx--sm:col-start-3 bx--sm:col-end-5 bx--md:col-start-5 bx--md:col-end-9 bx--lg:col-start-9 bx--lg:col-end-17"></div>
          <div class="bx--sm:col-start-2 bx--sm:col-end-5 bx--md:col-start-3 bx--md:col-end-9 bx--lg:col-start-5 bx--lg:col-end-17"></div>
          <div class="bx--sm:col-span-4 bx--md:col-span-8 bx--lg:col-span-16"></div>
        </div>
      </section>

      <section>
        <h2>Auto Columns</h2>
        <div class="bx--css-grid">
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
          <div class="bx--col"></div>
        </div>
      </section>
    </>
  );
}
