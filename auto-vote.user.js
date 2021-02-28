// ==UserScript==
// @name         Likrr/Darkness Autovote
// @namespace    http://likrr.pablobls.tech/
// @version      0.0.1
// @description  Autovote for Likrr/Darkness service
// @author       Pablo http://github.com/pbl0
// @match        *://*rivalregions.com/*
// @updateURL    https://github.com/CyberSoldier112/darkness/raw/main/auto-vote.js
// ==/UserScript==

const darknessUrl = "https://darknessvote.com/darkness.php";
const likrrUrl = "https://gentle-fortress-15688.herokuapp.com/missions";
const minute = 10;

function vote(article) {
  $.ajax({
    dataType: "html",
    type: "POST",
    crossDomain: true,
    data: {
      c: c_html,
    },
    url: "/news/ratesec/" + article,
    success: function (data) {
      console.log(data);
      saveVoted(article);
    },
  });
}

function getArticles() {
  $.get(likrrUrl, function (data) {
    console.log("Missions", data);

    if (data.length == 0) {
      localStorage.setItem("likrr-last-vote", c());
    } else {
      for (let article of data) {
        voted = getVoted();
        if (!voted.includes(article)) {
          setTimeout(function () {
            vote(article);
          }, 1500);
        }
        if (article == data[data.length - 1]) {
          localStorage.setItem("likrr-last-vote", c());
        }
      }
    }
  });
}


function getfdArticles() {
  $.get(darknessUrl, function (data) {
    console.log("Missions", data);

    if (data.length == 0) {
      localStorage.setItem("darkness-last-vote", c());
    } else {
      for (let article of data) {
        voted = getVoted();
        if (!voted.includes(article)) {
          setTimeout(function () {
            vote(article);
          }, 1500);
        }
        if (article == data[data.length - 1]) {
          localStorage.setItem("darkness-last-vote", c());
        }
      }
    }
  });
}


function saveVoted(article) {
  let voted = getVoted();

  if (!voted) {
    voted = [];
  }

  voted.push(article);

  localStorage.setItem("voted", JSON.stringify(voted));
}

function getVoted() {
  const tempVoted = localStorage.getItem("voted");
  let voted
  if (tempVoted){
    voted = JSON.parse(tempVoted) ;
  } else {
    localStorage.setItem("voted", "[]");
    voted = [];
  }

  return voted
  
}

$(document).ready(function () {
  const lastVote = localStorage.getItem("darkness-last-vote");
  if (c() - lastVote >= minute * 60 * 1000) {
    getArticles();
    getfdArticles();

  }

  setInterval(() => {
    getArticles();
    getfdArticles();
  }, minute * 60 * 1000);
});



