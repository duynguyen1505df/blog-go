// data/db.go

package data

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func SetupDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:112233@tcp(localhost:3306)/blogsdb")
	if err != nil {
		return nil, err
	}

	// Test the connection
	if err := db.Ping(); err != nil {
		return nil, err
	}

	log.Println("Database connection successful")
	return db, nil
}
