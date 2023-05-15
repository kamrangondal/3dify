import React from 'react'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { Route, Routes } from "react-router-dom";
import NotFound from './404/404';
import SignUp from './pages/SignUp';
import AdminSignIn from './pages/AdminSignIn';
import DeveloperSignIn from './pages/DeveloperSignIn';
import Forgot from './pages/Forgot';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import UserTaskSubmitted from './user/UserTaskSubmitted';
import ModelAdd from './user/ModelAdd';
import UserTaskInProgress from './user/UserTaskInProgress';
import UserTaskCompleted from './user/UserTaskCompleted';
import './App.css';
import FileUploadForm from './user/FileUploadForm';
import AdminTasksAssigned from './user/AdminTasksAssigned';
import UserIframe from './user/UserIframe';

export default function App() {

  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/user/iframe/:id" element={<UserIframe />} />
    <Route path="/admin/signin" element={<AdminSignIn />} />
    <Route path="/developer/signin" element={<DeveloperSignIn />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/user/dashboard" element={<UserDashboard />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/admin/dashboard" element={<AdminDashboard />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/user/tasks" element={<UserTaskSubmitted />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/admin/addmodel" element={<ModelAdd />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/user/tasksinprogress" element={<UserTaskInProgress />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/user/taskscompleted" element={<UserTaskCompleted />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/user/fileupload" element={<FileUploadForm />} />  {/* I  will made this route protected in future with user login */  }
    <Route path="/admin/tasksassigned" element={<AdminTasksAssigned />} />  {/* I  will made this route protected in future with user login */  }

    <Route path="*" element={<NotFound />} />
  </Routes>
  )
}

