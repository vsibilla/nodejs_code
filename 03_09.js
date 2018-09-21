function compute_intersection(arr1,arr2,callback){
    // spezziamo il più grande dei due array
    var bigger = arr1.length > arr2.length ? arr1 : arr2;
    var smaller = bigger == arr1 ? arr2 : arr1;
    var biglen = bigger.length;
    var smlen = smaller.length;

    var sidx = 0;           // indice di partenza di ogni pezzo
    var size = 10;          // dimensione, si può regolare
    var results = [];       // risultati intermedi

    // per ogni pezzo di "tot" elementi nell'array più grande, cerchiamo nel più piccolo
    function sub_compute_intersection(){
        for(var i=sidx;i<(sidx+size) && i<biglen;i++) {
            for(var j=0;j<smlen;j++){
                if(bigger[i]==smaller[j]){
                    results.push(smaller[j]);
                    break;
                }
            }
        }

        if(i>=biglen){
            callback(null,results);         // nessun errore, restituisce i risultati
        } else {
            sidx += size;
            process.nextTick(sub_compute_intersection);
        }
    }

    sub_compute_intersection();
}

var a1 = [3476, 2457, 7547, 34523, 3, 6, 7, 2, 77, 213,23452,422,624,524,624,25,246,213,23452,422,624,524,624,25,246,213,23452,422,624,524,624,25,246];
var a2 = [433,23457,456,134,6,34,,647,347,231,76790,12431,526424,2602022,26,51,6126,2,534,7,213,23452,422,624,524,624,25,246,213,23452,422,624,524,624,25,246];

compute_intersection(a1,a2,function(err,results) {
    if(err){
        console.log(err);
    } else {
        console.log(results);
    }
});