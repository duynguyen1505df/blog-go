package routes

import (
	"blog-go-api/service"
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(db *sql.DB) {
	r := gin.Default()

	// Use CORS middleware with default options to allow all origins, methods, and headers
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Middleware for logging
	r.Use(func(c *gin.Context) {
		println("Request received")
		c.Next()
	})

	// Define API endpoints
	api := r.Group("/api")
	{
		api.GET("/blogs", func(c *gin.Context) {
			title := c.Query("title")
			service.GetBlogs(c, db, title)
		})

		api.GET("/blogs/:id", func(c *gin.Context) {
			service.GetBlogByID(c, db)
		})

		api.POST("/blogs", func(c *gin.Context) {
			service.CreateBlog(c, db)
		})

		api.PATCH("/blogs/:id", func(c *gin.Context) {
			service.UpdateBlog(c, db)
		})

		api.DELETE("/blogs/:id", func(c *gin.Context) {
			service.DeleteBlog(c, db)
		})
	}

	// Run server
	if err := r.Run(); err != nil {
		panic(err)
	}
}

func RunServer(address string) error {
	return http.ListenAndServe(address, nil)
}
