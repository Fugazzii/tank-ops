module "shared" {
    source = "../shared"
}

module "vpc" {
    source = "../vpc"
}

module "elastic_ip" {
    source = "../elastic-ip"
}

resource "aws_instance" "ec2_instance" {
    ami             = var.instance_ami
    instance_type   = var.instance_type
    key_name        = var.key_name
    vpc_security_group_ids = [module.vpc.default_security_group_id]

    tags = {
        Name = "EC2 Instance"
    }
}

resource "aws_network_interface_attachment" "attachment" {
    depends_on      = [aws_instance.ec2_instance]
    count           = length(module.vpc.public_subnet_ids)
    device_index    = count.index
    instance_id     = aws_instance.ec2_instance.id
    network_interface_id = aws_instance.ec2_instance.network_interface_ids[count.index]
}

resource "aws_network_interface" "net" {
    count           = length(module.vpc.public_subnet_ids)
    subnet_id       = module.vpc.public_subnet_ids[count.index]
    security_groups = [module.vpc.default_security_group_id]

    attachment {
        device_index    = 0
        instance        = aws_instance.ec2_instance
    }
}

resource "aws_network_interface" "internal_net" {
    count           = length(module.vpc.private_subnet_ids)
    subnet_id       = module.vpc.private_subnet_ids[count.index]
    security_groups = [module.vpc.default_security_group_id]

    attachment {
        device_index    = 0
        instance        = aws_instance.ec2_instance
    }
}

resource "aws_network_interface" "elastic_ip" {
    count           = length(module.vpc.public_subnet_ids)
    subnet_id       = module.vpc.public_subnet_ids[count.index]
    security_groups = [module.vpc.default_security_group_id]
}

resource "aws_instance" "eip_instance" {
    ami             = var.instance_ami
    instance_type   = var.instance_type
    key_name        = var.key_name

    network_interface {
        device_index          = 0
        network_interface_id  = aws_network_interface.elastic_ip[count.index].id
    }

    tags = {
        Name = "EC2 Instance with Elastic IP"
    }
}
