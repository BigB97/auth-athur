terraform {
    backend "s3" {
      bucket = "authrapp-state-bucket-name"
      key    = "terraform.tfstate"
      region = "eu-west-2"
    }
}

provider "aws" {
    region = var.auth_region
}
