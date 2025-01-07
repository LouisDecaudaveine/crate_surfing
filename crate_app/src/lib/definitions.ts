import { z } from 'zod';

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

export type SidebarPlaylist = {
    type: number;
    name: string;
    playlist_id: string;
    node: SidebarPlaylist[];
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

export type RawParsedFolder = {
    NODE: (RawParsedFolder | RawParsedPlaylist)[];
    _Name: string;
    _Type: "0";
    _Count: string;
}

export type RawParsedPlaylist = {
   TRACK: {_Key: string}[] | {_Key: string};
   _Name: string;
   _Type: "1";
   _Entries: string;
   _KeyType: string; 
}

export const SignupFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
  })
   
  export type FormState =
    | {
        errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
        }
        message?: string
      }
    | undefined