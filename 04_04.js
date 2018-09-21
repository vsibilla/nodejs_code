var fs = require('fs');
var http = require('http');

function load_album_list(callback){
    fs.readdir(
        "albums",
        function(err, files){
            if(err){
                callback(err);
                return;
            }
            
            var only_dirs = [];
            (function iterator(index){
                if(index==files.length){                            // se raggiunge la dimensione dell'array, esce dal ciclo
                    callback(null,only_dirs);
                    return;
                }

                fs.stat(
                    "albums/" + files[index],
                    function(err, stats){
                        if(err){
                            callback(err);
                            return;
                        }
                        if(stats.isDirectory()){
                            only_dirs.push(files[index]);
                        }
                        iterator(index+1);                          // itera chiamando se stesso con il valore successivo
                    }
                );
            })(0);
        }
    );
}

function handle_incoming_request(req,res){
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    load_album_list(function(err,albums){
        if(err){
            res.writeHead(200,{"Content-Type": "application/json"});
            res.end(JSON.stringify(err) + "\n");
            return;
        }

        var out = {error: null,
                    data: {albums: albums}};
        res.writeHead(200,{"Content-Type": "application/json"});
        res.end(JSON.stringify(out)+"\n");
    });
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);