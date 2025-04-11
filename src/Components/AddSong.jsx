import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const fileUrl = "https://docs.google.com/spreadsheets/d/1PAw0exvR4mM7nafxuCqdmoIyBiXIlHlT/edit?usp=drivesdk&ouid=113324868507289636208&rtpof=true&sd=true"; // Replace with actual file ID

const AddSong = () => {

  const [newSong, setNewSong] = useState({  title: "", artist: "", src: "" });
  const fetchAndModifyExcel = async () => {
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();

  // Read Excel data
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const parsedData = XLSX.utils.sheet_to_json(sheet);
  // Transform data into required format
  const filteredData = parsedData.filter((row) => row.A != null).map((row) => ({
    
    title: row.A,
    artist: row.B,
    src: row.C,
  }));

  // Add a new row with user input
  if (newSong.title && newSong.src) {
    filteredData.push(newSong);
  } else {
      alert("Please enter song details.");
      return;
  }
  console.log("filteredData : "+ filteredData);

  // Convert JSON back to worksheet
  const newWorksheet = XLSX.utils.json_to_sheet(filteredData);
  workbook.Sheets[sheetName] = newWorksheet;

  // Convert workbook to binary and save it
  const updatedExcel = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([updatedExcel], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  // Trigger download
  saveAs(blob, "Updated_File.xlsx");
};
    return (
      <div style={{ padding: "20px" }}>
        <h2>Modify Public Google Drive Excel File</h2>
        <br />
        <input
            type="text"
            placeholder="Song Title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            style={{ width: "200px", padding: "5px", marginRight: "5px" }}
        />
        <input
            type="text"
            placeholder="Song Artist"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            style={{ width: "200px", padding: "5px", marginRight: "5px" }}
        />
        <input
            type="text"
            placeholder="Song URL"
            value={newSong.src}
            onChange={(e) => setNewSong({ ...newSong, src: e.target.value })}
            style={{ width: "400px", padding: "5px" }}
        />
        <br />
        <button onClick={fetchAndModifyExcel} style={{ marginTop: "10px", padding: "8px 15px" }}>
            Fetch & Modify Excel
        </button>
      </div>
    );
};

export default AddSong;