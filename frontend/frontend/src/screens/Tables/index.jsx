import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Tables() {
  const [rooms, setRooms] = useState([])
  const [tables, setTables] = useState([])

  useEffect(()=>{
    async function fetchRooms(){
      const {data} = await axios.get("http://127.0.0.1:8000/orders/get-rooms")
      setRooms(data)
     
    }
   
    fetchRooms()
  },[])

  useEffect(()=>{
    async function fetchTables(){
      const {data} = await axios.get('http://127.0.0.1:8000/orders/get-tables')
      setTables(data)
      console.log(data)
    }

    fetchTables()
  },[])


  const handleClick = () => {

    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      {rooms.map((room)=>(
        <Chip key={room.id} label={room.name} onClick={handleClick} />
      )

      )}
   
    </Stack>
  );
}