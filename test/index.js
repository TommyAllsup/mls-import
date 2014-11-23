"use strict";

var fs = require('fs'),
    path = require('path'),
    should = require('chai').should(),
    mlsImport = require('../index'),
    importResidential = mlsImport.importResidential;

describe('#importResidential', function() {
    // Load sample data
    var buffer = fs.readFileSync(path.join(__dirname, '/sample-data/RES_IDX_DATA_COMPACT_10222014.txt'));
    var contents = buffer.toString('utf-8');

    it('returns an array of listing;', function() {
        importResidential(contents).should.not.empty();
    });

});