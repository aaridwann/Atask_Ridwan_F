import {
  setWebPlatform,
  scaleSize,
  scaleWidth,
  scaleHeight,
  scaleFont,
} from "./size.utils";

jest
  .mock("react-native", () => ({
    Dimensions: { get: jest.fn().mockReturnValue({ width: 320, height: 568 }) }, // Replace with your desired values
  }))
  .mock("../platform.utils", () => ({
    isWeb: jest.fn(() => false),
    isTablet: jest.fn(() => false),
    isMobileWeb: jest.fn(() => false),
  }));

describe("Size Utils", () => {
  const size = 50;
  describe("scaleSize", () => {
    it("should return correct value with ratio calculation", () => {
      setWebPlatform(false);
      expect(scaleSize(size)).toBeCloseTo(42.59985192872714);
    });
    it("should return original value on web platform", () => {
      setWebPlatform(true);
      expect(scaleSize(size)).toBe(size);
    });
  });

  describe("scaleWidth", () => {
    it("should return correct value with ratio calculation", () => {
      setWebPlatform(false);
      expect(scaleWidth(size)).toBe(42.666666666666664);
    });
    it("should return original value on web platform", () => {
      setWebPlatform(true);
      expect(scaleWidth(size)).toBe(size);
    });
  });

  describe("scaleHeight", () => {
    it("should return correct value", () => {
      setWebPlatform(false);
      expect(scaleHeight(size)).toBeCloseTo(42.57871064467766);
    });
    it("should return original value on web platform", () => {
      setWebPlatform(true);
      expect(scaleHeight(size)).toBe(size);
    });
  });

  describe("scaleFont", () => {
    it("should return correct value with ratio calculation", () => {
      setWebPlatform(false);
      expect(scaleFont(size)).toBeCloseTo(42.666666666666664);
    });
  });
});
