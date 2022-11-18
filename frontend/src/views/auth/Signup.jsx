import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Controller, useForm } from "react-hook-form";
import PublicWrapper from "../../layouts/Public";
import Validations from "../../utils/Validations";
import { signup } from "../../services/Auth";
import useToastr from "../../hooks/useToastr";
import RoutePaths from "../../configs/Routes";

const Signup = () => {
  const { control, handleSubmit } = useForm();

  const [processing, setProcessing] = useState(false);

  const { showSuccessToastr, showErrorToastr } = useToastr();

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      if (data.password !== data.confirmPassword) {
        showErrorToastr("Password does not match.");
        return;
      }

      const result = await signup(data);
      if (result.success) {
        showSuccessToastr("Signed up successfully.");
        window.localStorage.setItem("isLoggedIn", true);
        window.location.assign(RoutePaths.HOME);
      }
      setProcessing(false);
    } catch (error) {
      showErrorToastr(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
      setProcessing(false);
    }
  };

  return (
    <PublicWrapper>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography variant="h6" gutterBottom>
              Signup
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    id="name"
                    name="name"
                    rules={{ ...Validations.REQUIRED }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        type="text"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    id="email"
                    name="email"
                    rules={{ ...Validations.REQUIRED_EMAIL }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                        type="email"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    id="password"
                    name="password"
                    rules={{ ...Validations.REQUIRED }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        variant="standard"
                        type="password"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    id="confirmPassword"
                    name="confirmPassword"
                    rules={{ ...Validations.REQUIRED }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        fullWidth
                        variant="standard"
                        type="password"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    endIcon={
                      processing && (
                        <CircularProgress color="secondary" size={18} />
                      )
                    }
                    disabled={processing}
                  >
                    {processing ? "Signing up" : "Signup"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </PublicWrapper>
  );
};

export default Signup;
