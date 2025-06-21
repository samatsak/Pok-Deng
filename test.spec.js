const { compareCard } = require("./index");

describe("compareCard", () => {
  it("should be 1 (won)", () => {
    const result = compareCard(
      [
        { suit: "Hearts", rank: "4", value: 4 },
        { suit: "Hearts", rank: "5", value: 5 },
      ],
      [
        { suit: "Diamonds", rank: "Ace", value: 1 },
        { suit: "Diamonds", rank: "2", value: 2 },
      ]
    );
    expect(result).toEqual(1);
  });

  it("should be -1 (lose)", () => {
    const result = compareCard(
      [
        { suit: "Hearts", rank: "Ace", value: 1 },
        { suit: "Hearts", rank: "2", value: 2 },
      ],
      [
        { suit: "Diamonds", rank: "4", value: 4 },
        { suit: "Diamonds", rank: "5", value: 5 },
      ]
    );
    expect(result).toEqual(-1);
  });

  it("should be 0 (tie)", () => {
    const result = compareCard(
      [
        { suit: "Hearts", rank: "Ace", value: 1 },
        { suit: "Hearts", rank: "2", value: 2 },
      ],
      [
        { suit: "Diamonds", rank: "Ace", value: 1 },
        { suit: "Diamonds", rank: "2", value: 2 },
      ]
    );
    expect(result).toEqual(0);
  });
});
