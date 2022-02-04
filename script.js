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
//--------------------------------------------------------------
//get checkbox elements
var checkDocuments = document.getElementById("searchDocuments");
var checkDatabases = document.getElementById("searchDatabases");
var checkSoftware = document.getElementById("searchSoftware");

var counter = 0; //global counter for blocked popups

//get text placeholders
var site = document.getElementById('site');
var keyword = document.getElementById('keyword');

//--------------------------------------------------------------
function search(){
    counter = 0; //reset counter on every click 

    //Checking if none of the checkboxes are checked and alerts the user
    if (!checkDocuments.checked && !checkDatabases.checked && !checkSoftware.checked){
        alert("You have to select at least one filetype to search for");
    }

    //Depending on the checkbox checked, run that query with array provided
    if (checkDocuments.checked){searchQuery(config.Documents);}
    if (checkDatabases.checked){searchQuery(config.Databases);}
    if (checkSoftware.checked){searchQuery(config.Software);}

    // Check if it detected blocked popups
    if (counter > 0){
        alert(`Looks like ${counter} popups might have been blocked, please check your browser settings and try again!`);
    }
}

// function takes wanted array from config and goes through it and opens tabs with wanted keyword and site
function searchQuery(array) {
    array.forEach(extension => { //for each extension in array, open a website with that extension
        if(_hasPopupBlocker(window.open(`http://google.com/search?q=site%3A${site.value}+filetype%3A${extension}+%22${keyword.value}%22`, "_blank"))){
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
