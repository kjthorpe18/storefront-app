resource "aws_dynamodb_table" "users_dynamodb_table" {
  name           = "users"
  read_capacity  = 1
  write_capacity = 1
}
