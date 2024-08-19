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

export default function SignUpPage() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"></Typography>
          <Button color="inherit" href="/sign-in">
            <Link herf="/sign-in" passHref></Link>
            Sign In
          </Button>
          <Button color="inherit" href="/sign-up">
            <Link herf="/sign-up" passHref></Link>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
}