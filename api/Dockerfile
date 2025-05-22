FROM python:3.11-slim

WORKDIR /app

# Copy API code
COPY ./api /app

# Copy shared code and secrets if needed
COPY ./core /app/core
COPY ./secrets /app/secrets
COPY ../.env /app/.env

# Copy requirements.txt and install dependencies
COPY ./api/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

ENV PYTHONUNBUFFERED=1

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]