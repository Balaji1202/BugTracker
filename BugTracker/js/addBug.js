var FormValidate = { 

    settings: {
        bugName:   document.getElementById("bugName"),
        bugDesc:   document.getElementById("bugDesc"),
        status:    document.getElementById("status"),
        serious:   document.getElementById("serious"),
        openDate:  document.getElementById("openDate"),
        closeDate: document.getElementById("closeDate"),
        totalTime:  document.getElementById("totalTime"),
        remTime:  document.getElementById("remTime"),
        devList:   document.getElementById("devList"),
        devName:   document.getElementById("devName"),
        arrayList: [],
        time: 0,
        rem: 0,

    },

    init: function() {

        FormValidate.settings.closeDate.addEventListener("blur",function() {
            FormValidate.findBugTotalTime();
            FormValidate.findBugRemTime();
            FormValidate.isValid();
        });
    },

    parseDate: function(s) {
        let b = s.split(/\D/);
        return new Date(b[0], --b[1], b[2]);
    },

    findBugTotalTime: function() {

        let closeDate = FormValidate.parseDate(FormValidate.settings.closeDate.value);
        let openDate = FormValidate.parseDate(FormValidate.settings.openDate.value);
        FormValidate.settings.time = (closeDate-openDate)/(1000 * 3600 * 24);
        FormValidate.settings.totalTime.innerHTML = "Given total time is "+FormValidate.settings.time+" day(s)";
    },

    findBugRemTime: function() {
        
        let closeDate = FormValidate.parseDate(FormValidate.settings.closeDate.value);
        let today = new Date();
        today = closeDate - today;
        FormValidate.settings.rem = Math.round(today/(1000 * 3600 * 24));
        FormValidate.settings.remTime.innerHTML = "Remaining time is "+FormValidate.settings.rem+" day(s)";
    },

    isValid: function() {
        if(FormValidate.settings.rem<0){
            FormValidate.settings.remTime.innerHTML = "<p style='color:red'>Deadline crossed</p>";
        }
        if(isNaN(FormValidate.settings.time) || FormValidate.settings.time<0)
        {
            FormValidate.settings.remTime.innerHTML = "<p style='color:red'>Enter a valid date</p>";
            FormValidate.settings.totalTime.innerHTML = "<p style='color:red'>Enter a valid date</p>";
        }
    },
};

FormValidate.init();