import axios from 'axios';

export var getWorksheet;

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (factory((global.gsheets = global.gsheets || {})));
}(this, (function (exports) { 'use strict';

  var BASE_URL = 'https://spreadsheets.google.com/feeds/';

// Fetching

  function fetchFeed(params) {
    var url = BASE_URL + params.join('/') + '/public/values?alt=json';
    return axios.get(url).then(response => {
      if (response.status !== 200) {
        return Promise.reject(null);
      }
      return response.data;
    }).then(data => {
      return new Promise((resolve, reject) => {
        if (data.feed) resolve(data.feed);
        else reject(null)
      });
    });
  }

  function fetchSpreadsheet(key) {
    return fetchFeed(['worksheets', key]).then(parseSpreadsheetFeed);
  }

  function fetchWorksheetById(key, worksheetId) {
    return fetchFeed(['cells', key, worksheetId]).then(parseWorksheetFeed);
  }

  function fetchWorksheetByTitle(key, worksheetTitle) {
    return fetchSpreadsheet(key).then(function (spreadsheet) {
      return new Promise(function (resolve, reject) {
        var worksheet = spreadsheet.worksheets ? spreadsheet.worksheets.filter(function (d) {
          return d.title === worksheetTitle;
        })[0] : null;
        if (worksheet) {
          resolve(fetchWorksheetById(key, worksheet.id));
        } else {
          reject(new Error('No worksheet with title \'' + worksheetTitle + '\' found.'));
        }
      });
    });
  }

// Parsing

  function parseWorksheetIdInSpreadsheetFeed(uri) {
    var re = /.*\/(.+)$/;
    var matches = re.exec(uri);
    return matches[1];
  }

  function parseWorksheet(worksheet) {
    return {
      id: parseWorksheetIdInSpreadsheetFeed(worksheet.id.$t),
      title: worksheet.title.$t
    };
  }

  function parseSpreadsheetFeed(feed) {
    return {
      updated: feed.updated.$t,
      title: feed.title.$t,
      worksheets: feed.entry.map(parseWorksheet)
    };
  }

  function parseWorksheetFeed(feed) {
    return {
      updated: feed.updated.$t,
      title: feed.title.$t,
      data: feed.entry ? parseCellsIntoRows(feed.entry) : []
    };
  }

  function getCellData(cell) {
    var data = cell.gs$cell;
    return {
      col: +data.col,
      row: +data.row,
      value: data.numericValue ? +data.numericValue : data.$t
    };
  }

  function createRowFromHeaders(headers) {
    return headers.reduce(function (row, key) {
      row[key] = null;
      return row;
    }, {});
  }

  function parseCellsIntoRows(cells) {

    const headers = [];
    const headersByCol = {};
    for (let i = 0; i < cells.length; i++) {
      const cell = getCellData(cells[i]);
      if (cell.row === 2) {
        headers.push('' + cell.value);
        headersByCol[cell.col] = cell.value;
      }
    }

    const bodyByRow = {};
    for (let i = 0; i < cells.length; i++) {
      const cell = getCellData(cells[i]);
      if (cell.row > 2) {
        const row = bodyByRow[cell.row] || createRowFromHeaders(headers);
        const key = headersByCol[cell.col];
        row[key] = cell.value;
        bodyByRow[cell.row] = row;
      }
    }

    return Object.keys(bodyByRow).sort(function (a, b) {
      return +a - +b;
    }).map(function (row) {
      return bodyByRow[row];
    });
  }

// Public API

  getWorksheet = fetchWorksheetByTitle;
  var getWorksheetById = fetchWorksheetById;
  var getSpreadsheet = fetchSpreadsheet;

  exports.getWorksheet = getWorksheet;
  exports.getWorksheetById = getWorksheetById;
  exports.getSpreadsheet = getSpreadsheet;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
