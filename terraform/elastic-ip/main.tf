resource "aws_eip" "ec2_instance_ip" {
    lifecycle {
        create_before_destroy = true
    }
}