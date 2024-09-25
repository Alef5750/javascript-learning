"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#player-search");
const position = document.querySelector("#position");
const fgprecent = document.querySelector("#field-goals-precents");
const threeprecent = document.querySelector("#three-precents");
const points = document.querySelector("#points");
const BASEURL = "https://nbaserver-q21u.onrender.com/api/";
var Positions;
(function (Positions) {
    Positions[Positions["PG"] = 0] = "PG";
    Positions[Positions["SG"] = 1] = "SG";
    Positions[Positions["SF"] = 2] = "SF";
    Positions[Positions["PF"] = 3] = "PF";
    Positions[Positions["C"] = 4] = "C";
})(Positions || (Positions = {}));
const setElements = (position) => {
    let elements = {
        maindiv: undefined,
        heading: undefined,
        detaildiv: undefined,
    };
    elements.maindiv = document.getElementById(`${position}div`);
    elements.heading = elements.maindiv.querySelector("h3");
    elements.detaildiv = elements.maindiv.querySelector("div");
    return elements;
};
const SetPlayer = (player, playerelements) => {
    //cleaning
    playerelements.detaildiv.innerHTML = "";
    //starting to insert
    playerelements.heading.innerText = player.playerName || "";
    const playerPoints = document.createElement('h4');
    playerPoints.textContent = `Points : ${player.points}`;
    const playerTwo = document.createElement('h4');
    playerTwo.textContent = `Two Precents : ${player.twoPercent}%`;
    const playerThree = document.createElement('h4');
    playerThree.textContent = `Three Precents : ${player.threePercent}%`;
    playerelements.detaildiv.appendChild(playerThree);
    playerelements.detaildiv.appendChild(playerTwo);
    playerelements.detaildiv.appendChild(playerPoints);
};
const team = [
    setElements("PG"),
    setElements("SG"),
    setElements("SF"),
    setElements("PF"),
    setElements("C"),
];
const postData = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (url = "", data = {}) {
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        // Check if the response was successful
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            throw new Error(message);
        }
        const responseData = yield response.json(); // Parse JSON data from the response
        return responseData; // Return the data from the response
    }
    catch (error) {
        console.error("Error:", error);
    }
});
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    console.log("started filterring");
    const filterPlayer = {
        position: position.value,
        threePercent: threeprecent.valueAsNumber,
        twoPercent: fgprecent.valueAsNumber,
        points: points.valueAsNumber,
    };
    const response = yield postData(BASEURL + "filter", filterPlayer);
    updateTable(response);
}));
function updateTable(players) {
    // Clear existing table entries
    const tbody = document.querySelector("#main-search-tbody");
    tbody.innerHTML = "";
    // Generate new rows for each player and append to the table
    players.forEach((player) => {
        var _a;
        const row = document.createElement("tr");
        const playerCell = document.createElement("td");
        playerCell.textContent = player.playerName || "";
        const positionCell = document.createElement("td");
        positionCell.textContent = player.position;
        const pointsCell = document.createElement("td");
        pointsCell.textContent = `${player.points}`;
        const fgPercentCell = document.createElement("td");
        fgPercentCell.textContent = `${player.twoPercent}`;
        const threePercentCell = document.createElement("td");
        threePercentCell.textContent = `${player.threePercent}`;
        const ActionCell = document.createElement("td");
        const Addbutton = document.createElement("button");
        Addbutton.id = "AddButton";
        Addbutton.textContent = `Add ${(_a = player.playerName) === null || _a === void 0 ? void 0 : _a.split(" ")[0]} to Current Team`;
        Addbutton.addEventListener("click", (e) => { SetPlayer(player, team[Positions[player.position]]); });
        ActionCell.appendChild(Addbutton);
        // Append cells to the row
        row.appendChild(playerCell);
        row.appendChild(positionCell);
        row.appendChild(pointsCell);
        row.appendChild(fgPercentCell);
        row.appendChild(threePercentCell);
        row.appendChild(ActionCell);
        // Append row to the tbody
        tbody.appendChild(row);
    });
}
