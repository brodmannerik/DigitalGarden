import { useRouter } from "next/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface BackButtonProps {
  route: string;
}

const BackButton: React.FC<BackButtonProps> = ({ route }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(route);
  };

  return (
    <button
      onClick={handleGoBack}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
      Back
    </button>
  );
};

export default BackButton;
