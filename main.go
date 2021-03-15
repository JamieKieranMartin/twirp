package main

import (
	mathService "main/internal/math"
	"main/rpc/math"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/twitchtv/twirp"
)

func main() {
	server := &mathService.Server{}
	handler := math.NewMathServer(server, twirp.WithServerPathPrefix("/rpc"))

	// New fiber app
	app := fiber.New()

	app.Use(logger.New())

	app.Use("/", adaptor.HTTPHandler(handler))

	app.Listen(":3000")
}
