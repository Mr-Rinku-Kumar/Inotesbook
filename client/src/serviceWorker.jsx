import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.error("Service Worker Registration Failed:", error));
    }
  }, []);

  return (
    <div>
      <h1>iNotesbook</h1>
    </div>
  );
}

export default App;
