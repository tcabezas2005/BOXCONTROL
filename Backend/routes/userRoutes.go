package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tcabezas2005/BOXCONTROL/Backend/controllers"
)

func SetupUserRoutes(app *fiber.App) {
	userRoutes := app.Group("/api/users")

	userRoutes.Get("/", controllers.GetUsers)
	userRoutes.Get("/:id", controllers.GetUser)
	userRoutes.Post("/", controllers.CreateUser)
	userRoutes.Put("/:id", controllers.UpdateUser)
	userRoutes.Delete("/:id", controllers.DeleteUser)
}
