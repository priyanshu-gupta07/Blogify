package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/priyanshu-gupta07/Blogify/database"
	"github.com/priyanshu-gupta07/Blogify/routes"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database.Connect()
}
func main() {

	sqlDB, err := database.DB.DB()

	if err != nil {
		panic("Could not connect to the database")
	}

	defer sqlDB.Close()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())

	routes.Setuprotes(app)

	app.Listen(":5000")

}
