var BugDevSearch = {

    settings : {
        tableHead: document.getElementById("tableHead"),
        filterdData: [],
        divContainer: document.getElementById("showData"),
        devName: String,
        devMail: String,
        devExp: String,
        bugsAssignedSort: document.getElementById("bugsAssignedSort"),
        bugsAliveSort: document.getElementById("bugsAliveSort"),
        bugsSolvedSort: document.getElementById("bugsSolvedSort"),
        devNameSort: document.getElementById("devNameSort"),
        devMailSort: document.getElementById("devMailSort"),
        devExpSort: document.getElementById("devExpSort"),
        bugsData: bugData,
    },

    initSearch: function() {
        BugDevSearch.createTableFromJSON();

        Suggestions.settings.search.addEventListener("click", function() {
            Suggestions.waitToLoadData();
        });
        
        BugDevSearch.settings.devNameSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('devNameSort', 'Name');
        });
        BugDevSearch.settings.devMailSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('devMailSort', 'Email');
        });
        BugDevSearch.settings.devExpSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('devExpSort', 'Experience');
        });
        BugDevSearch.settings.bugsAssignedSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('bugsAssignedSort', 'BugAssignedCount');
        });
        BugDevSearch.settings.bugsAliveSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('bugsAliveSort', 'BugAliveCount');
        });
        BugDevSearch.settings.bugsSolvedSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('bugsSolvedSort', 'BugResolvedCount');
        });
    },

    createTableFromJSON: function() {
        var tableHead = document.getElementById("tableHead");
        tableHead.style.display = "none";

        var beforeSearch = document.getElementById("beforeSearch");
        beforeSearch.style.display = "none";

        BugDevSearch.filterBugs();
        BugDevSearch.constructTable();
    },

    filterBugs: function() {
        BugDevSearch.settings.divContainer.innerHTML = "";
        BugDevSearch.settings.devName = document.getElementById("devName").value.toLowerCase();
        BugDevSearch.settings.devMail = document.getElementById("devMail").value.toLowerCase();
        BugDevSearch.settings.devExp = document.getElementById("devExp").value.toLowerCase();
        
        BugDevSearch.settings.tableHead.style.removeProperty('display');
        const filterCondition = d =>    d.Name.toLowerCase().indexOf(BugDevSearch.settings.devName) > -1 &&
                                        d.Email.toLowerCase().indexOf(BugDevSearch.settings.devMail) > -1 &&
                                        d.Experience.toString().toLowerCase().indexOf(BugDevSearch.settings.devExp) > -1;

        BugDevSearch.settings.filterdData = BugDevSearch.settings.bugsData.filter(filterCondition);
    },

    sortFilteredData: function(sortColumn, field ) {

        BugDevSearch.filterBugs();

        if(BugDevSearch.settings[sortColumn].value == 1) {
            BugDevSearch.settings.filterdData = BugDevSearch.settings.filterdData
                                            .sort(function(a, b)
                                            {
                                                return (a[field] > b[field]) ? 1 : ((a[field] < b[field]) ? -1 : 0);
                                            });  
        }
        else if(BugDevSearch.settings[sortColumn].value == 2) {
            BugDevSearch.settings.filterdData = BugDevSearch.settings.filterdData
                                            .sort(function(a, b)
                                            {
                                                return (a[field] < b[field]) ? 1 : ((a[field] > b[field]) ? -1 : 0);
                                            });  
        }
        BugDevSearch.constructTable();
    },

    constructTable: function() {
        BugDevSearch.settings.divContainer.innerHTML = ""; 
        if(BugDevSearch.settings.filterdData.length>0)
        {
            var col = [];
            for (var i = 0; i < 1; i++) {
                for (var key in BugDevSearch.settings.filterdData[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var table = document.createElement("table");

            for (var i = 0; i < BugDevSearch.settings.filterdData.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = BugDevSearch.settings.filterdData[i][col[j]];
                }
            }

            table.setAttribute("style","table-layout:fixed");
            table.setAttribute("class","table");
            table.id="myTable";
            BugDevSearch.settings.divContainer.appendChild(table);
        }
        else
        {
            BugDevSearch.settings.tableHead.style.display = "none";
            BugDevSearch.settings.divContainer.innerHTML="<p style='margin-left:330px; padding-top:80px'>Sorry! No data matches your search query!</p>"+
                                    "<i style='font-size:43px; margin-left:460px' class='far fa-frown-open'></i>";
        }
    },
};

var Suggestions = {
    
    settings: {
        dataList2: document.getElementById("dataList2"),
        arrayList: [],  
        devInput: document.getElementById("devName"),
        devMail: document.getElementById("devMail"),
        search: document.getElementById("searchButton"),
        devName: String
    },

    initSuggestion: function() {
        Suggestions.settings.devInput.addEventListener("focus", function() {
            Suggestions.loadDataList(dataList1, 'Name');
        });

        Suggestions.settings.devMail.addEventListener("focus", function() {
            Suggestions.loadDataList(dataList2, 'Email');
        });

        Suggestions.settings.devInput.addEventListener("input", function() {
            Suggestions.displayResultOnSuggestionClick(event);
        });
        
        Suggestions.settings.devInput.addEventListener("keyup", function(event)
        {
            Suggestions.searchOnEnter(event);
        });

        Suggestions.settings.devMail.addEventListener("input", function() {
            Suggestions.displayResultOnSuggestionClick(event);
        });
        
        Suggestions.settings.devMail.addEventListener("keyup", function(event)
        {
            Suggestions.searchOnEnter(event);
        });
        Suggestions.settings.search.addEventListener("click", function() {
            Suggestions.waitToLoadData();
        });
    },

    loadDataList: function(list, attribute) {

        for (i=0; i< BugDevSearch.settings.bugsData.length; i++ ) {
            nextOption = document.createElement("option");
            if(! Suggestions.settings.arrayList.includes(BugDevSearch.settings.bugsData[i][attribute]))
            {
                nextOption.setAttribute('value',BugDevSearch.settings.bugsData[i][attribute]);
                list.appendChild(nextOption); 
                Suggestions.settings.arrayList.push(BugDevSearch.settings.bugsData[i][attribute]);
            }
        }
    },

    waitToLoadData: function() {
    
        var tableHead = document.getElementById("tableHead");
        tableHead.style.display = "none";

        var beforeSearch = document.getElementById("beforeSearch");
        beforeSearch.style.display = "none";

        BugDevSearch.settings.divContainer.innerHTML="<img style='margin-left:100px; margin-top:-100px' width:100px; height:100px src='../images/searching.gif' alt='Searching!'>";
        setTimeout(function()
        { 
            BugDevSearch.createTableFromJSON();
        }, 1000)
    },

    searchOnEnter: function(event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            Suggestions.settings.search.click();
        }
    },

    displayResultOnSuggestionClick: function()
    {
        Suggestions.settings.devName = document.getElementById("devName").value;
        if($('#dataList option').filter(function() { return this.value.toUpperCase() === Suggestions.settings.devName.toUpperCase(); }).length)
        {
            Suggestions.settings.search.click();
        }
    },
};

var SearchBox = {

    settings: {
        row: document.getElementById("searchRow"),
        devInput: document.getElementById(""),
    },

    init: function() {
        SearchBox.settings.row.addEventListener("click", function() {
            event.target.style.display = "block";
        })
    }
}
// SearchBox.init();
Suggestions.initSuggestion();
BugDevSearch.initSearch();

// var bugsOb = Object.create(BugDevSearch);
// var mySuggestionOb = Object.create(Suggestions);