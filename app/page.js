'use client';

import { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { UserButton, useUser } from '@clerk/clerk-react';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          {isLoaded && isSignedIn ? (
            <>
              <UserButton />
              <Button color="inherit" href="/flashcards">
                My Flashcards
              </Button>
            </>
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

      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
          Your solution for creating and managing flashcards.
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" href="/about">
            Learn More
          </Button>
          {isLoaded && isSignedIn && (
            <Button variant="contained" color="secondary" href="/flashcards">
              My Flashcards
            </Button>
          )}
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Create Flashcards Easily
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Use our intuitive interface to create flashcards effortlessly.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Manage Your Flashcards
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Organize and review your flashcards with advanced tools.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
