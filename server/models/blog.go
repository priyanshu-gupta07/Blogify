package models

// import (
// 	"gorm.io/gorm"
// )

type Blog struct {
	ID uint `json:"id" gorm:"primaryKey"`

	Title string `json:"title" gorm:"not null;column:title;size:255"`

	Content string `json:"content"  gorm:"not null;column:content;size:1000"`
	
}