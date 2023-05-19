FROM python:3.10

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

RUN apt-get update \
    && apt-get install -y gettext libgettextpo-dev

RUN mkdir /fds
WORKDIR /fds
COPY . /fds

COPY . /requirements.txt

RUN pip install -r requirements.txt

RUN chmod +x /fds/docker-entrypoint.sh