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
  name               = "get-user-role"
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
