package database

import (
	"log"
	"os"

	"github.com/priyanshu-gupta07/Blogify/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {

	user := os.Getenv("db_user")
	pass := os.Getenv("db_password")
	name := os.Getenv("db_name")
	dsn := user+":"+pass+"@tcp(127.0.0.1:3306)/"+name+"?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic("Could not connect to the database")
	}

	log.Println("Succesfully connected to the database")

	db.AutoMigrate(new(models.Blog))

	DB = db
}
