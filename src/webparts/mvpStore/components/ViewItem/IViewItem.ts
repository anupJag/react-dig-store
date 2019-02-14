export interface IViewItemProps {
    id: string | number;
    shouldModalBeOpen: boolean;
    onDisMissCalled: () => void;
    listGUID: string;
}

export interface IViewItemState {
    id: string | number;
}