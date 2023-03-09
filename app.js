const colors = ["red", "blue", "green"];
let votes = [0, 0, 0];

function vote() {
  const selectedOption = document.querySelector('input[name="color"]:checked');
  if (selectedOption) {
    const index = colors.indexOf(selectedOption.value);
    votes[index]++;
    displayResults();
  }
}

function displayResults() {
  let resultHtml = "";
  for (let i = 0; i < colors.length; i++) {
    resultHtml += colors[i] + ": " + votes[i] + "<br>";
  }
  document.getElementById("results").innerHTML = resultHtml;
}
