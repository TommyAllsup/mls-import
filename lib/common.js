"use strict";

var changeCase = require('change-case');


function convertToDataType(value, col) {
    if (!value) {
        return null;
    }

    if (!col){
        debugger;
        console.log('col is null.  Value: ' + value);

    }

    var result;
    switch (col.dataType) {
        case "Character":
            if (col.interpretation === "LookupMulti"){
                // Comma separated strings
                var re = /\s*,\s*/;
                result = value.split(re);
            } else {
              result = value;
            }
            break;

        case "Tiny":
        case "Small":
        case "Int":
            result = parseInt(value);
            break;

        case "Date":
        case "DateTime":
            result = new Date(value);
            break;

        case "Boolean":
            // 1 for true, 0 for false
            result = value === "1";
            break;

        case "Decimal":
            result = parseFloat(parseFloat(value).toFixed(col.precision));
            break;

        default:
            console.log("unhandled column");
            console.log(col);
    }

    return result;
}

function createFormatHashTable(format) {
    var hashTable = {};
    format.columns.forEach(function(f) {
        hashTable[changeCase.camelCase(f.systemName)] = f;
    });

    return hashTable;
}

module.exports = {
    convertToDataType : convertToDataType,
    createFormatHashTable: createFormatHashTable
};