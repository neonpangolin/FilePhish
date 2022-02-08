var config = {
    // Easily just add extensions bellow and the program will go through them
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
function search() {
    counter = 0; //reset counter on every click 
    console.log(counter);
    //Checking if none of the checkboxes are checked and alerts the user
    if (!checkDocuments.checked && !checkDatabases.checked && !checkSoftware.checked) {
        alert("You have to check one option");
    }

    //Depending on the checkbox checked, run that query with array provided
    if (checkDocuments.checked) {
        searchQuery(config.Documents);
    }
    if (checkDatabases.checked) {
        searchQuery(config.Databases);
    }
    if (checkSoftware.checked) {
        searchQuery(config.Software);
    }
    // Check if it detected blocked popups
    if (counter > 0) {
        alert(`Our checker says ${counter} popups might have been blocked, please allow popups and try again!`);
    }
}
function searchQuery(array) {
    array.forEach(extension => {
        isBlocked(window.open(`http://google.com/search?q=site%3A${site.value}+filetype%3A${extension}+%22${keyword.value}%22`, "_blank"));
    });
}
function isBlocked(popupWindow){
    if (!popupWindow || popupWindow.closed || typeof popupWindow.closed == 'undefined') {
        counter += 1;
    }
}
