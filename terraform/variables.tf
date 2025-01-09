variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "local_access" {
  description = "local access key for testing"
  type        = string
  default     = "test"
}


variable "local_secret" {
  description = "local secret for testing"
  type        = string
  default     = "test"
}