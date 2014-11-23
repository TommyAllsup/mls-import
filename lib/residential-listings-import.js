"use strict";

var residentialFormat = require('./formats/residential-listings'),
    changeCase = require('change-case');

function getArrayFields() {

    return residentialFormat.columns.filter(function(c){
        return c.interpretation === "LookupMulti";
    });
}

function parse(file) {
    var columns = [];

    // Determine line delimiter

    // Split on file line delimiter
    var tmp = file.split('\r');
    if (tmp.length === 1)
        tmp = file.split('\n');

    var arrayFields = getArrayFields();

    var isFieldArray = function(name) {
        return arrayFields.indexOf(name) > -1;
    };

    // Create an array of objects.  First row contains the prop names
    var propNames = tmp[0].split('\t');
    for (var i = 1; i < tmp.length; i++){
        var col = {};
        var vals = tmp[i].split('\t');
        for (var j=0; j < propNames.length; j++) {
            // In the case of array fields, split values into an array or set to empty array
            var propName = changeCase.camelCase(propNames[j]);
            if (isFieldArray(propName)){
                col[propName] = vals[j] ? vals[j].split(',') : [];
            } else {
                col[propName] = vals[j];
            }
        }

        columns.push(col);
    }

    return columns;
}

module.exports = {
    parse: parse
};