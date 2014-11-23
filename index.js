"use strict";

var residentialParser = require('./lib/residential-listings-import');

function importResidential(file) {
    return residentialParser.parse(file);
}

module.exports = {
    importResidential: importResidential

};