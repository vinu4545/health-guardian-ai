# Create main app folders
mkdir -p app/routes
mkdir -p app/services
mkdir -p app/middleware
mkdir -p app/models
mkdir -p app/utils

# Create core files
touch app/main.py
touch app/config.py

# Create route files
touch app/routes/chat.py

# Create services files
touch app/services/gemini_service.py
touch app/services/memory_service.py

# Create middleware files
touch app/middleware/rate_limiter.py

# Create model files
touch app/models/chat_model.py

# Create utils files
touch app/utils/prompt_builder.py

# Create root files
touch requirements.txt
touch .env
touch setup.sh

# Create __init__.py files
touch app/__init__.py
touch app/routes/__init__.py
touch app/services/__init__.py
touch app/middleware/__init__.py
touch app/models/__init__.py
touch app/utils/__init__.py

echo "✅ Backend project structure created successfully!"