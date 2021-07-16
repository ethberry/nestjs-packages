import React, {FC, useContext, useLayoutEffect, useRef} from "react";
import {useFormikContext} from "formik";

import {ApiContext} from "@trejgun/provider-api";

interface IRegisterResult {
  challenge: string;
  gt: string;
  new_captcha: boolean;
  success: number;
}

export interface IGeeTestCaptchaProps {
  name: string;
  className?: string;
}

export const GeeTestCaptcha: FC<IGeeTestCaptchaProps> = props => {
  const {name, className} = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const api = useContext(ApiContext);
  const formik = useFormikContext<any>();

  useLayoutEffect(() => {
    void api
      .fetchJson({
        url: `/gee-test/register?t=${Date.now()}`,
      })
      .then((json: IRegisterResult) => {
        // @ts-ignore
        initGeetest(
          {
            gt: json.gt,
            challenge: json.challenge,
            new_captcha: json.new_captcha,
            offline: !json.success,
            product: "float",
            width: "100%",
          },
          (instance: any) => {
            instance.appendTo(ref.current);
            instance.onSuccess(() => {
              const result = instance.getValidate();
              formik.setFieldValue(name, {
                challenge: result.geetest_challenge,
                validate: result.geetest_validate,
                seccode: result.geetest_seccode,
              });
            });
            instance.onError((...arg: any) => {
              console.error(arg);
            });
          },
        );
      });
  }, []);

  return <div ref={ref} className={className} />;
};
