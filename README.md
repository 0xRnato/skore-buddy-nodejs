# Skore Buddy

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* ngrok
* Nodejs

### Installing

A step by step series of examples that tell you how to get a development env running

```bash
npm install
npm start
```

in another terminal tab

```bash
ngrok http 3000
```

Now you need to upload the file `SkoreBuddy.zip` on DialogFlow console and update the fulfillment url to your ngrok tunel.
