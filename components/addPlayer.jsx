import React from "react";

export default function AddPlayer({players, setPlayers, isEnabled }) {
  function handleAddClick() {
    let name = document.getElementById("name").value;
    let img = document.getElementById("image").value;

    const isNameExists = players.some(player => player.nickname === name);
  
    if (isNameExists) {
      alert(`Player with name ${name} already exists!`);
    } else {
      setPlayers(players => [
        ...players,
        {
          nickname: name,
          imageLink: img,
          points: 0
        }
      ]);
  
      //alert(`Player: ${name} Added!`);
      clearTxtAreas();
    }
  }

  function clearTxtAreas() {
    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: "15px", padding: "20px", height: "auto", width: "100%" }}>
        <input id="name" type="text" placeholder="Nickname" style={{ borderRadius: "20px", padding: "5px", marginRight: "5px",height:"15px"  }} />

        <input id="image" type="text" placeholder="Image Link" style={{ borderRadius: "20px", padding: "5px", marginRight: "5px", height:"15px" }} />

        <button
            id="btnAdd"
            disabled={!isEnabled}
            onClick={handleAddClick}
            style={{ backgroundColor: "green", fontSize:"medium", textAlign: "center", borderRadius: "20px", width: "70px", padding: "8px", height:"29px" }}
        >
            Add
        </button>
    </div>
  );
}
