import Button from '@/components/Button';
import { CardBody } from '@/components/Card';

export type NavEmptyListProps = {
    onAddItemClick?: () => void;
};

const NavEmptyList: React.FC<NavEmptyListProps> = ({ onAddItemClick }) => {
    return (
        <CardBody variant="secondary" className="flex flex-col items-center justify-center h-40">
            <div className="font-semibold">Menu jest puste</div>
            <div className="text-sm text-teritary-text">W tym menu nie ma jeszcze żadnych linków.</div>
            <Button variant="primary" className="mt-auto" leadingIcon={'PlusCircleIcon'} onClick={onAddItemClick}>
                Dodaj pozycję do menu
            </Button>
        </CardBody>
    );
};

export default NavEmptyList;
