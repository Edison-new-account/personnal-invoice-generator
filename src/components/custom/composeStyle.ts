import { Styles } from "@react-pdf/renderer";
import styles from "./pageStyle";

const compose = (classes: string): Styles => {
  // add new font to the document
  const css: Styles = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    "@import": "url(https://fonts.bunny.net/css?family=nunito:400,600)",
  };

  // add classes to the document
  // split the classes by space
  const classesArray: string[] = classes.replace(/\s+/g, " ").split(" ");

  classesArray.forEach((className) => {
    // eslint-disable-next-line valid-typeof, no-constant-binary-expression
    if (typeof styles[className] !== undefined) {
      Object.assign(css, styles[className]);
    }
  });

  return css;
};

export default compose;
