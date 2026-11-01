# 🚗 MzansiRide SafeAI

**A safety-first, AI-powered ride-sharing prototype built for South Africa**

Hackathon Theme: AI for Real-World Impact | Built on AWS | 24-hour prototype

🔗 **Live Demo:** [main.d2hm6o3xegp9tf.amplifyapp.com](https://main.d2hm6o3xegp9tf.amplifyapp.com)

---

## The Problem

Using transport in South Africa comes with real concerns. Women and vulnerable passengers worry about unexpected route changes, prolonged stops, travelling with unfamiliar drivers, and whether anyone they trust knows where they are. Transport costs add another layer for daily commuters and students.

There are apps that address parts of this. Not many that bring journey monitoring, passenger check-ins, and AI-assisted safety guidance into a single workflow, especially not in a South African context.

## What We Built

MzansiRide SafeAI is a responsive web app that walks a passenger through an end-to-end simulated journey, from booking to safety event handling. It uses predefined backend rules to detect unusual events during a trip, prompts the passenger to check in, and provides contextual guidance through an AI assistant powered by Amazon Bedrock.

A basic fare comparison between individual and shared rides is also included.

This is a prototype. It uses simulated data throughout and focuses on demonstrating the core safety workflow rather than replicating a full commercial ride-hailing service.

---

## Core Features

| Feature | Description |
|---|---|
| Passenger booking | Enter pickup and destination, request a simulated ride |
| Driver details | Sample driver info, vehicle, plate number, and rating |
| Safe Journey Mode | Activates the safety monitoring screen for the active trip |
| Safety event detection | Two predefined scenarios: prolonged stop and route deviation |
| AI Safety Assistant | Amazon Bedrock explains the alert and outlines the passenger's options |
| Trusted contact notification | Simulated workflow to notify a saved contact when an event is detected |
| Safety Alert Dashboard | View trip history, detected events, and check-in responses |
| Fare comparison | Individual versus shared ride cost breakdown |

---

## AWS Architecture

### Services Used

| AWS Service | Role in the Prototype |
|---|---|
| Amazon API Gateway | Exposes the API endpoints the frontend calls |
| AWS Lambda | Handles ride processing, safety rule logic, and alert workflows |
| Amazon Bedrock | Generates plain-language safety explanations for the passenger |
| Amazon DynamoDB | Stores trip and alert records |
| Amazon SNS | Powers the trusted contact notification workflow |
| Amazon Cognito | User authentication (implemented, optional for the demo) |
| AWS Amplify | Hosts and deploys the frontend |
| Amazon CloudWatch | Captures backend logs for monitoring and troubleshooting |

### How It Works

1. The passenger opens the app and requests a simulated ride
2. The frontend sends the request to Amazon API Gateway
3. AWS Lambda processes the request and applies the predefined safety rules
4. When a safety event fires, Lambda records it and prepares a response payload
5. Lambda invokes Amazon Bedrock to generate a plain-language explanation for the passenger
6. The trip and alert records are written to DynamoDB
7. The app displays the alert, the check-in prompt, and the Bedrock-generated guidance
8. Amazon SNS handles the trusted contact notification step
9. CloudWatch captures logs throughout for troubleshooting

No privileged AWS credentials are placed in the frontend code. Backend operations go through appropriately secured AWS services.

---

## AWS Setup

### Lambda: getAlertStatus

Retrieves the current alert status for a trip. The test result shows a 200 response with CORS headers confirming the function is working correctly.

![Lambda getAlertStatus with successful test](./Screenshots/1%20Lambda%20AlertStatus%20and%20Test.png)

---

### Lambda: processRideRequest

Triggered via API Gateway. Takes the passenger's booking details, processes the request, and applies the safety monitoring logic.

![Lambda processRideRequest with API Gateway trigger and successful test]](./Screenshots/2%20Lambda%20Process%20Ride%20with%20Test.png)

---

### Lambda: triggerSafetyEvent

Connected to Amazon SNS. Fires when a predefined safety event is detected during a simulated trip, such as a prolonged stop or a route deviation.

![Lambda triggerSafetyEvent with SNS trigger and successful test](./Screenshots/3%20Lambda%20Safety%20With%20Test.png)

---

### API Gateway

Three routes are configured: `POST /ride/request`, `POST /safety-event`, and `GET /status`. All three use Lambda proxy integration, which means API Gateway passes the full request directly to Lambda and returns whatever Lambda sends back.

![API Gateway resource and method configuration](./Screenshots/4%20API%20Gateway%20Setup.png)

---

### Amazon SNS

The `SafeRideAlerts` topic has a confirmed email subscription. This is the channel used to notify a trusted contact when the passenger triggers a notification from the alert screen.

![SNS SafeRideAlerts topic with confirmed email subscription](./Screenshots/5%20SNS%20Confirmation.png)

---

### Amazon DynamoDB

The `SafeRideTrips` table stores trip records. Each item uses `tripId` as the partition key and includes fields like `driver` and `status` to track the trip and any safety events recorded against it.

![DynamoDB SafeRideTrips table with sample trip item](./Screenshots/6%20DynamoDB%20Setup.png)

---

### Amazon Cognito

A user pool is configured and available for authentication. For the hackathon demo, login is optional and the app can be accessed without it.

![Amazon Cognito user pool overview](./Screenshots/7%20Cognito%20Setup.png)

---

### AWS Amplify

The frontend is deployed from the `main` branch and is live. Amplify handles the build and hosting automatically on each commit.

![AWS Amplify deployment overview showing deployed main branch](./Screenshots/8%20Amplify%20Setup%20and%20Deployment.png)

---

## App Walkthrough

### Home Screen

The passenger enters a pickup location and destination to request a ride. The placeholder examples use real South African locations, Sandton City and Soweto, to keep the demo grounded.

![MzansiRide SafeAI home screen with booking fields](./Screenshots/9%20Simulation%20Home.png)

---

### Fare Estimate

After submitting the request, the app returns an estimated individual fare of R85 and a shared ride option at R43. The shared option saves 50% on the same trip. The passenger can confirm and continue from this screen.

![Fare estimate screen showing R85 individual and R43 shared ride option](./Screenshots/10%20Simulation%20Cost.png)

---

### Trip in Progress

The journey screen shows the route, estimated arrival time, and driver details (clearly labelled as demo data). From here, the passenger can activate Safe Journey Mode or go straight to the Alert Dashboard.

![Active trip screen showing Sandton to Soweto with driver Sipho M. and Safe Journey Mode button](./Screenshots/11%20Simulation%20Trip.png)

---

### Safety Alert

When a prolonged stop is detected, the app raises an alert and asks the passenger to confirm whether they are okay. Amazon Bedrock generates a plain-language explanation of what triggered the alert and what the passenger can do next. The trusted contact notification is accessible from the same screen.

![Safety alert screen with Bedrock AI response and trusted contact notification option](./Screenshots/12%20Simulation%20Safety%20Alert.png)

---

### Safety Dashboard

Displays a log of all simulated trips, the events detected during each one, the passenger's check-in responses, and the fares. The fare comparison summary at the bottom shows the individual versus shared breakdown.

![Safety Dashboard showing trip history, event log, and fare comparison](./Screenshots/13%20Simulation%20Event%20History.png)

---

## Tech Stack

**Frontend**
- React with TypeScript
- Tailwind CSS
- Hosted on AWS Amplify

**Backend**
- AWS Lambda
- Amazon API Gateway
- Amazon Bedrock
- Amazon DynamoDB
- Amazon SNS
- Amazon Cognito
- Amazon CloudWatch

**Source Control**
- Git and GitHub

---

## Out of Scope

The following were not built during the 24-hour window and are listed as future work:

- Continuous live GPS tracking
- Real-time route deviation detection using a mapping API
- Full driver identity and vehicle verification
- Live emergency service integration
- Real payments or driver payouts
- Production-grade ride matching
- Native Android and iOS apps
- Advanced predictive analytics

---

## Privacy and Security

- All trip, driver, and passenger data in the prototype is simulated
- No real location information is collected during the demo
- AWS credentials are not stored in or exposed through the frontend code
- Backend services use appropriate access controls
- Simulated alerts and notifications are clearly labelled throughout the app
- AI responses are based on approved guidance and do not replace emergency services
- A production version would require a full POPIA compliance review before collecting real user data
