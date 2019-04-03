/* global XLSX */
import {
  get,
  getWithDefault,
  computed,
} from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/table-exporter-xlsx';

export default Component.extend({
  layout,

  // Default values
  'filename': 'data.xlsx',
  'worksheetTitle': 'Untitled worksheet',
  'linkClass': '',

  'filenameWithXlsxExtension': computed('filename', function() {
    const providedFilename = get(this, 'filename');
    if (providedFilename.toLowerCase().endsWith('.xlsx')) {
      return providedFilename;
    }

    return `${providedFilename}.xlsx`;
  }),

  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  'actions': {
    downloadXlsxFile() {
      const model          = getWithDefault(this, 'data', []);
      const sheet          = XLSX.utils.json_to_sheet(model);
      const workbook       = XLSX.utils.book_new();
      const worksheetTitle = get(this, 'worksheetTitle');
      XLSX.utils.book_append_sheet(workbook, sheet, worksheetTitle);
      const filename = get(this, 'filenameWithXlsxExtension');
      XLSX.writeFile(workbook, filename); // `writeFile` downloads the file
    },
  },
});
