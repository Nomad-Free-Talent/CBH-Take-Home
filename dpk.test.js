const { deterministicPartitionKey } = require("./dpk");
const crypto = require('crypto');

describe("deterministicPartitionKey", () => {
  describe("Normal cases", () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  
    it("Trivial key length does not exceed 256", () => {
      const trivialKey = deterministicPartitionKey({ partitionKey: '*'.repeat(300) });
      expect(trivialKey.length).toBeLessThanOrEqual(256);
    });
  
    it("Returns inputed partition key if it's length does not exceed 256", () => {
      const validPartitionKey = '*'.repeat(256);
      const trivialKey = deterministicPartitionKey({ partitionKey: validPartitionKey });
      expect(trivialKey).toEqual(validPartitionKey);
    });

    it("Returns partitionKey which is not string type but it's length does not exceed 256", () => {
      const partitionKey = { lengthDoesNotExceed: 'lengthDoesNotExceed' };
      const expectedResult = JSON.stringify(partitionKey);
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toEqual(expectedResult);
    })
  })

  describe("Crypto logic", () => {
    it("Returns crypto hash result of input if partitionKey is not provided", () => {
      const inputEvent = { notPartitionKey: 'notPartitionKey' };
      const expectedResult = crypto.createHash('sha3-512').update(JSON.stringify(inputEvent)).digest('hex');
      const trivialKey = deterministicPartitionKey(inputEvent);
      expect(trivialKey).toEqual(expectedResult);
    });

    it("Returns hash result of partitionKey if it's length exceed 256", () => {
      const partitionKey = '*'.repeat(300);
      const expectedResult = crypto.createHash('sha3-512').update(partitionKey).digest('hex');
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toEqual(expectedResult);
    })

    it("Returns hash result of partitionKey if it's stringified result exceed 256", () => {
      const partitionKey = { lengthExceed: '*'.repeat(300) };
      const expectedResult = crypto.createHash('sha3-512').update(JSON.stringify(partitionKey)).digest('hex');
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toEqual(expectedResult);
    })
  })
});
