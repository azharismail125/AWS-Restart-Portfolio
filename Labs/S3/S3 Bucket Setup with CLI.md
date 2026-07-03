# S3 Bucket Setup: Create, Upload, Host, and View Publicly

## 1. Launch EC2 instance for CLI access
Launched a `t3.micro` EC2 instance (`CLI Host`) in `us-west-2` to run AWS CLI commands.

![Launching CLI through EC2](Screenshots/1%20Launching%20CLI%20through%20EC2.png)

## 2. Configure AWS CLI
Connected to the instance and ran:
```bash
aws configure
```
Entered Access Key ID, Secret Access Key, region (`us-west-2`), and output format (`json`).

![Configuring CLI](Screenshots/2%20Configuring%20CLI.png)

> **Note:** never paste real credentials into a terminal that gets screenshotted or committed to a repo. If exposed, rotate them immediately in IAM.

## 3. Create S3 bucket
Created bucket `mismail125` via the S3 console (Objects: 0 initially).

![Bucket creation through S3](Screenshots/3%20Bucket%20creation%20through%20S3.png)

## 4. Upload files
**Via console:**
- Used the **Upload** button to add `file1.txt` (44.0 B) — succeeded.

![Uploading file to S3](Screenshots/4.1%20Uploading%20file%20to%20S3.png)

**Via CLI:**
```bash
aws s3 ls s3://mismail125
touch file2.txt
aws s3 mv file2.txt s3://mismail125
```
Note: `cp file2.txt s3://mismail125` failed (no trailing slash / key name) — `mv` worked as an alternative.

![Creating and adding file to S3 bucket from CLI](Screenshots/4.2%20Creating%20and%20adding%20file%20to%20s3%20bucket%20from%20CLI.png)

Confirmed both files present:
```bash
aws s3 ls s3://mismail125
2026-07-03 18:11:45     44 file1.txt
2026-07-03 18:15:36      0 file2.txt
```

![Upload to bucket confirmed](Screenshots/5%20Upload%20to%20bucket%20confirmed.png)

## 5. Enable static website hosting
In bucket **Properties** tab → **Static website hosting** → enabled, set index document (`index.html`).

![Static hosting enabled](Screenshots/6%20Static%20hosting%20enabled.png)

## 6. Disable Block Public Access
In bucket **Permissions** tab → **Block public access (bucket settings)** → Edit → turned **off** Block all public access.

![Enabled Public Access](Screenshots/7%20Enabled%20Public%20Access.png)

## 7. Add public-read bucket policy
In **Permissions** tab → **Bucket Policy** → added:
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
Result: "Successfully edited bucket policy."

![Added Bucket policy for website viewing](Screenshots/8%20Added%20Bucket%20policy%20for%20website%20viewing.png)

## 8. View object in browser
Uploaded `index.html` via CLI, confirmed with:
```bash
aws s3 ls s3://mismail125
2026-07-03 18:11:45     44 file1.txt
2026-07-03 18:15:36      0 file2.txt
2026-07-03 18:33:57      0 index.html
```
Accessed object directly via URL:
```
https://mismail125.s3.us-west-2.amazonaws.com/file1.txt
```
Browser rendered file contents: "This is a text file to add into my s3 bucket" — confirms public read access is working.

![Viewing object in web browser](Screenshots/9%20Viewing%20obkect%20in%20web%20browser.png)

## Result
- Bucket created and populated via console + CLI
- Static hosting enabled
- Public access unblocked
- Public-read policy applied
- Verified public access by loading object directly in browser
