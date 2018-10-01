/*
Google Maps fallback script to display city name instead of map during map's unavailability
Pass parameter ?maps_fallback=no in the url to see the maps experience
*/
var len = document.querySelectorAll("tbody>tr").length;
function handleCityDisplay(e) {
    if (e.target.className.indexOf("btn-secondary") === -1) {
        return;
    }
    var trs = document.querySelectorAll("tbody>tr");
    var safeThreshold = 0;
    var _chk = function() {
        if (trs.length === len) {
            trs = document.querySelectorAll("tbody>tr");
            safeThreshold++;
            if (safeThreshold < 242) {
                setTimeout(_chk, 22);
            }
        } else {
            len = trs.length;
            var cell, attr, arr, inp;
            [].forEach.call(trs, function(row) {
                try {
                    cell = row.querySelector("td");
                    attr = cell.getAttribute("data-reactid");
                    arr = attr.split(".");
                    inp = arr[arr.length - 2].split("$").join("");
                    cell.innerHTML = "<span style=\"font-size:22px;font-weight:bold;\">" + inp + "</span>";
                } catch (exjs) {
                    window.console && console.log(exjs);
                }
            });
        }
    };
    _chk();
}
if(window.location.search.indexOf("maps_fallback=no") === -1){
  document.querySelector("body").addEventListener("click", handleCityDisplay, false);
}
