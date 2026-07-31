// =====================================
// HOME
// =====================================

const startBtn = document.getElementById("startBtn");
const container = document.querySelector(".container");

// =====================================
// PAGES
// =====================================

const permission = document.getElementById("permission");
const proposal = document.getElementById("proposal");
const success = document.getElementById("success");
const maybePage = document.getElementById("maybePage");
const thanksPage = document.getElementById("thanksPage");

// =====================================
// PERMISSION BUTTONS
// =====================================

const permissionYes = document.getElementById("permissionYes");
const permissionMaybe = document.getElementById("permissionMaybe");
const permissionAppreciate = document.getElementById("permissionAppreciate");
const permissionNo = document.getElementById("permissionNo");

// =====================================
// MOVIE DETAILS
// =====================================

const movieDate = document.getElementById("movieDate");
const venue = document.getElementById("venue");

// =====================================
// MOVIE TICKET
// =====================================

const ticketDate = document.getElementById("ticketDate");
const ticketVenue = document.getElementById("ticketVenue");

// =====================================
// YES / NO BUTTONS
// =====================================

const confirmBtn =
document.getElementById("confirmBtn");

// =====================================
// HOME -> PERMISSION
// =====================================

startBtn.addEventListener("click", () => {

    container.classList.add("hidden");
    permission.classList.remove("hidden");

});

// =====================================
// PERMISSION BUTTONS
// =====================================

// YES

permissionYes.onclick = () => {

    permission.classList.add("hidden");
    proposal.classList.remove("hidden");

};

// MAYBE LATER

permissionMaybe.onclick = () => {

    saveResponse("Maybe Later");
    permission.classList.add("hidden");
    maybePage.classList.remove("hidden");

};

// APPRECIATE

permissionAppreciate.onclick = () => {

    saveResponse("No but Appreciate");
    permission.classList.add("hidden");
    thanksPage.classList.remove("hidden");

};

// =====================================
// ESCAPING NO BUTTON
// =====================================

function escapePermissionButton(){

    const x = Math.random()*250 - 125;
    const y = Math.random()*180 - 90;

    permissionNo.style.transform =
    `translate(${x}px,${y}px)`;

}

permissionNo.addEventListener("mouseover",escapePermissionButton);

permissionNo.addEventListener("click",(e)=>{

    e.preventDefault();

    escapePermissionButton();

});

// =====================================
// MOVIE PAGE NO BUTTON
// =====================================
function saveResponse(response, date = "", snacks = "") {

    fetch("https://script.google.com/macros/s/AKfycbwbFE11bwQQwX3DEQIVcRtVQhe62RXrnwYA5iSR3o6EGDhuOJYbrGXbJI9USSoBh-kUwQ/exec", {
        method: "POST",
        body: JSON.stringify({
            response: response,
            date: date,
            snacks: snacks,
            browser: navigator.userAgent
        })
    })
    .then(response => {
        console.log("Status:", response.status);
        return response.text();
    })
    .then(data => {
        console.log("Response:", data);
    })
    .catch(error => {
        console.error("Fetch Error:", error);
    });

}

// =====================================
// MOVIE YES
// =====================================

confirmBtn.onclick = () => {

    if (
        movieDate.value === "" ||
        venue.value === ""
    ) {

        alert("Please select Date and Snacks");
        return;

    }

    fetch("https://script.google.com/macros/s/AKfycbwbFE11bwQQwX3DEQIVcRtVQhe62RXrnwYA5iSR3o6EGDhuOJYbrGXbJI9USSoBh-kUwQ/exec", {

        method: "POST",

        body: JSON.stringify({

            response: "Yes",

            date: movieDate.value,

            snacks: venue.value,

            browser: navigator.userAgent

        })

    })

    .then(response => response.text())

    .then(data => {

        console.log(data);

        ticketDate.innerHTML = "📅 " + movieDate.value;
        ticketVenue.innerHTML = "🍿 " + venue.value;

        proposal.classList.add("hidden");
        success.classList.remove("hidden");

        celebrate();
        floatingHearts();

    })

    .catch(error => {

        console.error(error);

        alert("Couldn't save your response.");

    });

};
// =====================================
// HEARTS
// =====================================

function floatingHearts(){

    for(let i=0;i<40;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=Math.random()*window.innerWidth+"px";

        heart.style.top=window.innerHeight+"px";

        heart.style.animationDuration=
        (Math.random()*2+2)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },4000);

    }

}
