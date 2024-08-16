"use client";
import { Box, Stack, Typography, Modal, TextField, Button } from "@mui/material";
import { firestore } from "@/firebase";
import { getFirestore, deleteDoc, doc, collection, getDocs, query, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { remove } from "firebase/database";

export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState("")

  const updateInv = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });
    setInventory(inventoryList)
  };

  const addItem = async (item) => {
    const docRef = doc(firestore, 'inventory', item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, {count: count + 1 })
    } else {
      await setDoc(docRef, {count: 1 })
    }
    await updateInv()
  };

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'inventory', item)
    const docSnap = await getDocs(docRef)

    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count > 0 ? count - 1 : 0 })
    } else {
      await setDoc(docRef, { count: 0 })
    }
    await updateInv()
  };

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateInv()
  }, [])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%" 
          left="50%" 
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24} 
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              addItem(itemName);
              setItemName("");
              handleClose();
            }}
          >
            Add Item
          </Button>
        </Box>
      </Modal>

      <Typography variant="h1">Inventory Management</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Item
      </Button>

      <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              removeItem(itemName);
              setItemName(" ");
            }}
          >
            Remove Item
          </Button>

        
      <Stack direction="row" gap={2} spacing={2}>
        {inventory.map((item) => (
          <Box key={item.name}>
            <Typography>{item.name}</Typography>
            <Typography>{item.count}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
