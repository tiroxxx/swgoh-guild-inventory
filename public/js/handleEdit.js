import handleEditSubmit from "./handleEditSubmit.js"

export default function handleEdit() {
    const guildMateId = this.dataset.id
    const modalForm = document.querySelector("#modal-form")
    const modal = document.querySelector("#modal");
    const modalName = document.querySelector("#modal-name")
    const modalStartingGP = document.querySelector("modal-starting-gp")
    const modalTwDefense = document.querySelector("modal-tw-defense")
    const modalTwOffense = document.querySelector("modal-tw-offense")
    const guildMateInfo = document.querySelector(`[data-id="${guildMateId}"]`)
    const guildMateName = guildMateInfo.childNodes[0].textContent
    const guildMateStartingGP = guildMateInfo.childNodes[1].textContent
    const guildMateTwDefense = guildMateInfo.childNodes[2].textContent
    const guildMateTwOffense = guildMateInfo.childNodes[3].textContent

    console.log(guildMateName, guildMateStartingGP, guildMateTwDefense, guildMateTwOffense);
    modal.style.display = "block"

    modalForm.addEventListener("submit", handleEditSubmit)

}