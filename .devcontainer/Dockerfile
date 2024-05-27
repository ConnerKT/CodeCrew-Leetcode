# Use the official Ubuntu image as the base
FROM ubuntu:22.04

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    git \
    build-essential \
    unzip \
    && rm -rf /var/lib/apt/lists/*

    

# Install Bun
RUN curl https://bun.sh/install | bash


ENV PATH="/root/.bun/bin:${PATH}"


# Set working directory
WORKDIR /workspace
