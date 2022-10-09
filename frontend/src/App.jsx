import {useState} from "react";
import axios from "axios";

function App() {
  const [payload, setPayload] = useState("");
  const [payload2, setPayload2] = useState("");
  const [readUid, setReadUid] = useState("");
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  function readHandler(event) {
    axios.get(`http://localhost:8080/read?uid=${readUid}`)
      .then((response) => {
        console.log(response.data);
        setPayload(JSON.stringify(response.data))
      }).catch((error) => {
        console.error(error.response);
        setPayload(JSON.stringify(error.response))
      })
  }

  function uidHandler(event) {
    setUid(event.target.value);
    //console.log(event.target.value)
  }

  function nameHandler(event) {
    setName(event.target.value);
  }

  function addToTable(event) {
    axios.post("http://localhost:8080/add", {
      uid: uid,
      name: name
    }).then((response) => {
      //console.log(response)
      setPayload2(JSON.stringify(response.data))
    }).catch((error) => {
      //console.error(error);
      setPayload2(JSON.stringify(error.response.data))
    })
  }

  return (
    <div>
      <div>
        <div>Read uid:</div>
        <input type="text" onChange={(e)=>setReadUid(e.target.value)} />
        <button onClick={readHandler}>Read</button>
        <div>{payload}</div>
        
      </div>
        <div style={{marginTop:"4rem"}}>
          <div>uid</div>
          <input type="text" onChange={uidHandler} />
          <div>name</div>
          <input type="text" onChange={nameHandler} />
          <button onClick={addToTable}>Submit</button>
          <div>{payload2}</div>
        </div>
    </div>
    
  );
}

export default App;
