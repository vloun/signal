FROM  python:3.7.0-stretch
RUN pip install ansible boto3 awscli

WORKDIR /signal-deploy

COPY deploy/ deploy/
COPY src/  src/

WORKDIR /signal-deploy/deploy/ansible

CMD [ "ansible-playbook", "-vv", "deploy-signal-api.yml" ]
