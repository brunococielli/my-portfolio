import { goBack } from "./utils.js" 

const emailInp = document.getElementById("email")
const passwordInp = document.getElementById("password")
const logBtn = document.querySelector(".logBtn")

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".backBtn").addEventListener("click", goBack)
})

const logUser = async () => {
	const email = emailInp.value
	const password = passwordInp.value

	try {
		const res = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})

		if (!res.ok) {
			const errorText = await res.text()
			alert(errorText)
			return
		}

		emailInp.value = ""
		passwordInp.value = ""

		window.location.href = "/html/storepage.html"
	} catch (err) {
		console.error(err)
		alert("Network error or server offline")
	}
}

logBtn.addEventListener("click", logUser)