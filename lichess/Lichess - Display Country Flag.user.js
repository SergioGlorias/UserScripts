// ==UserScript==
// @name        Lichess - Display Country Flag
// @name:pt     Lichess - Exibir bandeira do país
// @description Display username + country flag in game ( if user registered his country in 'bio') + rating
// @match       https://lichess.org/*
// @version     4.2
// @grant       none
// @run-at      document-idle
// @author      Sérgio Glórias
// @updateURL   https://github.com/SergioGlorias/UserScripts/raw/main/lichess/Lichess%20-%20Display%20Country%20Flag.user.js
// @downloadURL https://github.com/SergioGlorias/UserScripts/raw/main/lichess/Lichess%20-%20Display%20Country%20Flag.user.js
// @supportURL  https://github.com/SergioGlorias/UserScripts/issues
// ==/UserScript==

let utop = window.document.getElementsByClassName("ruser");

for (let i = 0; i < utop.length; i++) {
  const d = utop[i];
  let user = d.innerText.split("\n")[0];
  if (user.includes(" ")) user = user.split(" ")[1];

  let url = "https://lichess.org/api/user/" + user;
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data.profile && data.profile.flag) {
        const urlflag =
          "https://lichess1.org/assets/_FSSbPA/images/flags/" +
          data.profile.flag +
          ".png";
        const im = new Image();
        im.src = urlflag;
        let e = d.getElementsByTagName("a");
        im.style.marginRight = "5px";
        im.style.float = "left";
        e[0].appendChild(im);
      }
    });
}
