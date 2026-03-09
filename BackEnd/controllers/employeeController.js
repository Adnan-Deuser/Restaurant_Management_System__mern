const createHttpError = require("http-errors");
const User = require("../model/userModel");
const Leave = require("../model/leaveModel");

// Get all employees (Role: Waiter or Cashier)
const getEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: { $in: ["Waiter", "Cashier"] } }).select("-password");
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Optional: Add check so only Admin can delete
    if (req.user.role !== "Admin") {
        return next(createHttpError(403, "Not authorized to delete employees."));
    }

    const employee = await User.findByIdAndDelete(id);
    if (!employee) {
      return next(createHttpError(404, "Employee not found"));
    }
    
    // Also delete any leave requests associated with this employee
    await Leave.deleteMany({ employeeId: id });

    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Apply for leave (Employee)
const applyForLeave = async (req, res, next) => {
  try {
    const { reason, startDate, endDate } = req.body;
    
    if (!reason || !startDate || !endDate) {
      return next(createHttpError(400, "All fields are required"));
    }

    const leave = new Leave({
      employeeId: req.user._id, // Got from tokenVerification
      reason,
      startDate,
      endDate
    });

    await leave.save();
    res.status(201).json({ success: true, message: "Leave request submitted successfully", data: leave });
  } catch (error) {
    next(error);
  }
};

// Get leave requests (Admin sees all, Employee sees only theirs)
const getLeaveRequests = async (req, res, next) => {
  try {
    let leaves;
    if (req.user.role === "Admin") {
      // Admin gets all leaves with employee details
      leaves = await Leave.find().populate("employeeId", "name email role phone").sort({ createdAt: -1 });
    } else {
      // Employee gets only their leaves
      leaves = await Leave.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
    }
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    next(error);
  }
};

// Update leave status (Admin only)
const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== "Admin") {
      return next(createHttpError(403, "Not authorized to update leave status."));
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return next(createHttpError(400, "Invalid status. Must be 'Approved' or 'Rejected'"));
    }

    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!leave) {
      return next(createHttpError(404, "Leave request not found"));
    }

    res.status(200).json({ success: true, message: `Leave Request ${status}`, data: leave });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  deleteEmployee,
  applyForLeave,
  getLeaveRequests,
  updateLeaveStatus
};
