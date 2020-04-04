package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

var database *sql.DB

const LOAD_FOOD = false

func sayHello(w http.ResponseWriter, r *http.Request) {
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")

	var result string
	var username string
	var email string
	var password string
	var fName string
	var lName string

	rows, _ := database.Query("SELECT username, email, password, fName, lName FROM user")
	for rows.Next() {
		rows.Scan(&username, &email, &password, &fName, &lName)
		result += "<tr><td>" + username + "</td><td>" + email + "</td><td>" + password + "</td><td>" + fName + "</td><td>" + lName + "</tr>"

	}
	message = "<h1>Users</h1><br/><table><tr><th>Username</th><th>Email</th><th>Password</th><th>First Name</th><th>Last Name</th></tr>\n" + result + "</table>"

	// fmt.Println(message)
	w.Write([]byte(message))
}

func loadFoods() {
	foods := LoadFoodsFromJson("publix")

	for i := 0; i < len(foods); i++ {
		// fmt.Println(foods[i])
		if statement3, err := database.Prepare("INSERT into food (fullName, store) VALUES (?, ?);"); err == nil {
			statement3.Exec(foods[i], "publix")
		}

	}
}

func setupDB() {
	// Hash passwords beforehand, not conducted here yet
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS user (username varchar(255) unique primary key, email varchar(255) unique, password varchar(255), fName varchar(255), lName varchar(255), token char(255), attempts int default 0)")
	// Unique email, unique username, password, first name, last name for user
	statement.Exec()
	// statement, _ = database.Prepare("INSERT INTO user (username, email, password, fName, lName) VALUES (?, ?, ?, ?, ?);")

	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS food (store varchar(255), category varchar(255), fullName varchar(255), receiptName varchar(255), primary key (store, fullName))")
	// Owner: key of who owns the inventory, foodName: food's box name, amount: amount of the food in a float, unit: unit to be used with amount to keep accurate count of food in string, store: string of what store the food is from
	// Later, think about checking to see if the item already exists and then update instead of add
	statement.Exec()

	statement, _ = database.Prepare("INSERT INTO food (store, category, fullName, receiptname) VALUES (?, ?, ?, ?);")
	statement.Exec()

	// foreign key(store) references food(fullName), foreign key(foodName) references fullName)
	statement, _ = database.Prepare(`CREATE TABLE IF NOT EXISTS inventory
										(owner varchar(255),
										foodName varchar(255),
										amount float,
										unit varchar(255),
										store varchar(255),
										primary key (owner, foodName),
										constraint store_name foreign key(store) references food(fullName),
										constraint food_name foreign key(foodName) references food(fullName),
										foreign key(owner) references user(username)
									)`)
	// Owner: key of who owns the inventory, foodName: food's box name, amount: amount of the food in a float, unit: unit to be used with amount to keep accurate count of food in string, store: string of what store the food is from
	// Later, think about checking to see if the item already exists and then update instead of add
	statement.Exec()
	statement, _ = database.Prepare("INSERT INTO inventory (owner, foodName, amount, unit, store) VALUES (?, ?, ?, ?, ?);")
	statement.Exec()

	// Load foods
	if LOAD_FOOD {
		loadFoods()
	}

}

// LOGIN

// ---------------------------------------------------------------------------------------------------------------------------------------

func login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		http.ServeFile(w, r, "login/index.html")
	case "POST":
		response := LoginResponse{Token: "", Status: ""}

		if err := r.ParseForm(); err != nil {
			response.Status = "Illegal POST call hello"
			json.NewEncoder(w).Encode(response)
			return

		}

		// Action lets us know if its a login or a register call
		action := r.FormValue("action")

		// Extract POST arguments
		fName := r.FormValue("fName")
		lName := r.FormValue("lName")
		username := r.FormValue("username")
		password := r.FormValue("password")
		email := r.FormValue("email")
		fmt.Println(password)
		fmt.Println(username)

		if action == "login" { // Handle 'login' action
			fmt.Println("User requested login access")
			// var accessToken string
			var attempts int
			var storedPassword string
			if rows, err := database.Query("SELECT attempts, password FROM user WHERE username = ?", username); err == nil {

				// get values from database
				for rows.Next() {
					rows.Scan(&attempts, &storedPassword)
				}

				if password != storedPassword { // password incorrect
					response = LoginResponse{Token: "", Status: "Login failed"}
					attempts++
					if attempts >= 3 { // clear token value if too many incorrect attempts
						statement, _ := database.Prepare("UPDATE user SET attempts = 0, token=\"\" WHERE username = ?;")
						statement.Exec(username)
					} else { // update attempts
						statement, _ := database.Prepare("UPDATE user SET attempts = ? WHERE username = ?;")
						statement.Exec(attempts, username)
					}

				} else { // password is correct
					// set attempts to 0
					accessToken := GenerateToken()
					statement, _ := database.Prepare("UPDATE user SET attempts = 0, token = ? WHERE username = ?;")
					statement.Exec(accessToken, username)

					response = LoginResponse{Token: accessToken, Status: "Login success"}
				}
			} else {
				response = LoginResponse{Token: "", Status: "Login failed"}
			}
		} else if action == "register" { // handles register calls

			fmt.Println("User requested register")
			if fName == "" || lName == "" || len(username) < 6 || len(password) < 6 || email == "" { // invalid parameters
				response = LoginResponse{Token: "", Status: "Illegal POST request, illegal arguments"}
				json.NewEncoder(w).Encode(response)
				return
			}
			token := GenerateToken()
			statement, _ := database.Prepare("INSERT INTO user (username, email, password, fName, lName, token) VALUES (?, ?, ?, ?, ?, ?);")

			if _, err := statement.Exec(username, email, password, fName, lName, token); err != nil {
				// Error creating user - typically same username or email as another user, can make more specific later
				fmt.Println("Had error creating new user:", err)
				if rows, err := database.Query("SELECT * FROM user WHERE username = ?", username); err == nil {
					if rows.Next() {
						response = LoginResponse{Token: "", Status: "Error creating new user: username already in use"}
					} else {
						response = LoginResponse{Token: "", Status: "Error creating new user: email already in use"}
					}
				} else {
					response = LoginResponse{Token: "", Status: "Error creating new user"}
				}
			} else {
				// TODO: Actually return correct token

				// returns access token after successful registration
				fmt.Println("Created new user", username)
				response = LoginResponse{Token: token, Status: "successfully registered new user"}
			}
			// http.Redirect(w, r, "/", 307)
		} else { // Got action not 'login' or 'register', not legal
			response = LoginResponse{Token: "", Status: "Illegal POST request, bye"}
		}
		json.NewEncoder(w).Encode(response)

	}
}

// ---------------------------------------------------------------------------------------------------------------------------------------

// INVENTORY (Food queries)
// ---------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------
/**
POST call parameters:
username: string
accessToken: string
**/

func inventory(w http.ResponseWriter, r *http.Request) {
	response := FoodResponse{Status: "Illegal POST call"}
	switch r.Method {
	case "GET":
		// TODO: Make and edit test POST call page for testing Inventory calls
		http.ServeFile(w, r, "inventory/index.html")
	case "POST":
		if err := r.ParseForm(); err != nil {
			response.Status = "Illegal POST call"
			// json.NewEncoder(w).Encode(response)
			// return
			break
		}

		username := r.FormValue("username")
		token := r.FormValue("accessToken")

		var attempts int
		var actualToken string
		if rows, err := database.Query("SELECT attempts, token FROM user WHERE username = ?", username); err == nil {

			// get values from database
			if rows.Next() {
				rows.Scan(&attempts, &actualToken)
			} else {
				response.Status = "Incorrect access token or not logged in"
				break
			}

			fmt.Println(actualToken, token)

			if actualToken != token || token == "" {
				// statement, _ := database.Prepare("UPDATE user SET attempts = ? WHERE username = ?;")
				attempts++
				if attempts >= 3 { // clear token value if too many incorrect attempts
					statement, _ := database.Prepare("UPDATE user SET attempts = 0, token=\"\" WHERE username = ?;")
					statement.Exec(username)
				} else { // update attempts
					statement, _ := database.Prepare("UPDATE user SET attempts = ? WHERE username = ?;")
					statement.Exec(attempts, username)
				}
				response.Status = "Incorrect access token or not logged in"
				break

			}
			fmt.Println("test")

			if rows, err = database.Query("SELECT foodName, amount, unit, store from inventory WHERE owner = ?", username); err == nil {
				var userFoods []InventoryItem = []InventoryItem{}
				// fmt.Println("FOOD")
				// fmt.Println(rows)

				for rows.Next() {
					var foodName string
					var amount float32
					var unit string
					var store string

					rows.Scan(&foodName, &amount, &unit, &store)
					userFoods = append(userFoods, InventoryItem{Name: foodName, Amount: amount, Unit: unit, Store: store})
				}
				response.Foods = userFoods
				response.Status = "Valid Response"
			} else {
				fmt.Println(err)
			}
		}

	}

	json.NewEncoder(w).Encode(response)
}

// ---------------------------------------------------------------------------------------------------------------------------------------

func main() {

	Init()
	database, _ = sql.Open("sqlite3", "./pvi.db")

	http.HandleFunc("/", sayHello)
	http.HandleFunc("/login", login)
	http.HandleFunc("/inventory", inventory)
	// http.HandleFunc("/test", test)
	// fmt.Println("test")

	setupDB()

	// statement2, err2 := database.Prepare("INSERT INTO inventory (owner, foodName, amount, unit, store) VALUES (?, ?, ?, ?, ?);")
	// statement2.Exec()
	// if (err != nil) {
	// 	fmt.Println("Invalid query")
	// 	panic(err)
	// }

	// if (err2 != nil) {
	// 	fmt.Println("Invalid query inventory")
	// 	panic(err)
	// }

	// _, err = statement.Exec("testUser", "testUser@gmail.com", "password123", "Test", "User")
	// if (err != nil) {
	// 	fmt.Println("Error creating new user")
	// 	fmt.Println(err)
	// }

	fmt.Println("Listening on 127.0.0.1:5000/")
	if err := http.ListenAndServe(":5000", nil); err != nil {
		panic(err)
	}
}
