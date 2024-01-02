import React from "react";

export default function ShowPlayer(props) {
  const { nickname, imageLink, onDelete } = props;

  const deletePlayer = () => {
    onDelete(nickname);
  };

  return (
    <>
      <div style={{ display: "flex", width: "120px",height:"210px", backgroundColor: "lightgray", borderRadius: "15px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img
          style={{
            borderRadius: "60%",
            height: "100px",
            width: "100px",
            marginBottom: "10px",
            marginTop: "5px",
          }}
          src={imageLink || "https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}
          alt="PlayerImage"
        />
        <h4>{nickname}</h4>
        <button id="btnDelete" style={{ borderRadius: "20px", width: "105px", backgroundColor: "lightgray", color:"red" }} onClick={deletePlayer}>Delete</button> 
      </div>
    </>
  );
}