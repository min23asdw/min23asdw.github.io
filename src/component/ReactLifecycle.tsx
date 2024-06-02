import React from "react";
import CodeBlock from "../sections/CodeBlock";
import Navbar from "./Navbar";

function Note() {
  const c_0 = `import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {}

interface ChildProps {
  name: string;
}

interface ChildState {
  name: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <Child name="sachin" />
      </div>
    );
  }
}

class Child extends React.Component<ChildProps, ChildState> {
  constructor(props: ChildProps) {
    super(props);
    this.state = {
      name: "kapil"
    };
  }

  static getDerivedStateFromProps(nextProps: ChildProps, prevState: ChildState) {
    if (nextProps.name !== prevState.name) {
      // Change in props
      return {
        name: nextProps.name
      };
    }
    return null; // No change to state
  }

  render() {
    return <div>My name is {this.state.name}</div>;
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
`;

  const c_1 = `import React, { useState, useEffect } from 'react';

interface AppProps {}

interface ChildProps {
  name: string;
}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <Child name="sachin" />
    </div>
  );
};

const Child: React.FC<ChildProps> = ({ name }) => {
  const [currentName, setCurrentName] = useState("kapil");

  useEffect(() => {
    if (name !== currentName) {
      setCurrentName(name);
    }
  }, [name, currentName]);

  return <div>My name is {currentName}</div>;
};

export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
`;

  const code = [c_0, c_1];
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row", padding: "5%" }}>
        {Array.from(code, (v, i) => (
          <div style={{ width: "50%" }}>
            <CodeBlock key={i} code={v} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Note;
