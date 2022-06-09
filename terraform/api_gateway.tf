resource "aws_api_gateway_rest_api" "storefront_rest_api" {
  name = "storefront-rest-api"
}

# stage and deployment resources
resource "aws_api_gateway_deployment" "test_deployment" {
  rest_api_id = local.rest_api_id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.storefront_rest_api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "test_stage" {
  deployment_id = aws_api_gateway_deployment.test_deployment.id
  rest_api_id   = local.rest_api_id
  stage_name    = "test"
}

locals {
  rest_api_id = aws_api_gateway_rest_api.storefront_rest_api.id
}

# ------------------------------------------------------------

resource "aws_api_gateway_resource" "cart_resource" {
  parent_id   = aws_api_gateway_rest_api.storefront_rest_api.root_resource_id
  path_part   = "cart"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_resource" "add_resource" {
  parent_id   = aws_api_gateway_resource.cart_resource.id
  path_part   = "add"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_method" "put_add_cart_method" {
  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.add_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_resource" "checkout_resource" {
  parent_id   = aws_api_gateway_resource.cart_resource.id
  path_part   = "checkout"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_method" "post_checkout_cart_method" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.checkout_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_method" "get_cart_method" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.cart_resource.id
  rest_api_id   = local.rest_api_id
  request_parameters = {
    "method.request.querystring.email" = true
  }
}

resource "aws_api_gateway_integration" "cart_lambda_integration" {
  rest_api_id             = local.rest_api_id
  resource_id             = aws_api_gateway_resource.cart_resource.id
  http_method             = aws_api_gateway_method.get_cart_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get_user_lambda.invoke_arn
  content_handling        = "CONVERT_TO_TEXT"
}

# Gives API GW permission to invoke Lambda function
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_user_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${local.rest_api_id}/*/${aws_api_gateway_method.get_cart_method.http_method}${aws_api_gateway_resource.cart_resource.path}"
}

resource "aws_api_gateway_resource" "products_resource" {
  parent_id   = aws_api_gateway_rest_api.storefront_rest_api.root_resource_id
  path_part   = "products"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_method" "get_products_method" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.products_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_method" "post_products_method" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.products_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_resource" "users_resource" {
  parent_id   = aws_api_gateway_rest_api.storefront_rest_api.root_resource_id
  path_part   = "users"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_method" "get_users_method" {
  authorization = "NONE"
  http_method   = "GET"
  resource_id   = aws_api_gateway_resource.users_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_method" "post_users_method" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.users_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_method" "put_users_method" {
  authorization = "NONE"
  http_method   = "PUT"
  resource_id   = aws_api_gateway_resource.users_resource.id
  rest_api_id   = local.rest_api_id
}

resource "aws_api_gateway_resource" "login_resource" {
  parent_id   = aws_api_gateway_resource.users_resource.id
  path_part   = "login"
  rest_api_id = local.rest_api_id
}

resource "aws_api_gateway_method" "post_login_users_method" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.login_resource.id
  rest_api_id   = local.rest_api_id
}
