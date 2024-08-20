'use client'

import { SignUp } from "@clerk/clerk-react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
  Box,
} from "@mui/material";

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit" href="/sign-in">
            <Link herf="/sign-in" passhref></Link>
            Sign In
          </Button>
          <Button color="inherit" href="/sign-up">
            <Link herf="/sign-up" passhref></Link>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
}