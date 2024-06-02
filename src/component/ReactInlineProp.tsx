import React from "react";
import CodeBlock from "../sections/CodeBlock";
import Navbar from "./Navbar";

function INLINE() {
  const c_0 = `"use client";
import React, { useEffect, useState, useCallback } from "react";
import file from "./data.json";
import TodoCard from "./tocard";

export interface Item {
  name: string;
  id: number;
  status: "todo" | "doing" | "done";
}

export default function Todo() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(file.data.map((item) => ({ ...item, status: "todo" })));
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const updateStatus = useCallback(
    (item: Item, status: Item["status"]) => {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, status } : i))
      );
    },
    [items]
  );

  const updateItem = useCallback(
    (item: Item, name: string) => {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, name } : i))
      );
    },
    [items]
  );

  const filteredItems = useCallback(
    (status: Item["status"]) => items.filter((item) => item.status === status),
    [items]
  );

  return (
    <div className="min-h-screen flex flex-row justify-center gap-3 m-3">
      <div>
        todo
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("todo").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateItem={updateItem}
              next={() => updateStatus(item, "doing")}
            />
          ))}
        </div>
      </div>
      <div>
        doing
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("doing").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateItem={updateItem}
              back={() => updateStatus(item, "todo")}
              next={() => updateStatus(item, "done")}
            />
          ))}
        </div>
      </div>
      <div>
        done
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("done").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateItem={updateItem}
              back={() => updateStatus(item, "doing")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`;

  const c_1 = `import { useCallback, useState } from "react";
import { Item } from "./page";

interface CardProps {
  item: Item;
  updateItem: (item: Item, name: string) => void;
  next?: () => void;
  back?: () => void;
}

export default function TodoCard(props: CardProps) {
  const { item, next, back, updateItem } = props;

  const [newName, setNewName] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (newName.trim() !== "") {
      updateItem(item, newName);
      setNewName("");
    }
  };
  return (
    <div className="bg-slate-300 h-12 flex flex-row justify-around items-center">
      {back && <button onClick={back}>{"<"}</button>}
      <div>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          onBlur={handleNameSubmit}
        />
        {item.name} {item.status}
      </div>
      {next && <button onClick={next}>{">"}</button>}
    </div>
  );
}`;

  const d_0 = `"use client";
import React, { useEffect, useState, useCallback } from "react";
import file from "./data.json";
import TodoCard from "./tocard";

export interface Item {
  name: string;
  id: number;
  status: "todo" | "doing" | "done";
}

export default function Todo() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(file.data.map((item) => ({ ...item, status: "todo" })));
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const updateStatus = useCallback(
    (item: Item, status: Item["status"]) => {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, status } : i))
      );
    },
    [items]
  );

  const updateItem = useCallback(
    (item: Item, name: string) => {
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, name } : i))
      );
    },
    [items]
  );

  const filteredItems = useCallback(
    (status: Item["status"]) => items.filter((item) => item.status === status),
    [items]
  );

  return (
    <div className="min-h-screen flex flex-row justify-center gap-3 m-3">
      <div>
        todo
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("todo").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateStatus={updateStatus}
              updateItem={updateItem}
            />
          ))}
        </div>
      </div>
      <div>
        doing
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("doing").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateStatus={updateStatus}
              updateItem={updateItem}
            />
          ))}
        </div>
      </div>
      <div>
        done
        <div className="flex flex-col gap-3 w-80">
          {filteredItems("done").map((item) => (
            <TodoCard
              key={item.id}
              item={item}
              updateStatus={updateStatus}
              updateItem={updateItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`;

  const d_1 = `import { useState } from "react";
import { Item } from "./page";

interface CardProps {
  item: Item;
  updateStatus: (item: Item, status: Item["status"]) => void;
  updateItem: (item: Item, name: string) => void;
}

export default function TodoCard(props: CardProps) {
  const { item, updateStatus, updateItem } = props;
  const [newName, setNewName] = useState("");

  const handleNext = () => {
    updateStatus(item, item.status === "todo" ? "doing" : "done");
  };

  const handleBack = () => {
    updateStatus(item, item.status === "done" ? "doing" : "todo");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = () => {
    if (newName.trim() !== "") {
      updateItem(item, newName);
      setNewName("");
    }
  };

  return (
    <div className="bg-slate-300 h-12 flex flex-row justify-around items-center">
      {item.status !== "todo" && <button onClick={handleBack}>{"<"}</button>}

      <div>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          onBlur={handleNameSubmit}
        />
        {item.name} {item.status}
      </div>
      {item.status !== "done" && <button onClick={handleNext}>{">"}</button>}
    </div>
  );
}`;

  const code_ver1 = [c_0, c_1];
  const code_ver2 = [d_0, d_1];
  return (
    <>
      <Navbar />
      <div style={{ padding: "5%" }}>
        <h1>Version 1 Inline function</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {Array.from(code_ver1, (v, i) => (
            <div style={{ width: "50%" }}>
              <CodeBlock key={i} code={v} />
            </div>
          ))}
        </div>

        <h1>Version 2 Passing existing functions</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {Array.from(code_ver2, (v, i) => (
            <div style={{ width: "50%" }}>
              <CodeBlock key={i} code={v} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default INLINE;
