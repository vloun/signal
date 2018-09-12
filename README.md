# Signal

[ ![Codeship Status for vloun/signal](https://app.codeship.com/projects/8f6f0890-974c-0136-8b10-3a8748c13ef1/status?branch=master)](https://app.codeship.com/projects/305030)

This project deploys a partial working implementation of https://github.com/SensorUp/signal.

## Application

The application is a REST API in AWS API Gateway.

The API defines one resource: `/menu`. The `GET /menu` method takes two query params, `ages` and `gender`, and returns a list of food portions that satisfies the recommended daily diet for an individual matching the query params.

Example request: https://8i4kebobg4.execute-api.us-west-2.amazonaws.com/production/menu?ages=19%20to%2030&gender=Female

## Architecture

### API

The API is implemented as a Lambda-backed REST API in AWS API Gateway. The Lambda functions are written in JavaScript (Nodejs 8.10). The API is deployed as a CloudFormation stack with fairly minimal configuration.

A proper data store for the API is not implemented. The data from the Signal CSV files is provided by stub "query" functions in the application code (see src/sources).

## CI/CD

The project uses CodeShip as the CI/CD pipeline. Codeship does not support public access to the project build log; I can add users on request.

### Testing

The unit test framework for the application is Mocha/Chai. See the */test* directory.

Tests run in a disposable `signal-tester` container on Codeship. The Dockerfile for the container is in */docker/tester* and the test steps are configured in *codeship-steps.yml*.

Tests have been implemented for `selectors/selectVegetablesAndFruit()`. The tests run on every commit, and they can be run locally by building the `tester` container.

### Deployment

Following each successful test run, the application deploys to AWS using a `signal-deployer` container running in Codeship. The deployer container uses Ansible playbooks to:
- package the source JavaScript and upload it to S3
- assert a CloudFormation stack for the Lambda and API resources
- trigger an API Gateway deployment

See */deploy* for the Ansible/CloudFormation resources that the deployer container uses.

The deployer container depends on AWS credentials in */deploy/env.encrypted*. The credentials are encrypted with [Jet](https://documentation.codeship.com/pro/builds-and-configuration/environment-variables/#encrypting-your-environment-variables).

## Project Management

This repo uses a basic Kanban board to track and prioritize development tasks. Commit messages reference issue numbers on the project board.

## Things Not Done

In this project, I gave priority to the following elements:
- a working testing/deployment pipeline
- infrastructure as code
- out-of-the-box scalability

As a result I've more or less ignored a number of important considerations that come up in a production application:
- modelling, data normalization
- branching (eg, gitflow)
- more expressive API resources
- error handling
- a proper database

## How to Run Your Own Copy

1. Fork the repository
2. Get a Codeship account (they are free) and associate your repo fork with a new Pro (ie, docker-based) build project.
3. Get an AWS account.
4. In the AWS account, create a `signal-deployment` user. Give it the permissions listed on [aws_policy.md](./aws_policy.md).
5. Generate a set of API access keys for the `signal-deployment` user and save them to a text file called */deploy/env*, in the following format:

        AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXX
        AWS_SECRET_ACCESS_KEY=YYYYYYYYYYYYYYYYYYYYYYYY
6. [Encrypt the env file](https://documentation.codeship.com/pro/builds-and-configuration/environment-variables/#encrypting-your-environment-variables). The encrypted file should replace the existing file at */deploy/env.encrypted*
7. Pick a unique name for the deployment S3 bucket, and update the [`lambda_source_s3_bucket` variable here](https://github.com/vloun/signal/blob/d47a42ddfc9a0faf07be83b2bbb459d882550ac5/deploy/ansible/group_vars/all.yml#L6).
8. Commit and push your changes to */deploy/env.encrypted* and */deploy/ansible/group_vars/all.yml*. The build should run in your Codeship project, and deploy the API stack to AWS.
9. Go to the API Gateway console and grab your API URL. Try it out!
