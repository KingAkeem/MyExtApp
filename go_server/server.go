package main

import (
"net/http"
"log"
	"encoding/json"
)

type choiceResponse struct {
	Answer string `json:"answer"`
}
func receiveVote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "GET" {
		ch := choiceResponse{"YES"}
		json.NewEncoder(w).Encode(ch)
		log.Println("Reached")
	}
}
func main() {
	http.HandleFunc("/test", receiveVote)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

