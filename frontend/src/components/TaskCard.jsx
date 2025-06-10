// src/components/TaskCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// Removed: DeleteIcon import

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

export default TaskCard;
