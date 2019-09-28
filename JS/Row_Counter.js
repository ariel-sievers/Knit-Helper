//show options for repeats
function showOptions() {
    document.getElementById("repeatOptions").style.display = ( isChecked("repeat_YES_NO") ? 'block' : 'none' );
}

function show_hide(Id) {
    var element = document.getElementById(Id);
    if (element.style.display == 'block' || element.style.display == 'inline-block') {
        element.style.display = 'none';
    }
    else {
        element.style.display = 'block';
    }
}

function showProjectOrSetup() {
    show_hide("setup");
    show_hide("counter");
}

function isChecked(checkId) {
    return document.getElementById(checkId).checked;
}


//sets values to label/span elements
var currRow, total, percentTotal, startRow, endRow;
function loadProject() {
    currRow = document.getElementById("currRow");
    total = document.getElementById("total");
    percentTotal = document.getElementById("percentTotal");

    currRow.innerHTML = startRow;
    total.innerHTML = endRow;
    if (total.innerHTML == 0) {
        document.getElementById("rowTotal").style.display = 'none';
    }
    else {
        document.getElementById("rowTotal").style.display = 'block';
        percentTotal.innerHTML = (currRow.innerHTML / total.innerHTML) * 100;
    }
}

function verify() {
    var pass = true;
    startRow = parseInt(document.getElementById("start").value);
    endRow = parseInt(document.getElementById("end").value);

    //row cannnot be negative
    if (startRow < 1 ) {
        alert("Please enter a positive starting value greater than 1.");
        document.getElementById("start").value = 1;
        pass = false;
    }

    //starting row must be less than ending row
    if (endRow != 0 && startRow >= endRow) {
        alert("The starting row must be less than the total rows.");
        document.getElementById("start").value = 1;
        pass = false;
    }

    if (pass) {
        loadProject();
        showProjectOrSetup();
    }
    
}

//add row and check if complete
function addRow() {
    var value = parseInt(currRow.innerHTML);
    currRow.innerHTML = ++value;
    if (currRow.innerHTML == total.innerHTML) {
        isComplete();
    }
}

//only show complete message
function isComplete() {
    show_hide("currRow");
    show_hide("rowTotal");
    show_hide("addButton");
    show_hide("rowTitle");
    show_hide("completeMessage");
}

//reset values and settings
function reset() {
    
    //reset values
    document.getElementById("start").value = 1;
    document.getElementById("end").value = 0;

    //hide complete message and show everything else
    document.getElementById("currRow").style.display = 'block';
    document.getElementById("rowTotal").style.display = 'block';
    document.getElementById("rowTitle").style.display = 'block';
    document.getElementById("completeMessage").style.display = 'none';
    document.getElementById("addButton").style.display = 'inline-block';
}