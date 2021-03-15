package math

import (
	"context"
	"main/rpc/math"
)

type Server struct{}

func (s *Server) Add(ctx context.Context, parameters *math.Parameters) (*math.Result, error) {
	return &math.Result{
		Z: parameters.X + parameters.Y,
	}, nil
}

func (s *Server) Subtract(ctx context.Context, parameters *math.Parameters) (*math.Result, error) {
	return &math.Result{
		Z: parameters.X - parameters.Y,
	}, nil
}
