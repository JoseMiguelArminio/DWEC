const playlist = [
  { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
  { titulo: "Imagine", artista: "John Lennon", duracion: 183 },
  { titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: 301 },
  { titulo: "Billie Jean", artista: "Michael Jackson", duracion: 294 },
  { titulo: "Stairway to Heaven", artista: "Led Zeppelin", duracion: 482 },
  { titulo: "Shape of You", artista: "Ed Sheeran", duracion: 233 },
  { titulo: "Hotel California", artista: "Eagles", duracion: 390 },
  { titulo: "Hey Jude", artista: "The Beatles", duracion: 431 },
  { titulo: "Rolling in the Deep", artista: "Adele", duracion: 228 },
  { titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", duracion: 356 }
];

const cancionesLargas = playlist.filter(c => c.duracion > 180);

const mensajes = cancionesLargas.map(c => 
  `La canción ‘${c.titulo}’ de ${c.artista} dura ${c.duracion} segundos.`
);

console.log(mensajes);
