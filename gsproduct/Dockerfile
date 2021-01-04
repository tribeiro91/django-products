FROM python:3.9.1

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver"]