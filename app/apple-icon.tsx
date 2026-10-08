import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3f3f46",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 90,
            height: 100,
            border: "8px solid #ffffff",
            borderRadius: 12,
            paddingTop: 12,
            paddingLeft: 14,
            paddingRight: 14,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 16,
              background: "#ffffff",
              borderRadius: 4,
              marginBottom: 16,
            }}
          />
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ffffff" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ffffff" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ffffff" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ffffff" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
