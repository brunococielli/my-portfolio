import fs from "fs"

let users = []

try {
	const data = fs.readFileSync("./users.json", "utf8")
	users = JSON.parse(data)
} catch (err) {
	console.log("Could not read users.json, starting with empty list")
}

const saveUsers = () => {
	fs.writeFileSync("./users.json", JSON.stringify(users, null, 2))
}

export { users, saveUsers }