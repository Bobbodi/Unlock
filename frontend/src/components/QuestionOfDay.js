export default function QuestionOfDay() {
  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Question Of The Day</h2>
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
