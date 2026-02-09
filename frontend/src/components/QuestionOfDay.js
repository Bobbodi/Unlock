import { useNavigate } from "react-router-dom";

export default function QuestionOfDay() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/qotd")}
      style={{
        width: "100%",
        borderRadius: 24,
        padding: "22px 26px",
        minHeight: 150,
        background: "#cdd5ff",
        boxSizing: "border-box",
        marginBottom: 18,
        cursor: "pointer",
        textAlign: "center"
      }}
    >
      <h2 style={{ margin: 0, fontSize: 44, fontWeight: 750 }}>
        Question Of The Day
      </h2>
      <p style={{ marginTop: 10, opacity: 0.7 }}>View me →</p>
    </div>
  );
}

const cardStyle = {
  width: "100%",
  borderRadius: 24,
  padding: "22px 26px",
  minHeight: 150,          
  background: "#cdd5ff",
  boxSizing: "border-box",
  marginBottom: 18,
};

const titleStyle = {
  margin: 0,
  fontSize: 38,            
  fontWeight: 750,
};
