# AWS CLI Configuration & IAM Policy Lab

## Architecture

<img src="Screenshots/Configuring CLI.png" width="75%"/>

I connected via SSH to an EC2 instance inside a VPC. From this instance, I used the AWS CLI to communicate directly with AWS IAM.
---

## Objectives

<img src="Screenshots/Objectives.png" width="75%"/>

- Install and configure the AWS CLI
- Connect the AWS CLI to an AWS account
- Access IAM using the AWS CLI

---

## 1. Installing AWS CLI on the EC2 Instance

<img src="Screenshots/CLI Installation on Red Hat Linux Instance.png" width="75%"/>

I downloaded and unpacked the AWS CLI version 2 installation package:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -u awscliv2.zip
```

---

## 2. Observing the `lab_policy` in the AWS Console.

I inspected the lab_policy document directly in the AWS Management Console to review its granted permissions across CloudFormation, CloudWatch, and EC2 actions. The `lab_policy` document is a customer-managed policy.

<img src="Screenshots/IAM Policy Observation.png" width="75%"/>

---

## 3. Listing All IAM Policies via CLI.

<img src="Screenshots/All Policies Listed.png" width="75%"/>

I queried the IAM service to list all available policies in the account:

```bash
aws iam list-policies
```

This Confirmed that `lab_policy` had existed with:
- **ARN:** `arn:aws:iam::850232998439:policy/lab_policy`
- **Default Version:** `v1`

---

## 4. Finding the Policy ARN and Version ID

<img src="Screenshots/Policy ARN and Version Request.png" width="75%"/>

I filtered the results using a JMESPath query to output the ARN and version ID in a structured table:

```bash
aws iam list-policies \
  --query 'Policies[?PolicyName==`lab_policy`].{ARN:Arn,Version:DefaultVersionId}' \
  --output table
```

---

## 5. Downloading the Policy Document as JSON

<img src="Screenshots/Lab Policy Downloaded.png" width="75%"/>

Using the retrieved ARN and version ID, I extracted the policy document directly as formatted JSON:

```bash
aws iam get-policy-version \
  --policy-arn arn:aws:iam::850232998439:policy/lab_policy \
  --version-id v1 \
  --query 'PolicyVersion.Document' \
  --output json
```

This query returned the full JSON-formatted IAM policy document which was identical to what is displayed in the AWS Management Console.
