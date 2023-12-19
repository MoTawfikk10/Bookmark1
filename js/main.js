var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var mood = "create";
var tmp;

var allSites = [];
if (localStorage.getItem("allWeb") != null) {
  allSites = JSON.parse(localStorage.getItem("allWeb"));
  displayW();
}
function addNwesite() {
  //   var siteNameValue = siteName.value;
  //   var siteUrlValue = siteUrl.value;

  if (validateinputs() == true && true) {
    var webSite = {
      Name: siteName.value,
      UrlLink: siteUrl.value,
    };
    if (mood === "create") {
      allSites.push(webSite);
    } else {
      allSites[tmp] = webSite;
      mood = "create";
      document.getElementById("btSubmit").classList.remove("btn-warning");
      document.getElementById("btSubmit").classList.add("Subbtn");
      document.getElementById("btSubmit").innerHTML = "Submit";
    }
    resetValues();
    displayW();
    localStorage.setItem("allWeb", JSON.stringify(allSites));
  } else {
    alert(`
    Site Name or Url is not valid, Please follow the rules below 
    -Site name must contain at least 3 characters
    -Site URL must be a valid one

    `);
  }
}

function resetValues() {
  siteName.value = "";
  siteUrl.value = " ";
}

function displayW() {
  var cartona = "";
  for (var i = 0; i < allSites.length; i++) {
    cartona += `
    <tr>
    <td>${i + 1}</td>
    <td>${allSites[i].Name}</td>

    <td>
      <a target="_blank" href=" ${allSites[i].UrlLink}"
        ><button class="btn btn-info px-3">Visit</button></a
      >
    </td>
    <td>
      <button class="btn btn-danger px-3" onclick="deleteFun(${i})">Delete</button>
    </td>
    <td>
      <button class="btn btn-warning px-3" onclick="Updatevalues(${i})"> Update </button>
    </td>
  </tr>
  `;
    document.getElementById("tabWeb").innerHTML = cartona;
    console.log(allSites);
  }
}

function deleteFun(idx) {
  allSites.splice(idx, 1);
  displayW();
  localStorage.setItem("allWeb", JSON.stringify(allSites));
}

function validateinputs() {
  var regex = /[A-Z a-z 0-9]{3,15}$/;
  var regexU = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(siteName.value) && regexU.test(siteUrl.value);
}

function Updatevalues(i) {
  siteName.value = allSites[i].Name;
  siteUrl.value = allSites[i].UrlLink;
  document.getElementById("btSubmit").innerHTML = "Update";
  document.getElementById("btSubmit").classList.add("btn-warning");
  document.getElementById("btSubmit").classList.remove("Subbtn");
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
