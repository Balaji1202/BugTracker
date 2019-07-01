var BugDevSearch = {

    settings : {
        tableHead: document.getElementById("tableHead"),
        bugName: String,  
        devName: String, 
        status: String,
        seriousness: String,
        filterdData: [],
        divContainer: document.getElementById("showData"),
    },

    initSearch: function() {
        Suggestions.settings.search.addEventListener("click", function() {
            Suggestions.waitToLoadData();
        });
    },

    createTableFromJSON: function() {
        BookSearch.filterBooks();
        BookSearch.constructTable();
    },

    filterBooks: function() {
        BookSearch.settings.divContainer.innerHTML = ""
        BookSearch.settings.bugName = document.getElementById("bugName").value.toLowerCase();
        BookSearch.settings.devName = document.getElementById("bname").value.toLowerCase();
        BookSearch.settings.status = document.getElementById("status").value.toLowerCase();
        BookSearch.settings.seriousness = document.getElementById("aname").value.toLowerCase();
        BookSearch.settings.publication = document.getElementById("publ").value.toLowerCase();
        BookSearch.settings.price = +document.getElementById("price").value;
        BookSearch.settings.tableHead.style.removeProperty('display');
        const filterCondition = d =>    d.bugName.toLowerCase().indexOf(BookSearch.settings.bugName) > -1 && 
                                        d["BOOK NAME"].toLowerCase().indexOf(BookSearch.settings.devName) > -1 &&
                                        d.status.toLowerCase().indexOf(BookSearch.settings.status) > -1 &&
                                        d.AUTHOR.toLowerCase().indexOf(BookSearch.settings.seriousness) > -1 &&
                                        d.PUBLICATIONS.toLowerCase().indexOf(BookSearch.settings.publication) > -1 &&
                                        d.PRICE.slice(1)>BookSearch.settings.price;

        BookSearch.settings.filterdData = BookSearch.myBooks.filter(filterCondition);
        BookSearch.settings.filterdData = BookSearch.settings.filterdData
                                            .sort(function(a, b)
                                                    {
                                                        return (a["PRICE"] > b["PRICE"]) ? 1 : ((a["PRICE"] < b["PRICE"]) ? -1 : 0);
                                                    });  
    },

    constructTable: function() {
        BookSearch.settings.divContainer.innerHTML = ""; 
        if(BookSearch.settings.filterdData.length>0)
        {
            var col = [];
            for (var i = 0; i < 1; i++) {
                for (var key in BookSearch.settings.filterdData[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var table = document.createElement("table");

            for (var i = 0; i < BookSearch.settings.filterdData.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = BookSearch.settings.filterdData[i][col[j]];
                }
            }

            table.setAttribute("style","table-layout:fixed");
            table.setAttribute("class","table");
            table.id="myTable";
            BookSearch.settings.divContainer.appendChild(table);
        }
        else
        {
            BookSearch.settings.tableHead.style.display = "none";
            BookSearch.settings.divContainer.innerHTML="<p style='margin-left:330px; padding-top:80px'>Sorry! No data matches your search query!</p>"+
                                    "<i style='font-size:43px; margin-left:460px' class='far fa-frown-open'></i>";
        }
    },
};

var Suggestions = {
    
    settings: {
        dataList: document.getElementById("dataList"),
        arrayList: [],  
        bookInput: document.getElementById("bname"),
        search: document.getElementById("searchButton"),
        devName: String
    },

    initSuggestion: function() {
        
        Suggestions.settings.bookInput.addEventListener("input", function() {
            Suggestions.displayResultOnSuggestionClick(event);
        });
        
        Suggestions.settings.bookInput.addEventListener("keyup", function(event)
        {
            Suggestions.searchOnEnter(event);
        });
        
        Suggestions.settings.bookInput.addEventListener("focus", function() {
            Suggestions.loadDataList();
        });

        Suggestions.settings.search.addEventListener("click", function() {
            Suggestions.waitToLoadData();
        });
    },

    loadDataList: function() {

        for (i=0; i< BookSearch.myBooks.length; i++ ) {
            nextOption = document.createElement("option");
            if(! Suggestions.settings.arrayList.includes( BookSearch.myBooks[i]["BOOK NAME"]) )
            {
                nextOption.setAttribute('value',BookSearch.myBooks[i]["BOOK NAME"]);
                Suggestions.settings.dataList.appendChild(nextOption); 
                Suggestions.settings.arrayList.push(BookSearch.myBooks[i]["BOOK NAME"]);
            }
        }
    },

    waitToLoadData: function() {
    
        var tableHead = document.getElementById("tableHead");
        tableHead.style.display = "none";

        var beforeSearch = document.getElementById("beforeSearch");
        beforeSearch.style.display = "none";

        BookSearch.settings.divContainer.innerHTML="<img style='margin-left:420px' src='../images/searching.gif' alt='Searching!'>";
        setTimeout(function()
        { 
            BookSearch.createTableFromJSON();
        }, 500)
    },

    searchOnEnter: function(event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            Suggestions.settings.search.click();
        }
    },

    displayResultOnSuggestionClick: function()
    {
        Suggestions.settings.devName = document.getElementById("bname").value;
        if($('#dataList option').filter(function() { return this.value.toUpperCase() === Suggestions.settings.devName.toUpperCase(); }).length)
        {
            Suggestions.settings.search.click();
        }
    },
};

Suggestions.initSuggestion();
BookSearch.initSearch();

var myBooksOb = Object.create(BookSearch);
var mySuggestionOb = Object.create(Suggestions);