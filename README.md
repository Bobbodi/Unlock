# WeShare

**Share your perspective. Find your people.**

WeShare is a low-pressure social platform designed to help Singaporean adults express themselves safely and build meaningful one-to-one connections beyond superficial online interactions.

---

## 🌱 Problem
Singaporean adults face rising stress, burnout, and anxiety, yet many hesitate to seek help due to fear of judgment.  
Modern social platforms often promote curated lifestyles and superficial engagement, leading to unhealthy comparison and emotional isolation.  

This creates a cycle:
- Poor mental well-being → Withdrawal  
- Withdrawal → Isolation  
- Isolation → Heavier emotional burden  

WeShare aims to break this cycle by providing a safe, supportive space for authentic connection.

---

## 💡 Solution
WeShare enables:
- 📝 **Thoughts of the Day** – Share how you feel  
- ❓ **Question of the Day** – Spark meaningful conversations  
- 💬 **Private Chat** – Connect one-to-one based on shared perspectives  

Unlike public discussion forums, WeShare transforms shared opinions into personal conversations.

---

## 🎯 Target Users
Singaporean adults seeking:
- Meaningful social connections  
- A safe space to express thoughts  
- Low-pressure interaction  

---

## 🛠 Tech Stack
- **Frontend**: ReactJS  
- **Backend**: Flask (Python)  
- **Database**: Supabase  
- **Chat**: GetStream  
- **Avatars**: DiceBear  

---

## 🗄 Database Overview
- **users** – UUID, email, Question of the Day comments  
- **info** – Profile details (gender, birthday, fun fact)  
- **thoughts** – User-posted thoughts linked to user ID  

---

## 🚀 Running the Project

### Backend
**macOS**
```bash
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors python-dotenv
cd backend
python3 -m flask --app comment:commentapp run
```

**Windows**
```py -m venv venv .\venv\Scripts\Activate.ps1 pip install flask flask-cors python-dotenv cd backend python -m flask --app comment:commentapp run```

### Frontend
```cd frontend npm install npm install @dicebear/core npm start```

For a full description of our documentation: https://docs.google.com/document/d/1xV2OcN5ZR0z0yEDg1t5xpOtkrekE8i8vr2ryNKB2qBc/edit?usp=sharing