-- CreateTable
CREATE TABLE "Track" (
    "track_id" TEXT NOT NULL,
    "name" TEXT DEFAULT 'Untitled',
    "artist" TEXT,
    "album" TEXT,
    "kind" TEXT,
    "size" BIGINT,
    "total_time" INTEGER,
    "average_bpm" DOUBLE PRECISION,
    "date_added" TIMESTAMP(3),
    "sample_rate" INTEGER,
    "play_count" INTEGER DEFAULT 0,
    "rating" INTEGER DEFAULT 0,
    "location" TEXT,
    "tonality" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("track_id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlist_id" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "count" INTEGER DEFAULT 0,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tracks" TEXT[],

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlist_id")
);
