import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | table-exporter-xlsx', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', [
      { 'foo': 'bar' },
      { 'foo': 'baz' },
    ]);

    await render(hbs`
      {{#table-exporter-xlsx
        filename='my-test-data.xlsx'
        worksheetTitle='Plum Pudding'
        data=data
      }}
        The link label matches
      {{/table-exporter-xlsx}}
    `);

    assert.equal(this.element.textContent.trim(), 'The link label matches');
  });
});
