import Page from '../components/Page';

export default function MarginPage() {
  return (
    <Page>
      <section>
        <h1>Margin</h1>
        <article className="example">
          <h2>Add padding to a single side</h2>
          <div className="demo">
            <div className="pt-8 bg-ui-03">
              <span>Target</span>
            </div>
          </div>
          <pre className="code">
            <code>This is code</code>
          </pre>
        </article>
      </section>
    </Page>
  );
}
