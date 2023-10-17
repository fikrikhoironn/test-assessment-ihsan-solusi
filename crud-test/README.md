# Project Setup Guide

Follow the steps below to set up the project locally.

## Step 1: Create an Account

1. Visit [Ihsan Solusi Admin CMS](https://cms-admin-v2.ihsansolusi.co.id/docs#/)
2. Create an account by signing up.
3. Login to your account after confirmation.

## Step 2: Get the Authorization Token

1. After logging in, you will receive an authorization token.
2. Copy the authorization token for the next step.

## Step 3: Set Up the Project Locally

1. Clone the project repository to your local machine.
2. Navigate to the project directory.

## Step 4: Configure Environment Variable

1. Create a file named `.env` in the root directory of the project.
2. Inside the `.env` file, add the following line:

   ```plaintext
   NEXT_PUBLIC_AUTH_TOKEN=your_authorization_token_here

## Step 5: Run the Project
1. Run the following command to install the dependencies:

   ```bash
   npm install
   ```
2. Run the following command to start the development server:

   ```bash
    npm run dev
    ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

