import React, { useState } from "react";
import axios from "axios";
import "./ProfileViewer.css";
import { toast } from "sonner";

const ProfileViewer = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchGitHubData = async () => {
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
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGitHubData}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {profile && (
        <div className="profile">
          <img src={profile.avatar_url} alt="Avatar" />
          <h2>{profile.name || profile.login}</h2>
          <p>{profile.bio}</p>
          <p>Followers: {profile.followers} | Following: {profile.following}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repo-list">
          <h3>Repositories</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a> - ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;
