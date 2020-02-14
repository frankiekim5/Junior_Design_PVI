package main;


import (
	"database/sql"
	"net/http"
	"strings"
	"fmt"
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

	rows, _ := database.Query("SELECT * FROM user")
	for rows.Next() {
		rows.Scan(&username, &email, &password, &fName, &lName)
		// fmt.Println(strconv.Itoa(id) + ": " + firstname + " " + lastname)
		result += "<tr><td>" + username + "</td><td>" + email + "</td><td>" + password + "</td><td>" + fName + "</td><td>" + lName + "</tr>"
	}
	message = "<h1>Users</h1><br/><table><tr><th>Username</th><th>Email</th><th>Password</th><th>First Name</th><th>Last Name</th></tr>\n" + result + "</table>";

	// fmt.Println(message)
	w.Write([]byte(message))
}


func setupDB() {
	// Hash passwords beforehand, not conducted here yet
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS user (username varchar(255) unique primary key, email varchar(255) unique, password varchar(255), fName varchar(255), lName varchar(255))")
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

func login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		http.ServeFile(w, r, "login/index.html")
	case "POST":
		if err := r.ParseForm(); err != nil {
			fmt.Println("Error while parsing form from POST")
			return
		}

		action := r.FormValue("action")

		fName := r.FormValue("fName")
		lName := r.FormValue("lName")
		username := r.FormValue("username")
		password := r.FormValue("password")
		email := r.FormValue("email")
		if action == "login" {
			fmt.Println("User requested login access")
			// if username == nil || password == nil {
			// 	fmt.Println("Illegal login POST request")
			// 	return
			// }
			// fmt.Println(username, password)
			return
		} else if action == "register" {
			fmt.Println("User requested register")
			// if (fName == nil || lName == nil || username == nil || password == nil || email == nil) {
				
			// }
			statement, _ :=  database.Prepare("INSERT INTO user (username, email, password, fName, lName) VALUES (?, ?, ?, ?, ?);")
			if _, err := statement.Exec(username, email, password, fName, lName); err != nil {
				fmt.Println("Had error creating new user")
				fmt.Println(err)
				
			} else {
				fmt.Println("Created new user")
			}
			sayHello(w, r)
		}
		
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
	// rows, _ := database.Query("SELECT * FROM users")

	
	// var username string
	// var email string
	// var password string
	// var fName string
	// var lName string
	// for rows.Next() {
	// 	rows.Scan(&username, &email, &password, &fName, &lName)
	// 	// fmt.Println(strconv.Itoa(id) + ": " + firstname + " " + lastname)
	// 	result += username + " " + email + " " + password + " " + fName + " " + lName + "\n"
	// }

	
	// for ;; {
	//   fmt.Println("test");
	// }
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}