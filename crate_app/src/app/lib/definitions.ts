export type Track = {
    id: string;
    artist: string;
    track_title: string;
    album: string;
    bpm: number;
    music_key: string;
    file_id: string;
    tags: string;
    date_added: Date;
}

export type Folder = {
    type: 0;
    name: string;
    count: number;
    node: (Playlist | Folder)[];
}

export type Playlist = {
    type: 1;
    name: string;
    entries: number;
    tracks: number[];
}

export type RawParsedTrack = {
    TEMPO: object[];
    _TrackID: string;
    _Name: string;
    _Artist: string;
    _Album: string;
    _Kind: string;
    _Size: string;
    _TotalTime: string;
    _AverageBpm: string;
    _DateAdded: string;
    _SampleRate: string;
    _PlayCount: string;
    _Rating: string;
    _Location: string;
    _Tonality:string;
}

export interface TrackTable {
    trackID: number;
    name: string;
    artist: string;
    album: string;
    kind: string;
    size: number;
    totalTime: number; // in seconds
    averageBpm: number;
    dateAdded: Date;
    sampleRate: number;
    playCount: number;
    rating: number;
    location: string;
    tonality:string;
}



export type JobjPlaylist = {}

export type JobjTrack = {}