package main // import "github.com/loadtest/loadapi"

import (
	"fmt"
	//	_ "github.com/gorilla/context"
	//	_ "github.com/gorilla/mux"
	"html"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Running loadapi %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
