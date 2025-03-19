// This coomponent represents blocks of content. It can be image, list, text etc.
// The user can add, remove, and edit these blocks.

import { NodeData } from "../utils/types";
import styles from "./Node.module.css";
import {
  useRef,
  useEffect,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { nanoid } from "nanoid";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
  addNode(node: NodeData, index: number): void;
  removeNodeByIndex(index: number): void;
  changeNodeValue(index: number, value: string): void;
}; // props for BasicNode component

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
  addNode,
  removeNodeByIndex,
  changeNodeValue,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]); // keep track of isFocused

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]); // keep track of node

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  }; // keep track of input

  const handleClick = () => {
    updateFocusedIndex(index);
  }; // keep track of clicks

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode({ type: node.type, value: "", id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }

if (event.key === 'Backspace')
    if(target.textContent?.length === 0) {
      event.preventDefault();
      removeNodeByIndex(index);
      updateFocusedIndex(index - 1);
    } else if (window?.getSelection()?.anchorOffset === 0) {
      event.preventDefault();
      removeNodeByIndex(index);
      updateFocusedIndex(index - 1);
    }
  };

  return (
    <div
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
      className={styles.node}
    />
  );
};
