import * as React from 'react';
import { useState, useEffect } from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <div style={{ width: '100%' }}>
 
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
          <Stack direction="row" spacing={4}>
      {rooms.map((room)=>(
        <Chip key={room.id} label={room.name} onClick={handleClick} />
      )

      )}
   
    </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
         <Stack direction="row" spacing={4}>
      {rooms.map((room)=>(
        <Chip key={room.id} label={room.name} onClick={handleClick} />
      )

      )}
   
    </Stack>
      </Box>
      

   
    </div>
    
   
  );
}