package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/priyanshu-gupta07/Blogify/controllers"
)

func Setuprotes(app *fiber.App) {
	//All Blog=>GET
	app.Get("/",controllers.GetBlogs)
	//add=>POST
	app.Post("/create",controllers.CreateBlog)
	//blog=>GET
	app.Get("/blog/:id",controllers.GetBlog)
	//update=>PUT
	app.Put("/blog/:id",controllers.UpdateBlog)
	//delete=>DELETE
	app.Delete("/blog/:id",controllers.DeleteBlog)
}
