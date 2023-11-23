terraform refresh
rm plan
terraform plan -out=plan
terraform apply "plan"