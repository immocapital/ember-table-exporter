/* global XLSX */
import {
  get,
  getWithDefault as get_with_default,
  computed,
} from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/xlsx-download-link';

export default Component.extend({
  layout,

  // Default values
  'filename': 'data.xlsx',
  'worksheetTitle': 'Untitled worksheet',
  'linkClass': '',

  'actual_filename': computed('filename', function() {
    const provided_filename = get(this, 'filename');
    if (provided_filename.toLowerCase().match(/\.xlsx$/)) {
      return provided_filename;
    }

    return `${provided_filename}.xlsx`;
  }),

  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  'actions': {
    download_xlsx_file() {
      const model          = get_with_default(this, 'data', []);
      const sheet          = XLSX.utils.json_to_sheet(model);
      const workbook       = XLSX.utils.book_new();
      const worksheetTitle = get(this, 'worksheetTitle');
      XLSX.utils.book_append_sheet(workbook, sheet, worksheetTitle);
      const filename = get(this, 'filename');
      XLSX.writeFile(workbook, filename); // `writeFile` downloads the file
    },
  },
});
