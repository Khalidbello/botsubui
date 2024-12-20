"use client";

import React from "react";

const ButtonComponent: React.FC = () => {
  // Function to handle button click
  const url: string | undefined = process.env.NEXT_PUBLIC_URL;

  const handleClick = async () => {
    try {
      const response = await fetch(
        `https://lifestyleleverage.com.ng/botsub/set-cookie`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent and received
        }
      );

      if (response.ok) {
        console.log("Cookie set successfully!");
      } else {
        console.error("Failed to set cookie:", response.statusText);
      }
    } catch (error) {
      console.error("Error while setting cookie:", error);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleClick}>
        Set Cookie
      </button>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ButtonComponent;
