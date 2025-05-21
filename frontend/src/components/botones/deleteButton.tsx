import "./buttons.css";


interface DeleteButtonProps {
    onClick: () => void;
    label?: string;
}

function DeleteButton({ onClick, label = "Eliminar" }: DeleteButtonProps) {
    return (
        <button
            onClick={onClick}
            className="delete-button"
        >
            {label}
        </button>
    );
}

export default DeleteButton;