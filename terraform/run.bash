terraform refresh
terraform init
rm plan.tfplan
terraform plan -out=plan.tfplan
terraform apply "plan.tfplan"