#PostApplication: Node.js Backend with Supabase

-->Overview:
This project is a full-stack web application designed for creating and managing posts. 
It is built using a modern JavaScript stack, featuring a React/Vite frontend and a Node.js API layer. 
All data and user authentication are handled by Supabase.

-->Features:
1. React Frontend: Fast and modern user interface powered by Vite and React.

2. Node.js API: Serves as the backend, handling data requests and business logic.

3. Supabase Backend: Utilizes Supabase for PostgreSQL database storage and secure User Authentication.

4. Single Deployment: Optimized for deployment as a unified service on Render.

--> Tech Stack:(Category  --> Technology --> Purpose)
Frontend -->	React & Vite	Component --> based UI and blazing fast build tooling.
Backend --> Runtime	Node.js	Server --> side execution environment.
Framework -->	Express.js / Other -->	Framework used to handle API endpoints and serve static assets.
Database/Auth -->	Supabase -->	PostgreSQL database, Authentication, and Realtime.
Deployment -->	Render -->	Cloud hosting platform for CI/CD.

-->Local Setup and Installation:

1.Clone the Repository: git clone https://github.com/Dheeraj5604/PostApplication.git
                        cd PostApplication
2.Install Dependencies: npm install
3.Configure Environment Variables: .env file
4.Run the Application: npm run dev


--> Environment Variables:
SUPABASE_URL 
SUPABASE_ANON_KEY
VITE_APP_API_URL
PORT

-->Deployment on Render:
Runtime - Node
Build Command - npm install && npm run build
Start Command - npm run dev
