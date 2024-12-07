import { Validator } from "class-validator";

import { IsBigInt } from "./big-int";

describe("IsBigInt", () => {
  describe("no options", () => {
    it("should validate with no params", () => {
      class TestClass {
        @IsBigInt()
        amount: string;
      }

      const model = new TestClass();
      model.amount = BigInt("1000000000000000000").toString();

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });

    it("should fail: empty string", () => {
      class TestClass {
        @IsBigInt({})
        amount: string;
      }

      const model = new TestClass();
      model.amount = "";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigInt: "typeMismatch",
        });
      });
    });
  });

  describe("message", () => {
    it("should validate with default message", () => {
      class TestClass {
        @IsBigInt()
        amount: string;
      }

      const model = new TestClass();
      model.amount = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigInt: "typeMismatch",
        });
      });
    });

    it("should validate with custom message", () => {
      const customMessage = "myCustomMessage";

      class TestClass {
        @IsBigInt({}, { message: customMessage })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigInt: customMessage,
        });
      });
    });
  });

  describe("minimum", () => {
    it("should validate", () => {
      class TestClass {
        @IsBigInt({ minimum: 100 })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "100";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });

    it("should fail", () => {
      class TestClass {
        @IsBigInt({ minimum: 100 })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "10";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigInt: "rangeUnderflow",
        });
      });
    });
  });

  describe("maximum", () => {
    it("should validate", () => {
      class TestClass {
        @IsBigInt({ maximum: 100 })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "100";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });

    it("should fail", () => {
      class TestClass {
        @IsBigInt({ maximum: 100 })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "1000";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigInt: "rangeOverflow",
        });
      });
    });
  });
});
