---
title: Infrastructure as Code (IaC)
description: Servers as software.
category: Core Concepts (DevOps)
---

# Infrastructure as Code (IaC)

## Overview
**IaC** is the practice of managing and provisioning infrastructure (servers, load balancers, databases, networks) through **code** rather than manual processes (like clicking around in the AWS Console).

## The Old Way (Manual)
- You log into AWS.
- Click "Launch EC2 Instance."
- Choose settings.
- SSH in, install Nginx, edit config files.
- **Problem:** Not reproducible. If the server dies, you have to remember exactly what you clicked. "Configuration Drift" happens when someone manually tweaks settings and forgets to document it.

## The IaC Way
You write a definition file (e.g., using **Terraform** or **CloudFormation**) stating *what* you want:
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
```
You run a command (`terraform apply`), and the tool calls the Cloud APIs to build exactly that state.

## Benefits
- **Reproducibility:** Spin up an exact clone of Production in Staging with one command.
- **Version Control:** Your infrastructure is Git-tracked. You can see who changed the firewall rules and why.
- **Automation:** No humans clicking buttons.

## Tools
- **Terraform:** The industry standard. Cloud-agnostic.
- **Ansible:** Better for *configuration management* (installing software on servers) than provisioning.
- **Pulumi:** Write infrastructure in real languages (TS, Python) instead of YAML/HCL.
