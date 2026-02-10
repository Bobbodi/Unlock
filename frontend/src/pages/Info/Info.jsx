import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState } from "react";

const Info = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    funFact: "",
    animal: "",
    distressMethod: "",
  });

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = () => {
    console.log(form);
    // later: save to supabase
  };

  const goToHome = () => {
    navigate("/home");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    fontSize: "1rem",
    marginTop: "0.2rem",
    marginBottom: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    width: "100%",
    padding: "0.6rem",
    fontSize: "1rem",
    marginTop: "0.2rem",
    marginBottom: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
    boxSizing: "border-box",
    resize: "vertical",
    overflow: "auto",
  };

  const buttonStyle = {
    backgroundColor: "#90ABEF",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#E5EAFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1000px",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffffdd",
          minHeight: "700px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Personal Information</h1>

        <div>
          <p>UserName</p>
          <input
            type="text"
            value={form.userName}
            onChange={handleChange("usserName")}
            style={inputStyle}
          />
        </div>

        <div>
          <p>Gender</p>
          <input
            type="text"
            value={form.gender}
            onChange={handleChange("gender")}
            style={inputStyle}
          />
        </div>

        <div>
          <p>Birthday</p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "0.8rem",
            }}
          >
            <input
              type="text"
              placeholder="Year"
              value={form.birthYear}
              onChange={handleChange("birthYear")}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="text"
              placeholder="Month"
              value={form.birthMonth}
              onChange={handleChange("birthMonth")}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="text"
              placeholder="Day"
              value={form.birthDay}
              onChange={handleChange("birthDay")}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        </div>

        <div>
          <p>Fun Fact</p>
          <textarea
            value={form.funFact}
            onChange={handleChange("funFact")}
            style={textareaStyle}
          />
        </div>

        <div>
          <p>Which animal do you think best represents you?</p>
          <textarea
            value={form.animal}
            onChange={handleChange("animal")}
            style={textareaStyle}
          />
        </div>

        <div>
          <p>What do you usually do to destress?</p>
          <textarea
            value={form.distress}
            onChange={handleChange("distressMethod")}
            style={textareaStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.5rem",
          }}
        >
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>

          <button onClick={goToHome} style={buttonStyle}>
            Proceed to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
