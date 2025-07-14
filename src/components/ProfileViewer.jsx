import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";

const ProfileViewer = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username.");
      return;
    }

    setLoading(true);
    try {
      setError("");
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`);

      setProfile(userRes.data);
      setRepos(repoRes.data);
      toast.success(`Profile fetched for ${username}`);
    } catch (err) {
      setError("GitHub user not found.");
      setProfile(null);
      setRepos([]);
      toast.error("User not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth="md" mx="auto">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button fullWidth variant="contained" onClick={fetchGitHubData}>
            Search
          </Button>
        </Grid>
      </Grid>

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2} textAlign="center">
          {error}
        </Typography>
      )}

      {profile && (
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Box display="flex" alignItems="center" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
            <Avatar src={profile.avatar_url} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h5">{profile.name || profile.login}</Typography>
              <Typography variant="body1" color="text.secondary">
                {profile.bio}
              </Typography>
              <Typography variant="body2" mt={1}>
                Followers: {profile.followers} | Following: {profile.following}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {repos.length > 0 && (
        <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Repositories
          </Typography>
          <List>
            {repos.map((repo) => (
              <ListItem
                key={repo.id}
                component="a"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <ListItemText
                  primary={repo.name}
                  secondary={`⭐ ${repo.stargazers_count}   🍴 ${repo.forks_count}`}
                />
                <ListItemIcon>
                  <StarIcon fontSize="small" />
                </ListItemIcon>
                <ListItemIcon>
                  <ForkRightIcon fontSize="small" />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ProfileViewer;
