import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Component for rendering text fields in create post form
const TextFields = ({
  title,
  characterName,
  characterCategory,
  content,
  handleChange,
  errors,
}) => {
  return (
    <>
      {/* Form group for the title field */}
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display error messages for the title field, if any */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Form group for the character name field */}
      <Form.Group>
        <Form.Label>Character name</Form.Label>
        <Form.Control
          type="text"
          name="characterName"
          value={characterName}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display error messages for the character name field, if any */}
      {errors?.character_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Form group for the character category field */}
      <Form.Group>
        <Form.Label>Character category</Form.Label>
        <Form.Control
          as="select"
          name="characterCategory"
          value={characterCategory}
          onChange={handleChange}
        >
          {/* Options for character categories */}
          <option value="Avenger">Avenger</option>
          <option value="X-Men">X-Men</option>
          <option value="Anti-Hero">Anti-Hero</option>
          <option value="Villain">Villain</option>
        </Form.Control>
      </Form.Group>
      {/* Display error messages for the character category field, if any */}
      {errors?.character_category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Form group for the content field */}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Display error messages for the content field, if any */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );
};

export default TextFields;
