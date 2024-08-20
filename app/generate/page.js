import { useUser } from "@clerk/clerk-react";

export default function Generate() {
  const { isloaded, IsSignedin, user } = useUser();
  const { flashcards, setFlashcards } = useState([]);
  const { flipped, setFliped } = useState([]);
  const { text, setText } = useState("");
  const { name, setName } = useState("");
  const { open, setOpen } = useState("");
  const { router } = useRouter();
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleCardClick = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if(!name){
        alert("Please enter a name for your flashcard set.");
        return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if(docSnap.exists()){
        const collection = docSnap.data().flashcards || [];
        if (collection.find((set) => set.name === name)) {
            alert("A flashcard set with that name already exists.");
            return;
        }
        else{
            collection.push({ name, flashcards });
            batch.set(userDocRef, { flashcardSets: collection},{merge:true});
        }
    } else {
        batch.set(userDocRef, { flashcardSets: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((card) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, card);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  }
    return (
    <Container maxWidth="md">
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
           v label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>
      
          {flashcards.length > 0 && (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Generated Flashcards
        </Typography>
        <Grid container spacing={2}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Front:</Typography>
                  <Typography>{flashcard.front}</Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                  <Typography>{flashcard.back}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
    )}
    {flashcards.length > 0 && (
  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
      Save Flashcards
    </Button>
  </Box>
    )}
    </Container>
  )
}
