provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
}

module "ec2_instance" {
  source        = "./ec2"
  instance_ami  = data.aws_ami.ubuntu
  instance_type = "t2.micro"
  # key_name      = "your-key-pair"
}
