// This coomponent represents blocks of content. It can be image, list, text etc.
// The user can add, remove, and edit these blocks.

import { NodeData, NodeType } from "../utils/types";
import styles from "./Node.module.css";
import {
  useRef,
  useEffect,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import { nanoid } from "nanoid";
import { useAppState } from "../state/ApppStateContext";
import { CommandPanel } from "./CommandPanel";
import cx from "classnames";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
}; // props for BasicNode component

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { changeNodeValue, addNode, removeNodeByIndex, changeNodeType } =
    useAppState();

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

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

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

    if (event.key === "Backspace")
      if (target.textContent?.length === 0) {
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
    <>
      {showCommandPanel && (
        <CommandPanel selectItem={parseCommand} nodeText={node.value} />
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
