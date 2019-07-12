var BugDevSearch = {

    settings : {
        tableHead: document.getElementById("tableHead"),
        divContainer: document.getElementById("showData"),
        bugName: String,  
        status: String,
        seriousness: String,
        filterdData: [],
        bugsNameSort: document.getElementById("bugsNameSort"),
        devNameSort: document.getElementById("devNameSort"),
        statusSort: document.getElementById("statusSort"),
        seriousnessSort: document.getElementById("seriousnessSort"),
        startDateSort: document.getElementById("startDateSort"),
        dueDateSort: document.getElementById("dueDateSort"),
        bugsData: bugdata,
    },

    initSearch: function() {
        BugDevSearch.createTableFromJSON();
        Suggestions.settings.search.addEventListener("click", function() {
            Suggestions.waitToLoadData();
        });

        BugDevSearch.settings.bugsNameSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('bugsNameSort', 'bugtitle');
        });
        BugDevSearch.settings.devNameSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('devNameSort', 'developername');
        });
        BugDevSearch.settings.statusSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('statusSort', 'statusValue');
        });
        BugDevSearch.settings.seriousnessSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('seriousnessSort', 'seriousnessValue');
        });
        BugDevSearch.settings.startDateSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('startDateSort', 'opendate');
        });
        BugDevSearch.settings.dueDateSort.addEventListener("change", function() {
            BugDevSearch.sortFilteredData('dueDateSort', 'closedate');
        });
    },

    createTableFromJSON: function() {
        var tableHead = document.getElementById("tableHead");
        tableHead.style.display = "none";

        var beforeSearch = document.getElementById("beforeSearch");
        beforeSearch.style.display = "none";

        BugDevSearch.filterBugs();
        BugDevSearch.constructTable();
        BugDevSearch.setToDefault();
    },

    filterBugs: function() {
        BugDevSearch.settings.divContainer.innerHTML = "";
        BugDevSearch.settings.bugName = document.getElementById("bugName").value.toLowerCase();
        BugDevSearch.settings.status = document.getElementById("status").value.toLowerCase();
        BugDevSearch.settings.seriousness = document.getElementById("seriousness").value.toLowerCase();
        
        BugDevSearch.settings.tableHead.style.removeProperty('display');
        const filterCondition = d =>    d.bugtitle.toLowerCase().indexOf(BugDevSearch.settings.bugName) > -1 && 
                                        d.seriousness.toLowerCase().indexOf(BugDevSearch.settings.seriousness) > -1 &&
                                        d.status.toLowerCase().indexOf(BugDevSearch.settings.status) > -1 ;

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

    setToDefault: function() {
        BugDevSearch.settings.bugsNameSort.selected = "none";
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
                    if(j == 5 || j == 3)
                        continue;
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
        dataList1: document.getElementById("dataList1"),
        dataList2: document.getElementById("dataList2"),
        arrayList: [],  
        bugInput: document.getElementById("bugName"),
        devInput: document.getElementById("devName"),
        search: document.getElementById("searchButton"),
        bugName: String
    },

    initSuggestion: function() {
        
        if(Suggestions.settings.bugInput) {
            Suggestions.settings.bugInput.addEventListener("input", function() {
                Suggestions.displayResultOnSuggestionClick(event);
            });
            
            Suggestions.settings.bugInput.addEventListener("keyup", function(event)
            {
                Suggestions.searchOnEnter(event);
            });
            
            Suggestions.settings.bugInput.addEventListener("focus", function() {
                Suggestions.loadDataList(dataList1, 'bugtitle');
            });
        }

        if(Suggestions.settings.devInput) {
            Suggestions.settings.devInput.addEventListener("focus", function() {
                Suggestions.loadDataList(dataList2, 'developername');
            });
        }
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
        Suggestions.settings.bugName = document.getElementById("bugName").value;
        if($('#dataList option').filter(function() { return this.value.toUpperCase() === Suggestions.settings.bugName.toUpperCase(); }).length)
        {
            Suggestions.settings.search.click();
        }
    },
};

Suggestions.initSuggestion();
BugDevSearch.initSearch();

// var bugsOb = Object.create(BugDevSearch);
// var mySuggestionOb = Object.create(Suggestions);