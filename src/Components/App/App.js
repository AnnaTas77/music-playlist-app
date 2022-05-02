import React from 'react'
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
        { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
        { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],

      playlistName: 'My Playlist',

      playlistTracks: [
        { name: 'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 7 },
        { name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 8 },
        { name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 9 }]
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

    let trackURIs = tracks.map(track => track.uri);

  }

  search(searchedTerm) {

    console.log(searchedTerm);

  }



  render() {

    return (
      <div className="App">

        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
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
