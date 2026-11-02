![AWS Lex Chatbot Project](https://img.shields.io/badge/AWS%20Lex%20Chatbot%20Project-brightgreen?style=for-the-badge)

![Overview](https://img.shields.io/badge/Overview-orange?style=for-the-badge)

The aim here is simple: Get hands on with Amazon Lex by building something functional and not just following a tutorial. It grew into two separate bots: a simple S3 info bot to get the basics right and a more interactive quiz bot to add real branching logic and score tracking.

Both bots are built in the same Amazon Lex V2 environment using English (ZA) and tested through the Lex console test window.

---

## Table of Contents
- [Part 1 – Info Bot](#part-1-info-bot)
- [Part 2 – Quiz Bot](#part-2-quiz-bot)
- [Services Used](#services-used)
- [Notes](#notes)

---

<a id="part-1-info-bot"></a>
![Part 1: Info Bot](https://img.shields.io/badge/Part%201%3A%20Info%20Bot-orange?style=for-the-badge)

**Bot name:** NotJoe  
**Intent:** `GetS3Information`  
**Language:** English (ZA)

The first bot is simple. A user asks a question about what S3 is and the bot returns a static definition. The bot consists of just intent matching and a response.

![Intents list](Screenshots/0.1%20NotJoe%20Intents.png)
*GetS3Information and FallbackIntent which the only two intents for this bot*

**Sample utterances:**
- "What is S3?"
- "Tell me about S3"
- "What does S3 do"

![Sample utterances](Screenshots/0.3%20NotJoe%20Sample%20Utterences.png)

**Response:**
> "Amazon S3 or Simple Storage Service is AWS's object storage service. It lets you store and retrieve any amount of data from anywhere at any time."

![Live test](Screenshots/0.2%20NotJoe%20Info.png)
*The bot responding correctly to "What is S3?" in the test window*

![Flow](https://img.shields.io/badge/Flow-orange?style=for-the-badge)

![Visual flow](Screenshots/0.4%20NotJoe%20Visual.png)
*An utterance triggers the intent, the bot returns the S3 definition then the conversation ends.*

---

<a id="part-2-quiz-bot"></a>
![Part 2: Quiz Bot](https://img.shields.io/badge/Part%202%3A%20Quiz%20Bot-orange?style=for-the-badge)

**Bot name:** Joe  
**Intent:** `S3Quiz`  
**Slots:** `Q1Answer`, `Q2Answer`, `RetryAnswer`  
**Slot type:** `AMAZON.AlphaNumeric`  
**Lambda function:** `S3QuizFunction`

Part 2 is where the complexity comes in. The quiz bot asks two S3 questions then evaluates each answer using conditional branching, tracks the score via Lambda and gives the user the option to retry again.

![S3Quiz intent details](Screenshots/1%20S3%20Quiz%20Intent.png)

**Sample utterances:**
- "Start the quiz"
- "I want to take the S3 quiz"

![Sample utterances](Screenshots/2%20Sample%20Utterances.png)

![Questions](https://img.shields.io/badge/Questions-orange?style=for-the-badge)

**Question 1: `Q1Answer`**  

*What is S3 mainly used for?*  

A) Cloud storage &nbsp; B) Web hosting &nbsp; C) Cloud computing  

Correct: **A**

![Q1Answer slot](Screenshots/3%20Slot%20Q1.png)

![Q1Answer advanced options and next step](Screenshots/4%20Slot%20Q1%20Advanced%20and%20Next%20Step.png)
*Conditional branching evaluates the slot value before advancing*

**Question 2: `Q2Answer`**  

*What is the maximum file size you can upload in a single PUT request to S3?*  

A) 5 GB &nbsp; B) 100 GB &nbsp; C) 5 TB  

Correct: **C**

![Q2Answer slot](Screenshots/5%20Slot%20Q2.png)

Each slot evaluates the answer before moving forward. A correct letter prompts a "Correct" message and advances to the next slot. Anything else returns the "Incorrect" message with the right answer shown.

![Scoring and Retry](https://img.shields.io/badge/Scoring%20and%20Retry-orange?style=for-the-badge)

Lambda tallies the score across both slots and returns it at the end.

![Lambda test success](Screenshots/7%20Lambda%20Test%20Success.png)

The `RetryAnswer` slot then asks whether the user wants to go again.

![RetryAnswer slot](Screenshots/6%20Slot%20TryAgain.png)

![Closing response and code hook](Screenshots/8%20Closing%20Statement%20and%20Lambda%20Code%20Hook%20Confirmed.png)
*Closing response set to "Thanks for playing the S3 quiz!" with Lambda code hook confirmed.*

![Flow](https://img.shields.io/badge/Flow-orange?style=for-the-badge)

![Quiz visual flow](Screenshots/0.5%20Joe%20Visual.png)
*Start, Code hook (Lambda initialized), Q1Answer, Q2Answer, RetryAnswer, Fulfilment (Lambda scoring), Closing response, End conversation.*

![Live Test](https://img.shields.io/badge/Live%20Test-orange?style=for-the-badge)

![Q1 correct answer](Screenshots/9%20Test%201.png)

![Q2 correct and retry prompt](Screenshots/10%20Test%20Q2%20and%20Retry%20Request.png)

![Incorrect answer and end](Screenshots/11%20Test%20Incorrect%20Response%20and%20End.png)

---

<a id="services-used"></a>
![Services Used](https://img.shields.io/badge/Services%20Used-orange?style=for-the-badge)

- Amazon Lex
- AWS Lambda (Python)
- Amazon CloudWatch
- AWS Management Console

---

<a id="notes"></a>
![Notes](https://img.shields.io/badge/Notes-orange?style=for-the-badge)

- Language set to English (ZA)
- `AMAZON.AlphaNumeric` slot type used for single-letter answers
- Conditions match lowercase — "a" and "A" handled via Lambda normalisation
- Lambda uses session state to track score across slots
