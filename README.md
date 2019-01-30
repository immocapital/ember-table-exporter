# ember-xlsx

Ember-wrapper for the XLSX package. Also includes some handy components for downloading EmberData records and plain JavaScript objects as CSV or XLSX files.

## Installation

```
ember install ember-xlsx
```

## Usage

To render a download-link for an XLSX file:

```hbs
{{#xlsx-download-link
  filename='my-fine-data.xlsx'
  data=my-data
  worksheetTitle='Historical weather data'
}}
  Download ALL THE DATA!
{{/xlsx-download-link}}
```

The `data` should be an `Array` (or `EmberArray`) of objects that all have the same shape. They can be either `EmberObject`s or plain JavaScript objects. Example:

```js
[
  { 'date': '2011-04-01', 'rain': 'yes' },
  { 'date': '2012-01-04', 'rain': 'no'  },
]
```

The `filename` and `worksheetTitle` attributes are optional and will use `data.xlsx` and `Untitled worksheet` as fallback values.

To render a download-link for a CSV file:

```hbs
{{#csv-download-link
  filename='my-fine-data.csv'
  data=my-data
}}
  I prefer plain text
{{/csv-download-link}}
```

To use any other functionality provided by the [XLSX][npm-xlsx] package, simply `import XLSX from 'ember-xlsx';`.

## Contributing

### Installation

* `git clone https://github.com/immocapital/ember-xlsx`
* `cd ember-xlsx`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
