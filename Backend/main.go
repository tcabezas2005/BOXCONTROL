package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	database "github.com/tcabezas2005/BOXCONTROL/Backend/db"
	"github.com/tcabezas2005/BOXCONTROL/Backend/routes"
)

func main() {
	app := fiber.New()

	// Configurar CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	database.Connect()
	routes.SetupUserRoutes(app)

	app.Listen(":8080")
}
