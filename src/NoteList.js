import PropTypes from 'prop-types';

function NoteList(props) {
  const { notes } = props;

  return (
    <div>
      {notes.map((note, index) => (
        <div>
          <p data-testid={`test-name-${index}`}>{note.name}</p>
          <p data-testid={`test-description-${index}`}>{note.description}</p>
        </div>
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ).isRequired
};

export default NoteList;
