"use client";

//use hook from react
import {useState} from "react";

export default function GeneratePage(){
    //creates states 
    const[prompt, setPrompt] = useState(""); //stores text user types, function to update prompt

    const[output, setOutput] = useState("");//stores response from backend, function to update output


    /* When user clicks the button → this function runs, It sends a POST request to your Flask backend API:http://127.0.0.1:5000/generate, 	
    Sends this JSON body:{ "prompt": "whatever user typed" },
     Flask returns a response like:{ "response": "AI-generated text" },
     We save that in React state:setOutput(data.response);
    */
    const handleGenerate = async () => {
        const res = await fetch ("http://127.0.0.1:5000/generate",{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({prompt}),
        });

        const data = await res.json();
        setOutput(data.output);
    };
    
    return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Prompt Generator</h1>

      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "20px" }}
      ></textarea>

      <button
        onClick={handleGenerate}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Generate
      </button>

      {output && (
        <div style={{ marginTop: "30px", background: "#954848ff", padding: "20px" }}>
          <h3>Response:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}


