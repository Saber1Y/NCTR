import { cn } from "@/lib/utils";

describe("Utility Functions", () => {
  describe("cn (className merger)", () => {
    it("should merge class names correctly", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    it("should handle conditional classes", () => {
      const result = cn("base", true && "conditional", false && "excluded");
      expect(result).toBe("base conditional");
    });

    it("should handle undefined and null values", () => {
      const result = cn("class1", undefined, null, "class2");
      expect(result).toBe("class1 class2");
    });

    it("should merge Tailwind classes properly", () => {
      const result = cn("bg-red-500", "bg-blue-500");
      // Should keep the last one due to tailwind-merge
      expect(result).toBe("bg-blue-500");
    });

    it("should handle arrays of classes", () => {
      const result = cn(["class1", "class2"], "class3");
      expect(result).toBe("class1 class2 class3");
    });

    it("should handle empty inputs", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });
});
