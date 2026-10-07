// First commit
const API = "https://valorant-api.com/v1/agents?language=pt-BR";
const agentsList = document.getElementById("agent-list");

let AGENTS = null;

const findAgents = async () => {
  const response = await fetch(API);

  if (response.ok) {
    const data = await response.json();

    const playableAgents = data.data.filter(
      (agent) => agent.isPlayableCharacter,
    );

    const list = playableAgents
      .map((agent) => {
        return `
            <li class="card-agent" id="${agent.uuid}" style="background-color: #${agent.backgroundGradientColors[0]};">
                <img src="${agent.fullPortrait}"
                    alt="${agent.displayName}" class="card-image">
                <p class="agent-name">${agent.displayName}</p>
            </li>
    `;
      })
      .join("");

    agentsList.innerHTML = list;
    return;
  }
  agentsList.innerHTML = `<li> No agents </li>`;
  return;
};

findAgents();
