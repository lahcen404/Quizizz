# ENAA-Quizizz 🎯  
An interactive web quiz application built with **Angular**, using questions from the **Open Trivia DB API**. This project was developed as a practical exercise to master HTTP calls, state management with RxJS, and modern front-end development best practices.

---

## 🚀 Project Background

As a freelance developer passionate about dynamic web apps, this project was crafted to simulate a real-world quiz platform. Users can browse categories, answer time-bound questions, track their scores, and challenge themselves again and again!

---

## 🎮 Features (User Stories)

### As a user, I can:
- 🏠 Access a **home page** showing available quiz categories.
- 🎯 Select a **category** and **difficulty level**, then start a quiz.
- ✅ Answer questions **one by one** with **instant validation**.
- 🧠 View my **final score**, save it with a username in **local storage**, and replay the quiz.
- 📈 Access a **score history** saved locally.
- ⏱️ **Timed Mode**: Each question has a countdown timer to add more challenge.

---

## 🗂️ App Structure

| Section | Description |
|--------|-------------|
| **Navbar** | Links to Home, History, and Settings |
| **Home** | Select category & difficulty, then Start Quiz |
| **Quiz** | Shows questions, score counter, and progress |
| **Result** | Final score, feedback, and Play Again button |
| **History** | Displays table of previous scores from local storage |

---

## 🛠️ Technologies Used

- **Framework**: Angular 16+
- **Languages**: TypeScript, HTML, CSS
- **UI Framework**: Tailwind CSS / Bootstrap
- **State Management**: RxJS
- **External API**: [Open Trivia DB](https://opentdb.com/)

---

## 📦 Setup & Run

```bash
# Clone the repository
git clone https://github.com/your-username/enaa-quizizz.git

# Navigate to the project directory
cd enaa-quizizz

# Install dependencies
npm install

# Run the development server
ng serve

# Open in browser
http://localhost:4200
