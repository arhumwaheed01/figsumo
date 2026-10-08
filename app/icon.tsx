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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 18,
            height: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 5,
              height: 18,
              background: "#ffffff",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: 18,
              height: 5,
              background: "#ffffff",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
