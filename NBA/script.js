var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var form = document.querySelector("#player-search");
var position = document.querySelector("#position");
var fgprecent = document.querySelector("#field-goals-precents");
var threeprecent = document.querySelector("#three-precents");
var points = document.querySelector("#points");
var BASEURL = "https://nbaserver-q21u.onrender.com/api/";
var Positions;
(function (Positions) {
    Positions[Positions["PG"] = 0] = "PG";
    Positions[Positions["SG"] = 1] = "SG";
    Positions[Positions["SF"] = 2] = "SF";
    Positions[Positions["PF"] = 3] = "PF";
    Positions[Positions["C"] = 4] = "C";
})(Positions || (Positions = {}));
var setElements = function (position) {
    var elements = {
        maindiv: undefined,
        heading: undefined,
        detaildiv: undefined,
    };
    elements.maindiv = document.getElementById("".concat(position, "div"));
    elements.heading = elements.maindiv.querySelector("h3");
    elements.detaildiv = elements.maindiv.querySelector("div");
    return elements;
};
var SetPlayer = function (player, playerelements) {
    //cleaning
    playerelements.detaildiv.innerHTML = "";
    //starting to insert
    playerelements.heading.innerText = player.playerName || "";
    var playerPoints = document.createElement('h4');
    playerPoints.textContent = "Points : ".concat(player.points);
    var playerTwo = document.createElement('h4');
    playerTwo.textContent = "Two Precents : ".concat(player.twoPercent, "%");
    var playerThree = document.createElement('h4');
    playerThree.textContent = "Three Precents : ".concat(player.threePercent, "%");
    playerelements.detaildiv.appendChild(playerThree);
    playerelements.detaildiv.appendChild(playerTwo);
    playerelements.detaildiv.appendChild(playerPoints);
};
var team = [
    setElements("PG"),
    setElements("SG"),
    setElements("SF"),
    setElements("PF"),
    setElements("C"),
];
var postData = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (url, data) {
        var response, message, responseData, error_1;
        if (url === void 0) { url = ""; }
        if (data === void 0) { data = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        })];
                case 1:
                    response = _a.sent();
                    // Check if the response was successful
                    if (!response.ok) {
                        message = "An error occurred: ".concat(response.statusText);
                        throw new Error(message);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseData = _a.sent();
                    return [2 /*return*/, responseData]; // Return the data from the response
                case 3:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
form.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var filterPlayer, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                console.log("started filterring");
                filterPlayer = {
                    position: position.value,
                    threePercent: threeprecent.valueAsNumber,
                    twoPercent: fgprecent.valueAsNumber,
                    points: points.valueAsNumber,
                };
                return [4 /*yield*/, postData(BASEURL + "filter", filterPlayer)];
            case 1:
                response = _a.sent();
                updateTable(response);
                return [2 /*return*/];
        }
    });
}); });
function updateTable(players) {
    // Clear existing table entries
    var tbody = document.querySelector("#main-search-tbody");
    tbody.innerHTML = "";
    // Generate new rows for each player and append to the table
    players.forEach(function (player) {
        var _a;
        var row = document.createElement("tr");
        var playerCell = document.createElement("td");
        playerCell.textContent = player.playerName || "";
        var positionCell = document.createElement("td");
        positionCell.textContent = player.position;
        var pointsCell = document.createElement("td");
        pointsCell.textContent = "".concat(player.points);
        var fgPercentCell = document.createElement("td");
        fgPercentCell.textContent = "".concat(player.twoPercent);
        var threePercentCell = document.createElement("td");
        threePercentCell.textContent = "".concat(player.threePercent);
        var ActionCell = document.createElement("td");
        var Addbutton = document.createElement("button");
        Addbutton.id = "AddButton";
        Addbutton.textContent = "Add ".concat((_a = player.playerName) === null || _a === void 0 ? void 0 : _a.split(" ")[0], " to Current Team");
        Addbutton.addEventListener("click", function (e) { SetPlayer(player, team[Positions[player.position]]); });
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
