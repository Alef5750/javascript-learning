const form = document.querySelector("#player-search") as HTMLFormElement;
const position = document.querySelector("#position") as HTMLInputElement;
const fgprecent = document.querySelector(
  "#field-goals-precents"
) as HTMLInputElement;
const threeprecent = document.querySelector(
  "#three-precents"
) as HTMLInputElement;
const points = document.querySelector("#points") as HTMLInputElement;
const BASEURL = "https://nbaserver-q21u.onrender.com/api/";
type player = {
  position: string;
  twoPercent: Number;
  threePercent: Number;
  points: Number;
  playerName?: string;
};
type FantasyPlayerElement = {
  maindiv: HTMLDivElement;
  heading: HTMLHeadingElement;
  detaildiv: HTMLDivElement;
};

enum Positions {
  PG = 0,
  SG = 1,
  SF = 2,
  PF = 3,
  C = 4,
}

const setElements = (position: string): FantasyPlayerElement => {
  let elements: FantasyPlayerElement = {
    maindiv: undefined as any,
    heading: undefined as any,
    detaildiv: undefined as any,
  };
  elements.maindiv = document.getElementById(
    `${position}div`
  ) as HTMLDivElement;
  elements.heading = elements.maindiv.querySelector("h3") as HTMLHeadingElement;
  elements.detaildiv = elements.maindiv.querySelector("div") as HTMLDivElement;
  return elements;
};

const SetPlayer = (player: player, playerelements: FantasyPlayerElement) => {
  //cleaning
    playerelements.detaildiv.innerHTML = "";
  //starting to insert
  playerelements.heading.innerText = player.playerName || "";
  const playerPoints = document.createElement('h4') as HTMLHeadingElement;
playerPoints.textContent = `Points : ${player.points}`
    const playerTwo = document.createElement('h4') as HTMLHeadingElement;
    playerTwo.textContent = `Two Precents : ${player.twoPercent}%`
    const playerThree = document.createElement('h4') as HTMLHeadingElement;
    playerThree.textContent = `Three Precents : ${player.threePercent}%`

    playerelements.detaildiv.appendChild(playerThree);
    playerelements.detaildiv.appendChild(playerTwo);
    playerelements.detaildiv.appendChild(playerPoints);
    
};

const team: FantasyPlayerElement[] = [
  setElements("PG"),
  setElements("SG"),
  setElements("SF"),
  setElements("PF"),
  setElements("C"),
];
const postData = async (url: string = "", data: any = {}) => {
  try {
    const response: any = await fetch(url, {
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

    const responseData = await response.json(); // Parse JSON data from the response
    return responseData; // Return the data from the response
  } catch (error) {
    console.error("Error:", error);
  }
};

form.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  console.log("started filterring");
  const filterPlayer: player = {
    position: position.value,
    threePercent: threeprecent.valueAsNumber,
    twoPercent: fgprecent.valueAsNumber,
    points: points.valueAsNumber,
  };
  const response = await postData(BASEURL + "filter", filterPlayer);

  updateTable(response);
});

function updateTable(players: player[]) {
  // Clear existing table entries
  const tbody = document.querySelector(
    "#main-search-tbody"
  ) as HTMLTableSectionElement;
  tbody.innerHTML = "";

  // Generate new rows for each player and append to the table
  players.forEach((player) => {
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
    const Addbutton = document.createElement("button") as HTMLButtonElement;
    Addbutton.id = "AddButton";
    Addbutton.textContent = `Add ${
      player.playerName?.split(" ")[0]
    } to Current Team`;
    Addbutton.addEventListener("click", (e: Event) => {SetPlayer(player, team[Positions[player.position as keyof typeof Positions]])});
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
