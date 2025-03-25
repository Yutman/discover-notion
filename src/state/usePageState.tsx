import { Page, NodeData, NodeType } from '../utils/types';
import {useImmer} from 'use-immer';


export const usePageState = (initialState: Page) => {
    const [page, setPage] = useImmer<Page>(initialState);

    const addNode = (node: NodeData, index: number) => {
        setPage((draft) => {
            draft.nodes.splice(index, 0, node);
        });
    }; // method to add a node to the page

    const removeNodeByIndex = (nodeIndex: number) => {
        setPage((draft) => {
            draft.nodes.splice(nodeIndex, 1);
        });
    }; // method to remove a node from the page

    const changeNodeValue = (nodeIndex: number, value: string) => {
        setPage((draft) => {
            draft.nodes[nodeIndex].value = value;
        });
    }; // method to change the value of a node

    const changeNodeType = (nodeIndex: number, type: NodeType) => {
        setPage((draft) => {
            draft.nodes[nodeIndex].type = type;
            draft.nodes[nodeIndex].value = '';
        });
    }; // method to change the type of a node and also  reset the value

    const setNodes = (nodes: NodeData[]) => {
        setPage((draft) => {
            draft.nodes = nodes;
        });
    }; // method to override the nodes array completely

    const setTitle = (title: string) => {
        setPage((draft) => {
            draft.title = title;
        });
    }; // method to update the title of the page

    const setCoverImage = (coverImage: string) => {
        setPage((draft) => {
            draft.cover = coverImage;
        });
    }; // method to update the cover image of the page

    return {
        nodes: page.nodes,
        title: page.title,
        cover: page.cover,
        changeNodeType,
        changeNodeValue,
        addNode,
        removeNodeByIndex,
        setTitle,
        setCoverImage,
        setNodes,
    }

}