terraform refresh
terraform init
rm plan
terraform plan -out=plan
terraform apply "plan"