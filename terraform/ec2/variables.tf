variable "instance_type" {
  default = "t2.micro"
}

# variable "key_name" {
#   default = "your-key-pair"
# }

variable "docker_compose_path" {
  default = "../../docker-compose.yml"
}

variable "elastic_ip_allocation_id" {
  default = "some_ip"
}

variable "instance_ami" {
  default = "ilia"
}
