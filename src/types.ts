import  React from 'react'

export type ItemType = {
  id: number;
  size: 'full' | 'half';
  label: string;
  name: string;
  component: React.FunctionComponent
};

export type BoxProps = {
    box: {
        id: number;
        x: number;
        y: number;
        label: string;
        items: Array<ItemType>;
    };
    onAddBox: (box: BoxProps['box'], side: string) => void;
    boxes: Array<BoxProps['box']>;
    onRemoveBox: (boxId: number) => void;
    onSelectItem: (item: BoxProps['box']['items'][0]) => void;
    selectedItem: BoxProps['box']['items'][0] | null;
    onRemoveItem: (boxId: number, item: BoxProps['box']['items'][0]) => void;
    onAddItem: (boxId: number) => void;
};



export type BoxType = {
  id: number;
  x: number;
  y: number;
  label: string;
  items: ItemType[];
};

export type ItemProps = {
  item: ItemType;
  onRemove: (item: ItemProps['item']) => void;
  isSelected: boolean;
  onClick: () => void;
};