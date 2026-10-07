// First commit
const API = "https://valorant-api.com/v1/agents?language=pt-BR";
const agentsList = document.getElementById("agent-list");
const modal = document.getElementById("modal");

let AGENTS = [];
let openModal = false;

const findAgents = async () => {
  const response = await fetch(API);

  if (response.ok) {
    const data = await response.json();

    const playableAgents = data.data.filter(
      (agent) => agent.isPlayableCharacter,
    );

    AGENTS = playableAgents;

    const list = playableAgents
      .map((agent) => {
        return `
            <li class="card-agent" id="${agent.uuid}" style="background-color: #${agent.backgroundGradientColors[0]};" onclick="handleModal('${agent.uuid}')">
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

const handleModal = (uuid) => {
  const agent = AGENTS.find((a) => a.uuid === uuid);

  if (!agent) return;

  const modalContent = `
    <H2 class="modal-title">${agent.displayName}</H2>
        <div class="modal-content">
            <section class="left-container"
                style="background-image: url(${agent.background});">
                <img src="${agent.fullPortrait}"
                    alt="${agent.displayName}" class="full-img">
            </section>
            <section class=" right-container">
                <div class="agent-content">
                    <p>${agent.description}</p>
                    <p class="class-name">${agent.role.displayName}<span>${agent.role.description}</span></p>
                    <div class="ability-area">
                        ${agent.abilities
                          .map((ability, index) => {
                            return `
                                    <div class="ability-container" id="${index}">
                                        <div class="ability-name">
                                            <img src="${ability.displayIcon}"
                                            alt="${ability.displayName}">
                                            <p>${ability.displayName}</p>
                                        </div>
                                    <p>${ability.description}</p>
                                </div>
                            `;
                          })
                          .join("")}
                    </div>
                </div>
            </section>
            </div>
            <button class="close-btn" onclick="closeModal()">X</button>
    `;

  modal.innerHTML = modalContent;
  modal.style.backgroundColor = `#${agent.backgroundGradientColors[2]}`;
  modal.classList.toggle("show-modal");
};

const closeModal = () => {
  modal.classList.toggle("show-modal");
};
