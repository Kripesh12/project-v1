import Lottie from "lottie-react";
import animationData from "../json/robot-animation.json";
function RobotAnimation() {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 400 }}
      />
    </div>
  );
}

export default RobotAnimation;
