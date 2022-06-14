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
