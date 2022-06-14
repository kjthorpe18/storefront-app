resource "aws_dynamodb_table" "users_dynamodb_table" {
  name           = "users"
  read_capacity  = 1
  write_capacity = 1

  hash_key       = "email"

   attribute {
    name = "email"
    type = "S"
  }
}

resource "aws_dynamodb_table" "products_dynamodb_table" {
  name           = "storefront-products"
  read_capacity  = 1
  write_capacity = 1

  hash_key       = "productUUID"

  attribute {
    name = "productUUID"
    type = "S"
  }
}

resource "aws_dynamodb_table" "categories_dynamodb_table" {
  name           = "storefront-categories"
  read_capacity  = 1
  write_capacity = 1

  hash_key       = "category"

  attribute {
    name = "category"
    type = "S"
  }
}
