'use strict';

module.exports = {
  name: 'ember-table-exporter',

  included(app) {
    this._super.included.apply(this, arguments);

    // Define `XLSX` global
    app.import('node_modules/xlsx/dist/xlsx.full.min.js');
  },
};
