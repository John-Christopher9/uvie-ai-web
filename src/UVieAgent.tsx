import { useState, useEffect, useRef } from "react";
import { Sparkles, Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import UVieAvatar3D from "./UVieAvatar3D";

function UVieAgent() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [talking, setTalking] = useState(false);
  const [emotion, setEmotion] = useState("idle");
  const [speechAvailable, setSpeechAvailable] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
        handleAsk(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event?.error ?? "Unknown error");
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechAvailable(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current || !speechAvailable) return;
    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
      setEmotion("thinking");
    } else {
      recognitionRef.current.stop();
    }
  };

  const speakResponse = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    setTalking(true);
    setEmotion("talking");

    utterance.onend = () => {
      setTalking(false);
      setEmotion("happy");
    };

    synth.speak(utterance);
  };

  const handleAsk = async (text = prompt) => {
    if (!text.trim()) return;
    setLoading(true);
    setEmotion("thinking");
    try {
      setResponse("Hello! I'm UVie, your AI Agent!");
      speakResponse("Hello! I'm UVie, your AI Agent!");
    } catch (error) {
      console.error("Chat request failed:", error);
      setResponse("Oops! Something went wrong.");
      setEmotion("idle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-center p-4 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <UVieAvatar3D emotion={emotion} talking={talking} />
      </motion.div>

      <motion.div className="text-center mb-8" initial={{ y: -20 }} animate={{ y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Meet UVie</h1>
        <p className="text-lg text-purple-200">Your talking AI agent</p>
      </motion.div>

      <div className="w-full max-w-2xl bg-white rounded-xl p-6 text-black space-y-4 shadow-lg">
        <div className="flex space-x-2">
          <button
            onClick={toggleListening}
            disabled={!speechAvailable}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            {listening ? (
              <><MicOff className="mr-2 h-5 w-5" /> Stop</>
            ) : (
              <><Mic className="mr-2 h-5 w-5" /> Talk</>
            )}
          </button>

          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            {loading ? (
              "Thinking..."
            ) : (
              <><Sparkles className="mr-2 h-5 w-5" /> Ask UVie</>
            )}
          </button>
        </div>

        {response && (
          <motion.div
            className="bg-gray-100 p-4 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {response}
          </motion.div>
        )}
        {!speechAvailable && (
          <p className="text-sm text-red-400">
            Speech recognition is not supported in your browser environment.
          </p>
        )}
      </div>
    </div>
  );
}

export default UVieAgent;
