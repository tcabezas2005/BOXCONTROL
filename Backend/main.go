package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/tcabezas2005/BOXCONTROL/Backend/db"
    "github.com/tcabezas2005/BOXCONTROL/Backend/routes"
)

func main() {
    db.Connect()

    app := fiber.New()

    // Middleware CORS - Permite todas las orígenes (para desarrollo)
    app.Use(cors.New(cors.Config{
        AllowOrigins: "*", // permite cualquier origen
        AllowMethods: "GET,POST,PUT,DELETE",
        AllowHeaders: "Origin, Content-Type, Accept",
    }))

    // Configura rutas
    routes.SetupUserRoutes(app)

    app.Listen(":3000")
}
