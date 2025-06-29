import { render } from "@testing-library/react";
import AsciiMedia from "./AsciiMedia";
import { test, expect } from "vitest";

test("renders canvas correctly", () => {
  const { container } = render(
    <AsciiMedia
      src="https://assets.codepen.io/907471/mouse.mp4"
      mediaType="video"
    />
  );
  const canvas = container.querySelector("canvas");
  expect(canvas).toBeDefined();
  expect(canvas?.width).toBeGreaterThan(0);
  expect(canvas?.height).toBeGreaterThan(0);
});
