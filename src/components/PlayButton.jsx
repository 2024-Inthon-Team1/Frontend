import React from 'react';

const PlayButton = ({ trackId }) => {
  const playTrack = () => {
    if (!window.Spotify || !window.player || !trackId) {
      console.error('Spotify player is not initialized or track ID is missing');
      return;
    }

    const token =
      'BQCiEMKC5UV_bx4Ks4dfEoEDrd1zfN01-PQa2ZvEovLjIGCdm5ANGd5Qp41uYKpAWLOB91PSvDj9_Zh8_Q-SId9OlHMJnF-eLJ9osQjZA-1H934uEDw';

    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${window.player._options.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        if (response.ok) {
          console.log('Track is playing');
        } else {
          console.error('Failed to play track:', response.statusText);
        }
      })
      .catch(error => console.error('Error playing track:', error));
  };

  return <button onClick={playTrack}>Play Track</button>;
};

export default PlayButton;
