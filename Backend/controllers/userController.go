package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/tcabezas2005/BOXCONTROL/Backend/database"
	"github.com/tcabezas2005/BOXCONTROL/Backend/models"
)

// GetUsers obtiene todos los usuarios
func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	database.DB.Find(&users)
	return c.JSON(users)
}

// GetUser obtiene un usuario por ID
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User
	result := database.DB.First(&user, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Usuario no encontrado"})
	}
	return c.JSON(user)
}

// CreateUser crea un nuevo usuario
func CreateUser(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Error al analizar los datos"})
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error al crear el usuario"})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

// UpdateUser actualiza un usuario existente
func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	// Buscar el usuario
	result := database.DB.First(&user, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Usuario no encontrado"})
	}

	// Parsear datos actualizados
	var updateData models.User
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Error al analizar los datos"})
	}

	// Actualizar usuario
	database.DB.Model(&user).Updates(updateData)
	return c.JSON(user)
}

// DeleteUser elimina un usuario
func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	// Buscar el usuario
	result := database.DB.First(&user, id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Usuario no encontrado"})
	}

	// Eliminar usuario
	database.DB.Delete(&user)
	return c.SendStatus(fiber.StatusNoContent)
}
