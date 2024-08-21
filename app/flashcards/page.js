'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDoc, getDocs} from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/navigation'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      
      try {
        console.log("Fetching flashcards for user:", user.id)
        const docRef = doc(collection(db, 'users'), user.id)
        console.log("success");
        console.log(docRef);
        // console.log((await getDoc(docRef)).data())
        const docSnap = await getDoc(docRef)
        console.log(docSnap)
        console.log("success1")
        if (docSnap.exists()) {
            console.log("success2")
          const collections = docSnap.data().flashcards || []
          console.log("Fetched flashcards:", collections)
          setFlashcards(collections)
        } else {
          console.log("Document does not exist. Creating new document.")
          await setDoc(docRef, { flashcards: [] })
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error)
      }
    }

    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) {
    console.log("User not loaded or not signed in")
    return <Box></Box>
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No flashcards available
          </Typography>
        )}
      </Grid>
    </Container>
  )
}
