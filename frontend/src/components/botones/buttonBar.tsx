import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import "./buttonBar.css";

interface ButtonBarProps {
  onEdit: () => void;
  onDelete: () => void;
}

function ButtonBar( { onEdit, onDelete }: ButtonBarProps) {
    return (
        <div className="button-bar">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onDelete} />
        </div>
    );
}

export default ButtonBar;