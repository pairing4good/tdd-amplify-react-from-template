import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function NoteList(props) {
  const { notes, deleteNoteCallback } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div key={`note-${note.id}`}>
          <Card>
            <Card.Header data-testid={`test-name-${index}`}>{note.name}</Card.Header>
            <Card.Body>
              <Card.Text data-testid={`test-description-${index}`}>{note.description}</Card.Text>
              <Button
                variant="secondary"
                data-testid={`test-delete-button-${index}`}
                onClick={() => deleteNoteCallback(note.id)}>
                Delete note
              </Button>
            </Card.Body>
          </Card>
          <br />
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
