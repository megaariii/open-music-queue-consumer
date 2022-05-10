const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistid) {
    const query = {
      text: `SELECT playlists.id, playlists.name
            FROM playlists 
            WHERE id = $1 `,
      values: [playlistid],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongs(playlistid) {
    const query = {
      text: `
        SELECT songs.id, songs.title, songs.performer FROM songs 
        LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistid],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
