import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    width: "100%", height: "100vh", display: "flex",
                    flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: "#0a0a14", color: "#e0e0e0",
                    fontFamily: "'IBM Plex Mono','Fira Code',monospace",
                    padding: 32, textAlign: "center",
                }}>
                    <div style={{
                        fontSize: 48, marginBottom: 16,
                        background: "linear-gradient(135deg,#ff6b6b,#ffd93d 50%,#6bcb77)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>⚠</div>
                    <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>
                        SOMETHING WENT WRONG
                    </h1>
                    <p style={{ fontSize: 13, color: "#8b8b9b", lineHeight: 1.6, maxWidth: 420, marginBottom: 24 }}>
                        The Alignment Cube hit an unexpected error. Try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: "rgba(100,140,255,0.15)", border: "1px solid rgba(100,140,255,0.3)",
                            color: "#ccc", padding: "10px 24px", fontSize: 12, fontWeight: 600,
                            letterSpacing: 1, cursor: "pointer", borderRadius: 6,
                            fontFamily: "inherit",
                        }}
                    >
                        RELOAD
                    </button>
                    {this.state.error && (
                        <pre style={{
                            marginTop: 24, fontSize: 10, color: "#6b6b7b",
                            maxWidth: "90vw", overflow: "auto", textAlign: "left",
                            padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 6,
                        }}>
                            {this.state.error.message}
                        </pre>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
