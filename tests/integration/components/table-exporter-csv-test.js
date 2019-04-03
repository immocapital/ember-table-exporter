import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | table-exporter-csv', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', [
      { 'foo': 'bar' },
      { 'foo': 'baz' },
    ]);

    await render(hbs`
      {{#table-exporter-csv
        filename='my-test-data.csv'
        data=data
      }}
        The link label matches
      {{/table-exporter-csv}}
    `);

    assert.equal(this.element.textContent.trim(), 'The link label matches');
  });

  test('the filename for the download should match', async function(assert) {
    this.set('data', [{ 'foo': 1 }]);

    await render(hbs`
      {{#table-exporter-csv
        filename='my-test-data.CSV'
        data=data
      }}
        Download my data
      {{/table-exporter-csv}}
    `);

    const linkElement = find('a');
    assert.equal(
      linkElement.download,
      'my-test-data.CSV',
      '`download` attribute should match provided name'
    );
  });

  test('fallback to default filename', async function(assert) {
    this.set('data', [{ 'foo': 1 }]);

    await render(hbs`
      {{#table-exporter-csv data=data}}
        Download my data
      {{/table-exporter-csv}}
    `);

    const linkElement = find('a');
    assert.equal(
      linkElement.download,
      'data.csv',
      '`download` attribute should fallback to default value'
    );
  });

});
