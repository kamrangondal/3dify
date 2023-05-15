import React from "react";
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

export default function AdminTasksAssigned() {
  return (
    <>
      <UserNavbar user="ADMIN" />
      <div>AdminTasksAssigned</div>
    </>
  );
}
