export default function IndexPage() {
  return (
    <>
    <h1>CSS Grid Demo</h1>
      <section>
        <h2>CSS Grid</h2>
        <article className="example">
          <div className="bx--css-grid">
            <div className="content">
              Span 1
            </div>
            <div className="content bx--col-span-2">
              Span 2
            </div>
            <div className="content">
              Span 1
            </div>
            <div className="content">
              Span 1
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2>Responsive</h2>
      </section>
      <article className="example">
        <div className="bx--css-grid">
          <div className="content bx--col-span-1 bx--md:col-span-2 bx--lg:col-span-4">25%</div>
          <div className="content bx--col-span-1 bx--md:col-span-2 bx--lg:col-span-4">25%</div>
          <div className="content bx--col-span-1 bx--md:col-span-2 bx--lg:col-span-4">25%</div>
          <div className="content bx--col-span-1 bx--md:col-span-2 bx--lg:col-span-4">25%</div>
          <div className="content bx--col-span-4 bx--md:col-span-6 bx--lg:col-span-12 bx--xlg:col-span-10 bx--max:col-span-8">
            Responsive
          </div>
        </div>
      </article>
      <section>
        <h2>Offset</h2>
        <article className="example">
          <div className="bx--css-grid">
            <div className="content bx--col-start-8">Start 8</div>
            <div className="content bx--col-start-7 bx--col-span-2">Start 7</div>
            <div className="content bx--col-start-6 bx--col-span-3">Start 6</div>
            <div className="content bx--col-start-5 bx--col-span-4">Start 5</div>
            <div className="content bx--col-start-4 bx--col-span-5">Start 4</div>
            <div className="content bx--col-start-3 bx--col-span-6">Start 3</div>
            <div className="content bx--col-start-2 bx--col-span-7">Start 2</div>
            <div className="content bx--col-start-1 bx--col-span-8">Start 1</div>
            <div className="content bx--col-start-4 bx--col-end-7">
              Start 4, End 7
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2>Gap (condensed, narrow, no gutters)</h2>
        <article className="example">
          <div className="bx--css-grid bx--css-grid--condensed">
            <div className="content">
              Span 1
            </div>
            <div className="content bx--col-span-2">
              Span 2
            </div>
            <div className="content">
              Span 1
            </div>
            <div className="content">
              Span 1
            </div>
          </div>
        </article>
        <article className="example">
          <div className="bx--css-grid bx--css-grid--narrow">
            <div className="content bx--col-span-1">
              Span 1
            </div>
            <div className="content bx--col-span-2">
              Span 2
            </div>
            <div className="content bx--col-span-1">
              Span 1
            </div>
            <div className="content bx--col-span-1">
              Span 1
            </div>
          </div>
        </article>
        <article className="example">
          <div className="bx--css-grid bx--css-grid--no-gutter">
            <div className="content">
              Span 1
            </div>
            <div className="content bx--col-span-2">
              Span 2
            </div>
            <div className="content">
              Span 1
            </div>
            <div className="content">
              Span 1
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2>Gutter helpers</h2>
        <article className="example">
          <div className="bx--css-grid bx--css-grid--no-gutter">
            <div className="content bx--gutter-start">
              Span 1
            </div>
            <div className="content bx--col-span-2 bx--gutter-end">
              Span 2
            </div>
            <div className="content bx--gutter-start">
              Span 1
            </div>
            <div className="content bx--gutter-end">
              Span 1
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2>Subgrid</h2>
        <div className="example">
          <div className="bx--css-grid">
            <div className="bx--col-span-75 bx--subgrid">
            </div>
            <div className="content bx--col-span-25">
              25%
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2>Relative</h2>
        <div className="example">
          <div className="bx--css-grid">
            <div className="bx--col-span-100">
              <div className="content">100%</div>
            </div>
            <div className="bx--col-span-75">
              <div className="content">75%</div>
            </div>
            <div className="bx--col-span-25">
              <div className="content">25%</div>
            </div>
          </div>
          <div className="bx--css-grid">
            <div className="bx--col-span-50">
              <div className="content">50%</div>
            </div>
            <div className="bx--col-span-50">
              <div className="content">50%</div>
            </div>
          </div>
          <div className="bx--css-grid">
            <div className="bx--col-span-25">
              <div className="content">25%</div>
            </div>
            <div className="bx--col-span-75">
              <div className="content">75%</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
