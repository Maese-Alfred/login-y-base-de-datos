interface EditButtonProps {
    onClick: () => void;
    label?: string;
}

const EditButton = ({ onClick, label = "Editar" }: EditButtonProps) => (
  <button
    onClick={onClick}
    className="edit-button"
  >
    {label}
  </button>
);

export default EditButton;