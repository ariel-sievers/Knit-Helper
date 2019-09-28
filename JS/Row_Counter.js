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
var currRow, total, percentTotal, startRow, endRow, repeat, repeatStart;
function loadProject() {
    currRow = document.getElementById("currRow");
    total = document.getElementById("total");
    percentTotal = document.getElementById("percentTotal");

    if (isChecked("repeat_YES_NO") && repeat > 0) {
        createBar();
        dot[0].style.background = '#ff8f66';
        show_hide("repeatProgress");
    }

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
    repeat = parseInt(document.getElementById("repeat").value);
    repeatStart = parseInt(document.getElementById("repeatStart").value);

    //starting row or repeats cannot be less than 1
    if (startRow < 1 || repeatStart < 1) {
        alert("Repeat start and starting rows cannot be less than 1.");
        document.getElementById("start").value = 1;
        document.getElementById("repeatStart").value = 1;
        pass = false;
    }

    //ending row or repeats cannot be negative
    if (endRow < 0 || repeat < 0) {
        alert("Ending rows or repeats cannot be negative.");
        document.getElementById("endRow").value = 0;
        document.getElementById("repeat").value = 0;
        pass = false;
    }

    //repeat cannot be more than 6 to keep layout
    if (repeat > 6) {
        alert("Rows per repeats cannot be greater than 6.");
        document.getElementById("repeat").value = 0;
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
var counter = 1;
function addRow() {
    var value = parseInt(currRow.innerHTML);
    currRow.innerHTML = ++value;

    //count repeats after repeatStart
    if (currRow.innerHTML >= repeatStart) {
        if (counter == repeat) {
            counter = 1;
            for (var i = 1; i < repeat; i++) {
                dot[i].style.background = 'transparent';
            }
        }
        else {
            dot[counter++].style.background = '#ff8f66';
        }
    }
    
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
    for (var i = 0; i < repeat; i++) {
        progress.removeChild(dot[i]);
    }
    dot = [];
    document.getElementById("repeat").value = 0;
    document.getElementById("repeatStart").value = 1;

    

    //hide complete message and progress bar, but show everything else
    document.getElementById("currRow").style.display = 'block';
    document.getElementById("rowTotal").style.display = 'block';
    document.getElementById("rowTitle").style.display = 'block';
    document.getElementById("completeMessage").style.display = 'none';
    document.getElementById("repeatProgress").style.display = 'none';
    document.getElementById("addButton").style.display = 'inline-block';
}

//show progress bar for repeats
var dot = [], progress;
function createBar () {
    var n = repeat;
    progress = document.querySelector('.progress');


    for (var i = 0; i < n; i++) {
        dot[i] = document.createElement('div');
        dot[i].classList.add('dot');
        progress.appendChild(dot[i]);
    }
}

