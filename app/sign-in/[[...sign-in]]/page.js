'use client'

import { SignIn } from "@clerk/clerk-react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
  Box,
} from "@mui/material";

export default function SignInPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit" href="/sign-in">
            Sign In
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
