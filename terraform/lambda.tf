resource "aws_iam_role" "lambda_role" {
  name = "lambda-service-role"
  managed_policy_arns = [
    "arn:aws:iam::294380459317:policy/dynamo-access-policy",
    "arn:aws:iam::294380459317:policy/ses-send-email"
  ]

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = "LambdaAssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ]
  })
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
  handler       = "main"
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
