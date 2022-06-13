resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = "storefront-site"

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket" "static_website_bucket" {
  bucket = "storefront-site"

  tags = {}
}
