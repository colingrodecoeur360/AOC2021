import { expect } from "@test/unit";
import { example } from "./example";

describe("example", () => {
    it("should work", () => {
        const result = example();

        expect(result).to.equal("1");
    });
});
