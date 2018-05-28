package main

import (
"net/http"
"log"
	"fmt"
)

func receiveVote(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	if r.Method == "POST" {
		r.ParseForm()
		fmt.Println(r.Form)
	}
}
func main() {
	http.HandleFunc("/test", receiveVote)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

