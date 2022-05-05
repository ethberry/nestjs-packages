import { Validator } from "class-validator";

import { IsConfirm } from "./confirm";

describe("IsConfirm", () => {
  describe("no options", () => {
    it("should validate with no params", () => {
      class TestClass {
        password: string;
        @IsConfirm()
        confirm: string;
      }

      const model = new TestClass();
      model.password = "qwerty";
      model.confirm = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });
  });

  describe("message", () => {
    it("should validate with default message", () => {
      class TestClass {
        password: string;
        @IsConfirm()
        confirm: string;
      }

      const model = new TestClass();
      model.confirm = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isConfirm: "passwordMismatch",
        });
      });
    });
    it("should validate with custom message", () => {
      const customMessage = "myCustomMessage";

      class TestClass {
        password: string;
        @IsConfirm({}, { message: customMessage })
        confirm: string;
      }

      const model = new TestClass();
      model.confirm = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isConfirm: customMessage,
        });
      });
    });
  });

  describe("relatedPropertyName", () => {
    it("should validate with default message", () => {
      class TestClass {
        abc: string;
        @IsConfirm({ relatedPropertyName: "abc" })
        confirm: string;
      }

      const model = new TestClass();
      model.confirm = "qwerty";
      model.abc = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });
  });
});
