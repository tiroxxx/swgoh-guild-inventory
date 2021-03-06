const form = document.querySelector("#form")
form.addEventListener("submit", handleFormSubmit)

start()

async function start() {
    // Display guild mates
    const guildMates = await getGuildmates()
    displayGuildmates(guildMates)
}

// Modal elements
const modalForm = document.querySelector("#modal-form")
const modal = document.querySelector("#modal");
const modalCancelBtn = document.querySelector("#modal-form-cancel")
const modalName = document.querySelector("#modal-name")
const modalStartingGP = document.querySelector("#modal-starting-gp")
const modalTwDefense = document.querySelector("#modal-tw-defense")
const modalTwOffense = document.querySelector("#modal-tw-offense")

// Validation Alerts
function validationAlerts(decision) {
    const success = document.querySelector("#success")
    const error = document.querySelector("#error")

    if (decision) {
        success.classList.remove("hide")
        setTimeout(() => {
            success.classList.add("hide")
        }, 2000)
    }
    if (!decision) {
        error.classList.remove("hide")
        setTimeout(() => {
            error.classList.add("hide")
        }, 2000)
    }
}

// Updating guildmate info
modalForm.addEventListener("submit", async e => {
    e.preventDefault()
    const guildMateId = document.querySelector("#modal-form-submit").dataset.id
    const updatedGuildMate = {
        name: modalName.value,
        staringGP: modalStartingGP.value,
        twDefense: modalTwDefense.value,
        twOffense: modalTwOffense.value
    }

    await updateGuildmate(updatedGuildMate, guildMateId)
    modal.style.display = "none"
    const guildMates = await getGuildmates()

    displayGuildmates(guildMates)
})
// Close Modal
modalCancelBtn.addEventListener("click", () => {
    modal.style.display = "none"
})

function handleEdit() {
    const guildMateId = this.dataset.id
    document.querySelector("#modal-form-submit").setAttribute("data-id", guildMateId)
    // Guild mates' info from table
    const guildMateInfo = document.querySelector(`[data-id="${guildMateId}"]`)
    const guildMateName = guildMateInfo.childNodes[0].textContent
    const guildMateStartingGP = guildMateInfo.childNodes[1].textContent
    const guildMateTwDefense = guildMateInfo.childNodes[2].textContent
    const guildMateTwOffense = guildMateInfo.childNodes[3].textContent

    // Add exixting info as placeholder
    modalName.value = guildMateName
    modalStartingGP.value = guildMateStartingGP
    modalTwDefense.value = guildMateTwDefense
    modalTwOffense.value = guildMateTwOffense
    // Show modal
    modal.style.display = "block"
}

function displayGuildmates(guildMates) {
    if (!guildMates) {
        return
    }

    const tr = document.querySelectorAll("table > tr")
    tr.forEach(ele => {
        ele.remove()
    })
    const sortedGuildMates = [...guildMates].sort((a, b) => {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        let comparison = 0

        if (aName > bName) comparison = 1
        else if (bName > aName) comparison = -1

        return comparison
    })

    const table = document.querySelector("#table")
    sortedGuildMates.forEach(guildMate => {
        // Create table row with its elements
        const tableRow = document.createElement("tr")
        tableRow.setAttribute("data-id", guildMate._id)
        const name = document.createElement("td")
        const startingGP = document.createElement("td")
        const twDefense = document.createElement("td")
        const twOffense = document.createElement("td")
        const button = document.createElement("button")
        const deleteButton = document.createElement("button")
        button.setAttribute("data-id", guildMate._id)
        // Update table text
        name.textContent = guildMate.name
        startingGP.textContent = guildMate.startingGP
        twDefense.textContent = guildMate.twDefense
        twOffense.textContent = guildMate.twOffense
        button.textContent = "Edit"
        deleteButton.textContent = "X"
        // Append table tada to table
        tableRow.append(name, startingGP, twDefense, twOffense, button, deleteButton)
        table.append(tableRow)
        // Handle editting row
        button.addEventListener("click", handleEdit)
        deleteButton.addEventListener("click", () => {
            deleteGuildmate(guildMate._id)
        })
    })

}

async function handleFormSubmit(e) {
    e.preventDefault()

    const name = document.querySelector("#name").value
    const startingGP = parseInt(document.querySelector("#starting-gp").value)
    const twDefense = parseInt(document.querySelector("#tw-defense").value)
    const twOffense = parseInt(document.querySelector("#tw-offense").value)

    if (isNaN(startingGP) || isNaN(twDefense) || isNaN(twOffense)) {
        validationAlerts(false)
        return
    }


    const guildMate = {
        name: name,
        startingGP: startingGP,
        twDefense: twDefense,
        twOffense: twOffense
    }

    form.reset();
    await saveGuildmate(guildMate)
    const guildMates = await getGuildmates()
    displayGuildmates(guildMates)

}

// API calls
async function getGuildmates() {
    try {
        const response = await axios.get("/api/guildmates")
        const guildMates = response.data
        return guildMates
    }
    catch (err) {
        console.error(err)
    }
}

async function saveGuildmate(guildMate) {
    try {
        await axios.post("/api/guildmates", guildMate)

    }
    catch (err) {
        console.error(err)
    }
}

async function updateGuildmate(guildMate, id) {
    try {
        const response = await axios.patch("/api/guildmates/" + id, guildMate)
        const guildMates = response.data
        return guildMates
    }
    catch (err) {
        console.error(err)
    }
}

async function deleteGuildmate(id) {
    try {
        await axios.delete("/api/guildmates/" + id)
        const response = await axios.get("/api/guildmates")
        const guildMates = response.data
        displayGuildmates(guildMates)

    }
    catch (err) {
        console.error(err)
    }
}












