---
title: ReAct Pattern
description: Reason + Act.
category: Agents
---

# ReAct Pattern

## Overview
**ReAct** (Reasoning and Acting) is a prompting framework that allows LLMs to solve complex tasks by interleaving **Thought** (reasoning) and **Action** (using tools). It is the backbone of modern AI Agents.

## The Loop
Instead of just answering immediately, the Agent follows this loop:

1.  **Thought:** The model analyzes the request and deciding what to do. ("User wants weather in Tokyo. I should use the weather API.")
2.  **Action:** The model outputs a special command to call a tool. (`Tool: WeatherAPI, Input: Tokyo`)
3.  **Observation:** The system executes the tool and gives the output back to the model. (`Output: 24°C, Cloudy`)
4.  **Repeat:** The model thinks again. ("I have the weather. Now I can answer.")
5.  **Final Answer:** The model responds to the user.

## Example Trace
**User:** "What is the population of France times 5?"

**Agent Identity:**
*   **Thought:** I need to find the population of France first.
*   **Action:** `Search("Population of France 2024")`
*   **Observation:** `68 million`
*   **Thought:** Now I need to multiply 68 million by 5.
*   **Action:** `Calculator(68 * 5)`
*   **Observation:** `340`
*   **Thought:** I have the answer.
*   **Final Answer:** "340 million."
