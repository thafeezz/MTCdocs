package api

import (
	"MTCdocs/pkg/storage"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/russross/blackfriday/v2"
	"io"
	"net/http"
	"time"
)

// DocMeta contains document metadata
type DocMeta struct {
	ID          uuid.UUID
	Title       string
	Slug        string
	CreatedBy   string
	CreatedAt   time.Time
	AccessCount int
}

type DocServer struct {
	fileStore storage.FileStore
}

func NewDocServer(client storage.FileStore) *DocServer {
	return &DocServer{
		fileStore: client,
	}
}

func (srv *DocServer) ReadDoc(c *gin.Context) {

}

func (srv *DocServer) ReadDocs(c *gin.Context) {

}

func (srv *DocServer) WriteDoc(c *gin.Context) {
	err := srv.uploadDoc(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = srv.uploadMeta(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func (srv *DocServer) uploadMeta(c *gin.Context) error {
	var doc DocMeta

	if err := c.ShouldBindJSON(&doc); err != nil {
		return fmt.Errorf("failed to bind JSON: %w", err)
	}
	// TODO
	return nil
}

func (srv *DocServer) uploadDoc(c *gin.Context) error {
	doc, err := c.FormFile("document")
	if err != nil {
		return fmt.Errorf("could not get form file: %w", err)
	}

	file, err := doc.Open()
	if err != nil {
		return fmt.Errorf("could not open file: %w", err)
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return fmt.Errorf("could not read file: %w", err)
	}

	html := blackfriday.Run(fileBytes) // store as HTML

	_, err = srv.fileStore.PutObject("raw-docs", c.Param("id"), html)
	if err != nil { // maybe i want to use the context here for example
		return fmt.Errorf("could not upload document to S3: %w", err)
	}

	return nil
}
