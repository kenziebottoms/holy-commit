"use strict";

const { GITHUB } = require("./keys");

module.exports.getCommits = (user, repo, page) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: "GET",
            url: `${GITHUB.url}/repos/${user}/${repo}/commits?page=${page}`,
            headers: {"Authorization": `token ${GITHUB.token}`}
        })
            .done(response => {
                resolve(response.map(r => r.commit.message));
            })
            .fail(err => reject(err));
    });
};