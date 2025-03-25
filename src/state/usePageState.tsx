import { Page, NodeData, NodeType } from '../utils/types';
import {useImmer} from 'use-immer';
import { arrayMove } from '@dnd-kit/sortable';


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

    const reorderNodes = (id1: string, id2: string) => {
        setPage((draft) => {
            const index1 = draft.nodes.findIndex((node) => node.id === id1);
            const index2 = draft.nodes.findIndex((node) => node.id === id2);
            draft.nodes = arrayMove(draft.nodes, index1, index2);
        })
    }

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
        reorderNodes
    };
}