import PropTypes from 'prop-types';

function NoteList(props) {
  const { notes, deleteNoteCallback } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div>
          <p data-testid={`test-name-${index}`}>{note.name}</p>
          <p data-testid={`test-description-${index}`}>{note.description}</p>
          <button
            type="button"
            data-testid={`test-delete-button-${index}`}
            onClick={() => deleteNoteCallback(note.id)}>
            Delete note
          </button>
        </div>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired,
  deleteNoteCallback: PropTypes.func.isRequired
};

export default NoteList;
