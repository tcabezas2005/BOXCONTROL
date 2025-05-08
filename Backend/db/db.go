package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"github.com/tcabezas2005/BOXCONTROL/Backend/models"
)

var DB *gorm.DB

func Connect() error {
	var err error
	// Conexión a SQLite (se creará el archivo si no existe)
	DB, err = gorm.Open(sqlite.Open("BOXCONTROL.db"), &gorm.Config{})
	if err != nil {
		return err
	}

	// Migrar el modelo User
	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		return err
	}

	return nil
}
