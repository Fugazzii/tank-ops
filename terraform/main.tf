provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source               = "./vpc"
  vpc_cidr_block       = "10.1.0.0/16"
  public_subnet_cidr    = "10.1.1.0/24"
  private_subnet_cidr   = "10.1.2.0/24"
}
