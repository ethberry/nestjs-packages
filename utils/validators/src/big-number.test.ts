import { Validator } from "class-validator";
import { constants } from "ethers";

import { IsBigNumber } from "./big-number";

describe("IsBigNumber", () => {
  describe("no options", () => {
    it("should validate with no params", () => {
      class TestClass {
        @IsBigNumber()
        amount: string;
      }

      const model = new TestClass();
      model.amount = constants.WeiPerEther.toString();

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });

    it("should fail: empty string", () => {
      class TestClass {
        @IsBigNumber({})
        amount: string;
      }

      const model = new TestClass();
      model.amount = "";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigNumber: "typeMismatch",
        });
      });
    });
  });

  describe("message", () => {
    it("should validate with default message", () => {
      class TestClass {
        @IsBigNumber()
        amount: string;
      }

      const model = new TestClass();
      model.amount = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigNumber: "typeMismatch",
        });
      });
    });

    it("should validate with custom message", () => {
      const customMessage = "myCustomMessage";

      class TestClass {
        @IsBigNumber({}, { message: customMessage })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigNumber: customMessage,
        });
      });
    });
  });

  describe("allowEmptyString", () => {
    it("should allow empty string", () => {
      class TestClass {
        @IsBigNumber({ allowEmptyString: true })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });
  });

  describe("minimum", () => {
    it("should validate", () => {
      class TestClass {
        @IsBigNumber({ minimum: "100" })
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
        @IsBigNumber({ minimum: "100" })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "10";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigNumber: "rangeUnderflow",
        });
      });
    });
  });

  describe("maximum", () => {
    it("should validate", () => {
      class TestClass {
        @IsBigNumber({ maximum: "100" })
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
        @IsBigNumber({ maximum: "100" })
        amount: string;
      }

      const model = new TestClass();
      model.amount = "1000";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isBigNumber: "rangeOverflow",
        });
      });
    });
  });
});
