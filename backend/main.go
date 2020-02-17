package main;


import (
	"database/sql"
	"net/http"
	"strings"
	"fmt"
	"encoding/json"

	// "strconv"

	_ "github.com/mattn/go-sqlite3"
);

var database *sql.DB;

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
	message = "<h1>Users</h1><br/><table><tr><th>Username</th><th>Email</th><th>Password</th><th>First Name</th><th>Last Name</th></tr>\n" + result + "</table>";

	// fmt.Println(message)
	w.Write([]byte(message))
}


func setupDB() {
	// Hash passwords beforehand, not conducted here yet
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS user (username varchar(255) unique primary key, email varchar(255) unique, password varchar(255), fName varchar(255), lName varchar(255), token char(255), attempts int default 0)")
	// Unique email, unique username, password, first name, last name for user
	statement.Exec()
	statement, _ = database.Prepare("INSERT INTO user (username, email, password, fName, lName) VALUES (?, ?, ?, ?, ?);")

	statement2, _ := database.Prepare("CREATE TABLE IF NOT EXISTS inventory (owner varchar(255) primary key, foodName varchar(255), amount float, unit varchar(255), store varchar(255))")
	// Owner: key of who owns the inventory, foodName: food's box name, amount: amount of the food in a float, unit: unit to be used with amount to keep accurate count of food in string, store: string of what store the food is from 
	// Later, think about checking to see if the item already exists and then update instead of add
	statement2.Exec()
	statement2, _ = database.Prepare("INSERT INTO inventory (owner, foodName, amount, unit, store) VALUES (?, ?, ?, ?, ?);")
	statement2.Exec()

	statement3, _ := database.Prepare("CREATE TABLE IF NOT EXISTS food (store varchar(255), category varchar(255), fullName varchar(255), receiptName varchar(255))")
	// Owner: key of who owns the inventory, foodName: food's box name, amount: amount of the food in a float, unit: unit to be used with amount to keep accurate count of food in string, store: string of what store the food is from 
	// Later, think about checking to see if the item already exists and then update instead of add
	statement3.Exec()
	statement3, _ = database.Prepare("INSERT INTO food (store, category, fullName, receiptname) VALUES (?, ?, ?, ?);")
	statement3.Exec()
}


type LoginResponse struct {
	Token string	`json:"token"`
	Status string	`json:"status"`
}

func login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		http.ServeFile(w, r, "login/index.html")
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Println("Error while parsing form from POST")
			return
			
		}

		var response LoginResponse

		action := r.FormValue("action")

		fName := r.FormValue("fName")
		lName := r.FormValue("lName")
		username := r.FormValue("username")
		password := r.FormValue("password")
		email := r.FormValue("email")
		if action == "login" {
			fmt.Println("User requested login access")
			var accessToken string
			var attempts int
			var storedPassword string
			if rows, err := database.Query("SELECT token, attempts, password FROM user WHERE username = ?", username); err == nil {
				// rows, _ := statement1.Exec(username);
				// fmt.Println(accessToken, attempts, storedPassword, password)
				for rows.Next() {
					rows.Scan(&accessToken, &attempts, &storedPassword)
				}
				fmt.Println(accessToken, attempts, storedPassword, password)
				if password != storedPassword {
					response = LoginResponse{Token: "", Status:"Login failed"}
					attempts += 1
					if attempts >= 3 {
						statement, _ := database.Prepare("UPDATE user SET attempts = 0, token=\"\" WHERE username = ?;")
						statement.Exec(username)
					} else {
						statement, _ := database.Prepare("UPDATE user SET attempts = ? WHERE username = ?;")
						statement.Exec(attempts, username)
						
					}
					
				} else {
					response = LoginResponse{Token: accessToken, Status: "Login success"}
				}
			} else {
				// for rows.Next() {
				// 	rows.Scan(&accessToken, &attempts, &storedPassword)
				// }
				// fmt.Println(accessToken, attempts, storedPassword, password)
				// fmt.Println(rows, err == nil)
				response = LoginResponse{Token: "", Status:"Login failed"}
			}
			fmt.Println(response)
			// fmt.Println(username, password)
			// return
		} else if action == "register" {
			
			fmt.Println("User requested register")
			if (fName == "" || lName == "" || len(username) < 6 || len(password) < 6 || email == "") {
				// fmt.Println("Illegal POST request")
				response = LoginResponse{Token: "", Status: "Illegal POST request"}
			}
			statement, _ :=  database.Prepare("INSERT INTO user (username, email, password, fName, lName) VALUES (?, ?, ?, ?, ?);")
			if _, err := statement.Exec(username, email, password, fName, lName); err != nil {
				fmt.Println("Had error creating new user:", err)
				response = LoginResponse{Token: "", Status: "Had error creating new user:"}
			} else {
				fmt.Println("Created new user")
				response = LoginResponse{Token:"test123", Status: "success"}
			}
			// fmt.Println(r.Response)
			// return sayHello(w, r)
			// http.Redirect(w, r, "/", 307)

			fmt.Println(response)

			
			
			
		}
		json.NewEncoder(w).Encode(response)
		
	}
}



func test(w http.ResponseWriter, r *http.Request) {
	test := "Test"
	w.Write([]byte(test))
}

func main() {

	database, _ = sql.Open("sqlite3", "./pvi.db")	


	http.HandleFunc("/", sayHello)
	http.HandleFunc("/login", login)
	http.HandleFunc("/test", test)
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

	fmt.Println("Listening on 127.0.0.1:8080/")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}