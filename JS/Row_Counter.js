function showOptions() {
    document.getElementById("repeatOptions").style.display = ( isChecked("repeat_YES_NO") ? 'block' : 'none' );
}

function show_hide(Id) {
    var element = document.getElementById(Id);
    if (element.style.display == 'block') {
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

function loadProject() {
    var currRow = document.getElementById("currRow");
    var total = document.getElementById("total");
    var percentTotal = document.getElementById("percentTotal");

    currRow.innerHTML = document.getElementById("start").value;
    total.innerHTML = document.getElementById("end").value;
    if (total.innerHTML == 0) {
        document.getElementById("rowTotal").style.display = 'none';
    }
    else {
        document.getElementById("rowTotal").style.display = 'block';
        percentTotal.innerHTML = (currRow.innerHTML / total.innerHTML) * 100;
    }
    
}