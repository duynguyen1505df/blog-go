package service

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Blog struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	Description   string `json:"description"`
	Detail        string `json:"detail"`
	Category      int    `json:"category"`
	PublicStatus  int    `json:"public_status"`
	PublishedDate string `json:"published_date"`
	ThumbnailPath string `json:"thumbnail_path"`
	Position      string `json:"position"`
}

func GetBlogs(c *gin.Context, db *sql.DB, title string) {
	var rows *sql.Rows
	var err error

	if title != "" {
		query := "SELECT id, title, description, detail, category, public_status, published_date, thumbnail_path, position FROM blogs WHERE title LIKE ?"
		rows, err = db.Query(query, "%"+title+"%")
	} else {
		query := "SELECT id, title, description, detail, category, public_status, published_date, thumbnail_path, position FROM blogs"
		rows, err = db.Query(query)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	blogs := []Blog{}

	for rows.Next() {
		var blog Blog
		err := rows.Scan(&blog.ID, &blog.Title, &blog.Description, &blog.Detail, &blog.Category, &blog.PublicStatus, &blog.PublishedDate, &blog.ThumbnailPath, &blog.Position)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		blogs = append(blogs, blog)
	}

	c.JSON(http.StatusOK, blogs)
}

func GetBlogByID(c *gin.Context, db *sql.DB) {
	id := c.Param("id")

	var blog Blog
	err := db.QueryRow("SELECT id, title, description, detail, category, public_status, published_date, thumbnail_path, position FROM blogs WHERE id = ?", id).
		Scan(&blog.ID, &blog.Title, &blog.Description, &blog.Detail, &blog.Category, &blog.PublicStatus, &blog.PublishedDate, &blog.ThumbnailPath, &blog.Position)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog not found"})
		return
	}

	c.JSON(http.StatusOK, blog)
}

func CreateBlog(c *gin.Context, db *sql.DB) {
	var blog Blog
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := db.Exec("INSERT INTO blogs (title, description, detail, category, public_status, published_date, thumbnail_path, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		blog.Title, blog.Description, blog.Detail, blog.Category, blog.PublicStatus, blog.PublishedDate, blog.ThumbnailPath, blog.Position)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	blog.ID = int(id)

	c.JSON(http.StatusCreated, blog)
}

func UpdateBlog(c *gin.Context, db *sql.DB) {
	id := c.Param("id")

	var blog Blog
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := db.Exec("UPDATE blogs SET title=?, description=?, detail=?, category=?, public_status=?, published_date=?, thumbnail_path=?, position=? WHERE id=?",
		blog.Title, blog.Description, blog.Detail, blog.Category, blog.PublicStatus, blog.PublishedDate, blog.ThumbnailPath, blog.Position, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}

func DeleteBlog(c *gin.Context, db *sql.DB) {
	id := c.Param("id")

	_, err := db.Exec("DELETE FROM blogs WHERE id=?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
}
