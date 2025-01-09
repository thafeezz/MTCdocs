package main

import (
	"MTCdocs/pkg/api"
	"MTCdocs/pkg/storage"
	"context"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	r := gin.Default()

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Printf("Failed initializing server with error %v", err)
	}

	fs := storage.NewS3FileStore(s3.NewFromConfig(cfg))
	docServer := api.NewDocServer(fs)

	r.GET("/api/documents/:id", docServer.ReadDoc)

	r.GET("/api/documents", docServer.ReadDocs)

	r.POST("/api/documents", docServer.WriteDoc)

	r.Run(":8080")
}
