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
// BUTTONS
// =====================================

const permissionYes = document.getElementById("permissionYes");
const permissionMaybe = document.getElementById("permissionMaybe");
const permissionAppreciate = document.getElementById("permissionAppreciate");
const permissionNo = document.getElementById("permissionNo");

const confirmBtn = document.getElementById("confirmBtn");

// =====================================
// FORM
// =====================================

const movieDate = document.getElementById("movieDate");
const venue = document.getElementById("venue"); // Snacks dropdown

// =====================================
// TICKET
// =====================================

const ticketDate = document.getElementById("ticketDate");
const ticketVenue = document.getElementById("ticketVenue");

// =====================================
// GOOGLE APPS SCRIPT URL
// =====================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzvtvNMxMptSM3iA04WBlaqc9lQst2nM3gh3RH-Bmf80Mv1DWNgOyYKwxMtsGkpAB-5Hg/exec";

// =====================================
// SAVE RESPONSE
// =====================================

function saveResponse(response, date = "", snacks = "") {

    return fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify({

            response: response,
            date: date,
            snacks: snacks,
            browser: navigator.userAgent

        })

    })

    .then(res => res.text())

    .then(data => {

        console.log("Saved:", data);

        return data;

    })

    .catch(err => {

        console.error(err);

        throw err;

    });

}

// =====================================
// HOME
// =====================================

startBtn.onclick = () => {

    container.classList.add("hidden");
    permission.classList.remove("hidden");

};

// =====================================
// YES
// =====================================

permissionYes.onclick = () => {

    permission.classList.add("hidden");
    proposal.classList.remove("hidden");

};

// =====================================
// MAYBE LATER
// =====================================

permissionMaybe.onclick = () => {

    saveResponse("Maybe Later");

    permission.classList.add("hidden");
    maybePage.classList.remove("hidden");

};

// =====================================
// NO BUT APPRECIATE
// =====================================

permissionAppreciate.onclick = () => {

    saveResponse("No but Appreciate");

    permission.classList.add("hidden");
    thanksPage.classList.remove("hidden");

};

// =====================================
// ESCAPING NO BUTTON
// =====================================

function escapePermissionButton() {

    const x = Math.random() * 250 - 125;
    const y = Math.random() * 180 - 90;

    permissionNo.style.transform =
        `translate(${x}px, ${y}px)`;

}

permissionNo.addEventListener("mouseover", escapePermissionButton);

permissionNo.addEventListener("click", (e) => {

    e.preventDefault();

    escapePermissionButton();

});

// =====================================
// CONFIRM TICKET
// =====================================

confirmBtn.onclick = () => {

    if (movieDate.value === "" || venue.value === "") {

        alert("Please select Date and Snacks ❤️");

        return;

    }

    saveResponse(

        "Yes",

        movieDate.value,

        venue.value

    )

    .then(() => {

        ticketDate.innerHTML =
            "📅 " + movieDate.value;

        ticketVenue.innerHTML =
            "🍿 " + venue.value;

        proposal.classList.add("hidden");

        success.classList.remove("hidden");

        celebrate();

        floatingHearts();

    })

    .catch(() => {

        alert("Couldn't save your response.");

    });

};

// =====================================
// CONFETTI
// =====================================

function celebrate() {

    confetti({

        particleCount: 250,

        spread: 120,

        startVelocity: 45,

        origin: { y: 0.6 }

    });

}

// =====================================
// HEARTS
// =====================================

function floatingHearts() {

    for (let i = 0; i < 40; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random() * window.innerWidth + "px";

        heart.style.top =
            window.innerHeight + "px";

        heart.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 4000);

    }

}
