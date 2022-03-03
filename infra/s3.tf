resource "aws_s3_bucket" "auth_bucket" {
  bucket = "${var.auth_bucket_name}"  
}
