# AWS Lex Chatbot – Praesignis Special Project 3


The aim here is simple: Get hands on with Amazon Lex by building something functional and not just following a tutorial. It grew into two separate bots: a simple S3 info bot to get the basics right and a full quiz bot with branching logic, Lambda scoring and a retry loop.

Both bots are built in the same Amazon Lex V2 environment using English (ZA) and tested through the Lex console test window.

---

## Table of Contents
- [Part 1 – Info Bot](#part-1--info-bot)
- [Part 2 – Quiz Bot](#part-2--quiz-bot)
- [Tech Stack](#tech-stack)
- [Notes](#notes)

---

## Part 1: Info Bot

**Bot name:** NotJoe  
**Intent:** `GetS3Information`  
**Language:** English (ZA)

The first bot is simple. A user asks a question about what S3 is and the bot returns a static definition. The bot consists of just intent matching and a response.

![Intents list](images/0_1_Infobot_Intents.png)
*GetS3Information and FallbackIntent — the only two intents in the bot*

**Sample utterances:**
- "What is S3?"
- "Tell me about S3"
- "What does S3 do"

![Sample utterances](images/0_3_Infobot_Sample_Utterences.png)

**Response:**
> "Amazon S3 or Simple Storage Service is AWS's object storage service. It lets you store and retrieve any amount of data from anywhere at any time."

![Live test](images/0_2_Infobot_Info.png)
*Bot responding correctly to "What is S3?" in the test window*

### Flow

![Visual flow](images/0_4_NotJoe_Visual.png)
*Utterance triggers the intent, bot returns the S3 definition, conversation ends.*

---

## Part 2: Quiz Bot

**Bot name:** Joe  
**Intent:** `S3Quiz`  
**Slots:** `Q1Answer`, `Q2Answer`, `RetryAnswer`  
**Slot type:** `AMAZON.AlphaNumeric`  
**Lambda function:** `S3QuizFunction`

Part 2 is where the complexity comes in. The quiz bot asks two S3 questions then evaluates each answer using conditional branching, tracks the score via Lambda and gives the user the option to retry at the end.

![S3Quiz intent details](images/1_S3_Quiz_Intent.png)

**Sample utterances:**
- "Start the quiz"
- "I want to take the S3 quiz"

![Sample utterances](images/2_Sample_Utterances.png)

### Questions

**Q1 — `Q1Answer`**  
*What is S3 mainly used for?*  
A) Cloud storage &nbsp; B) Web hosting &nbsp; C) Cloud computing  
Correct: **A**

![Q1Answer slot](images/3_Slot_Q1.png)

![Q1Answer advanced options and next step](images/4_Slot_Q1_Advanced_and_Next_Step.png)
*Conditional branching evaluates the slot value before advancing*

**Q2 — `Q2Answer`**  
*What is the maximum file size you can upload in a single PUT request to S3?*  
A) 5 GB &nbsp; B) 100 GB &nbsp; C) 5 TB  
Correct: **C**

![Q2Answer slot](images/5_Slot_Q2.png)

Each slot evaluates the answer before moving forward. A correct letter gets a correct message and advances to the next slot. Anything else returns the incorrect message with the right answer shown.

### Scoring and Retry

Lambda tallies the score across both slots and returns it at the end.

![Lambda test success](images/7_Lambda_Test_Success.png)

The `RetryAnswer` slot then asks whether the user wants to go again.

![RetryAnswer slot](images/6_Slot_TryAgain.png)

![Closing response and code hook](images/8_Closing_Statement_and_Lambda_Code_Hook_Confirmed.png)
*Closing response set to "Thanks for playing the S3 quiz!" with Lambda code hook confirmed*

### Flow

![Quiz visual flow](images/0_5_Joe_Visual.png)
*Start, Code hook (Lambda init), Q1Answer, Q2Answer, RetryAnswer, Fulfilment (Lambda scoring), Closing response, End conversation.*

### Live Test

![Q1 correct answer](images/9_Test_1.png)

![Q2 correct and retry prompt](images/10_Test_Q2_and_Retry_Request.png)

![Incorrect answer and end](images/11_Test_Incorrect_Response_and_End.png)

---

## Tech Stack

- Amazon Lex V2
- AWS Lambda (Python)
- Amazon CloudWatch
- AWS Management Console

---

## Notes

- Language set to English (ZA)
- `AMAZON.AlphaNumeric` slot type used for single-letter answers
- Conditions match lowercase — "a" and "A" handled via Lambda normalisation
- Lambda uses session state to track score across slots
