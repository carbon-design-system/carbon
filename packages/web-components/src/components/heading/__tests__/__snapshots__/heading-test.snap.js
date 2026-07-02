/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['cds-heading should begin with an <h1> tag'] = `<cds-heading>
  test
</cds-heading>
`;
/* end snapshot cds-heading should begin with an <h1> tag */

snapshots['cds-heading should increment heading levels as you nest sections'] =
  `<div>
  <cds-heading>
    h1
  </cds-heading>
  <cds-section>
    <cds-heading>
      h2
    </cds-heading>
    <cds-section>
      <cds-heading>
        h3
      </cds-heading>
      <cds-section>
        <cds-heading>
          h4
        </cds-heading>
        <cds-section>
          <cds-heading>
            h5
          </cds-heading>
          <cds-section>
            <cds-heading>
              h6
            </cds-heading>
          </cds-section>
        </cds-section>
      </cds-section>
    </cds-section>
  </cds-section>
</div>
`;
/* end snapshot cds-heading should increment heading levels as you nest sections */

snapshots[
  'cds-heading should override heading levels when specifying the level of a section'
] = `<div>
  <cds-heading>
    h1
  </cds-heading>
  <cds-section level="4">
    <cds-heading>
      h4
    </cds-heading>
    <cds-section>
      <cds-heading>
        h5
      </cds-heading>
      <cds-section level="2">
        <cds-heading>
          h2
        </cds-heading>
      </cds-section>
    </cds-section>
  </cds-section>
</div>
`;
/* end snapshot cds-heading should override heading levels when specifying the level of a section */

snapshots['cds-heading should stop increment heading levels past level 6'] =
  `<div>
  <cds-heading>
    h1
  </cds-heading>
  <cds-section>
    <cds-heading>
      h2
    </cds-heading>
    <cds-section>
      <cds-heading>
        h3
      </cds-heading>
      <cds-section>
        <cds-heading>
          h4
        </cds-heading>
        <cds-section>
          <cds-heading>
            h5
          </cds-heading>
          <cds-section>
            <cds-heading>
              h6
            </cds-heading>
            <cds-section>
              <cds-heading data-testid="max">
                max
              </cds-heading>
            </cds-section>
          </cds-section>
        </cds-section>
      </cds-section>
    </cds-section>
  </cds-section>
</div>
`;
/* end snapshot cds-heading should stop increment heading levels past level 6 */

snapshots[
  'cds-heading Component API should pass through all attributes for <cds-section>'
] = `<cds-section data-testid="test">
  test
</cds-section>
`;
/* end snapshot cds-heading Component API should pass through all attributes for <cds-section> */

snapshots[
  'cds-heading Component API should pass through all attributes for <cds-heading>'
] = `<cds-heading data-testid="test">
  test
</cds-heading>
`;
/* end snapshot cds-heading Component API should pass through all attributes for <cds-heading> */
