terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region                      = var.aws_region
  access_key                  = var.local_access
  secret_key                  = var.local_secret
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    s3     = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "documents" {
  bucket = "raw-docs"
}