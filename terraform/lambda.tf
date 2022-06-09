data "aws_iam_policy_document" "lambda_dynamodb_permissions" {
  statement {
    sid    = "ReadWriteUsersTable"
    effect = "Allow"

    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem"
    ]
    resources = ["arn:aws:dynamodb:*:*:table/users"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-service-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "read_write_users_table_policy"
  role = aws_iam_role.lambda_role.id

  policy = data.aws_iam_policy_document.lambda_dynamodb_permissions.json
}

resource "aws_lambda_function" "get_user_lambda" {
  function_name = "get-user"
  description   = "Gets a user's information"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "get_products_lambda" {
  function_name = "get-products"
  description   = "Gets all products"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "get_all_products_go_lambda" {
  function_name = "get_all_products_go"
  description   = "Gets all products by scanning the Products table"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.get-all-products"
  runtime       = "go1.x"
}

resource "aws_lambda_function" "checkout_cart_lambda" {
  function_name = "checkout-cart"
  description   = "Runs the checkout process for a user's cart"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "update_user_lambda" {
  function_name = "update-user"
  description   = "Updates a user's information"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "login_user_lambda" {
  function_name = "login-user"
  description   = "Logs in a user"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "add_to_cart_lambda" {
  function_name = "add-to-cart"
  description   = "Adds an item to a user's cart"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "create_user_lambda" {
  function_name = "create-user"
  description   = "Logs in a user"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}

resource "aws_lambda_function" "create_new_product_lambda" {
  function_name = "create-new-product"
  description   = "Creates a new product"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"
}
