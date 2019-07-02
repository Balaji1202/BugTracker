
var BugDevSearch = {

    settings : {
        bugName: String,  
        devName: String, 
        status: String,
        seriousness: String,
        filterdData: [],
        bugsData: bugdata,
    },
};

var Suggestions = {
    
    settings: {
        dataList1: document.getElementById("dataList1"),
        dataList2: document.getElementById("dataList2"),
        arrayList: [],  
        bugInput: document.getElementById("bugName"),
        devInput: document.getElementById("devName"),
        bugName: String
    },

    initSuggestion: function() {
        
        Suggestions.settings.bugInput.addEventListener("focus", function() {
            Suggestions.loadDataList(dataList1, 'bugtitle');
        });

        Suggestions.settings.devInput.addEventListener("focus", function() {
            Suggestions.loadDataList(dataList2, 'developername');
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
};

var AddDataToJSON = {
    settings : {
        bugName: document.getElementById("bugName"),
        devName: document.getElementById("devName"),
        status: document.getElementById("status"),
        seriousness: document.getElementById("seriousness"),
        openDate: document.getElementById("openDate"),
        closeDate: document.getElementById("closeDate"),
        bugData: bugdata,
    },

    createDataObject: function() {
        let bugName = AddDataToJSON.settings.bugName.value;
        let devName = AddDataToJSON.settings.devName.value;
        let status = AddDataToJSON.settings.status.value;
        let seriousness = AddDataToJSON.settings.seriousness.value;
        let openDate = AddDataToJSON.settings.openDate.value;
        let closeDate = AddDataToJSON.settings.closeDate.value;
        var value;
        if(seriousness == "Low")
        {
            value = 1;
        }
        else if(seriousness == "Medium")
        {
            value = 2;
        }
        else if(seriousness == "High")
        {
            value = 3;
        }
        else if(seriousness == "Higher")
        {
            value = 4;
        }

        let dataObject = {
            "bugtitle": bugName,
            "developername": devName,
            "status": status,
            "seriousness": seriousness,
            "opendate": openDate,
            "closedate": closeDate,
            "value": value,
        }
        bugdata.push(dataObject);
        alert("Data added successfully");
    }
}


document.getElementById("submit").onclick = function(event)
{
    AddDataToJSON.createDataObject();
};
Suggestions.initSuggestion();
