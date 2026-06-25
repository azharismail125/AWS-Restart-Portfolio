# Deploying, Modifying, and Safeguarding an Amazon EC2 Web Server

An exploration of foundational cloud compute concepts using Amazon Elastic Compute Cloud (Amazon EC2) to launch, monitor, secure, and scale a resizable virtual server in the cloud.

---

## Lab Architecture Overview

<div align="center">
  <img src="screenshots/Instance%20Overview%201.png" alt="Lab Architecture Overview" width="65%" />
</div>

*Figure 1: Conceptual architecture featuring an Amazon EC2 instance configured as a web server nested safely within a defined Security Group inside an isolated Availability Zone.*

---

## Project Execution Walkthrough

### 1. Launching the Instance with Termination Protection
I initialized an Amazon EC2 instance named **Web server** (`i-03664a954cce76d77`) utilizing a `t3.micro` instance type within the `us-west-2b` Availability Zone. To prevent accidental loss of the infrastructure, I enabled termination protection on the instance. This safeguard prevents the instance from being terminated via the console or API unless explicitly disabled.

<div align="center">
  <img src="screenshots/Instance%20Initiailized%202.png" alt="EC2 Instance Dashboard" width="65%" />
</div>

*Figure 2: The EC2 dashboard confirming the instance is running and successfully cleared its system and instance status checks.*

### 2. Monitoring the Boot Sequence
By accessing the instance's console output, I monitored the low-level virtual machine initialization. This allowed me to verify the successful load-in of the operating system kernel before the system passed higher-level status checks.

<div align="center">
  <img src="screenshots/Instance%20Check%203.jpg" alt="Serial Console Boot Output" width="65%" />
</div>

*Figure 3: Serial console output capturing the GRUB bootloader initializing the Amazon Linux 2023 kernel.*

### 3. Updating Security Groups for Inbound HTTP Access
Initially, the web server was inaccessible over standard web protocols. To resolve this, I modified the attached security group's inbound ruleset to allow incoming traffic over port 80 (HTTP). This enabled public HTTP accessibility to the instance.

<div align="center">
  <img src="screenshots/Instance%20Security%20Group%20update%204.png" alt="HTTP Access Verification" width="65%" />
</div>

*Figure 4: Verifying public HTTP accessibility via the instance's public IPv4 address (`54.191.185.171`).*

### 4. Dynamic Volume Modification & Scaling
To accommodate growing storage and throughput demands, I scaled the backing Amazon Elastic Block Store (EBS) volume (`vol-0561d7e0c02537c2f`). I dynamically altered the storage configuration to a larger capacity without requiring instance downtime. This demonstrates the scalability advantages of cloud infrastructure.

<div align="center">
  <img src="screenshots/Instance%20EBS%20Volume%20Modified%205.png" alt="EBS Volume Modification" width="65%" />
</div>

*Figure 5: The AWS management console showing the in-progress modification status of the root EBS volume.*

### 5. Evaluating Termination Protection Guardrails
To validate the resilience of my deployment against human error, I attempted to terminate the instance directly from the console actions menu while protection features were active. The platform successfully rejected the request with an API error.

<div align="center">
  <img src="screenshots/Instance%20Termination%20in%20Action%206.png" alt="Termination Blocked Error" width="65%" />
</div>

*Figure 6: The AWS Console rejecting the deletion request due to the `disableApiTermination` safeguard attribute.*

### 6. Disabling Guardrails & Clean Tear-Down
Once testing was complete and the infrastructure lifecycle ended, I manually updated the instance attributes to remove the termination lock. With the guardrail deleted, I successfully executed a clean instance termination, demonstrating full lifecycle management.

<div align="center">
  <img src="screenshots/Instance%20Terminated%207.png" alt="Successful Deletion" width="65%" />
</div>

*Figure 7: Notification banners showing the successful removal of termination protection followed immediately by the instance's termination process.*
