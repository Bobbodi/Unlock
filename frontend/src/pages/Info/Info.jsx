import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";

const Info = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    gender: "",
    birth: "",
    funFact: "",
    animal: "",
    distressMethod: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("info")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setForm({
            userName: data.userName || "",
            gender: data.gender || "",
            birth: data.birth || "",
            funFact: data.funFact || "",
            animal: data.animal || "",
            distressMethod: data.distressMethod || "",
          });
        }
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("No user logged in!");

    const { data, error } = await supabase
      .from("info")
      .upsert(
        {
          user_id: user.id,
          userName: form.userName,
          gender: form.gender,
          birth: form.birth,
          funFact: form.funFact,
          animal: form.animal,
          distressMethod: form.distressMethod,
        },
        { onConflict: "user_id" }
      );

    if (error) {
      console.error(error);
      alert("Error saving your info: " + error.message);
    } else {
      alert("Info updated successfully!");
      navigate("/home");
    }
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
            onChange={handleChange("userName")}
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
          <input
            type="date"
            value={form.birth}
            onChange={handleChange("birth")}
            style={inputStyle}
          />
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
            value={form.distressMethod}
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

          <button onClick={handleSubmit} style={buttonStyle}>
            Proceed to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info