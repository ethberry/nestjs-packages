import { Validator } from "class-validator";

import { IsPassword } from "./password";

describe("IsPassword", () => {
  describe("no options", () => {
    it("should validate with no params", () => {
      class TestClass {
        @IsPassword()
        password: string;
      }

      const model = new TestClass();
      model.password = "My5up3r5tr0ngP@55w0rd";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(0);
      });
    });
  });

  describe("message", () => {
    it("should validate with default message", () => {
      class TestClass {
        @IsPassword()
        password: string;
      }

      const model = new TestClass();
      model.password = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isPassword: "tooWeak",
        });
      });
    });

    it("should validate with custom message", () => {
      const customMessage = "myCustomMessage";

      class TestClass {
        @IsPassword({}, { message: customMessage })
        password: string;
      }

      const model = new TestClass();
      model.password = "qwerty";

      const validator = new Validator();
      return validator.validate(model).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].constraints).toEqual({
          isPassword: customMessage,
        });
      });
    });

    describe("score", () => {
      it("should validate with custom message", () => {
        const customMessage = "myCustomMessage";

        class TestClass {
          @IsPassword({ score: 0 }, { message: customMessage })
          password: string;
        }

        const model = new TestClass();
        model.password = "qwerty";

        const validator = new Validator();
        return validator.validate(model).then(errors => {
          expect(errors.length).toEqual(0);
        });
      });
    });
  });
});
