import  { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WordInfo = () => {
  const { word, id } = useParams();
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const audioRefs = useRef([]); // Array of refs for all audio elements

  useEffect(() => {
    setLoading(true);

    if (word) {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
          setWordDetails(res.data[id]);
          setLoading(false);
          console.log(res.data[id]); // Logging the fetched word details
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [word, id]);

  const handlePlayPause = (audioIdx) => {
    if (playingIndex === audioIdx) {
      audioRefs.current[audioIdx].pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      audioRefs.current[audioIdx].play();
      setPlayingIndex(audioIdx);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wordDetails) {
    return <p>No word details found.</p>;
  }

  return (
    <div>
      <button onClick={() => window.history.back()}>Back to Search</button>
      <div>
        <h1 className="text-2xl">{word}</h1>
        <div className="flex">
          <p>{wordDetails.phonetic}</p>
          {wordDetails.phonetics
            .filter((audioObj) => audioObj?.audio)
            .map((audio, audioIdx) => (
              <div key={audioIdx} className="bg-pink-800">
                <audio
                  ref={(el) => (audioRefs.current[audioIdx] = el)}
                  src={audio.audio}
                  controls={false}
                ></audio>
                <button onClick={() => handlePlayPause(audioIdx)}>
                  {playingIndex === audioIdx ? "⏸️" : "▶️"}
                </button>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Definitions</h2>
        {wordDetails.meanings.map((meaning, meaningIdx) => (
          <div key={meaningIdx}>
            <h3>{meaning.partOfSpeech}</h3>
            <ul>
              {meaning.definitions.map((definition, defIdx) => (
                <li key={defIdx}>{definition.definition}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordInfo;