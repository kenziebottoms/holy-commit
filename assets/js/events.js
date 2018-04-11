"use strict";

const error = require("./error");
const git = require("./git");
const { rate } = require("./language");

// activate all event listeners
module.exports.activateListeners = () => {
    activateSearch();
};

// activate main search button and input
const activateSearch = () => {
    $("#repoSearchBtn").on("click", search);
    $("#repoSearch").on("keypress", event => {
        if (event.keyCode === 13) {
            $("#repoSearchBtn").click();
        }
    });
};

const search = event => {
    let term = $("#repoSearch").val().trim();
    let format = /[a-z]*\/[a-z]*/i;
    if (format.test(term)) {
        let [user, repo] = term.split("/");
        git.getWords(user, repo)
            .then(words => {
                console.log(rate(words));
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        error.display("Bad format. Try 'username/repo'.");
    }
};