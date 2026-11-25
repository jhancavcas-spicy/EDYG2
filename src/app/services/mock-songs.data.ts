import { Song, SongRelation } from '../models/song.model';

/**
 * Datos de prueba (ficticios) usados para demostrar el funcionamiento de
 * las tres estructuras de datos del proyecto. No se consume ninguna API
 * externa ni se conecta a Spotify real: el enunciado permite usar datos
 * de demostración porque la plataforma es educativa.
 */
export const MOCK_SONGS: Song[] = [
  { id: 's1', title: 'Blinding Lights', artist: 'The Weeknd', plays: 980, genre: 'Synth-pop', album: 'After Hours', duration: '3:20' },
  { id: 's2', title: 'Bohemian Rhapsody', artist: 'Queen', plays: 870, genre: 'Rock', album: 'A Night at the Opera', duration: '5:55' },
  { id: 's3', title: 'Billie Jean', artist: 'Michael Jackson', plays: 910, genre: 'Pop', album: 'Thriller', duration: '4:54' },
  { id: 's4', title: 'Bad Romance', artist: 'Lady Gaga', plays: 760, genre: 'Pop', album: 'The Fame Monster', duration: '4:54' },
  { id: 's5', title: 'Bad Guy', artist: 'Billie Eilish', plays: 890, genre: 'Electropop', album: 'When We All Fall Asleep', duration: '3:14' },
  { id: 's6', title: 'Shape of You', artist: 'Ed Sheeran', plays: 940, genre: 'Pop', album: '÷ (Divide)', duration: '3:53' },
  { id: 's7', title: 'Someone Like You', artist: 'Adele', plays: 700, genre: 'Pop/Soul', album: '21', duration: '4:45' },
  { id: 's8', title: 'Smells Like Teen Spirit', artist: 'Nirvana', plays: 650, genre: 'Grunge', album: 'Nevermind', duration: '5:01' },
  { id: 's9', title: 'Rolling in the Deep', artist: 'Adele', plays: 680, genre: 'Pop/Soul', album: '21', duration: '3:48' },
  { id: 's10', title: 'Thriller', artist: 'Michael Jackson', plays: 820, genre: 'Pop', album: 'Thriller', duration: '5:57' },
  { id: 's11', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', plays: 730, genre: 'Rock', album: 'Appetite for Destruction', duration: '5:56' },
  { id: 's12', title: 'Stairway to Heaven', artist: 'Led Zeppelin', plays: 790, genre: 'Rock', album: 'Led Zeppelin IV', duration: '8:02' },
  { id: 's13', title: 'Shake It Off', artist: 'Taylor Swift', plays: 600, genre: 'Pop', album: '1989', duration: '3:39' },
  { id: 's14', title: 'Starboy', artist: 'The Weeknd', plays: 850, genre: 'R&B', album: 'Starboy', duration: '3:50' },
  { id: 's15', title: 'Billie Bossa Nova', artist: 'Billie Eilish', plays: 420, genre: 'Bossa nova', album: 'Happier Than Ever', duration: '3:16' },
];

/**
 * Relaciones iniciales de similitud entre canciones (grafo no dirigido).
 * Solo es necesario declarar cada relación una vez: addEdge se encarga de
 * crear la conexión en ambos sentidos.
 */
export const MOCK_RELATIONS: SongRelation[] = [
  { songId: 's1', relatedIds: ['s14', 's5', 's6'] },
  { songId: 's2', relatedIds: ['s12', 's11', 's8'] },
  { songId: 's3', relatedIds: ['s10', 's4', 's6'] },
  { songId: 's4', relatedIds: ['s3', 's13'] },
  { songId: 's5', relatedIds: ['s15', 's1'] },
  { songId: 's6', relatedIds: ['s3', 's13', 's9'] },
  { songId: 's7', relatedIds: ['s9'] },
  { songId: 's8', relatedIds: ['s11', 's2'] },
  { songId: 's9', relatedIds: ['s7', 's6'] },
  { songId: 's10', relatedIds: ['s3'] },
  { songId: 's11', relatedIds: ['s12', 's2', 's8'] },
  { songId: 's12', relatedIds: ['s11', 's2'] },
  { songId: 's13', relatedIds: ['s4', 's6'] },
  { songId: 's14', relatedIds: ['s1'] },
  { songId: 's15', relatedIds: ['s5'] },
];
