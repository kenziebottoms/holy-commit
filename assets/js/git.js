"use strict";

const _ = require("lodash");
const { GITHUB } = require("./keys");

const getCommits = (user, repo, page) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: `${GITHUB.url}/repos/${user}/${repo}/commits?author=${user}&page=${page}`,
            headers: { "Authorization": `token ${GITHUB.token}` }
        })
            .done(response => {
                resolve(response.map(r => r.commit.message));
            })
            .fail(err => reject(err));
    });
};

const getContributions = (user, repo) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: `${GITHUB.url}/repos/${user}/${repo}/contributors`,
            headers: { "Authorization": `token ${GITHUB.token}` }
        })
            .done(response => {
                resolve(response.find(r => r.login == user).contributions);
            })
            .fail(err => reject(err));
    });
};

module.exports.getWords = (user, repo) => {
    return new Promise((resolve, reject) => {
        getContributions(user, repo)
            .then(contribs => {
                let commitPromises = [];
                for (let i = 0; i < contribs / 30; i++) {
                    commitPromises.push(getCommits(user, repo, i + 1));
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
                resolve(allWords);
            })
            .catch(err => reject(err));
    });
};