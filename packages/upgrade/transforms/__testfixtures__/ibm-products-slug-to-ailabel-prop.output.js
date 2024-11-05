
const sampleAILabel = (
  <AILabel className="ai-label-container" size="xs">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          test
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
    </AILabelContent>
  </AILabel>
);

function Test1() {
  return (
    (<Tearsheet className="test" aiLabel={sampleAILabel}>Test
          </Tearsheet>)
  );
}

function Test2() {
  return (
    (<SidePanel className="test" aiLabel={sampleAILabel}>Test
          </SidePanel>)
  );
}

function Test3() {
  return (
    (<ExpressiveCard className="test" aiLabel={sampleAILabel}>Test
          </ExpressiveCard>)
  );
}

function Test4() {
  return (
    (<ProductiveCard className="test" aiLabel={sampleAILabel}>Test
          </ProductiveCard>)
  );
}
