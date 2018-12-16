/*----------- HOOKS -----------*/
(function() {
    /*
      Google Maps fallback script to display city name with map link instead of embedded map during map's unavailability
      Pass parameter ?maps_fallback=no in the url to see the embedded maps experience
    */
    var len = document.querySelectorAll("tbody>tr").length;
    var _pinChar = decodeURIComponent("%F0%9F%93%8D");
    var theForm = document.querySelector("form");
    var searchField = document.querySelector("input[placeholder]");
    var submitBtn = document.querySelector("button.btn-secondary");
    var loadMap = function(link) {
        window.open("https://www.google.com/maps/place/" + link.getAttribute("data-city"), "_blank");
    };
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
                        cell.innerHTML = "<a class=\"cityDetailsLink\" href=\"#\" data-city=\"" + inp + "\" onclick=\"loadMap(this);\" style=\"font-size:22px;font-weight:bold;\">" + _pinChar + " <span class=\"cityName\">" + inp + "</span></a>";
                    } catch (exjs) {
                        window.console && console.log(exjs);
                    }
                });
            }
        };
        _chk();
    }

    /* Control the maps fallback based on query param */
    if (window.location.search.indexOf("maps_fallback=no") === -1) {
        document.querySelector("body").addEventListener("click", handleCityDisplay, false);
    }

    /* CUSTOM console.error to hide quota exceed errors */
    if (window.console) {
        var _cerr = console.error;
        console.error = function() {
            if (arguments[0].indexOf("request quota") === -1) {
                _cerr.apply(console, arguments);
            }
        };
    }

    /* Validate empty input and disable the submit button */
    submitBtn.disabled = true;
    theForm.addEventListener("submit", function(e) {
        submitBtn.disabled = true;
    }, false);
    searchField.addEventListener("keyup", function(e) {
        if (searchField.value !== "") {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }, false);
}());
