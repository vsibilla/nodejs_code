var fs = require('fs');

var file;
var buf = new Buffer(100000);
fs.open(
    'info.txt', 'r',
    function(handle){
        file = handle;
    }
);

fs.read(
    file,buffer, 0, 100000, null,
    function() {
        console.log(buf.toString());
        file.close(file,function() { /* non preoccupartene */});
    }
);
