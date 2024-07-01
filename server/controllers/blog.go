package controllers

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/priyanshu-gupta07/Blogify/database"
	"github.com/priyanshu-gupta07/Blogify/models"
)

// List All blog
func GetBlogs(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "All Blogs",
	}

	time.Sleep(2 * time.Second)

	db := database.DB

	var blog []models.Blog

	db.Find(&blog)

	context["data"] = blog

	c.Status(200)
	return c.JSON(context)
}

// Create a blog
func CreateBlog(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Add Blog",
	}

	record := new(models.Blog)

	if err := c.BodyParser(&record); err != nil {
		log.Fatal("error in parsing the body")
		context["statusText"] = ""
		context["msg"] = "Error occured"
	}

	result := database.DB.Create(&record)

	if result.Error != nil {
		log.Fatal("error in creating the record")
		context["statusText"] = ""
		context["msg"] = "Error occured"
	}

	context["data"] = record
	context["msg"] = "Blog Added Successfully"

	c.Status(201)
	return c.JSON(context)
}

// Get a blog
func GetBlog(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Blog found",
	}

	id := c.Params("id")

	var record models.Blog

	database.DB.First(&record, id)

	if record.ID == 0 {
		context["statusText"] = "Not Found"
		context["msg"] = "Blog not found"
		c.Status(404)
		return c.JSON(context)
	}

	context["data"] = record

	c.Status(200)
	return c.JSON(context)
}

// Update a blog
func UpdateBlog(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "Ok",
		"msg":        "Update Blog",
	}

	id := c.Params("id")

	var record models.Blog

	database.DB.First(&record, id)

	if record.ID == 0 {
		context["statusText"] = "Not Found"
		context["msg"] = "Blog not found"
		c.Status(400)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Fatal("error in parsing the body")
		context["statusText"] = ""
		context["msg"] = "Error occured"
	}

	result := database.DB.Save(record)

	if result.Error != nil {
		log.Fatal("error in updating the record")
		context["statusText"] = ""
		context["msg"] = "Error occured"
	}

	context["data"] = record

	c.Status(200)
	return c.JSON(context)
}

// Delete a blog
func DeleteBlog(c *fiber.Ctx) error {

	context := fiber.Map{
		"statusText": "",
		"msg":        "",
	}

	id := c.Params("id")

	var record models.Blog

	database.DB.First(&record, id)

	if record.ID == 0 {
		context["statusText"] = "Not Found"
		context["msg"] = "Blog not found"
		c.Status(400)
		return c.JSON(context)
	}

	result := database.DB.Delete(record)

	if result.Error != nil {
		log.Fatal("error in deleting the record")
		context["statusText"] = ""
		context["msg"] = "Error occured"
	}

	context["statusText"] = "Ok"
	context["msg"] = "Delete Blog"
	c.Status(200)
	return c.JSON(context)
}
