// src/components/Addtaskform.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

const Addtaskform = ({ open, handleClose, onSubmitTask, initialData }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    assignee: '',
    dueDate: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        title: '',
        description: '',
        category: '',
        assignee: '',
        dueDate: '',
        status: 'To Do',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSubmitTask(form);
    handleClose();
    setForm({
      title: '',
      description: '',
      category: '',
      assignee: '',
      dueDate: '',
      status: 'To Do',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Assignee"
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          fullWidth
          type="date"
          label="Due Date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={form.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Addtaskform;
