import React, { useState } from "react";
import { Grid, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper, TableContainer } from "@mui/material";
import TaskCard from "./TaskCard";
import Addtaskform from "./Addtaskform";

const mockTasks = [
   { title: "Design Homepage",description:"Designing a homepage involves creating a visually appealing and functional entry point for a website." ,category: "Website Redesign", assignee: "John Doe", dueDate: "Jul 15, 2025", status: "In Progress", priority: "High" },
 {title: "Implement Responsive CSS",description:"Implementing Responsive CSS ensures that a website adapts seamlessly to different screen sizes and devices.", category: "Website Redesign", assignee: "John Doe", dueDate: "Jul 25, 2025", status: "Done", priority: "High" },
  { title: "UI design", description: "UI design (User Interface design) focuses on creating visually appealing and user-friendly interfaces for digital products like websites and apps. It involves elements such as layout, typography, colors, and interactive components to enhance user experience", category: "Website Redesign", assignee: "John Doe", dueDate: "2025-08-25", status: "To Do", priority: "Low" },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [projectFilter, setProjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const resetFilters = () => {
    setProjectFilter("");
    setStatusFilter("");
  };

  const filteredTasks = tasks.filter(task =>
    (projectFilter ? task.category === projectFilter : true) &&
    (statusFilter ? task.status === statusFilter : true)
  );

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t === selectedTask ? updatedTask : t));
    setOpenEdit(false);
    setSelectedTask(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Team-Member-Tasks</Typography>

      {/* Filtering UI */}
      <TableContainer component={Paper} sx={{ mb: 3, p: 2 }}>
        <Box display="flex" gap={2}>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              {["To Do", "In Progress", "Done"].map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={resetFilters}>Clear Filters</Button>
        </Box>
      </TableContainer>

      <Grid container spacing={3}>
        {filteredTasks.map((task, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <TaskCard task={task} onEdit={handleEditTask} onView={() => alert(JSON.stringify(task, null, 2))} />
          </Grid>
        ))}
      </Grid>

      <Addtaskform
        open={openEdit}
        handleClose={() => { setOpenEdit(false); setSelectedTask(null); }}
        onSubmitTask={handleUpdateTask}
        initialData={selectedTask}
      />
    </Box>
  );
};

export default TaskBoard;