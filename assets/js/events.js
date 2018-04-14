"use strict";

const error = require("./error");
const git = require("./git");
const { rate } = require("./language");
const G = `<br/><img src='assets/img/g.png'>`;
const PG = `<br/><img src='assets/img/pg.png'>`;
const PG13 = `<br/><img src='assets/img/pg13.png'>`;
const R = `<br/><img src='assets/img/r.png'>`;
const NC17 = `<br/><img src='assets/img/nc17.png'>`;

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
                let rating = rate(words).toFixed(3);
                if (rating > 0.15) {
                    $("#output").html(`Holy shit. This repo scored ${rating}. You must have dropped a fuck bomb every other goddamn word.${NC17}`);
                } else if (rating > 0.1) {
                    $("#output").html(`Damn. This repo scored ${rating}. I hope you don't have to spend much time around children.${R}`);
                } else if (rating > 0.01) {
                    $("#output").html(`Okay. This repo scored ${rating}. A dev's gotta swear when a dev's gotta swear.${PG13}`);
                } else if (rating > 0.001) {
                    $("#output").html(`Nice. This repo scored ${rating}. I bet you wear button-ups to work.${PG}`);
                } else if (rating > 0) {
                    $("#output").html(`Wow. This repo scored ${rating}. What did you do, forget these were public?${G}`);
                } else if (rating == 0) {
                    $("#output").html(`Duuuude!! This repo scored ${rating}. You must be mature. Not jealous.${G}`);
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        error.display("Bad format. Try 'username/repo'.");
    }
};