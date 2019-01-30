import { get, computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/csv-download-link';
import { A } from '@ember/array';

export default Component.extend({
  layout,

  // Default values
  'filename': 'data.csv',
  'linkClass': '',

  convert_value_to_csv_safe_string(input) {
    const coerced_string = (input || '').toString();
    const string_with_quotes_escaped = coerced_string.replace(/"/, '\\"');
    // Convert newlines, tab characters, etc to spaces to avoid unhappy surprises when parsing csv.
    const string_with_whitespace_converted = string_with_quotes_escaped.replace(/\s/g, ' ');
    if (coerced_string.match(/,/) || coerced_string.match(/"/)) {
      return `"${string_with_whitespace_converted}"`;
    }
    return string_with_whitespace_converted;
  },

  convert_array_to_csv(input_array) {
    const input_ember_array = A(input_array); // Ensure we're working with an Ember array

    if (!input_ember_array || get(input_ember_array, 'length') < 1) {
      return '';
    }
    const csv_lines = [];
    const keys = Object.keys(input_ember_array.objectAt(0));
    csv_lines.push(keys.map(this.convert_value_to_csv_safe_string).join(','));
    input_ember_array.forEach((item) => {
      csv_lines.push(keys.map(key => get(item, key)).map(this.convert_value_to_csv_safe_string).join(','));
    });
    return csv_lines.join('\n');
  },


  /**
   * Data-URL that encodes the contents of the data as a CSV file.
   */
  'csv_file_url': computed('data', function() {
    const items              = get(this, 'data');
    const csv_string         = this.convert_array_to_csv(items);
    const escaped_csv_string = encodeURIComponent(csv_string);
    return `data:application/octet-stream,${escaped_csv_string}`;
  }),
});
