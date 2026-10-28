![Lab](https://img.shields.io/badge/Lab-AWS%20CLI%20Configuration%20%26%20IAM%20Policy-brightgreen?style=for-the-badge)

![Overview](https://img.shields.io/badge/Overview-orange?style=for-the-badge)

The goal of this lab was to install and configure the AWS CLI on an EC2 instance and use it to interact with AWS IAM. By connecting via SSH to an EC2 instance inside a VPC, I demonstrated how to authenticate the CLI with AWS credentials and retrieve IAM policy information programmatically.

The lab covered three key workflows: CLI installation, credential configuration, and querying IAM policies using CLI commands and JMESPath filters.

---

![Architecture](https://img.shields.io/badge/Architecture-orange?style=for-the-badge)

```
EC2 Instance (SSH Access)
        │
        ▼
AWS CLI v2 (Installed & Configured)
        │
        ▼
AWS IAM (Policy Query & Retrieval)
```

---

![Objectives](https://img.shields.io/badge/Objectives-orange?style=for-the-badge)

- Install and configure the AWS CLI
- Connect the AWS CLI to an AWS account
- Access IAM using the AWS CLI

---

![Setup](https://img.shields.io/badge/Setup-orange?style=for-the-badge)

![1. Installing AWS CLI on the EC2 Instance](https://img.shields.io/badge/1._Installing%20AWS%20CLI%20on%20EC2-brightgreen?style=for-the-badge)

I connected via SSH to an EC2 instance inside a VPC and downloaded AWS CLI version 2:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -u awscliv2.zip
./aws/install
```

![CLI Installation on Red Hat Linux Instance](Screenshots/CLI_Installation_on_Red_Hat_Linux_Instance.png)

---

![2. Configuring AWS CLI Credentials](https://img.shields.io/badge/2._Configuring%20Credentials-brightgreen?style=for-the-badge)

After installation, I ran `aws configure` to connect the CLI to my AWS account:

```bash
aws configure
```

This prompts for:
- **AWS Access Key ID** — from IAM user credentials
- **AWS Secret Access Key** — paired with the Access Key ID
- **Default Region** — where API calls are routed (e.g., `us-west-2`)
- **Default Output Format** — json, table, or text

Once configured, the CLI session is authenticated and scoped to that IAM user's permissions.

![Configuring CLI](Screenshots/Configuring_CLI.png)

---

![3. Observing the lab_policy in the AWS Console](https://img.shields.io/badge/3._Policy%20Observation-brightgreen?style=for-the-badge)

Before querying via CLI, I inspected the `lab_policy` document directly in the AWS Management Console to understand its structure. The policy grants permissions across CloudFormation, CloudWatch, and EC2 actions.

![IAM Policy Observation](Screenshots/IAM_Policy_Observation.png)

---

![4. Listing All IAM Policies via CLI](https://img.shields.io/badge/4._Listing%20Policies-brightgreen?style=for-the-badge)

I queried the IAM service to list all available policies in the account:

```bash
aws iam list-policies
```

This confirmed that `lab_policy` existed with:
- **ARN:** `arn:aws:iam::850232998439:policy/lab_policy`
- **Default Version:** `v1`

![All Policies Listed](Screenshots/All_Policies_Listed.png)

---

![5. Filtering Policy ARN and Version ID](https://img.shields.io/badge/5._Filter%20with%20JMESPath-brightgreen?style=for-the-badge)

To retrieve only the ARN and version ID, I used a JMESPath query:

```bash
aws iam list-policies \
  --query 'Policies[?PolicyName==`lab_policy`].{ARN:Arn,Version:DefaultVersionId}' \
  --output table
```

JMESPath is a query language that filters and transforms JSON output. The query above:
- Filters `Policies[]` to find where `PolicyName` equals `lab_policy`
- Projects only the `Arn` and `DefaultVersionId` fields
- Returns the result in table format

![Policy ARN and Version Request](Screenshots/Policy_ARN_and_Version_Request.png)

---

![6. Downloading the Policy Document as JSON](https://img.shields.io/badge/6._Export%20Policy%20Document-brightgreen?style=for-the-badge)

Using the retrieved ARN and version ID, I extracted the full policy document:

```bash
aws iam get-policy-version \
  --policy-arn arn:aws:iam::850232998439:policy/lab_policy \
  --version-id v1 \
  --query 'PolicyVersion.Document' \
  --output json
```

The query returns the policy document as formatted JSON, which is identical to what appears in the AWS Management Console. This demonstrates that the CLI provides programmatic access to the same information available in the UI.

![Lab Policy Downloaded](Screenshots/Lab_Policy_Downloaded.png)

---

![Final Result](https://img.shields.io/badge/Final%20Result-orange?style=for-the-badge)

- AWS CLI v2 successfully installed on EC2 instance
- CLI authenticated with IAM credentials
- IAM policies listed and queried via CLI
- Policy document exported as JSON
- JMESPath filtering applied for structured output

---

![Lessons Learned](https://img.shields.io/badge/Lessons%20Learned-orange?style=for-the-badge)

- **JMESPath queries reduce output noise.** Without filtering, `aws iam list-policies` returns hundreds of lines. Using `--query` focuses results to exactly what you need.
- **ARNs are the unique identifier for AWS resources.** Every AWS service has an ARN format (e.g., `arn:aws:iam::account-id:policy/name`). Learning to read and construct ARNs is essential for CLI work.
- **CLI output formats matter.** JSON is easiest to parse programmatically, but table format is better for quick human inspection. Use `--output` to match your use case.
- **AWS CLI is stateless.** Each command is independent — credentials are read from `~/.aws/credentials` and region from `~/.aws/config`. There's no session state to track.
