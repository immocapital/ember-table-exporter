import { get, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/table-exporter-csv';
import { A as createEmberArray } from '@ember/array';

function convertValueToCsvSafeString(input) {
  const coercedString = (input || '').toString();
  const stringWithQuotesEscaped = coercedString.replace(/"/, '\\"');
  // Convert newlines, tab characters, etc to spaces to avoid unhappy surprises when parsing csv.
  const stringWithWhitespaceConverted = stringWithQuotesEscaped.replace(/\s/g, ' ');

  if (stringWithWhitespaceConverted.includes(',')) {
    // Wrap the result in quotes to make sure commas won't be read as column-breaks:
    return `"${stringWithWhitespaceConverted}"`;
  }
  return stringWithWhitespaceConverted;
}

/**
 * Convert an array of objects to a CSV string.
 * inputArray can be a plain JS array or an EmberArray. Its elements all have to be objects, and
 * all objects need to share an identical set of keys. Each object represents one row in the CSV
 * output. The objects' keys are used as the column names.
 */
function convertArrayToCsv(inputArray) {
  const inputEmberArray = createEmberArray(inputArray);

  if (get(inputEmberArray, 'length') < 1) {
    return '';
  }
  const csvLines = [];

  const columnNames = Object.keys(inputEmberArray.objectAt(0));
  const headerRow = columnNames.map(convertValueToCsvSafeString).join(',');
  csvLines.push(headerRow);

  inputEmberArray.forEach((item) => {
    const valuesForNextRow = columnNames.map((columnName) => get(item, columnName));
    const csvSafeValues = valuesForNextRow.map(convertValueToCsvSafeString);
    csvLines.push(csvSafeValues.join(','));
  });

  return csvLines.join('\n');
}

export default Component.extend({
  layout,

  // Default values
  'filename': 'data.csv',
  'linkClass': '',

  /**
   * Data-URL that encodes the contents of the data as a CSV file.
   */
  'csvFileUrl': computed('data', function() {
    const items            = get(this, 'data');
    const csvString        = convertArrayToCsv(items);
    const escapedCsvString = encodeURIComponent(csvString);
    return `data:application/octet-stream,${escapedCsvString}`;
  }),
});
