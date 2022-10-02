import PropTypes from 'prop-types';

function NoteForm(props) {
  const { notes, setFormDataCallback, formData, setNotesCallback } = props;

  function createNote() {
    if (!formData.name || !formData.description) return;
    setNotesCallback([...notes, formData]);
    setFormDataCallback({ name: '', description: '' });
  }

  return (
    <div>
      <input
        data-testid="note-name-field"
        onChange={(e) =>
          setFormDataCallback({
            ...formData,
            name: e.target.value
          })
        }
        placeholder="Note Name"
      />
      <input
        data-testid="note-description-field"
        onChange={(e) =>
          setFormDataCallback({
            ...formData,
            description: e.target.value
          })
        }
        placeholder="Note Description"
      />
      <button data-testid="note-form-submit" type="button" onClick={createNote}>
        Create Note
      </button>
    </div>
  );
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired,
  setFormDataCallback: PropTypes.func.isRequired,
  formData: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }).isRequired,
  setNotesCallback: PropTypes.func.isRequired
};

export default NoteForm;
