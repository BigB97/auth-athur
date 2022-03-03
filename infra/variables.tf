variable "auth_region" {
  default = "eu-west-2"
}
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "service_name" {}
variable "aws_account_id" {}
variable "auth_bucket_name" {}
variable "authr_codestar_connection" {}
variable "repo_uri" {}




locals {
  aws_region = "${var.auth_region}"
  aws_access_key = "${var.aws_access_key}"
  aws_secret_key = "${var.aws_secret_key}"

  tags = {
    Name = "authr-app"
  }
  env = "authq"
}