package main

import (
	"log"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"strconv"
	"fmt"
	"bufio"
	"os"
	"database/sql"
	"strings"
)

var username string
var password string
var database string
var table string
func receiveVote(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	if r.Method == "POST" {
		r.ParseForm()
		connLocale := username + ":" + password + "@/" + database
		connLocale = strings.Replace(connLocale, "\n", "", -1)
		db, err := sql.Open("mysql", connLocale)
		defer db.Close()
		if err != nil {
			panic(err)
		}
		query := fmt.Sprintf("INSERT %s SET name=?, position=?, apg=?, ppg=?, rpg=?, field_goal=?", table)
		stmt, err := db.Prepare(query)
		if err != nil {
			panic(err)
		}
		playerName := r.FormValue("name")
		playerName = playerName[1:len(playerName)-1]
		position := r.FormValue("position")
		position = position[1:len(position)-1]
		assists, err := strconv.ParseFloat(r.FormValue("assists"), 32)
		points, _:= strconv.ParseFloat(r.FormValue("points"), 32)
		rebounds, _ := strconv.ParseFloat(r.FormValue("rebounds"), 32)
		fieldGoals, _ := strconv.ParseFloat(r.FormValue("field_goal"), 32)
		_, err = stmt.Exec(playerName, position, assists, points, rebounds, fieldGoals)
		if err != nil {
			panic(err)
		}

	}
}
func main() {
	inputs := bufio.NewReader(os.Stdin)
	fmt.Println("This database works with a local instance of MySQL running.")
	fmt.Print("Enter username: ")
	username, _ = inputs.ReadString('\n')
	fmt.Print("Enter password: ")
	password, _ = inputs.ReadString('\n')
	fmt.Print("Enter database name: ")
	database, _ = inputs.ReadString('\n')
	fmt.Print("Enter table name: ")
	table, _ = inputs.ReadString('\n')
	http.HandleFunc("/test", receiveVote)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

