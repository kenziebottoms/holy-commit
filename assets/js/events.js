"use strict";

const error = require("./error");
const git = require("./git");

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
        git.getCommits(user, repo)
            .then(response => {
                console.log(response);
            })
            .catch(err => error.display(err));
    } else {
        error.display("Bad format. Try 'username/repo'.");
    }
};