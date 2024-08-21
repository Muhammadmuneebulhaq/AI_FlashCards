'use client'

import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/navigation'
import {
  Container,
  Grid,
  Card,
  AppBar,
  Toolbar,
  CardContent,
  Typography,
  Box
} from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (user) {
      const fetchFlashcards = async () => {
        try {
          const userDocRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(userDocRef)

          if (docSnap.exists()) {
            const flashcardSets = docSnap.data().flashcardSets || []
            const allFlashcards = flashcardSets.flatMap(set => set.flashcards || [])
            setFlashcards(allFlashcards)
          } else {
            await setDoc(userDocRef, { flashcardSets: [] })
            setFlashcards([])
          }
        } catch (error) {
          console.error('Error fetching flashcards:', error)
        }
      }

      fetchFlashcards()
    }
  }, [user])

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  const handleFlip = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }))
  }

  if (!isLoaded || !isSignedIn) {
    return <Box>Loading...</Box>
  }

  return (
    <>
          <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderRadius: 2 }} // Rounded AppBar
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          {isLoaded && isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Button color="inherit" href="/sign-in">
                Sign In
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleFlip(index)}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: 4,
                  color: "text.primary",
                  backgroundColor: flipped[index] ? "primary.light" : "background.paper",
                  transition: "transform 0.6s",
                  transform: flipped[index] ? "rotateY(180deg)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  perspective: "1000px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    backgroundColor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        textAlign: "center",
                        transform: flipped[index] ? "scaleX(-1)" : "none",
                      }}
                    >
                      {flipped[index] ? flashcard.back : flashcard.front}
                    </Typography>
                  </CardContent>
                </Box>
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
    </>
  )
}
