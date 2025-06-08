import React from 'react';
import { Card, CardContent, Typography, Avatar, Divider } from '@mui/material';

const Profile = () => {
  const user = {
    name: 'John Deo',
    email: 'john.deo@example.com',
    role: 'Team Member',
    joined: 'January 10, 2024',
    phone: '+91 98765 43210',
    address: '123, MG Road, Kochi, Kerala, India',
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Card sx={{ maxWidth: 450, p: 2 }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Avatar
              alt={user.name}
              src={user.avatarUrl}
              sx={{ width: 64, height: 64, marginRight: 2 }}
            />
            <div>
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="text.secondary">{user.role}</Typography>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {user.address}</Typography>
          <Typography variant="body1"><strong>Joined:</strong> {user.joined}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
