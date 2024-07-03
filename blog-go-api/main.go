// main.go

package main

import (
	"blog-go-api/data"
	"blog-go-api/routes"
	"log"
)

func main() {
	// Initialize database connection
	db, err := data.SetupDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Initialize API routes
	routes.SetupRoutes(db)

	// Start server
	if err := routes.RunServer(":8080"); err != nil {
		log.Fatal(err)
	}
}
