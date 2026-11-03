![3D E-Commerce Platform Architecture](https://img.shields.io/badge/3D%20E--Commerce%20Platform%20Architecture-brightgreen?style=for-the-badge)

![Overview](https://img.shields.io/badge/Overview-orange?style=for-the-badge)

This document covers the cloud architecture for a 3D e-commerce web application. The platform lets users view and interact with 3D product models, such as furniture, gadgets, and fashion items, before adding them to a cart and checking out securely.

---

![Table of Contents](https://img.shields.io/badge/Table%20of%20Contents-brightgreen?style=for-the-badge)

- [1. AWS Service Choices](#1-aws-service-choices)
- [2. Meeting the 5 Key Requirements](#2-meeting-the-5-key-requirements)
- [3. Design Trade-offs & Challenges](#3-design-trade-offs--challenges)

<div align="center">
  <img src="3D Architecture.png" alt="3D Architecture Diagram" width="70%">
</div>

---

<a id="1-aws-service-choices"></a>
![1. AWS Service Choices](https://img.shields.io/badge/1.%20AWS%20Service%20Choices-orange?style=for-the-badge)

**Amazon S3:** Primary storage for static assets and 3D model files. Seller uploads trigger backend processing through S3 events. Public access is blocked to prevent unauthorized access.

**Amazon CloudFront:** A content delivery network that caches 3D assets at edge locations globally, reducing repeated origin requests and keeping load times fast for users wherever they are.

**EC2 with AWS Lambda:** EC2 runs continuously for core backend work, including session management, cart operations, and checkouts across multiple Availability Zones. Lambda handles stateless, event-driven processing for asset transformation and background tasks.

**RDS instead of DynamoDB:** RDS handles transactional relational data, including inventory, orders, and customer records, where strict data integrity matters. DynamoDB was considered, but RDS is better suited to relational transaction flow and consistency requirements.

**Elastic Load Balancer (ELB):** The Application Load Balancer distributes dynamic traffic across healthy EC2 instances using health checks and responds to increases or decreases in traffic.

**Amazon Route 53:** Handles DNS and domain routing, performs health checks, and can fail over to backup resources if a primary component goes down.

**CloudWatch & Trusted Advisor:** CloudWatch tracks application health, EC2 utilization under heavy 3D rendering load, and Lambda invocations. Trusted Advisor flags opportunities to improve performance and cost efficiency across the architecture.

---

<a id="2-meeting-the-5-key-requirements"></a>
![2. Meeting the 5 Key Requirements](https://img.shields.io/badge/2.%20Meeting%20the%205%20Key%20Requirements-orange?style=for-the-badge)

**High Availability:** Multi-AZ EC2 deployment means a single data center outage won't drop active shopping sessions. Route 53 and the ALB route traffic only to healthy instances.

**Scalability:** Auto Scaling adjusts the EC2 fleet based on demand. CloudFront delivers large 3D assets globally without adding load on the backend.

**Performance:** Caching 3D content at CloudFront edge locations means fast page loads and smooth rendering regardless of the user's location.

**Security:** The backend sits in a VPC with private subnets, so it has no direct internet exposure. S3 buckets are private and accessed only through CloudFront. AWS WAF filters malicious traffic.

**Cost Optimization:** Lambda handles intermittent model processing to avoid idle EC2 costs. Auto Scaling uses minimum and maximum thresholds to prevent over-provisioning during quiet and peak periods.

---

<a id="3-design-trade-offs--challenges"></a>
![3. Design Trade-offs & Challenges](https://img.shields.io/badge/3.%20Design%20Trade--offs%20%26%20Challenges-orange?style=for-the-badge)

**EC2 and Lambda:** EC2 handles continuous sessions reliably but requires active capacity planning. Lambda reduces server-management overhead for 3D model processing but brings cold starts and potential latency spikes.

**Performance and Cost:** Intense caching, extra compute, or provisioned concurrency can improve responsiveness, but also increase spend and configuration complexity.

**Simplicity vs. Resilience:** Multi-Availability Zone and load-balanced infrastructure prevents downtime but costs more and is more complex to manage than a single-server setup.

**Public vs. Private Origin:** Keeping the ALB private behind CloudFront shields the backend from unwanted direct internet exposure, but requires more VPC work, such as NAT gateways, routing rules, and private subnet design.

**Scaling Dependencies:** A sudden spike due to a popular product launch triggers rapid Auto Scaling, which can create connection pressure on downstream components like RDS. System-wide monitoring and scaling thresholds help protect stability during high-traffic events.
