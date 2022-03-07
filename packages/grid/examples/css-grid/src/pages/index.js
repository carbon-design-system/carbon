export default function IndexPage() {
  return (
    <>
      <h1>CSS Grid</h1>
      <GridExamples />
      <hr style={{ margin: '6rem 0' }}/>
      <div dir="rtl">
        <p>RTL layout</p>
        <GridExamples />
      </div>
    </>
  );
}

function GridExamples() {
  return (
    <>
      <section>
        <h2>Wide</h2>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
        </div>
      </section>

      <section>
        <h2>Narrow</h2>
        <div className="cds--css-grid cds--css-grid--narrow">
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
        </div>
      </section>

      <section>
        <h2>Condensed</h2>
        <div className="cds--css-grid cds--css-grid--condensed">
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            <div className="cds--grid-column-hang">Span 4</div>
          </div>
        </div>
      </section>

      <section>
        <h2>Responsive</h2>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--sm:col-span-2 cds--md:col-span-4 cds--lg:col-span-6">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 4 of 8</p>
            <p>Large: Span 6 of 16</p>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-2 cds--md:col-span-2 cds--lg:col-span-3">
            <p>Small: Span 2 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-0 cds--md:col-span-2 cds--lg:col-span-3">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 2 of 8</p>
            <p>Large: Span 3 of 16</p>
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-4">
            <p>Small: Span 0 of 4</p>
            <p>Medium: Span 0 of 8</p>
            <p>Large: Span 4 of 16</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Subgrid</h2>
        <p>Wide base</p>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid">
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
            </div>
          </div>
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid cds--subgrid--narrow">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
          </div>
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid cds--subgrid--condensed">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
          </div>
        </div>

        <p>Narrow base</p>
        <div className="cds--css-grid cds--css-grid--narrow">
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid cds--subgrid--wide">
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
            </div>
            <div className="cds--subgrid cds--subgrid--narrow">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
            <div className="cds--subgrid cds--subgrid--condensed">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
          </div>
        </div>

        <p>Condensed base</p>
        <div className="cds--css-grid cds--css-grid--condensed">
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid cds--subgrid--wide">
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
              <div className="cds--css-grid-column"></div>
            </div>
            <div className="cds--subgrid cds--subgrid--narrow">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
            <div className="cds--subgrid cds--subgrid--condensed">
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
              <div className="cds--css-grid-column">
                <div className="cds--grid-column-hang">I</div>
              </div>
            </div>
          </div>
        </div>

        <p>Mix-and-match</p>
                <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-8">
            <div className="cds--subgrid">
              <div className="cds--css-grid-column cds--col-span-8">
                <div className="cds--subgrid cds--subgrid--narrow">
                  <div className="cds--css-grid-column">
                    <div className="cds--grid-column-hang">I</div>
                  </div>
                  <div className="cds--css-grid-column">
                    <div className="cds--grid-column-hang">I</div>
                  </div>
                  <div className="cds--css-grid-column">
                    <div className="cds--grid-column-hang">I</div>
                  </div>
                  <div className="cds--css-grid-column">
                    <div className="cds--grid-column-hang">I</div>
                  </div>
                  <div className="cds--css-grid-column cds--col-span-4">
                    <div className="cds--subgrid cds--subgrid--wide">
                      <div className="cds--css-grid-column">I</div>
                      <div className="cds--css-grid-column">I</div>
                      <div className="cds--css-grid-column cds--col-span-2">
                        <div className="cds--subgrid cds--subgrid--condensed">
                          <div className="cds--css-grid-column">
                            <div className="cds--grid-column-hang">I</div>
                          </div>
                          <div className="cds--css-grid-column">
                            <div className="cds--grid-column-hang">I</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section>
        <h2>Offset</h2>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-6">
            Start 6
          </div>
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-5">
            Start 5
          </div>
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-4">
            Start 4
          </div>
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-3">
            Start 3
          </div>
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-2">
            Start 2
          </div>
          <div className="cds--css-grid-column cds--col-span-100 cds--col-start-1">
            Start 1
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-start-2 cds--col-span-2">
            column start 2, span 2
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-end-5 cds--col-span-2">
            span 2, column end 5
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-start-2 cds--col-end-5">
            column start 2, column end 5
          </div>
        </div>
      </section>

      <section>
        <h2>Auto Columns</h2>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-100">
            Span 100%
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-75">
            Span 75%
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-50">
            Span 50%
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--col-span-25">
            Span 25%
          </div>
        </div>
        <div className="cds--css-grid">
          <div className="cds--css-grid-column cds--sm:col-span-100 cds--md:col-span-75 cds--lg:col-span-50 cds--xlg:col-span-25">
            100% at sm, 75% at md, 50% at lg, 25% at xlg
          </div>
        </div>
      </section>

      <section>
        <h2>Full Width</h2>
        <div className="cds--css-grid cds--css-grid--full-width">
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
          <div className="cds--css-grid-column cds--sm:col-span-4">
            Span 4
          </div>
        </div>
      </section>


    </>
  );
}

