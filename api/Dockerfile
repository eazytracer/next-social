FROM python:3.12-slim

# Install dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev curl

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . /app

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
