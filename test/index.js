"use strict";

var fs = require('fs'),
    path = require('path'),
    should = require('chai').should(),
    mlsImport = require('../index'),
    importResidential = mlsImport.importResidential,
    common = require('../lib/common');

// mlsImport Tests
describe('#importResidential', function() {
    // Load sample data
    var buffer = fs.readFileSync(path.join(__dirname, '/sample-data/RES_IDX_DATA_COMPACT_10222014.txt'));
    var contents = buffer.toString('utf-8');

    it('returns an array of listing;', function() {
        importResidential(contents).should.not.empty();
    });

});

// /lib/common tests
describe('#convertToDataType', function () {
    // Stage data
    var characterCol = {dataType: 'Character', interpretation: ''};
    var characterLookupMultiCol = {dataType: 'Character', interpretation: 'LookupMulti'};
    var tinyCol = {dataType: 'Tiny'};
    var smallCol = {dataType: 'Small'};
    var intCol = {dataType: 'Int'};
    var dateCol = {dataType: 'Date'};
    var dateTimeCol = {dataType: 'DateTime'};
    var booleanCol = {dataType: 'Boolean'};
    var decimalCol = {dataType: 'Decimal', precision: 2};

    common.convertToDataType('stringTest', characterCol);

    it('returns a string for a string column;', function() {
        common.convertToDataType('stringTest', characterCol)
            .should.equal('stringTest');
    });

    it('returns an array of strings for a string column that is a LookupMulti;', function() {
        var value = "tommy, is, super, awesome";
        common.convertToDataType(value, characterLookupMultiCol)
            .should.be.instanceof(Array);

        common.convertToDataType(value, characterLookupMultiCol)
            .should.eql(['tommy', 'is', 'super', 'awesome']);
    });

    it('returns an int for a tiny column;', function() {
        common.convertToDataType('10', tinyCol)
            .should.equal(10);
    });

    it('returns an int for a small column;', function() {
        common.convertToDataType('11', smallCol)
            .should.equal(11);
    });

    it('returns an int for a int column;', function() {
        common.convertToDataType('12', intCol)
            .should.equal(12);
    });

    it('returns an date for a date column;', function() {
        var stringDate = "2014-05-17";
        var expectedDate = new Date(stringDate);

        common.convertToDataType(stringDate, dateCol)
            .should.eql(expectedDate);
    });

    it('returns an date for a dateTime column;', function() {
        var stringDate = "2012-06-26T15:07:40";
        var expectedDate = new Date(stringDate);
        common.convertToDataType(stringDate, dateTimeCol)
            .should.eql(expectedDate);
    });

    it('returns a boolean for a boolean column;', function() {
        common.convertToDataType('1', booleanCol)
            .should.be.equal(true);

        common.convertToDataType('0', booleanCol)
            .should.be.equal(false);
    });

    it('returns a decimal for a decimal column;', function() {
        common.convertToDataType('150.43', decimalCol)
            .should.be.equal(150.43);

    });


});

describe('#createFormatHashTable', function() {
    // prep data
    var format = {
        "columns": [
            {
                "systemName": "AcreageSource",
                "longName": "Acreage Source",
                "maximumLength": "5",
                "dataType": "Character",
                "precision": "0",
                "interpretation": "Lookup",
                "units": "",
                "minimum": "0",
                "maximum": "0"
            },
            {
                "systemName": "Acres",
                "longName": "Acres",
                "maximumLength": "9",
                "dataType": "Decimal",
                "precision": "3",
                "interpretation": "Number",
                "units": "Acres",
                "minimum": "0",
                "maximum": "99999.999"
            }
        ]
    }

    it('returns hash table for the format object', function() {
        common.createFormatHashTable(format).should.include.keys("acreageSource");

    })


});