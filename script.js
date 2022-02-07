var config = {
    "Documents": [
        "pdf",
        "doc",
        "docx",
        "csv",
        "xls",
        "xlsx",
        "txt",
        "rtf",
        "odt",
        "ppt",
        "pptx",
        "pptm",
        "xml",
        "klm"
    ],
    "Databases": [
        "php",
        "sql",
        "sqlite",
        "pdb",
        "idb",
        "cdb",
        "sis",
        "odb"
    ],
    "Software": [
        "env",
        "cfg",
        "conf",
        "config",
        "cfm",
        "log",
        "inf"
    ]
};
var checkDocuments = document.getElementById("searchDocuments");
var checkDatabases = document.getElementById("searchDatabases");
var checkSoftware = document.getElementById("searchSoftware");
var counter = 0;

var site = document.getElementById('site');
var keyword = document.getElementById('keyword');

function search(){
    counter = 0;

    if (!checkDocuments.checked && !checkDatabases.checked && !checkSoftware.checked){
        alert("Looks like you haven't typed anything yet!");
    }

    if (checkDocuments.checked){search_documents();}
    if (checkDatabases.checked){search_databases();}
    if (checkSoftware.checked){search.software();}
    // Check if it detected blocked popups
    if (counter > 0){
        alert("Looks like ${counter} popups have been blocked, please check your browser settings and try again!");
    }
}

function search_documents() {
    config.Documents.forEach(element => {
        if(_hasPopupBlocker(window.open("http://google.com/search?q=site%3A${site.value}+filetype%3A${element}+%22${keyword.value}%22", "_blank"))){
            counter += 1;
        }
    });
}

function search_databases() {
    config.Databases.forEach(element => {
        if(_hasPopupBlocker(window.open("http://google.com/search?q=site%3A${site.value}+filetype%3A${element}+%22${keyword.value}%22", "_blank"))){
            counter += 1;
        }
    });
}

function search_software() {
    config.Software.forEach(element => {
        if(_hasPopupBlocker(window.open("http://google.com/search?q=site%3A${site.value}+filetype%3A${element}+%22${keyword.value}%22", "_blank"))){
            counter += 1;
        }
    }); 
}

function _hasPopupBlocker(poppedWindow) {
    var result = false;
    try {
        if (typeof poppedWindow == 'undefined') {
            // Safari with popup blocker... leaves the popup window handle undefined
            result = true;
        }
        else if (poppedWindow && poppedWindow.closed) {
            // This happens if the user opens and closes the client window...
            // Confusing because the handle is still available, but it's in a "closed" state.
            // We're not saying that the window is not being blocked, we're just saying
            // that the window has been closed before the test could be run.
            result = false;
        }
        else if (poppedWindow && poppedWindow.test) {
            // This is the actual test. The client window should be fine.
            result = false;
        }
        else {
            // Else we'll assume the window is not OK
            result = true;
        }
    } catch (err) {
        //if (console) {
        //    console.warn("Could not access popup window", err);
        //}
    }
    return result;
}
