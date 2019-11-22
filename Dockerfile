FROM ubuntu:18.10

LABEL maintainer="Justin Grover <jgrover@elevendegreeseast.com>"

RUN apt-get update
RUN apt-get install -y python3.7 python3.7-dev python3-pip nginx
RUN pip3 install uwsgi
#RUN pip3 install pipenv
#Set Variables so Python runs in UTF8 mode
RUN export LC_ALL=C.UTF8
RUN export LANG=C.UTF8
COPY ./ ./app
WORKDIR ./app
RUN pip3 install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["ltag.py"]
