import { module, test } from 'qunit';
import { setupRenderingTest as setup_rendering_test } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | csv-download-link', function(hooks) {
  setup_rendering_test(hooks);

  test('it renders', async function(assert) {
    this.set('data', [
      { 'foo': 'bar' },
      { 'foo': 'baz' },
    ]);

    await render(hbs`
      {{#csv-download-link
        filename='my-test-data.csv'
        data=data
      }}
        The link label matches
      {{/csv-download-link}}
    `);

    assert.equal(this.element.textContent.trim(), 'The link label matches');
  });

  test('the filename for the download should match', async function(assert) {
    this.set('data', [{ 'foo': 1 }]);

    await render(hbs`
      {{#csv-download-link
        filename='my-test-data.CSV'
        data=data
      }}
        Download my data
      {{/csv-download-link}}
    `);

    const link_element = find('a');
    assert.equal(
      link_element.download,
      'my-test-data.CSV',
      '`download` attribute should match provided name'
    );
  });

  test('fallback to default filename', async function(assert) {
    this.set('data', [{ 'foo': 1 }]);

    await render(hbs`
      {{#csv-download-link data=data}}
        Download my data
      {{/csv-download-link}}
    `);

    const link_element = find('a');
    assert.equal(
      link_element.download,
      'data.csv',
      '`download` attribute should fallback to default value'
    );
  });

});
