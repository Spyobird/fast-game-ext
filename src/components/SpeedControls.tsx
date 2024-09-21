import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function SpeedButton({ speed, setSpeed }: { speed: number, setSpeed: Function }) {
  return (
  <button onClick={() => setSpeed(speed)}>
  {speed.toFixed(1)}x
  </button>);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
// function SpeedSlider({ speed, setSpeed }: { speed: number, setSpeed: Function }) {
//   return (
//     <input type="range" min="0.1" max="4.5" step="0.1" onChange={(e) => setSpeed(e.target.value)} value={speed}/>
//   );
// }

function SpeedLabel({ speed }: { speed: number }) {
  return (
    <h3>
      {speed.toFixed(1)}x zoomies
    </h3>
  )
}

function SpeedControls() {
  const [speed, setSpeed] = useState(1);

  // sets playback rate whenever speed is updated
  useEffect(() => {
    const updateSpeed = async () => {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        args: [speed],
        func: speed => {
          (document.querySelector("video") as HTMLVideoElement).playbackRate = speed;
        }
      });
    }
    updateSpeed().catch(console.error);
  }, [speed]);

  return (
    <div>
      <SpeedLabel speed={speed} />
      {/* <SpeedSlider speed={speed} setSpeed={setSpeed}/><br/> */}
      <SpeedButton speed={2.5} setSpeed={setSpeed} />
      <SpeedButton speed={3} setSpeed={setSpeed} />
      <SpeedButton speed={3.5} setSpeed={setSpeed} />
    </div>
  );
}

export default SpeedControls;