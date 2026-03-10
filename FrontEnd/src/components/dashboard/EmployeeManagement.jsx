import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

const cardStyle = "bg-[#1a1a1a] shadow-lg rounded-2xl border border-white/5";
const inputStyle = "w-full bg-[#262626] text-[#f5f5f5] rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all border border-white/5 text-sm";
const labelStyle = "block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider";

const EmployeeManagement = () => {
  const queryClient = useQueryClient();
  const userData = useSelector((state) => state.user);
  const isAdmin = userData.role === 'Admin';

  const [activeTab, setActiveTab] = useState('add_employee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Waiter'
  });
  const [leaveData, setLeaveData] = useState({
    reason: '',
    startDate: '',
    endDate: ''
  });

  const { data: employees = [] } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}api/employee`, { withCredentials: true });
      return res.data.data;
    },
    enabled: isAdmin
  });

  const { data: leaves = [] } = useQuery({
    queryKey: ['leaves'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}api/employee/leave`, { withCredentials: true });
      return res.data.data;
    }
  });

  const addEmployeeMutation = useMutation({
    mutationFn: (data) => axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`, data),
    onSuccess: () => {
      enqueueSnackbar("Employee Added Successfully", { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setFormData({ name: '', email: '', phone: '', password: '', role: 'Waiter' });
    },
    onError: (err) => enqueueSnackbar(err.response?.data?.message || "Error adding employee", { variant: 'error' })
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_BACKEND}/api/employee/${id}`, { withCredentials: true }),
    onSuccess: () => {
      enqueueSnackbar("Employee Removed", { variant: 'info' });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    }
  });

  const applyLeaveMutation = useMutation({
    mutationFn: (data) => axios.post(`${import.meta.env.VITE_BACKEND}/api/employee/leave`, data, { withCredentials: true }),
    onSuccess: () => {
      enqueueSnackbar("Leave Request Submitted", { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      setLeaveData({ reason: '', startDate: '', endDate: '' });
    },
    onError: (err) => enqueueSnackbar(err.response?.data?.message || "Error submitting leave", { variant: 'error' })
  });

  const updateLeaveStatusMutation = useMutation({
    mutationFn: ({ id, status }) => axios.put(`${import.meta.env.VITE_BACKEND}/api/employee/leave/${id}`, { status }, { withCredentials: true }),
    onSuccess: (data) => {
      enqueueSnackbar(`Leave ${data.data.data.status}`, { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    }
  });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    applyLeaveMutation.mutate(leaveData);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    addEmployeeMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#111111] px-6 py-8 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#f5f5f5] tracking-tight">Staffing</h2>
        <p className="text-[#6b6b6b] mt-1 text-sm">Manage wait staff, cashiers, and time-offs efficiently.</p>
      </div>

      {/* Tabs */}
      {isAdmin && (
        <div className="flex gap-2 mb-7">
          {['add_employee', 'leaves'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${activeTab === tab
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]'
                : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300 border border-white/5'
                }`}
            >
              {tab === 'add_employee' ? 'Manage Employees' : 'Leave Requests'}
            </button>
          ))}
        </div>
      )}

      {/* ── MANAGE EMPLOYEES ── */}
      {activeTab === 'add_employee' && isAdmin && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 items-start">

          {/* Form — 2/5 width */}
          <div className={`xl:col-span-2 ${cardStyle} p-6`}>
            <SectionTitle>Hire Employee</SectionTitle>
            <form onSubmit={handleAddEmployee} className="space-y-3.5 mt-5">
              <Field label="Full Name">
                <input type="text" className={inputStyle} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="John Doe" />
              </Field>
              <Field label="Email">
                <input type="email" className={inputStyle} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="john@example.com" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone">
                  <input type="text" className={inputStyle} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required placeholder="+91 9999999999" />
                </Field>
                <Field label="Role">
                  <select className={inputStyle} value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                    <option value="Waiter">Waiter</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                </Field>
              </div>
              <Field label="Password">
                <input type="password" className={inputStyle} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required placeholder="••••••••" />
              </Field>
              <button
                type="submit"
                disabled={addEmployeeMutation.isPending}
                className="w-full mt-1 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-sm font-bold py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all disabled:opacity-60"
              >
                {addEmployeeMutation.isPending ? 'Registering…' : 'Register Employee'}
              </button>
            </form>
          </div>

          {/* Roster — 3/5 width */}
          <div className={`xl:col-span-3 ${cardStyle} p-6 flex flex-col`} style={{ maxHeight: '75vh' }}>
            <div className="flex items-center justify-between mb-5">
              <SectionTitle>Current Roster</SectionTitle>
              <span className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {employees.length} {employees.length === 1 ? 'member' : 'members'}
              </span>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-12 text-[11px] text-gray-600 font-semibold uppercase tracking-widest px-4 pb-3 border-b border-white/5">
              <span className="col-span-4">Name</span>
              <span className="col-span-2">Role</span>
              <span className="col-span-4">Contact</span>
              <span className="col-span-2 text-right">Action</span>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1 scrollbar-hide">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className="grid grid-cols-12 items-center px-4 py-3.5 bg-[#222222] rounded-xl border border-white/[0.04] hover:bg-[#272727] hover:border-white/[0.07] transition-all group"
                >
                  <div className="col-span-4 font-medium text-gray-200 text-sm truncate pr-2">{emp.name}</div>
                  <div className="col-span-2">
                    <span className={`px-2.5 py-1 text-[10px] rounded-lg font-bold uppercase tracking-wider ${emp.role === 'Waiter'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                      {emp.role}
                    </span>
                  </div>
                  <div className="col-span-4 flex flex-col text-xs text-gray-500 gap-0.5 pr-2">
                    <span className="text-gray-400">{emp.phone}</span>
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => deleteEmployeeMutation.mutate(emp._id)}
                      className="text-red-500/60 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold opacity-0 group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {employees.length === 0 && (
                <div className="text-gray-600 text-sm text-center py-16">No employees in the roster yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── LEAVES ── */}
      {(activeTab === 'leaves' || !isAdmin) && (
        <div className={`grid grid-cols-1 gap-5 items-start ${!isAdmin ? 'xl:grid-cols-5' : ''}`}>

          {/* Apply form (non-admin only) */}
          {!isAdmin && (
            <div className={`xl:col-span-2 ${cardStyle} p-6`}>
              <SectionTitle>Apply for Leave</SectionTitle>
              <form onSubmit={handleApplyLeave} className="space-y-3.5 mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start Date">
                    <input type="date" className={inputStyle} value={leaveData.startDate} onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })} required />
                  </Field>
                  <Field label="End Date">
                    <input type="date" className={inputStyle} value={leaveData.endDate} onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })} required />
                  </Field>
                </div>
                <Field label="Reason">
                  <textarea
                    className={`${inputStyle} resize-none`}
                    rows={4}
                    value={leaveData.reason}
                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                    required
                    placeholder="Brief description of your reason…"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={applyLeaveMutation.isPending}
                  className="w-full mt-1 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-sm font-bold py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all disabled:opacity-60"
                >
                  {applyLeaveMutation.isPending ? 'Submitting…' : 'Submit Request'}
                </button>
              </form>
            </div>
          )}

          {/* Leave history */}
          <div
            className={`${!isAdmin ? 'xl:col-span-3' : 'col-span-1'} ${cardStyle} p-6 flex flex-col`}
            style={{ maxHeight: isAdmin ? '75vh' : '70vh' }}
          >
            <div className="flex items-center justify-between mb-5">
              <SectionTitle>Leave History</SectionTitle>
              <span className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {leaves.length} {leaves.length === 1 ? 'request' : 'requests'}
              </span>
            </div>

            {/* Admin column headers */}
            {isAdmin && (
              <div className="grid grid-cols-12 text-[11px] text-gray-600 font-semibold uppercase tracking-widest px-4 pb-3 border-b border-white/5">
                <span className="col-span-3">Employee</span>
                <span className="col-span-4">Dates</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-3 text-right">Action</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1 scrollbar-hide">
              {leaves.map((req) => (
                isAdmin ? (
                  /* Admin row — compact grid */
                  <div
                    key={req._id}
                    className="grid grid-cols-12 items-center px-4 py-3.5 bg-[#222222] rounded-xl border border-white/[0.04] hover:bg-[#272727] transition-all group"
                  >
                    <div className="col-span-3 pr-2">
                      <div className="text-sm font-semibold text-gray-200 truncate">{req.employeeId?.name}</div>
                      <div className="text-[11px] text-gray-600">{req.employeeId?.role}</div>
                    </div>
                    <div className="col-span-4 text-xs text-gray-400 pr-2">
                      <span>{new Date(req.startDate).toLocaleDateString()}</span>
                      <span className="text-gray-700 mx-1.5">→</span>
                      <span>{new Date(req.endDate).toLocaleDateString()}</span>
                      <div className="text-[11px] text-gray-600 italic mt-0.5 truncate">"{req.reason}"</div>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={req.status} />
                    </div>
                    <div className="col-span-3 flex gap-2 justify-end">
                      {req.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => updateLeaveStatusMutation.mutate({ id: req._id, status: 'Rejected' })}
                            className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold transition-all"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => updateLeaveStatusMutation.mutate({ id: req._id, status: 'Approved' })}
                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs font-bold transition-all"
                          >
                            Approve
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-gray-700 italic">Resolved</span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Employee row — card style */
                  <div key={req._id} className="p-4 bg-[#222222] rounded-xl border border-white/[0.04] hover:bg-[#272727] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">
                        {new Date(req.startDate).toLocaleDateString()}
                        <span className="text-gray-700 mx-1.5">→</span>
                        {new Date(req.endDate).toLocaleDateString()}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-sm text-gray-500 italic">"{req.reason}"</p>
                  </div>
                )
              ))}
              {leaves.length === 0 && (
                <div className="text-gray-600 text-sm text-center py-16">No leave requests found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Small helpers ── */
const SectionTitle = ({ children }) => (
  <h3 className="text-base font-semibold text-[#f0f0f0] flex items-center gap-2.5">
    <span className="w-1.5 h-5 bg-emerald-500 rounded-full flex-shrink-0" />
    {children}
  </h3>
);

const Field = ({ label, children }) => (
  <div>
    <label className={labelStyle}>{label}</label>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 text-[10px] rounded-lg font-bold uppercase tracking-wider border ${styles[status] ?? styles.Pending}`}>
      {status}
    </span>
  );
};

export default EmployeeManagement;