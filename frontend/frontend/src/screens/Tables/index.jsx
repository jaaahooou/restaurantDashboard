import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import axios from "axios";

export default function ClickableChips() {
  const [rooms, setRooms] = useState([])

  useEffect(()=>{
    async function fetchRooms(){
      const {data} = await axios.get("http://127.0.0.1:8000/orders/get-rooms")
      setRooms(data)
      console.log(data)
    }
   
    fetchRooms()
  },[])


  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}