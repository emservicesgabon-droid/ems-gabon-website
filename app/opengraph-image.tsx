import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EMS GABON — Solutions IT pour le Gabon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #071820 0%, #0d2d3a 55%, #071820 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
      }}
    >
      {/* Top orange line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(90deg, transparent 0%, #f5a623 50%, transparent 100%)",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "36px",
          background: "rgba(56,216,255,0.10)",
          border: "1px solid rgba(56,216,255,0.30)",
          borderRadius: "50px",
          padding: "10px 24px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#38d8ff",
          }}
        />
        <span
          style={{
            color: "#8eeeff",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "3px",
          }}
        >
          EMS GABON
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          fontSize: "80px",
          fontWeight: "900",
          color: "#38d8ff",
          textAlign: "center",
          lineHeight: 1.05,
          marginBottom: "28px",
        }}
      >
        Solutions IT
        {"\n"}pour le Gabon
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "26px",
          color: "#8eeeff",
          textAlign: "center",
          maxWidth: "820px",
          lineHeight: 1.5,
          opacity: 0.85,
        }}
      >
        Infrastructure · Sage 100 · Vidéosurveillance · Fibre Optique · Formation
      </div>

      {/* Domain */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          color: "#f5a623",
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        emsgabon.com
      </div>
    </div>,
    { ...size }
  );
}
