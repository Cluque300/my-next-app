import React, { useEffect, useRef } from 'react';

const ExampleComponent = () => {
  const myDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myDivRef.current) {
      // Realiza operaciones con myDivRef.current
      console.log(myDivRef.current.innerHTML);
    }
  }, []); // Asegúrate de que las dependencias sean correctas

  return <div ref={myDivRef}>Hello World</div>;
};

export default ExampleComponent;

