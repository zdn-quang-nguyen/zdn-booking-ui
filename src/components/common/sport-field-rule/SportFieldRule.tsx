import React from "react";

type SportFieldRuleProps = {
  rulesString: string;
};
const SportFieldRule = ({ rulesString = '' }: SportFieldRuleProps) => {
  const rules = rulesString.split('\n');

  return (
    <>
      <p className="body-2 mb-5 font-bold text-neutral-700">Quy định sân</p>
      <ul className="list-outside list-disc">
        {rules.map((rule, index) => (
          <li
            key={index}
            className="body-4 mb-3 ml-6 font-normal text-neutral-700"
          >
            {rule}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SportFieldRule;
