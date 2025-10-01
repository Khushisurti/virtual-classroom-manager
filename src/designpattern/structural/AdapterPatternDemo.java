// Target
interface MediaPlayer {
    void play(String fileName);
}

// Adaptee
class Mp4Player {
    public void playMp4(String fileName) {
        System.out.println("Playing MP4 file: " + fileName);
    }
}

// Adapter
class MediaAdapter implements MediaPlayer {
    private Mp4Player mp4Player = new Mp4Player();

    public void play(String fileName) {
        mp4Player.playMp4(fileName);
    }
}

// Concrete Class
class AudioPlayer implements MediaPlayer {
    public void play(String fileName) {
        if (fileName.endsWith(".mp3")) {
            System.out.println("Playing MP3 file: " + fileName);
        } else if (fileName.endsWith(".mp4")) {
            MediaAdapter adapter = new MediaAdapter();
            adapter.play(fileName);
        } else {
            System.out.println("Unsupported format: " + fileName);
        }
    }
}

// Client
public class AdapterPatternDemo {
    public static void main(String[] args) {
        AudioPlayer player = new AudioPlayer();
        player.play("song.mp3");
        player.play("video.mp4");
    }
}
