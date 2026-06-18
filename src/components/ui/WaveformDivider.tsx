export default function WaveformDivider() {
  return (
    <div className="waveform-divider">
      <svg viewBox="0 0 1200 32" preserveAspectRatio="none" fill="none">
        <path
          d="M0 16 Q 75 4, 150 16 T 300 16 T 450 16 T 600 16 T 750 16 T 900 16 T 1050 16 T 1200 16"
          stroke="#5DFFF3"
          strokeWidth="0.8"
          strokeOpacity="0.1"
          className="animate-[waveflow_6s_ease-in-out_infinite]"
        />
        <path
          d="M0 16 Q 75 28, 150 16 T 300 16 T 450 16 T 600 16 T 750 16 T 900 16 T 1050 16 T 1200 16"
          stroke="#5DFFF3"
          strokeWidth="0.5"
          strokeOpacity="0.05"
          className="animate-[waveflow_6s_ease-in-out_0.8s_infinite]"
        />
      </svg>
    </div>
  );
}
