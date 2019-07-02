function persistData() {
    var textFile = null,
    
    makeTextFile = function (text) 
    {
        var data = new Blob([text], {type: 'text/plain'});
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };
    
    
    var create = document.getElementById('create');
    
    create.addEventListener('click', function () 
    {
            var link = document.getElementById('download');
            link.href =  makeTextFile(JSON.stringify(bugdata));
            link.style.display = 'block';
    }, false);
};

persistData();