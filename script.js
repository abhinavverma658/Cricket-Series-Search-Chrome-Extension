async function getMatchData(query) {
  try {
    const apiKey = "8f8d06c8-1c8a-4dfc-bfb3-f68f1d4999be";
    const apiUrl = `https://api.cricapi.com/v1/series?apikey=${apiKey}&offset=0&search=${query}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "success") {
      console.log("API request failed.");
      return;
    }

    const matchesList = data.data;

    if (!matchesList) {
      console.log("No matches data found.");
      return;
    }

    const matchesElement = document.getElementById("matches");

    // Create an unordered list to hold the match data
    const ul = document.createElement("ul");

    // Iterate through the matches and create list items for each match
    matchesList.forEach((match) => {
      const li = document.createElement("li");
      const nestedUl = document.createElement("ul"); // Create a nested list

      // Create list items for additional information
      const startDateLi = document.createElement("li");
      startDateLi.textContent = `Start Date: ${match.startDate}`;
      const endDateLi = document.createElement("li");
      endDateLi.textContent = `End Date: ${match.endDate}`;
      const odiLi = document.createElement("li");
      odiLi.textContent = `ODI: ${match.odi}`;
      const t20Li = document.createElement("li");
      t20Li.textContent = `T20: ${match.t20}`;
      const testLi = document.createElement("li");
      testLi.textContent = `Test: ${match.test}`;
      const squadsLi = document.createElement("li");
      squadsLi.textContent = `Squads: ${match.squads}`;
      const matchesLi = document.createElement("li");
      matchesLi.textContent = `Matches: ${match.matches}`;

      // Append the additional information list items to the nested list
      nestedUl.appendChild(startDateLi);
      nestedUl.appendChild(endDateLi);
      nestedUl.appendChild(odiLi);
      nestedUl.appendChild(t20Li);
      nestedUl.appendChild(testLi);
      nestedUl.appendChild(squadsLi);
      nestedUl.appendChild(matchesLi);

      li.textContent = match.name; // Set the match name as the main list item content

      // Append the nested list to the main list item
      li.appendChild(nestedUl);

      // Append the main list item to the unordered list
      ul.appendChild(li);
    });

    // Append the unordered list to the matchesElement
    matchesElement.appendChild(ul);

  } catch (e) {
    console.error(e);
  }
}

// Add an event listener to the form
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim(); // Get and trim the user input

  if (searchText) {
    // Call the getMatchData function with the user's input
    getMatchData(searchText);
  }
});