import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TeamDashboard = () => {
  const teamMember = "John Deo";

  const [tasks, setTasks] = useState([
    { id: 1, project: "Project A", teamMember: "John Deo", dueDate: "2025-06-10", status: "To-Do" },
    { id: 2, project: "Project B", teamMember: "John Deo", dueDate: "2025-06-12", status: "In Progress" },
    { id: 3, project: "Project C", teamMember: "John Deo", dueDate: "2025-06-15", status: "Done" },
  ]);

  const johnsTasks = tasks.filter((task) => task.teamMember === teamMember);

  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleEditOpen = (task) => {
    setEditTask(task);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? editTask : task)));
    setEditOpen(false);
    setEditTask(null);
  };

  const TaskProgressChart = ({ tasks }) => {
    const statusCategories = ["To-Do", "In Progress", "Done"];
    const statusCount = statusCategories.map(
      (status) => tasks.filter((task) => task.status === status).length
    );

    const data = {
      labels: statusCategories,
      datasets: [
        {
          label: "Task Progress",
          data: statusCount,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    };

    return <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "auto" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">{teamMember} – Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ width: "100%", height: "100%", p: 3, mt: 8 }}>
        {/* Summary Cards */}
        <Grid container spacing={2}>
          {[
            { title: "My Tasks", count: johnsTasks.length },
            { title: "Completed", count: johnsTasks.filter((t) => t.status === "Done").length },
            { title: "In Progress", count: johnsTasks.filter((t) => t.status === "In Progress").length },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h4">{item.count}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart & Task Details */}
        <Grid container spacing={2} sx={{ mt: 3, height: "100%", alignItems: "stretch" }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>My Task Progress</Typography>
              <Box sx={{ height: 300 }}>
                <TaskProgressChart tasks={johnsTasks} />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>My Task Details</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {johnsTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        <Button size="small" variant="contained" onClick={() => handleEditOpen(task)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>

        {/* Edit Task Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField fullWidth name="project" label="Project" value={editTask?.project || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth name="dueDate" label="Due Date" type="date" value={editTask?.dueDate || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={editTask?.status || ""} onChange={handleEditChange}>
                <MenuItem value="To-Do">To-Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleUpdateTask} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TeamDashboard;