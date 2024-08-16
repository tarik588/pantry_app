"use client";
import { Box, Stack, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import {getFirestore, collection, getDocs, query} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";


export default function Home() {
  
  const [pantry, setPantryList] = useState([])
  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore,'pantry'));
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach(doc => {
        pantryList.push(doc.id)
      })
      setPantryList(pantryList)
    }
    updatePantry()
  },[])

  return (
    
    
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Stack width="800px" height="400px" spacing = {1} overflow = {"scroll"}>
      {pantry.map((i) => ( <Box key={i} bgcolor="primary.main" color="primary.contrastText" p={2} textAlign="center">{i}</Box>))}
      </Stack>
    <Box>
       <Button variant="contained" color="primary">Add</Button>
       <Button variant="contained" color="primary">Remove</Button>
        </Box>
    </Box>

    
  );
}
// ...
