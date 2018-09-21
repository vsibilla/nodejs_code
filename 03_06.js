var fs = require('fs');

function FileObject(){

    this.filename = '';

    this.file_exists = function(callback) {
        console.log("About to open: " + this.filename);
        fs.open(this.filename,'r',function(err,handle){
            if(err){
                console.log("Can't open: " + this.filename);
                callback(err);
                return;
            }
            fs.close(handle,function() {});
            callback(null,true);
        });
    };
}

var fo = new FileObject();
fo.filename = 'file_that_not_exist';

fo.file_exists(function(err,results) {
    if(err) {
        console.log("Aw, bummer: " + JSON.stringify(err));
        return;
    }

    console.log("file exists!!!");
});