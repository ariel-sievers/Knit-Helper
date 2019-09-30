var yourStitches, yourInches, theirStitches, theirInches, diff, yourSPI, theirSPI;

function showResults() {
    var yourGauge = document.getElementById("yourGauge");
    var increase_decrease = document.getElementById("increase_decrease");
    var difference = document.getElementById("difference");
    var isPlural = document.getElementById("plural");

    calculate(); //calculate results

    //results
    yourGauge.innerHTML = yourSPI;
    increase_decrease.innerHTML = (diff < 0 ? 'increase' : 'decrease');
    difference.innerHTML = Math.abs(diff);
    isPlural.innerHTML = (Math.abs(diff) > 1 ? 'es' : '');
}

function calculate() {
    //calculate stitches per inch
    yourSPI = yourStitches / yourInches;
    theirSPI = theirStitches / theirInches;
    
    //determine new gauge
    var multiplier = yourSPI / theirSPI;
    var newStitchNum = parseInt(yourStitches * multiplier);

    //find the difference between old and new
    diff = yourStitches - newStitchNum;
}

function verify() {
    var pass = true;

    yourStitches = parseInt(document.getElementById("yourStitches").value);
    yourInches = document.getElementById("yourInches").value;
    theirStitches = parseInt(document.getElementById("theirStitches").value);
    theirInches = document.getElementById("theirInches").value;

    if (yourStitches < 0 || yourInches < 0 || theirStitches < 0 || theirInches < 0) {
        alert("Please enter only positive values.");
        document.getElementById("yourStitches").value = 0;
        document.getElementById("yourInches").value = 0;
        document.getElementById("theirStitches").value = 0;
        document.getElementById("theirInches").value;
        pass = false;
    }

    if (pass) {
        document.getElementById("results").style.display = 'block';
        showResults();
    }
}