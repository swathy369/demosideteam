import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const mockTasks = [
  {
    title: "Design Homepage",
    description:
      "Designing a homepage involves creating a visually appealing and functional entry point for a website.",
    category: "Website Redesign",
    assignee: "John Doe",
    dueDate: "2025-07-15",
    status: "In Progress",
    priority: "High",
  },
  {
    title: "Implement Responsive CSS",
    description:
      "Implementing Responsive CSS ensures that a website adapts seamlessly to different screen sizes and devices.",
    category: "Website Redesign",
    assignee: "John Doe",
    dueDate: "2025-07-25",
    status: "Done",
    priority: "High",
  },
  {
    title: "UI design",
    description:
      "UI design (User Interface design) focuses on creating visually appealing and user-friendly interfaces for digital products like websites and apps.",
    category: "Website Redesign",
    assignee: "John Doe",
    dueDate: "2025-08-25",
    status: "To Do",
    priority: "Low",
  },
];

// Sub-component: TaskCard
const statusColors = {
  "To Do": "default",
  "In Progress": "primary",
  Done: "success",
};

const TaskCard = ({ task, onEdit }) => {
  const { title, description, category, assignee, dueDate, status } = task;

  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card elevation={2} sx={{ minHeight: 200 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Chip label={status} color={statusColors[status]} />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <FolderIcon fontSize="small" />
          <Typography variant="body2">{category}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <PersonIcon fontSize="small" />
          <Typography variant="body2">{assignee}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2" color="error">
            Due {formattedDate}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <IconButton size="small" color="primary">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="success" onClick={() => onEdit(task)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

// Sub-component: Addtaskform
const Addtaskform = ({ open, handleClose, onSubmitTask, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    assignee: "",
    dueDate: "",
    status: "To Do",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        assignee: "",
        dueDate: "",
        status: "To Do",
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
      title: "",
      description: "",
      category: "",
      assignee: "",
      dueDate: "",
      status: "To Do",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Assignee" name="assignee" value={form.assignee} onChange={handleChange} margin="dense" />
        <TextField fullWidth type="date" label="Due Date" name="dueDate" value={form.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="dense" />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={form.status} onChange={handleChange} label="Status">
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Component
const Tasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const resetFilters = () => {
    setStatusFilter("");
  };

  const filteredTasks = tasks.filter((task) =>
    statusFilter ? task.status === statusFilter : true
  );

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t === selectedTask ? updatedTask : t)));
    setOpenEdit(false);
    setSelectedTask(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Team-Member-Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3, p: 2 }}>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {["To Do", "In Progress", "Done"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={resetFilters}>
            Clear Filters
          </Button>
        </Box>
      </TableContainer>

      <Grid container spacing={3}>
        {filteredTasks.map((task, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <TaskCard task={task} onEdit={handleEditTask} />
          </Grid>
        ))}
      </Grid>

      <Addtaskform
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
          setSelectedTask(null);
        }}
        onSubmitTask={handleUpdateTask}
        initialData={selectedTask}
      />
    </Box>
  );
};

export default Tasks;
