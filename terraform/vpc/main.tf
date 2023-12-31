module "shared" {
  source = "../shared"
}

# Create VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "Tank-Ops VPC"
  }
}

resource "aws_security_group" "default" {
    vpc_id = aws_vpc.main.id

    ingress {
        from_port   = 0
        to_port     = 0
        protocol    = -1
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Create public subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = module.shared.az
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet"
  }
}

# Create private subnet
resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.private_subnet_cidr
  availability_zone       = module.shared.az
  map_public_ip_on_launch = false
  tags = {
    Name = "Private Subnet"
  }
}
