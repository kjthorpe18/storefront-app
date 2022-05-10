# s3 bucket, api gw, lambda, dynamo
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.13.0"
    }
  }
}

data "aws_caller_identity" "current" {}
