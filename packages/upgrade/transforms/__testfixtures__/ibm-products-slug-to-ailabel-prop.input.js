const sampleAILabel = (
  <AILabel className="ai-label-container" size="xs">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          This is not really Lorem Ipsum but the spell checker did not like the
          previous text with it&apos;s non-words which is why this unwieldy
          sentence, should one choose to call it that, here.
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
    <Tearsheet className="test" slug={sampleAILabel}>
      Test
    </Tearsheet>
  );
}

function Test2() {
  return (
    <SidePanel className="test" slug={sampleAILabel}>
      Test
    </SidePanel>
  );
}

function Test3() {
  return (
    <ExpressiveCard className="test" slug={sampleAILabel}>
      Test
    </ExpressiveCard>
  );
}

function Test4() {
  return (
    <ProductiveCard className="test" slug={sampleAILabel}>
      Test
    </ProductiveCard>
  );
}
