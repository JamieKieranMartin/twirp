package main

import (
	"context"
	"fmt"
	"main/rpc/math"
	"net/http"
	"os"

	"github.com/twitchtv/twirp"
)

func main() {
	client := math.NewMathProtobufClient("http://localhost:3000", &http.Client{}, twirp.WithClientPathPrefix("/rpc"))

	res, err := client.Add(context.Background(), &math.Parameters{X: 12, Y: 3})
	if err != nil {
		fmt.Printf("oh no: %v", err)
		os.Exit(1)
	}
	fmt.Println(res)

	res, err = client.Subtract(context.Background(), &math.Parameters{X: 12, Y: 3})
	if err != nil {
		fmt.Printf("oh no: %v", err)
		os.Exit(1)
	}
	fmt.Println(res)
}
