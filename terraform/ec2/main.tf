module "shared" {
  source = "../shared"
}

module "vpc" {
  source                = "../vpc"
  vpc_cidr_block        = "10.1.0.0/16"
  public_subnet_cidr    = "10.1.1.0/24"
  private_subnet_cidr   = "10.1.2.0/24"
}

module "elastic_ip" {
  source = "../elastic-ip"
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

resource "aws_instance" "ec2_instance" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  # key_name               = var.key_name
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  subnet_id              = module.vpc.public_subnet_id 

  tags = {
    Name = "EC2 Instance"
  }
}

resource "aws_network_interface_attachment" "attachment" {
  depends_on        = [aws_instance.ec2_instance]
  device_index      = 1
  instance_id       = aws_instance.ec2_instance.id
  network_interface_id = aws_network_interface.elastic_ip.id
}

resource "aws_network_interface" "net" {
  subnet_id       = module.vpc.public_subnet_id
  security_groups = [module.vpc.default_security_group_id]

  attachment {
    device_index    = 0
    instance        = aws_instance.ec2_instance.id
  }
}

resource "aws_network_interface" "internal_net" {
  subnet_id       = module.vpc.private_subnet_id
  security_groups = [module.vpc.default_security_group_id]

  attachment {
    device_index    = 0
    instance        = aws_instance.ec2_instance.id
  }
}

resource "aws_network_interface" "elastic_ip" {
  subnet_id       = module.vpc.public_subnet_id
  security_groups = [module.vpc.default_security_group_id]
}

resource "aws_instance" "eip_instance" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = var.instance_type
  # key_name        = var.key_name

  network_interface {
    device_index          = 0
    network_interface_id  = aws_network_interface.elastic_ip.id
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y docker.io docker-compose",
      "git clone https://github.com/Fugazzii/tank-ops ./tank-ops",
      "cd ./tank-ops",
      "sudo docker-compose up --build -V",
    ]
  }

  connection {
    type = "ssh"
    user = "ubuntu"
    host = aws_instance.ec2_instance.public_ip
    private_key = file("/home/ilia/Downloads/ilia.pem")
  }

  tags = {
    Name = "EC2 Instance with Elastic IP"
  }
}
