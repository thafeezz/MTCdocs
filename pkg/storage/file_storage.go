package storage

import (
	"bytes"
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// FileStore
// consumers of this interface should refer to the documentation for implementations' function return types
// in order to access the native funcs/attr of the native object via type assertion
type FileStore interface {
	GetObject(key string) (interface{}, error)
	PutObject(bucket string, key string, data []byte) (interface{}, error)
}

type S3FileStore struct {
	client *s3.Client
}

func NewS3FileStore(client *s3.Client) *S3FileStore {
	return &S3FileStore{client: client}
}

// GetObject returns *s3.GetObjectOutput
func (fs *S3FileStore) GetObject(key string) (interface{}, error) {
	object, err := fs.client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String("raw-docs"),
		Key:    aws.String(key),
	})
	return object, err
}

// PutObject returns *s3.PutObjectOutput
func (fs *S3FileStore) PutObject(bucket string, key string, data []byte) (interface{}, error) {
	object, err := fs.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   bytes.NewReader(data),
	})
	return object, err
}
