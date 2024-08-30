// app/components/MyComponent.tsx

import React, { useEffect, useRef, useState } from 'react';

interface MyComponentProps {
  showElement?: boolean;
}

const MyComponent: React.FC<MyComponentProps> = ({ showElement }) => {
  const myElementRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

  useEffect(() => {
    if (myElementRef.current && showElement) {
      const element = myElementRef.current;
      const someChild = element.querySelector('#someChild'); // Usa querySelector en lugar de getElementById
      if (someChild) {
        element.removeChild(someChild);
      }
    }
  }, [showElement]);

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  return (
    <div>
      {showElement ? <div ref={myElementRef} id="myElement">...</div> : null}
      {items.map(item => (
        <div key={item}>
          {item}
          <button onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;



