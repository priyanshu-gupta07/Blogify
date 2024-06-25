package database

import (
	"log"

	"github.com/priyanshu-gupta07/Blog/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	dsn := "root:Password@123@tcp(127.0.0.1:3306)/Blogify?charset=utf8mb4&parseTime=True&loc=Local"

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
 