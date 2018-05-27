package main

import (
"net/http"
"log"
	"encoding/json"
)

type choiceResponse struct {
	answer string
}
func receiveVote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	if r.Method == "GET" {
		ch := choiceResponse{"YES"}
		jData, err := json.Marshal(ch)
		if err != nil {
			log.Fatal("Couldn't marshal data!")
		}
		w.Write(jData)
		log.Println("Reached")
	}
}
func main() {
	http.HandleFunc("/test", receiveVote)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

