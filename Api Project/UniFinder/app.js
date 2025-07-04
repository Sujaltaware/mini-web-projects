let url = "http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("#btn-1");


let country = "india";
btn.addEventListener("click", async () => {
    let country = document.getElementById("Country").value;
    console.log(country);
     loader.style.display = "block";
    let colArr = await getColleges(country);
    Show(colArr);
    loader.style.display = "none"; 
});

function Show(colArr) {
  const list = document.getElementById("list");
  list.innerHTML = ''; // clear previous data

  for (const col of colArr) {
    const card = document.createElement("div");
    card.className = "college-card";

    card.innerHTML = `
      <h3>${col.name}</h3>
      <p>State: ${col["state-province"] || "Unknown"}</p>
      <a href="${col.web_pages[0]}" target="_blank">Visit Website</a>
    `;

    list.appendChild(card);
  }
}



async function getColleges(country) {
    try {
        let res = await axios.get(url + country);
        return res.data;

    } catch (e) {
        console.error("Error fetching data", e);
        alert("No data found or network issue. Try a valid country.");
        return [];
    }

}

