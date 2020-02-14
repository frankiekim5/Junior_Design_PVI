package main;


import (
	"database/sql"
	"net/http"
	"strings"
	"fmt"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
);

var result string = "";

func sayHello(w http.ResponseWriter, r *http.Request) {
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")
	
	message = "Hello\n" + result
	fmt.Println(message)
	w.Write([]byte(message))
}

func test(w http.ResponseWriter, r *http.Request) {
	test := "Test"
	w.Write([]byte(test))
}

func main() {
	http.HandleFunc("/", sayHello)
	fmt.Println("test")
	database, _ := sql.Open("sqlite3", "./test.db")
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("INSERT INTO people (firstname, lastname) VALUES (?, ?);")
	statement.Exec("fTest", "fName")
	rows, _ := database.Query("SELECT * FROM people")

	var id int
	var firstname string
	var lastname string
	for rows.Next() {
		rows.Scan(&id, &firstname, &lastname)
		fmt.Println(strconv.Itoa(id) + ": " + firstname + " " + lastname)
		result += strconv.Itoa(id) + ": " + firstname + " " + lastname + "\n";
	}

	http.HandleFunc("/test", test)
	// for ;; {
	//   fmt.Println("test");
	// }
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}