function FinishScreen({
  points,
  maxPoints,
  highscore
}: {
  points: number;
  maxPoints: number;
  highscore: number;
}) {
  const percentage = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "👍";
  else if (percentage >= 30) emoji = "🤨";
  else if (percentage === 30) emoji = "👎";
  else emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
        ({percentage}%)
      </p>
      <p className="highscore">
        (Highscore: <strong>{highscore}</strong> points)
      </p>
    </>
  );
}
export default FinishScreen;
