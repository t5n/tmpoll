const endpoint = "YOUR_COSMOS_DB_ENDPOINT_HERE";
const key = "YOUR_COSMOS_DB_KEY_HERE";
const databaseId = "polling";
const containerId = "votes";
const cosmosClient = new CosmosClient({ endpoint, key });

let options = [];
let votes = [];

function getQuestion() {
  return "What is your favorite color?";
}

async function getOptions() {
  const { resources: items } = await cosmosClient
    .database(databaseId)
    .container(containerId)
    .item("options", "options")
    .read();
  if (items && items.length > 0) {
    options = items[0].options;
    votes = new Array(options.length).fill(0);
  } else {
    options = ["Red", "Blue", "Green"];
    votes = [0, 0, 0];
    await cosmosClient
      .database(databaseId)
      .container(containerId)
      .items.create({ id: "options", options: options });
  }
}

async function addOption() {
  const newOption = document.getElementById("option-input").value;
  if (newOption) {
    options.push(newOption);
    votes.push(0);
    await cosmosClient
      .database(databaseId)
      .container(containerId)
      .item("options", "options")
      .replace({ id: "options", options: options });
    displayOptions();
  }
}

function displayQuestion() {
  document.getElementById("poll-question").textContent = getQuestion();
}

function displayOptions() {
  let optionHtml = "";
  for (let i = 0; i < options.length; i++) {
    optionHtml += `<input type="radio" name="option" value="${i}">
                   <label>${options[i]}</label><br>`;
  }
  document.getElementById("poll-options").innerHTML = optionHtml;
}

function submitVote() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const index = parseInt(selectedOption.value);
    votes[index]++;
    displayResults();
  }
}

async function displayResults


