"use strict";

// displays an error for 3 seconds
// flushes existing errors
module.exports.display = msg => {
    let $err = $("#err");
    $err.removeClass("hidden");
    $err.html(msg);
    window.setTimeout(() => {
        $err.addClass("hidden");
    },3000);
};