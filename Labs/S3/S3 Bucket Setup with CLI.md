![Lab](https://img.shields.io/badge/Lab-AWS%20S3%20Bucket%20Setup%20%26%20Static%20Hosting-brightgreen?style=for-the-badge)

![Overview](https://img.shields.io/badge/Overview-orange?style=for-the-badge)

The goal of this lab was to create an S3 bucket, configure it for static website hosting, and demonstrate public access to hosted objects. By combining AWS Console operations with AWS CLI commands, I demonstrated how to set up end-to-end object storage and retrieval.

The lab covered five key workflows: bucket creation, multi-path file uploads (console and CLI), static website hosting configuration, public access policy management, and browser-based object retrieval.

---

![Architecture](https://img.shields.io/badge/Architecture-orange?style=for-the-badge)

```
S3 Bucket (mismail125)
        │
        ├─ Upload via Console (file1.txt)
        │
        ├─ Upload via CLI (file2.txt, index.html)
        │
        ├─ Enable Static Website Hosting
        │
        ├─ Disable Block Public Access
        │
        └─ Apply Public-Read Bucket Policy
                │
                ▼
        Public HTTPS Access from Browser
```

---

![Objectives](https://img.shields.io/badge/Objectives-orange?style=for-the-badge)

- Create an S3 bucket via the AWS Console
- Configure AWS CLI credentials and upload files
- Enable static website hosting on the bucket
- Modify bucket permissions for public read access
- Verify public object retrieval via browser

---

![Setup](https://img.shields.io/badge/Setup-orange?style=for-the-badge)

![1. Launch EC2 Instance for CLI Access](https://img.shields.io/badge/1._Launch%20EC2%20Instance-brightgreen?style=for-the-badge)

Launched a `t3.micro` EC2 instance (`CLI Host`) to run AWS CLI commands and connect to the S3 bucket. This instance is positioned inside a VPC and provides CLI access to AWS services.

![Launching CLI through EC2](Screenshots/1%20Launching%20CLI%20through%20EC2.png)

---

![2. Configure AWS CLI Credentials](https://img.shields.io/badge/2._Configure%20AWS%20CLI-brightgreen?style=for-the-badge)

Connected to the EC2 instance via SSH and configured the AWS CLI:

```bash
aws configure
```

This prompts for:
- **AWS Access Key ID** — from IAM user credentials
- **AWS Secret Access Key** — paired with the Access Key ID
- **Default Region** — where API calls are routed (e.g., `us-west-2`)
- **Default Output Format** — json, table, or text

Once configured, the CLI session is authenticated and scoped to that IAM user's permissions.

![Configuring CLI](Screenshots/2%20Configuring%20CLI.png)

> **Note:** never paste real credentials into a terminal that gets screenshotted or committed to a repo. If exposed, rotate them immediately in IAM.

---

![3. Create S3 Bucket](https://img.shields.io/badge/3._Create%20S3%20Bucket-brightgreen?style=for-the-badge)

Created bucket `mismail125` via the S3 console with no initial objects. S3 was chosen because it is purpose-built for storing and serving static objects (files, images, HTML) at scale without managing infrastructure.

![Bucket creation through S3](Screenshots/3%20Bucket%20creation%20through%20S3.png)

---

![4. Upload Files (Console + CLI)](https://img.shields.io/badge/4._Upload%20Files-brightgreen?style=for-the-badge)

**Via Console:**
- Used the **Upload** button to add `file1.txt` (44.0 B) — succeeded. This confirms the console upload path works before relying on CLI automation.

![Uploading file to S3](Screenshots/4.1%20Uploading%20file%20to%20S3.png)

**Via CLI:**
```bash
aws s3 ls s3://mismail125
touch file2.txt
aws s3 mv file2.txt s3://mismail125
```

Initial attempt using `cp file2.txt s3://mismail125` failed because S3 requires either a full object key or trailing slash to know where to place the file inside the bucket. The `mv` command handled that path resolution automatically and succeeded.

![Creating and adding file to S3 bucket from CLI](Screenshots/4.2%20Creating%20and%20adding%20file%20to%20s3%20bucket%20from%20CLI.png)

Confirmed both files are present:
```bash
aws s3 ls s3://mismail125
2026-07-03 18:11:45     44 file1.txt
2026-07-03 18:15:36      0 file2.txt
```

![Upload to bucket confirmed](Screenshots/5%20Upload%20to%20bucket%20confirmed.png)

---

![5. Enable Static Website Hosting](https://img.shields.io/badge/5._Static%20Website%20Hosting-brightgreen?style=for-the-badge)

In the bucket **Properties** tab → **Static website hosting** → enabled and set the index document to `index.html`. This transforms the bucket into a website endpoint, so S3 serves `index.html` by default instead of requiring explicit object keys.

![Static hosting enabled](Screenshots/6%20Static%20hosting%20enabled.png)

---

![6. Disable Block Public Access](https://img.shields.io/badge/6._Disable%20Block%20Public%20Access-brightgreen?style=for-the-badge)

In the bucket **Permissions** tab → **Block public access (bucket settings)** → Edit → toggled **off** Block all public access. This setting is enabled by default as a safety guardrail; it must be explicitly disabled to allow public access to bucket objects.

![Enabled Public Access](Screenshots/7%20Enabled%20Public%20Access.png)

---

![7. Add Public-Read Bucket Policy](https://img.shields.io/badge/7._Add%20Bucket%20Policy-brightgreen?style=for-the-badge)

In the **Permissions** tab → **Bucket Policy** → added the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mismail125/*"
    }
  ]
}
```

This policy is the actual permission grant: it allows any principal (`*`) to execute `GetObject` on any object inside the bucket, which is what makes files publicly readable over HTTPS. The action is scoped to `GetObject` only — no write or delete permissions are granted.

Result: "Successfully edited bucket policy."

![Added Bucket policy for website viewing](Screenshots/8%20Added%20Bucket%20policy%20for%20website%20viewing.png)

---

![8. Verify Public Access via Browser](https://img.shields.io/badge/8._Verify%20Public%20Access-brightgreen?style=for-the-badge)

Uploaded `index.html` via CLI and confirmed its presence:

```bash
aws s3 ls s3://mismail125
2026-07-03 18:11:45     44 file1.txt
2026-07-03 18:15:36      0 file2.txt
2026-07-03 18:33:57      0 index.html
```

Accessed the object directly via HTTPS URL:

```
https://mismail125.s3.us-west-2.amazonaws.com/file1.txt
```

The browser rendered the file contents: **"This is a text file to add into my s3 bucket"** — this is the end-to-end proof that the block-public-access configuration change and bucket policy work together to enable public read access, not just in theory but in practice.

![Viewing object in web browser](Screenshots/9%20Viewing%20obkect%20in%20web%20browser.png)

---

![Final Result](https://img.shields.io/badge/Final%20Result-orange?style=for-the-badge)

- S3 bucket created and populated via both AWS Console and CLI
- Static website hosting enabled with `index.html` as index document
- Block Public Access setting disabled at bucket level
- Public-read IAM policy applied to all bucket objects
- Public HTTPS access verified by loading object directly in browser
- Multi-path upload workflows validated (console + CLI)

---

![Lessons Learned](https://img.shields.io/badge/Lessons%20Learned-orange?style=for-the-badge)

- **Console and CLI are complementary.** Some tasks (like bucket creation and policy attachment) are faster in the Console; others (like listing and batch uploads) are faster via CLI. Understanding both paths increases efficiency.
- **S3 path semantics differ between console and CLI.** The console infers object keys from file names, but the CLI requires explicit paths or trailing slashes. Using `aws s3 mv` instead of `cp` resolved this mismatch automatically.
- **Bucket Policy + Block Public Access must both be configured.** Disabling "Block Public Access" alone is not sufficient — you also need an explicit IAM policy that grants `GetObject` permission. Together, they form a complete authorization model.
- **HTTPS is the standard S3 endpoint protocol.** S3 buckets are accessed via `https://bucket-name.s3.region.amazonaws.com/object-key`. No special setup is required; encryption in transit is built-in.
- **Static website hosting is an optional feature.** Enabling it sets a default index document, but objects remain accessible via direct URL regardless of whether the feature is enabled. The feature is mainly useful for SPA and documentation hosting workflows.
