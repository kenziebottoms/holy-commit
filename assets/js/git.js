"use strict";

const { GITHUB } = require("./keys");

module.exports.getCommits = (user, repo, page) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: `${GITHUB.url}/repos/${user}/${repo}/commits?author=${user}&page=${page}`,
            headers: {"Authorization": `token ${GITHUB.token}`}
        })
            .done(response => {
                resolve(response.map(r => r.commit.message));
            })
            .fail(err => reject(err));
    });
};

module.exports.getContributions = (user, repo) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: `${GITHUB.url}/repos/${user}/${repo}/contributors`,
            headers: {"Authorization": `token ${GITHUB.token}`}
        })
            .done(response => {
                resolve(response.find(r => r.login == user).contributions);
            })
            .fail(err => reject(err));
    });
};