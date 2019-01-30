import { module, test } from 'qunit';
import { setupRenderingTest as setup_rendering_test } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | xlsx-download-link', function(hooks) {
  setup_rendering_test(hooks);

  test('it renders', async function(assert) {
    this.set('data', [
      { 'foo': 'bar' },
      { 'foo': 'baz' },
    ]);

    await render(hbs`
      {{#xlsx-download-link
        filename='my-test-data.xlsx'
        worksheetTitle='Plum Pudding'
        data=data
      }}
        The link label matches
      {{/xlsx-download-link}}
    `);

    assert.equal(this.element.textContent.trim(), 'The link label matches');
  });
});
