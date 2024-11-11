// src/pages/HomePage.js
import React, { useState, useEffect } from 'react'; // Add useEffect here
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import ProductionChart from '../components/ProductionChart';
import StockChart from '../components/StockChart';
import ExpensesChart from '../components/ExpensesChart';
import SalesChart from '../components/SalesChart';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import api from './../api';

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    production: null,
    stock: null,
    sales: null,
    expenses: null,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickActions, setQuickActions] = useState([]);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    // Fetch metrics data
    const fetchMetrics = async () => {
      try {
        const [production, stock, sales, expenses] = await Promise.all([
          api.fetchProduction(),
          api.fetchStock(),
          api.fetchSales(),
          api.fetchExpenses(),
        ]);
        setMetrics({ production, stock, sales, expenses });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    // Fetch recent activity
    const fetchRecentActivity = async () => {
      try {
        const activity = await api.fetchRecentActivity();
        setRecentActivity(activity);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    // Fetch quick actions
    const fetchQuickActions = async () => {
      try {
        const actions = await api.fetchQuickActions();
        setQuickActions(actions);
      } catch (error) {
        console.error('Error fetching quick actions:', error);
      }
    };

    fetchMetrics();
    fetchRecentActivity();
    fetchQuickActions();
  }, []);

  const drawerList = (
    <Box
      sx={{
        width: 250,
        paddingTop: 2,
      }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/production">
          <ListItemText primary="Production" />
        </ListItem>
        <ListItem button component={Link} to="/expenses">
          <ListItemText primary="Expenses" />
        </ListItem>
        <ListItem button component={Link} to="/sales">
          <ListItemText primary="Sales" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ padding: 2 }}>
        <QuickActions actions={quickActions} />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#2E3B55',
          color: '#fff',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Layer Farm Maintenance Dashboard
        </Typography>
        <IconButton
          sx={{
            color: '#fff',
            display: { xs: 'block', md: 'none' },
          }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {drawerList}
      </Drawer>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <QuickActions actions={quickActions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {[
              { title: "Total Production", value: metrics.production, bgColor: "#E3F2FD", color: "#1E88E5" },
              { title: "Stock", value: metrics.stock, bgColor: "#FFF3E0", color: "#FB8C00" },
              { title: "Sales", value: metrics.sales, bgColor: "#E8F5E9", color: "#43A047" },
              { title: "Expenses", value: metrics.expenses, bgColor: "#FFEBEE", color: "#E53935" },
            ].map((metric, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    backgroundColor: metric.bgColor,
                    color: metric.color,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <Typography variant="subtitle1">{metric.title}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {metric.value || 'Loading...'}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Performance Metrics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <ProductionChart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <StockChart />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <ExpensesChart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <SalesChart />
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Activity
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <RecentActivity activities={recentActivity} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
