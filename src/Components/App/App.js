import React from 'react'
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],

      playlistName: 'My Playlist',

      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(trackToAdd) {
    let existingTracks = this.state.playlistTracks;
    if (existingTracks.find(savedTrack => savedTrack.id === trackToAdd.id)) {

      return;

    } else {

      existingTracks.push(trackToAdd);

      this.setState({ playlistTracks: existingTracks });
    }
  }

  removeTrack(trackToRemove) {

    let existingTracks = this.state.playlistTracks;

    let filteredPlaylist = existingTracks.filter(existingTrack => existingTrack.id !== trackToRemove.id)

    this.setState({ playlistTracks: filteredPlaylist });
  }


  updatePlaylistName(newName) {

    this.setState({ playlistName: newName })

  }

  savePlaylist() {

    let tracks = this.state.playlistTracks;
    let trackUris = tracks.map(track => track.uri);

    Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })

  }

  search(searchedTerm) {

    Spotify.search(searchedTerm).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })

  }



  render() {

    return (
      <div className="App">

        <div>
          <h1><span className="highlight">J</span>am<span className="highlight">J</span>ar Music</h1>
          <div className="App">

            <SearchBar onSearch={this.search} />

            <div className="App-playlist">

              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />

              <Playlist
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />

            </div>

          </div>
        </div>

      </div>
    );
  }
}


export default App;
