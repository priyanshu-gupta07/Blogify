package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/priyanshu-gupta07/Blog/database"
)

func init() {
	database.Connect()

}
func main() {

	sqlDB, err := database.DB.DB()

	if err != nil {
		panic("Could not connect to the database")
	}

	defer sqlDB.Close()
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Listen(":3000")

}
