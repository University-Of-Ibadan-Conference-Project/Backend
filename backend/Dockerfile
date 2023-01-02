FROM python:3.10.6

ENV PYTHONUNBUFFERED 1
RUN mkdir /backend/
COPY . /backend/

RUN pip install --upgrade pip
RUN pip install -r /backend/requirements.txt

WORKDIR /backend
