"use strict";

const _ = require("lodash");

const badWords = [
  {
    pattern: /fuck/gi,
    severity: 1
  }, {
    pattern: /shit/gi,
    severity: 0.9
  }, {
    pattern: /cock/gi,
    severity: 0.9
  }, {
    pattern: /dick/gi,
    severity: 0.7
  }, {
    pattern: /hell/gi,
    severity: 0.3
  }, {
    pattern: /crap/gi,
    severity: 0.1
  }, {
    pattern: /dang/gi,
    severity: 0.05
  }, { 
    pattern: /damn/gi,
    severity: 0.1
  }, {
    pattern: /doggone/gi,
    severity: 0.05
  }, {
    pattern: /[^a-zA-Z]+bs[^a-zA-Z]+/gi,
    severity: 0.075
  }, {
    pattern: /heck/gi,
    severity: 0.5
  }, {
    pattern: /shoot/gi,
    severity: 0.25
  }
];

module.exports.rate = words => {
  let paragraph = words.join(" ");
  let score = 0;
  badWords.forEach(w => {
    let match = paragraph.match(w.pattern);
    if (match) score += paragraph.match(w.pattern).length*w.severity;
  });
  return score/words.length;
};