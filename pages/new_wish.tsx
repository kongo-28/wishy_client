import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "@/components/shared-theme/AppTheme";
import ColorModeSelect from "@/components/shared-theme/ColorModeSelect";
import axios from "axios";
import { useRouter } from "next/router";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function NewWish(props: { disableCustomTheme?: boolean }) {
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get("title"),
      content: data.get("content"),
    });
    try {
      await axios.post(`${process.env.EMV_URL}/wishes`, {
        title: data.get("title"),
        content: data.get("content"),
      });

      router.push("/"); //リダイレクト
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

  const validateInputs = () => {
    const title = document.getElementById("title") as HTMLInputElement;
    // const content = document.getElementById("content") as HTMLInputElement;

    let isValid = true;

    if (!title.value) {
      setTitleError(true);
      setTitleErrorMessage("Please enter a valid title .");
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorMessage("");
    }

    return isValid;
  };

  return (
    <div>
      <ResponsiveAppBar />
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              New Wish
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                  error={titleError}
                  helperText={titleErrorMessage}
                  id="title"
                  type="title"
                  name="title"
                  placeholder="What do you wish for?"
                  autoComplete="title"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={titleError ? "error" : "primary"}
                  sx={{ ariaLabel: "title" }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="content">Content</FormLabel>
                </Box>
                <TextField
                  name="content"
                  placeholder="If you have any details."
                  type="content"
                  id="content"
                  autoComplete="current-content"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  // color={contentError ? "error" : "primary"}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                submit
              </Button>
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            ></Box>
          </Card>
        </SignInContainer>
      </AppTheme>
    </div>
  );
}
