import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import DeskScene from "./components/DeskScene.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <DeskScene> */}
		<App />
		{/* </DeskScene> */}
	</StrictMode>
);
