import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 16,
            height: 18,
            border: "1.75px solid #ffffff",
            borderRadius: 2,
            paddingTop: 2,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 3,
              background: "#ffffff",
              borderRadius: 1,
              marginBottom: 3,
            }}
          />
          <div style={{ display: "flex", gap: 2.5, marginBottom: 2.5 }}>
            <div style={{ width: 2.5, height: 2.5, borderRadius: 999, background: "#ffffff" }} />
            <div style={{ width: 2.5, height: 2.5, borderRadius: 999, background: "#ffffff" }} />
            <div style={{ width: 2.5, height: 2.5, borderRadius: 999, background: "#ffffff" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 2.5, height: 2.5, borderRadius: 999, background: "#ffffff" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
