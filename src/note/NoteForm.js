import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Analytics } from 'aws-amplify';

function NoteForm(props) {
  const { notes, setFormDataCallback, formData, setNotesCallback, username } = props;

  const createNote = () => {
    if (!formData.name || !formData.description) return;
    setNotesCallback([...notes, formData]);
    setFormDataCallback({ name: '', description: '' });
    Analytics.record({
      name: 'createNote',
      attributes: { username }
    });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          data-testid="note-name-field"
          onChange={(e) =>
            setFormDataCallback({
              ...formData,
              name: e.target.value
            })
          }
          value={formData.name}
          placeholder="Note Name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          data-testid="note-description-field"
          onChange={(e) =>
            setFormDataCallback({
              ...formData,
              description: e.target.value
            })
          }
          value={formData.description}
          placeholder="Note Description"
        />
      </Form.Group>
      <Form.Group>
        <Button data-testid="note-form-submit" type="button" onClick={createNote}>
          Create Note
        </Button>
      </Form.Group>
    </Form>
  );
}

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired,
  setFormDataCallback: PropTypes.func.isRequired,
  formData: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }).isRequired,
  setNotesCallback: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default NoteForm;
