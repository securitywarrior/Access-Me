/**
 * FieldResult.js
 * A FieldResult represents the resulting "value" of a form's field after all
 * testing has been performed.
 * It holds all the results generated for a field.
 * This object is used for sorting.
 * @requires result.js
 */
function FieldResult(formIndex, fieldIndex){
    this.fieldIndex = fieldIndex;
    this.formIndex = formIndex;
    this.results = new Array();
    this.maxValue = 0;
    this.maxValueType = 0;
    this.state = 0;
}

/**
 * These consts are used to check what kind of rsults does this fieldresult
 * have.
 */
const fieldresult_has_pass = 0x0001;
const fieldresult_has_warn = 0x0002;
const fieldresult_has_error = 0x0004;

FieldResult.prototype = {
    addResults: function (resultsToAdd) {
        
        for each(var result in resultsToAdd) {
            if (this.maxValueType < result.type){
                this.maxValue = result.value;
                this.maxValueType = result.type;
            }
            else if (this.maxValueType === result.type ) {
                if (this.maxValue < result.value) {
                    this.maxValue = result.value;
                }
            }
            this.state = this.state | result.type;
            this.results.push(result); 
        }
    }
    ,
    count: function(){
        var numTestsRun = 0; 
        var numPasses = 0; 
        var numWarnings = 0;
        var numFailes = 0; 
        for each(var r in this.results) {
            numTestsRun++;
            switch(r.type){
                case RESULT_TYPE_ERROR:
                    numFailes++;
                    break;
                case RESULT_TYPE_WARNING:
                    numWarnings++;
                    break;
                case RESULT_TYPE_PASS:
                    numPasses++;
                    break;
            }
        }
        return [numTestsRun, numFailes, numWarnings, numPasses];
    }
    ,
    getSubmitState: function(){
        return this.results[0].testData;
    }
    ,
    sort: function(){
        var errors = new Array();
        var warnings = new Array();
        var passes = new Array();
        
        for each(var result in this.results) {
            switch(result.type){
                case RESULT_TYPE_ERROR:
                    errors.push(result);
                    break;
                case RESULT_TYPE_WARNING:
                    warnings.push(result);
                    break;
                case RESULT_TYPE_PASS:
                    passes.push(result);
                    break;
            }
        }
        
        return this.results = errors.concat(warnings, passes);
    }
}