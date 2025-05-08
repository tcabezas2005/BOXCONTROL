package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tcabezas2005/BOXCONTROL/Backend/db"
	"github.com/tcabezas2005/BOXCONTROL/Backend/routes"
)

func main() {
	app := fiber.New()
	
	database.Connect()
	routes.SetupRoutes(app)
	
	app.Listen(":3000")
}
