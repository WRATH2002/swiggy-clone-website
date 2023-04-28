import { useState } from "react";
import Section from "./Section";
import useHelpQA from "../utils/useHelpQA";

const Help = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const qa = useHelpQA();

  return (
    <div className="instamart-color">
      <h2 className="instamart-font help-title">
        <b>Help & Support</b>
      </h2>
      <h5 className="help-description">
        Let's take a step ahead and help you better.
      </h5>
      <div className="accordion-list">
        {qa.map((item, index) => {
          return (
            <Section
              key={index}
              heading={item.question}
              description={item.answer}
              isVisible={visibleSection === index}
              setIsVisible={() => {
                setVisibleSection(visibleSection === index ? "" : index);
              }}
            />
          );
        })}
        {/* <Section
          heading={
            "What are the mandatory documents needed to list my restaurant on Food Villa?"
          }
          description={`- Copies of the below documents are mandatory 
            - FSSAI License OR FSSAI Acknowledgement
            - Pan Card book
            - Menu`}
          isVisible={visibleSection === "s1"}
          setIsVisible={() => {
            setVisibleSection(visibleSection === "s1" ? "" : "s1");
          }}
        /> */}
      </div>
    </div>
  );
};

export default Help;
