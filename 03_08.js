var fs = require('fs');

function FileObject(){

    this.filename = '';

    this.file_exists = function(callback) {
        var self = this;

        console.log("About to open: " + self.filename);
        fs.open(this.filename,'r',function(err,handle){
            if(err){
                console.log("Can't open: " + self.filename);
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

fo.file_exists = function(callback) {
    var self = this;

    console.log("About to open: " + self.filename);
    fs.open(this.filename,'r', function(err,handle) {
        if(err){
            console.log("Can't open: " + self.filename);
            callback(err);
            return;
        }

        fs.close(handle, function(){});
        callback(null,true);
    });
};