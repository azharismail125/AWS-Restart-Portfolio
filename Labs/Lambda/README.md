![Lab](https://img.shields.io/badge/Lab-Lambda%20Word%20Counter%20with%20S3%20%26%20SNS-brightgreen?style=for-the-badge)


![Overview](https://img.shields.io/badge/Overview-orange?style=for-the-badge)

The goal of this lab was to build a serverless pipeline that automatically counts the words in any text file uploaded to S3 and delivers the result to an email address. No servers, no manual runs — [...]

The three AWS services used each play a distinct role: **S3** stores the files and detects uploads, **Lambda** runs the word count logic, and **SNS** handles the email delivery. 

---


![Architecture](https://img.shields.io/badge/Architecture-orange?style=for-the-badge)

```
S3 Bucket (PUT event)
        │
        ▼
AWS Lambda (WordCounterfunction)
        │
        ▼
SNS Topic (Wordcountertopic)
        │
        ▼
Email Notification
```

---


![Resources](https://img.shields.io/badge/Resources-orange?style=for-the-badge)

| Resource | Name |
|---|---|
| S3 Bucket | `wordcounterbucket-234454000509-us-west-2-an` |
| S3 Prefix | `Wordcounterfiles/` |
| Lambda Function | `WordCounterfunction` |
| SNS Topic | `Wordcountertopic` |
| Region | `us-west-2` |

---


![Setup](https://img.shields.io/badge/Setup-orange?style=for-the-badge)


![1. SNS Topic & Subscription](https://img.shields.io/badge/1._SNS%20Topic%20%26%20Subscription-brightgreen?style=for-the-badge)

SNS (Simple Notification Service) is set up first because Lambda needs the topic ARN baked into its code. If the topic doesn't exist yet, there's nothing to publish to.

A **Standard** topic is used here rather than FIFO because message ordering doesn't matter — we just need the email to arrive, not in any particular sequence relative to other messages.

- SNS → Create topic → Standard → name: `Wordcountertopic`
- Create subscription → Protocol: **Email** → enter your email → **Create**
- Check your inbox and confirm the subscription link

> The subscription starts as *Pending Confirmation* until you click the link in the email. Lambda can publish to the topic before confirmation, but no emails will be delivered — which is a common go[...] 

![SNS Subscription Created](screenshots/01-sns-subscription-created.png)

---


![2. Lambda Function](https://img.shields.io/badge/2._Lambda%20Function-brightgreen?style=for-the-badge)

Lambda is a serverless compute service — it runs code in response to events without needing to provision or manage a server. The function only runs when triggered, which makes it cost-efficient for [...]

- Lambda → Create function → Author from scratch
- Name: `WordCounterfunction`
- Runtime: **Python 3.12**
- Execution role: create a new role with the following policies:
  - `AmazonS3ReadOnlyAccess` — to read the uploaded file
  - `AmazonSNSFullAccess` — to publish the result to the topic
  - `AWSLambdaBasicExecutionRole` — to write logs to CloudWatch

> IAM permissions are scoped deliberately. Lambda only needs to *read* from S3, not write — so `ReadOnly` is the right choice. Least privilege is a core AWS security best practice.

![Lambda Function Created](screenshots/02-lambda-function-created.png)

---


![3. Function Code](https://img.shields.io/badge/3._Function%20Code-brightgreen?style=for-the-badge)

The function does four things in sequence: extract the bucket and file details from the incoming S3 event, read the file contents, count the words, then publish the result to SNS.

```python
import boto3
import urllib.parse

SNS_TOPIC_ARN = 'arn:aws:sns:us-west-2:234454000509:Wordcountertopic'

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    sns = boto3.client('sns')

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(
        event['Records'][0]['s3']['object']['key']
    )

    obj = s3.get_object(Bucket=bucket, Key=key)
    content = obj['Body'].read().decode('utf-8')

    word_count = len(content.split())
    message = f"The word count in the {key} file is {word_count}."

    sns.publish(
        TopicArn=SNS_TOPIC_ARN,
        Subject='Word Count Result',
        Message=message
    )

    return {'statusCode': 200, 'body': message}
```

A few things worth noting:

- `urllib.parse.unquote_plus` is used when extracting the file key because S3 URL-encodes file names that contain spaces or special characters. Without this, a file named `Final text.txt` would come t[...]
- `content.split()` splits on any whitespace by default — spaces, tabs, newlines — which gives an accurate word count regardless of how the file is formatted.
- The SNS topic ARN is defined as a constant at the top of the file rather than hardcoded inside the function, making it easy to update without touching the logic.

![Lambda Code Editor](screenshots/10-lambda-code-editor.png)

---


![4. Testing with a Simulated Event](https://img.shields.io/badge/4._Testing%20with%20a%20Simulated%20Event-brightgreen?style=for-the-badge)

Before wiring up the S3 trigger, it's good practice to test the function in isolation using a manually crafted event. This way, any bugs in the code get caught before the trigger adds another layer of[...] 

Lambda's test event simulates the JSON payload that S3 would send when a file is uploaded:

```json
{
  "Records": [
    {
      "s3": {
        "bucket": {
          "name": "wordcounterbucket-234454000509-us-west-2-an"
        },
        "object": {
          "key": "Wordcounterfiles/textfile.txt"
        }
      }
    }
  ]
}
```

> The `key` must match a file that actually exists in the bucket. Lambda will try to call `s3.get_object()` with that key — if the file isn't there, the function throws a `NoSuchKey` error.

![Test Execution Succeeded](screenshots/03-test-execution-succeeded.png)

The test passed and the SNS email arrived shortly after, confirming the function logic and permissions were both working correctly.

![SNS Email Result](screenshots/04-sns-email-result.png)

---

![5. S3 Trigger](https://img.shields.io/badge/5._S3%20Trigger-brightgreen?style=for-the-badge)

With the function validated, the next step is connecting S3 so uploads fire the function automatically. This is done by adding an event notification on the bucket that invokes Lambda on every PUT.

- Lambda → `WordCounterfunction` → **Add trigger**
- Source: **S3**
- Bucket: `wordcounterbucket-234454000509-us-west-2-an`
- Event type: **PUT**
- Prefix: `Wordcounterfiles/`

> The prefix filter is important. Without it, any file uploaded anywhere in the bucket — including files created by Lambda itself if it were ever writing back to S3 — would trigger the function. S[...] 

![Trigger Configuration](screenshots/05-trigger-configuration.png)

![Trigger Added Successfully](screenshots/06-trigger-added-successfully.png)

![Trigger Details](screenshots/08-trigger-details.png)

---


![End-to-End Test](https://img.shields.io/badge/End--to--End%20Test-orange?style=for-the-badge)

With the trigger in place, the final test was uploading a new file directly to the S3 bucket and waiting for the email — no manual Lambda invocation involved.

`Final text.txt` was uploaded to `Wordcounterfiles/` via the S3 console:

![File Upload Succeeded](screenshots/07-file-upload-succeeded.png)

The upload fired the PUT event, Lambda executed automatically, and the word count email arrived:

![SNS Email Trigger Result](screenshots/09-sns-email-trigger-result.png)

---


![Final Result](https://img.shields.io/badge/Final%20Result-orange?style=for-the-badge)

```
Subject: Word Count Result

The word count in the Wordcounterfiles/textfile.txt file is 6.
```

---


![Lessons Learned](https://img.shields.io/badge/Lessons%20Learned-orange?style=for-the-badge)

- **SNS subscriptions must be confirmed** before any emails are delivered. The subscription stays in *Pending* state until the user clicks the confirmation link — easy to miss and a common reason em[...]
- **CloudWatch Logs** are the first place to check when something goes wrong. Every Lambda invocation writes a log stream to `/aws/lambda/WordCounterfunction`, including the full error traceback if th[...]
- **ARNs are service-specific.** Early in the lab the SNS topic ARN was accidentally replaced with a Lambda function ARN. SNS ARNs follow the format `arn:aws:sns:region:account-id:topic-name` — mixi[...]
- **Test events and function code are independent.** The test event is just a mock payload used to invoke the function manually — it doesn't need to match the code in any structural way beyond provi[...]
