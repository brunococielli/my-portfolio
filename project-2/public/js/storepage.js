const logoutBtn = document.getElementById("logoutBtn")

const logoutUser = async () => {
	const token = localStorage.getItem("token")

	await fetch("/logout", {
		method: "POST",
		headers: { Authorization: token }
	})

	localStorage.removeItem("token")

	window.location.href = "/"
}

logoutBtn.addEventListener("click", logoutUser)