package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tcabezas2005/BOXCONTROL/Backend/database"
	"github.com/tcabezas2005/BOXCONTROL/Backend/models"
	"github.com/tcabezas2005/BOXCONTROL/Backend/routes"
)


func main() {
	// Inicializar la aplicación Fiber
	app := fiber.New()

	// Conectar a la base de datos SQLite
	err := database.Connect()
	if err != nil {
		panic("Error al conectar con la base de datos: " + err.Error())
	}

	// Configurar rutas
	routes.SetupUserRoutes(app)

	// Iniciar servidor
	app.Listen(":3000")
}
