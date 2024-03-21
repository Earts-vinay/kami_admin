import React from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  marginTop: theme => theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: theme => theme.spacing(1),
});

const StyledButton = styled(Button)({
  margin: theme => theme.spacing(3, 0, 2),
});

const ForgotPasswordLink = styled(Button)({
  margin: theme => theme.spacing(1, 0),
  textDecoration: 'underline',
  color: theme => theme.palette.text.secondary,
});

const ForgetPass = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // navigate('/');
  };

  const handleForgotPassword = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="xl">
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box width="50%" >
          <Box width="80%" >
            <img
              src="/assets/logos/saplogo.svg"
              alt="Logo"
              style={{ objectFit: "contain" }}
            />
            <Typography variant="h3" mt={2}>Welcome to <br /> The Spear of Security</Typography>
            <Typography mt={2}>Our AI platform uses computer vision to provide home security, elder care, and commercial applications. It tracks movements of cars, license plates, and people, quickly warning of any questionable activity.</Typography>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: "linear-gradient(119deg, #ebeffa 2%, #e8ebfd 30%, #f0ecf9 51%, #efeefb 70%, #eef7ff 100%)", boxShadow: "0 0 15px 0 rgba(36, 101, 233, 0.3)",
          border: "solid 2px #fff", padding: "50px", borderRadius: "10px", marginX: "10px", width: "30%"
        }}>
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <Typography> No worriest! Just enter your email and we’ll send you a reset password link.</Typography>
          <StyledForm onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Box display="flex" alignItems="center">


              <Typography>  Just remember? </Typography>
              <ForgotPasswordLink onClick={handleForgotPassword} sx={{ textTransform: "capitalize", }}>
                Login
              </ForgotPasswordLink>
            </Box>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ textTransform: "capitalize", paddingY: "10px" }}
            >
              Send Recovery Email
            </StyledButton>

          </StyledForm>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgetPass;
