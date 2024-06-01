import React from "react";
import CodeBlock from "../sections/CodeBlock";
import Navbar from "./Navbar";

const c_0 = `pnpm create next-app@latest my-project --typescript --eslint`;

const c_1 = `const [v, setV] = useState<number>(0);`;

const c_2 = `useEffect( () => {...} ,  [] );`;

const c_3 = `useEffect(() => {
    const fetchData = async () => {
    
    };

    fetchData();
  }, []);`;

const c_4 = `const fetchData = async () => {
    const tasks = await getTodo();
    setFreeItemData(tasks);
  };`;

const c_5 = `const user: User  =  ...`;

const c_6 = `const selected = data.find((item) => item.id === key);`;

const c_7 = `setData((prev) => prev.filter((item) => item.id !== key));`;

const c_8 = `interface Props {
    slot: string;
  }`;

const c_9 = `enum Op  {}`;
const c_10 = `<Section slot={Slot.Free} />`;

const c_11 = `export default function Section(props: Props) {
    const { slot } = props;
    return (<>
     {data.map((item , index) => (<></>)
    </>)
    }`;
const c_12 = `export function Name() { return <div /> }
export const Name = "() => { return <div /> }"`;

const c_13 = `setTimeout(() => {
    setCopy(false);
}, 3000);`;

const code = [
  c_0,
  c_1,
  c_2,
  c_3,
  c_4,
  c_5,
  c_6,
  c_7,
  c_8,
  c_9,
  c_10,
  c_11,
  c_12,
  c_13,
];
function Note() {
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: "17%", paddingRight: "17%", padding: "5%" }}>
        {Array.from(code, (v, i) => (
          <CodeBlock key={i} code={v} />
        ))}
      </div>
    </>
  );
}

export default Note;
