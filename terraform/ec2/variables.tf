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

variable "instance_ami" {
  default = data.aws_ami.ubuntu.id
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  default = "your-key-pair"
}

variable "docker_compose_path" {
  default = "../../docker-compose.yml"
}

variable "elastic_ip_allocation_id" {
  default = "some_ip"
}