"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import logo from "/Users/mateivolanschi/rag/src/assets/serpentinelogo.png";
import logo2 from "/Users/mateivolanschi/rag/src/assets/userlogo.jpg";
import { Trash2 } from "lucide-react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <main className="flex flex-col w-full h-screen bg-background">
      <header className="p-4 border-b w-full">
        <h1 className="text-2xl font-bold">EduPilot</h1>
      </header>

      <section className="flex flex-col flex-grow gap-4 w-full px-4 pb-10 overflow-y-auto">
        <ul
          ref={chatParent}
          className="flex-grow p-4 bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4 w-full"
        >
          {messages.map((m, index) => (
            <>
              {m.role === "user" ? (
                <li key={index} className="flex flex-row-reverse w-full">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo2} // Directly use the imported image
                      alt="User Logo"
                      width={64} // Adjust the width
                      height={64} // Adjust the height
                      className="rounded-full object-cover mr-2 overflow-hidden" // Add styling for the circle
                    />
                  </div>

                  <div className="rounded-xl p-4 bg-background shadow-md flex">
                    <p className="text-primary">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row w-full">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo}
                      alt="User Logo"
                      width={64}
                      height={64}
                      className="rounded-full object-cover mr-2 overflow-hidden"
                    />
                  </div>

                  <div className="rounded-xl p-4 bg-background shadow-md flex w-full">
                    <p className="text-primary">
                      <span className="font-bold">Answer: </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>

      <section className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center">
          <Input
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-2" type="submit">
            Submit
          </Button>
          <Button
            onClick={clearMessages}
            className="bg-red-500 text-white text-sm px-2 py-1 rounded-md"
          >
            <Trash2 size={18} />{" "}
          </Button>
        </form>
      </section>
    </main>
  );
}
