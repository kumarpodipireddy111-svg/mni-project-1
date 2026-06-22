import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const quotes = [
    "Success comes from consistent effort.",
    "Study hard, dream big.",
    "Every day is a chance to improve.",
    "Small progress is still progress.",
    "Your future is created by what you do today."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const savedSubjects =
      JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(savedSubjects);

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (subject.trim() === "") return;

    setSubjects([
      ...subjects,
      {
        id: Date.now(),
        name: subject,
        completed: false,
      },
    ]);

    setSubject("");
  };

  const toggleComplete = (id) => {
    setSubjects(
      subjects.map((sub) =>
        sub.id === id
          ? { ...sub, completed: !sub.completed }
          : sub
      )
    );
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
  };

  const completedTasks = subjects.filter(
    (sub) => sub.completed
  ).length;

  const progress =
    subjects.length > 0
      ? (completedTasks / subjects.length) * 100
      : 0;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <h1>📚 AI Study Planner</h1>

        <button
          className="mode-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="quote-box">
          <h3>💡 Motivation</h3>
          <p>{quote}</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button onClick={addSubject}>
            Add Subject
          </button>
        </div>

        <div className="progress-section">
          <h3>Progress : {Math.round(progress)}%</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="subjects">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className={
                sub.completed
                  ? "subject completed"
                  : "subject"
              }
            >
              <span>{sub.name}</span>

              <div>
                <button
                  className="done-btn"
                  onClick={() =>
                    toggleComplete(sub.id)
                  }
                >
                  ✔
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteSubject(sub.id)
                  }
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
