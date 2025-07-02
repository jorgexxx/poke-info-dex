const pokemonData = [
  { id: "#025", name: "Pikachu", generation: "I", types: ["Electric"], evolutions: ["Pichu", "Raichu"], stats: { hp: 35, atk: 55, def: 40, spd: 90 } },
  { id: "#172", name: "Pichu", generation: "II", types: ["Electric"], evolutions: ["Pikachu", "Raichu"], stats: { hp: 20, atk: 40, def: 15, spd: 60 } },
  { id: "#026", name: "Raichu", generation: "I", types: ["Electric"], evolutions: ["Pichu", "Pikachu"], stats: { hp: 60, atk: 90, def: 55, spd: 110 } },
  { id: "#001", name: "Bulbasaur", generation: "I", types: ["Grass", "Poison"], evolutions: ["Ivysaur", "Venusaur"], stats: { hp: 45, atk: 49, def: 49, spd: 45 } },
  { id: "#002", name: "Ivysaur", generation: "I", types: ["Grass", "Poison"], evolutions: ["Bulbasaur", "Venusaur"], stats: { hp: 60, atk: 62, def: 63, spd: 60 } },
  { id: "#003", name: "Venusaur", generation: "I", types: ["Grass", "Poison"], evolutions: ["Bulbasaur", "Ivysaur"], stats: { hp: 80, atk: 82, def: 83, spd: 80 } },
  { id: "#004", name: "Charmander", generation: "I", types: ["Fire"], evolutions: ["Charmeleon", "Charizard"], stats: { hp: 39, atk: 52, def: 43, spd: 65 } },
  { id: "#005", name: "Charmeleon", generation: "I", types: ["Fire"], evolutions: ["Charmander", "Charizard"], stats: { hp: 58, atk: 64, def: 58, spd: 80 } },
  { id: "#006", name: "Charizard", generation: "I", types: ["Fire"], evolutions: ["Charmander", "Charmeleon"], stats: { hp: 78, atk: 84, def: 78, spd: 100 } },
  { id: "#007", name: "Squirtle", generation: "I", types: ["Water"], evolutions: ["Wartortle", "Blastoise"], stats: { hp: 44, atk: 48, def: 65, spd: 43 } },
  { id: "#008", name: "Wartortle", generation: "I", types: ["Water"], evolutions: ["Squirtle", "Blastoise"], stats: { hp: 59, atk: 63, def: 80, spd: 58 } },
  { id: "#009", name: "Blastoise", generation: "I", types: ["Water"], evolutions: ["Squirtle", "Wartortle"], stats: { hp: 79, atk: 83, def: 100, spd: 78 } },
  { id: "#152", name: "Chikorita", generation: "II", types: ["Grass"], evolutions: [], stats: { hp: 45, atk: 49, def: 65, spd: 45 } },
  { id: "#155", name: "Cyndaquil", generation: "II", types: ["Fire"], evolutions: [], stats: { hp: 39, atk: 52, def: 43, spd: 65 } },
  { id: "#158", name: "Totodile", generation: "II", types: ["Water"], evolutions: [], stats: { hp: 50, atk: 65, def: 64, spd: 43 } },
  { id: "#198", name: "Murkrow", generation: "II", types: ["Dark", "Flying"], evolutions: [], stats: { hp: 60, atk: 85, def: 42, spd: 91 } },
  { id: "#214", name: "Heracross", generation: "II", types: ["Bug", "Fighting"], evolutions: [], stats: { hp: 80, atk: 125, def: 75, spd: 85 } }
];

function getTypeClass(type) {
  return "type " + type.toLowerCase();
}

function getPokeImg(name) {
  // placeholder: use pokeapi sprites or fallback
  const map = {
    "Pikachu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "Pichu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png",
    "Raichu": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
    "Bulbasaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "Ivysaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    "Venusaur": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    "Charmander": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "Charmeleon": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    "Charizard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    "Squirtle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "Wartortle": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    "Blastoise": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    "Chikorita": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",
    "Cyndaquil": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png",
    "Totodile": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png",
    "Murkrow": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png",
    "Heracross": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/214.png"
  };
  return map[name] || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
}

function renderTable(data) {
  try {
    const tbody = document.getElementById("pokemonBody");
    const noResults = document.getElementById("noResults");
    tbody.innerHTML = "";
    if (data.length === 0) {
      noResults.style.display = "block";
      return;
    }
    noResults.style.display = "none";
    data.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td><button class="poke-link" data-name="${p.name}" style="background:none;border:none;color:#1976d2;cursor:pointer;text-decoration:underline;font-size:1em;">${p.name}</button></td>
        <td>${p.generation}</td>
        <td>
          ${p.types.map(t => `<span class="${getTypeClass(t)}">${t}</span>`).join("")}
        </td>
      `;
      tbody.appendChild(tr);
    });
    // Add click listeners for detail navigation
    Array.from(tbody.querySelectorAll(".poke-link")).forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        showDetailByName(btn.dataset.name);
      });
    });
  } catch (e) {
    console.error("Error rendering table", e);
  }
}

function getAllTypes(data) {
  const set = new Set();
  data.forEach(p => p.types.forEach(t => set.add(t)));
  return Array.from(set).sort();
}

function getAllGenerations(data) {
  const set = new Set();
  data.forEach(p => set.add(p.generation));
  return Array.from(set).sort();
}

function populateFilters() {
  try {
    const typeSel = document.getElementById("typeFilter");
    const genSel = document.getElementById("genFilter");
    getAllTypes(pokemonData).forEach(type => {
      const opt = document.createElement("option");
      opt.value = type;
      opt.textContent = type;
      typeSel.appendChild(opt);
    });
    getAllGenerations(pokemonData).forEach(gen => {
      const opt = document.createElement("option");
      opt.value = gen;
      opt.textContent = `Gen ${gen}`;
      genSel.appendChild(opt);
    });
  } catch (e) {
    console.error("Error populating filters", e);
  }
}

function unifiedFilter() {
  try {
    const typeVal = document.getElementById("typeFilter").value;
    const genVal = document.getElementById("genFilter").value;
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

    let filtered = pokemonData;

    if (typeVal) filtered = filtered.filter(p => p.types.includes(typeVal));
    if (genVal) filtered = filtered.filter(p => p.generation === genVal);

    if (searchTerm) {
      filtered = filtered.filter(p => {
        if (p.name.toLowerCase().includes(searchTerm)) return true;
        if (p.evolutions && p.evolutions.some(ev => ev.toLowerCase().includes(searchTerm))) return true;
        return false;
      });
    }

    renderTable(filtered);
  } catch (e) {
    console.error("Error filtering data", e);
  }
}

// DETAILED VIEW
function showDetailByName(name) {
  try {
    const poke = pokemonData.find(p => p.name === name);
    if (!poke) return;
    renderDetail(poke);
    // hide table, show detail
    document.getElementById("pokemonTable").style.display = "none";
    document.getElementById("noResults").style.display = "none";
    document.getElementById("pokemonDetail").style.display = "block";
    document.getElementById("mainTitle").textContent = poke.name;
    // update url hash
    window.location.hash = "#detail-" + encodeURIComponent(poke.name);
  } catch (e) {
    console.error("Error showing detail", e);
  }
}

function renderDetail(poke) {
  try {
    const el = document.getElementById("pokemonDetail");
    el.innerHTML = `
      <div class="pokemon-detail">
        <img class="poke-img" src="${getPokeImg(poke.name)}" alt="${poke.name}">
        <div class="poke-name">${poke.name}</div>
        <div class="poke-gen">Generation ${poke.generation}</div>
        <div class="poke-types">
          ${poke.types.map(t => `<span class="${getTypeClass(t)}">${t}</span>`).join("")}
        </div>
        <div class="poke-stats">
          <div><span>HP:</span> ${poke.stats?.hp ?? "?"}</div>
          <div><span>ATK:</span> ${poke.stats?.atk ?? "?"}</div>
          <div><span>DEF:</span> ${poke.stats?.def ?? "?"}</div>
          <div><span>SPD:</span> ${poke.stats?.spd ?? "?"}</div>
        </div>
        <div class="poke-evolutions">
          <div style="font-weight:600;">Evolutions</div>
          <div class="evo-list">
            ${[poke.name, ...(poke.evolutions||[])].map(evName => {
              const evo = pokemonData.find(p => p.name === evName);
              const active = evName === poke.name ? "active" : "";
              return evo
                ? `<div class="evo-item ${active}" data-name="${evo.name}">
                    <img src="${getPokeImg(evo.name)}" alt="${evo.name}">
                    <div>${evo.name}</div>
                  </div>`
                : "";
            }).join("")}
          </div>
        </div>
        <button id="backBtn" style="margin-top:20px;padding:7px 20px;border-radius:7px;border:none;background:#1976d2;color:#fff;cursor:pointer;">Back to List</button>
      </div>
    `;
    // Add evo click listeners
    Array.from(el.querySelectorAll(".evo-item")).forEach(div => {
      if (!div.classList.contains("active")) {
        div.addEventListener("click", () => {
          showDetailByName(div.dataset.name);
        });
      }
    });
    // Back button
    document.getElementById("backBtn").onclick = () => {
      hideDetail();
    };
  } catch (e) {
    console.error("Error rendering detail", e);
  }
}

function hideDetail() {
  try {
    document.getElementById("pokemonDetail").style.display = "none";
    document.getElementById("pokemonTable").style.display = "";
    document.getElementById("mainTitle").textContent = "Pokémon List - Unified Filters";
    // Remove hash
    history.replaceState(null, "", window.location.pathname);
    unifiedFilter();
  } catch (e) {
    console.error("Error hiding detail", e);
  }
}

// Handle hash navigation (for direct links/back/forward)
function handleHash() {
  try {
    if (window.location.hash.startsWith("#detail-")) {
      const name = decodeURIComponent(window.location.hash.replace("#detail-", ""));
      showDetailByName(name);
    } else {
      hideDetail();
    }
  } catch (e) {
    console.error("Error handling hash", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    populateFilters();
    renderTable(pokemonData);
    document.getElementById("typeFilter").addEventListener("change", unifiedFilter);
    document.getElementById("genFilter").addEventListener("change", unifiedFilter);
    document.getElementById("searchInput").addEventListener("input", unifiedFilter);
    window.addEventListener("hashchange", handleHash);
    // On load, check hash
    handleHash();
  } catch (e) {
    console.error("Init error", e);
  }
});