export default function IndexPage() {
  return (
    <>
      <h1>Experimental CSS Grid</h1>
      <section>
        <h2>Wide</h2>
        <div className="cds--css-grid">
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Condensed</h2>
        <div className="cds--css-grid cds--css-grid--condensed">
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Full Width</h2>
        <div className="cds--css-grid cds--css-grid--full-width">
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
          <div className="cds--sm:col-span-4"></div>
        </div>
      </section>

      <section>
        <h2>Responsive</h2>
        <div className="cds--css-grid">
          <div className="cds--sm:col-span-2 cds--md:col-span-4 cds--lg:col-span-6">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 6 of 16</p>
          </div>
          <div className="cds--sm:col-span-2 cds--md:col-span-2 cds--lg:col-span-3">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div className="cds--sm:col-span-0 cds--md:col-span-2 cds--lg:col-span-3">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-4">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 0 of 8</p>
            <p>Large: Span 4 of 16</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Subgrid</h2>
        <div className="cds--css-grid">
          <div className="cds--sm:col-span-2 cds--md:col-span-4 cds--lg:col-span-3">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div className="cds--sm:col-span-2 cds--md:col-span-4 cds--lg:col-span-10">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 10 of 16</p>
            <div className="example cds--subgrid">
              <div className="cds--sm:col-span-1 cds--md:col-span-1 cds--lg:col-span-2">
                <p>sm=1</p> <p>md=1</p> <p>lg=2</p>
              </div>
              <div className="cds--sm:col-span-1 cds--md:col-span-1 cds--lg:col-span-2">
                <p>sm=1</p> <p>md=1</p> <p>lg=2</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-1 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=1</p> <p>lg=1</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-1 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=1</p> <p>lg=1</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
              <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-1">
                <p>sm=0</p> <p>md=0</p> <p>lg=1</p>
              </div>
            </div>
          </div>
          <div className="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-3">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 0 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Mixed Grid Modes</h2>
        <div className="cds--css-grid">
          <div className="cds--sm:col-span-1 cds--md:col-span-2 cds--lg:col-span-4">
            <div className="cds--css-grid cds--subgrid">
              <div className="cds--sm:col-span-1 cds--md:col-span-2 cds--lg:col-span-4">
                <p>wide</p>
              </div>
            </div>
          </div>
          <div className="cds--sm:col-span-3 cds--md:col-span-6 cds--lg:col-span-12">
            <div className="cds--css-grid--condensed cds--subgrid">
              <div className="cds--sm:col-span-3 cds--md:col-span-6 cds--lg:col-span-12">
                <p>condensed</p>
              </div>
            </div>
          </div>
          <div className="cds--sm:col-span-1 cds--md:col-span-2 cds--lg:col-span-4">
            <div className="cds--css-grid--condensed cds--subgrid">
              <div className="cds--sm:col-span-1 cds--md:col-span-2 cds--lg:col-span-4">
                <p>condensed</p>
              </div>
            </div>
          </div>
          <div className="cds--sm:col-span-3 cds--md:col-span-6 cds--lg:col-span-12">
            <div className="cds--css-grid cds--subgrid">
              <div className="cds--sm:col-span-3 cds--md:col-span-6 cds--lg:col-span-12">
                <p>wide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Offset</h2>
        <div className="cds--css-grid">
          <div className="cds--sm:col-start-4 cds--sm:col-end-5 cds--md:col-start-7 cds--md:col-end-9 cds--lg:col-start-13 cds--lg:col-end-17"></div>
          <div className="cds--sm:col-start-3 cds--sm:col-end-5 cds--md:col-start-5 cds--md:col-end-9 cds--lg:col-start-9 cds--lg:col-end-17"></div>
          <div className="cds--sm:col-start-2 cds--sm:col-end-5 cds--md:col-start-3 cds--md:col-end-9 cds--lg:col-start-5 cds--lg:col-end-17"></div>
          <div className="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16"></div>
        </div>
      </section>

      <section>
        <h2>Auto Columns</h2>
        <div className="cds--css-grid">
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
          <div className="cds--col"></div>
        </div>
      </section>
    </>
  );
}
