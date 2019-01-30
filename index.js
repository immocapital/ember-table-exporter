'use strict';

module.exports = {
  name: 'ember-xlsx',

  included(app) {
    this._super.included.apply(this, arguments);

    // Define `XLSX` global
    app.import('node_modules/xlsx/dist/xlsx.full.min.js');
  },
};
