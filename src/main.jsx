import React from "react";
import ReactDOM from "react-dom/client";
import AlignmentCube from "./AlignmentCube.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ErrorBoundary>
            <AlignmentCube />
        </ErrorBoundary>
    </React.StrictMode>
);
