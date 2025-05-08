package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nombre     string `json:"nombre" gorm:"not null"`
	Email      string `json:"email" gorm:"unique;not null"`
	Password   string `json:"password" gorm:"not null"`
	Telefono   string `json:"telefono"`
	Direccion  string `json:"direccion"`
}
