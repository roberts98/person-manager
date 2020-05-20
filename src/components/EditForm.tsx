import React, { useState, useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

import { User, UserContext, Actions } from '../context/UserContext';
import { editUser } from '../services/user.service';

function EditForm({ data, onSubmit }: { data: User; onSubmit: () => void }) {
  const { dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: data.name.first,
    lastName: data.name.last,
    country: data.location.country,
    city: data.location.city,
    email: data.email,
  });
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.email) {
      return setIsValid(false);
    }

    const payload = {
      id: data.id,
      name: {
        first: formData.firstName,
        last: formData.lastName,
      },
      location: {
        country: formData.country,
        city: formData.city,
      },
      email: formData.email,
    };

    try {
      await editUser(data.id, payload);

      dispatch({ type: Actions.editUser, payload });
      onSubmit();
    } catch (error) {
      alert('Error while editing the user');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledFormGroup>
        <TextField
          name="firstName"
          onChange={handleChange}
          label="First name"
          value={formData.firstName}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <TextField
          name="lastName"
          onChange={handleChange}
          label="Last name"
          value={formData.lastName}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <TextField
          name="country"
          onChange={handleChange}
          label="Country"
          value={formData.country}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <TextField name="city" onChange={handleChange} label="City" value={formData.city} />
      </StyledFormGroup>
      <StyledFormGroup>
        <TextField
          error={!isValid}
          name="email"
          type="email"
          required
          onChange={handleChange}
          label="Email"
          value={formData.email}
        />
      </StyledFormGroup>
      <StyledFormGroup>
        <Button variant="outlined" type="submit" color="primary">
          Submit
        </Button>
      </StyledFormGroup>
    </form>
  );
}

const StyledFormGroup = withStyles(() =>
  createStyles({
    root: {
      marginBottom: 20,
    },
  })
)(FormGroup);

export default EditForm;
