# S3 Static Website Hosting — Deployment Steps

## Overview

The Cloud Fitness Gym website was hosted on Amazon S3 using S3's built-in static website hosting feature. No EC2, no server, no database — just files served directly from a storage bucket.

## Steps Taken

### 1. index.html set as the index document

Static website hosting needs a designated "index document" — the file returned when someone requests the bucket root URL. `index.html` is the standard/expected name and matches what the site's internal navigation already links to.

### 2. error.html created and set as the error document

Without a custom error document, S3 returns a raw, generic XML error page for any broken link or missing file. An `error.html` was built in the same style as `index.html` so a mistyped URL still looks like part of the site instead of a broken AWS message.

### 3. Block Public Access disabled

By default, every new S3 bucket blocks all public access, since most buckets store private data. A public website needs the opposite — anyone should be able to read the files. This has to be explicitly turned off before a bucket policy can grant public read access.

![Block Public Access disabled](S3%20Screenshots/3_Unblock_Public_Access.png)

### 4. Bucket policy added

Turning off "Block Public Access" alone isn't enough — S3 still denies access unless a policy explicitly allows it. The policy added grants `s3:GetObject` (read-only) to everyone (`Principal: "*"`) for every object in the bucket. This is deliberately narrow: it only allows reading files, not uploading, deleting, or listing the bucket's contents.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cloudfitnessgym/*"
        }
    ]
}
```

![Bucket policy added](S3%20Screenshots/4_Added_Bucket_Policy_for_all_users.png)

### 5. Static website hosting enabled

The website endpoint (`bucket.s3-website-<region>.amazonaws.com`) behaves like a website (index document, error document, etc.). It only supports HTTP, not HTTPS — a known S3 limitation.

**Live endpoint:** `http://cloudfitnessgym.s3-website.af-south-1.amazonaws.com`

![Static website hosting enabled](S3%20Screenshots/2_Enable_Static_Hosting.png)

## Bucket setup

![S3 bucket created](S3%20Screenshots/1_S3_Bucket_Created.png)

