"use strict";

const error = require("./error");
const git = require("./git");
const _ = require("lodash");

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
        git.getContributions(user, repo)
            .then(contribs => {
                let commitPromises = [];
                for (let i=0; i<contribs/30; i++) {
                    commitPromises.push(git.getCommits(user, repo, i+1));
                }
                return Promise.all(commitPromises);
            })
            .then(commits => {
                let allCommits = _.flattenDeep(commits);
                let words = allCommits.map(c => {
                    c = c.replace(/\-\"\/\'\(\)\[\]\{\}\,\:\;\.\!\?/, "");
                    c = c.replace(/[#-=><+]/gi, " ");
                    c = c.split(/\s/gi);
                    return c;
                });
                let allWords = _.flattenDeep(words).filter(w => {
                    return !!w;
                }).map(w => w.trim());
                console.log(allWords.join(" "));
            })
            .catch(err => error.display(err));
    } else {
        error.display("Bad format. Try 'username/repo'.");
    }
};