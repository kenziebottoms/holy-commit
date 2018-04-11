"use strict";

const _ = require("lodash");

const badWords = [/fuck/g, /shit/g, /dick/g, /hell/g, /crap/g, /dang/g, /damn/g, /doggone/g, /[^a-zA-Z]+bs[^a-zA-Z]+/g, /heck/g, /shoot/g];

module.exports.rate = words => {
  let paragraph = words.join(" ");
  let occs = [];
  badWords.forEach(w => {
    occs.push(paragraph.match(w));
  });
  return (_.compact(_.flatten(occs)).length)/words.length;
};