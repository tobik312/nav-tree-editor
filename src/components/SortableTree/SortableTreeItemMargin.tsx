export type SortableTreeItemMarginProps = {
    depth: number;
    indentationWidth: number;
};

const SortableTreeItemMargin: React.FC<SortableTreeItemMarginProps> = ({ depth, indentationWidth }) => {
    return (
        <div
            className="flex-none"
            style={{
                width: depth * indentationWidth,
            }}
        />
    );
};

export default SortableTreeItemMargin;
