import { useEffect, useState } from "react"
import axios from "axios";

function App() {

  const [notes, setNotes]= useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");


  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.allNotes)      
    }) 
  }


  useEffect(()=>{
    fetchNotes()
  },[])


  async function submitHandler(e){
    e.preventDefault();

    await axios.post("http://localhost:3000/api/notes", {
      title: e.target.elements.title.value,
      desc: e.target.elements.desc.value
    })

    fetchNotes();
  }

  async function deleteHandle(id){
    await axios.delete("http://localhost:3000/api/notes/"+id)

    fetchNotes();
  }

  async function editHandle(id){
    setIsEdit(true);
    setEditId(id);
  }

  async function handleEditSubmit(e){

    e.preventDefault();    
    await axios.patch("http://localhost:3000/api/notes/"+editId, {
      title: e.target.elements.newTitle.value,
      desc: e.target.elements.newDesc.value
    })

    setIsEdit(false);
    fetchNotes()
    
  }


  return (
    <>
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="title" name="title" />
      <input type="text" placeholder="description" name="desc" />

      <button>Submit</button>
    </form>


    <div className="notes">
    {notes? notes.map( (note)=>{
      return <div className="note">

        <h3>title: {note.title}</h3>     
        <p>desc: {note.desc}</p>   
        <div className="btns">
          <button onClick={()=> editHandle(note._id)}>Edit</button>
          <button onClick={()=> deleteHandle(note._id)}>Delete</button>
        </div>
      </div>
    }): ""}
    </div>

    {isEdit?
    <form className="editInp" onSubmit={handleEditSubmit}>
      <input type="text" name="newTitle" placeholder="new title"/>
      <input type="text" name="newDesc" placeholder="new desc"/>
      <button>Submit</button>
    </form> : ""}

    </>
  )
}

export default App
