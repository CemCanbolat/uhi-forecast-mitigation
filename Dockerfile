FROM python:3.11

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libexpat1 \
    gdal-bin \
    libgdal-dev \
    libexpat1-dev \
    libxml2 \
    libproj-dev \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

COPY . /app
COPY secrets/ secrets/

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]