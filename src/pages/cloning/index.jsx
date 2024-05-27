import React, { useState } from "react";
import _ from "lodash";

const shallowClone = (obj) => {
  return { ...obj };
};

const deepClone = (obj) => {
  return _.cloneDeep(obj);
};

const CloningDemo = () => {
  const [original, setOriginal] = useState({
    name: "John",
    details: { age: 30, address: "123 Street" },
  });
  const [shallowCloned, setShallowCloned] = useState(shallowClone(original));
  const [deepCloned, setDeepCloned] = useState(deepClone(original));
  const [field, setField] = useState("");

  const handleShallowClone = () => {
    setShallowCloned(shallowClone(original));
  };

  const handleDeepClone = () => {
    setDeepCloned(deepClone(original));
  };

  const handleChange = (e) => {
    setField(e.target.value);
    const newOriginal = {
      ...original,
      details: { ...original.details, address: e.target.value },
    };
    setOriginal(newOriginal);
    handleShallowClone();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Cloning Demo</h1>
      <div className="mt-4">
        <div className="mt-4">
          <label className="block text-gray-700">Change Address:</label>
          <input
            type="text"
            value={field}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Original Object:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(original, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Shallow Cloned Object:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(shallowCloned, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Deep Cloned Object:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(deepCloned, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CloningDemo;
