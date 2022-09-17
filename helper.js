export function makeToastNotification(message) {
    let toastBox = document.querySelector(".toast-message")
    toastBox.textContent = message
    toastBox.classList.add("active")
    setTimeout(() => {
        toastBox.classList.remove("active")
    }, 2000);
}

export function makeError(message) {
    let sound = new Audio(`sounds/wrong.mp3`)
    sound.play()
    document.querySelector(".error-message").textContent = message
    document.querySelector(".error").classList.add("active")
    setTimeout(() => {
        document.querySelector(".error").classList.remove("active")
    }, 800);
}