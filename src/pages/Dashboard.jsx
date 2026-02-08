import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Search, Filter, Calendar, MessageSquare, Trash2, X, Clock, User } from 'lucide-react';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');

    const [newTicket, setNewTicket] = useState({
        title: '',
        description: '',
        priority: 'medium',
        assignedTo: '',
        dueDate: '',
        projectId: ''
    });

    useEffect(() => {
        fetchData();
    }, [searchTerm, filterStatus, filterPriority]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (filterStatus) params.append('status', filterStatus);
            if (filterPriority) params.append('priority', filterPriority);

            const [ticketsRes, usersRes, projectsRes] = await Promise.all([
                api.get(`/tickets?${params.toString()}`),
                api.get('/users'),
                api.get('/projects')
            ]);
            setTickets(ticketsRes.data);
            setUsers(usersRes.data);
            setProjects(projectsRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tickets', newTicket);
            setShowCreateModal(false);
            setNewTicket({ title: '', description: '', priority: 'medium', assignedTo: '', dueDate: '', projectId: '' });
            fetchData();
        } catch (err) {
            console.error('Error creating ticket:', err);
        }
    };

    const handleStatusChange = async (ticketId, status) => {
        try {
            await api.put(`/tickets/${ticketId}`, { status });
            fetchData();
        } catch (err) {
            console.error('Error updating ticket:', err);
        }
    };

    const handleDeleteTicket = async (ticketId) => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;
        try {
            await api.delete(`/tickets/${ticketId}`);
            setSelectedTicket(null);
            fetchData();
        } catch (err) {
            console.error('Error deleting ticket:', err);
        }
    };

    const openTicketModal = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const statusColumns = [
        { key: 'open', label: 'Open', color: 'bg-gray-100 border-gray-300' },
        { key: 'in_progress', label: 'In Progress', color: 'bg-blue-50 border-blue-300' },
        { key: 'done', label: 'Done', color: 'bg-green-50 border-green-300' }
    ];

    const priorityColors = {
        low: 'bg-gray-100 text-gray-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-red-100 text-red-700'
    };

    const getTicketsByStatus = (status) => tickets.filter(t => t.status === status);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        {/* Create Button */}
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Create Ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statusColumns.map(column => (
                        <div key={column.key} className={`rounded-lg border-2 ${column.color} p-4`}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-700">{column.label}</h2>
                                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                                    {getTicketsByStatus(column.key).length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {getTicketsByStatus(column.key).map(ticket => (
                                    <div
                                        key={ticket.id}
                                        onClick={() => openTicketModal(ticket)}
                                        className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-medium text-gray-900 mb-2">{ticket.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{ticket.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[ticket.priority]}`}>
                                                {ticket.priority}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {ticket.dueDate && (
                                                    <span className="flex items-center text-xs text-gray-500">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {new Date(ticket.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {ticket.Assignee && (
                                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-medium text-blue-600">
                                                            {ticket.Assignee.name?.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Ticket Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-semibold">Create New Ticket</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTicket} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTicket.title}
                                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter ticket title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newTicket.description}
                                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe the issue"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        value={newTicket.priority}
                                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={newTicket.dueDate}
                                        onChange={(e) => setNewTicket({ ...newTicket, dueDate: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                                    <select
                                        value={newTicket.assignedTo}
                                        onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                                    <select
                                        value={newTicket.projectId}
                                        onChange={(e) => setNewTicket({ ...newTicket, projectId: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">No Project</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Ticket Detail Modal */}
            {showModal && selectedTicket && (
                <TicketModal
                    ticket={selectedTicket}
                    users={users}
                    onClose={() => { setShowModal(false); setSelectedTicket(null); }}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTicket}
                    onRefresh={fetchData}
                />
            )}
        </div>
    );
};

// Separate component for ticket detail modal with comments
const TicketModal = ({ ticket, users, onClose, onStatusChange, onDelete, onRefresh }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({ ...ticket });

    useEffect(() => {
        fetchComments();
    }, [ticket.id]);

    const fetchComments = async () => {
        try {
            const res = await api.get(`/tickets/${ticket.id}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            await api.post(`/tickets/${ticket.id}/comments`, { text: newComment });
            setNewComment('');
            fetchComments();
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await api.put(`/tickets/${ticket.id}`, editData);
            setEditing(false);
            onRefresh();
        } catch (err) {
            console.error('Error updating ticket:', err);
        }
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-red-100 text-red-700'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[ticket.priority]}`}>
                            {ticket.priority}
                        </span>
                        <select
                            value={ticket.status}
                            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                            className="text-sm border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setEditing(!editing)} className="text-blue-600 hover:text-blue-800 text-sm">
                            {editing ? 'Cancel' : 'Edit'}
                        </button>
                        <button onClick={() => onDelete(ticket.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4">
                    {editing ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                className="w-full text-xl font-semibold border rounded-lg px-3 py-2"
                            />
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                rows={4}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        value={editData.priority}
                                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={editData.dueDate || ''}
                                        onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                            <button onClick={handleSaveEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h2>
                            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{ticket.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                                {ticket.dueDate && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Due: {new Date(ticket.dueDate).toLocaleDateString()}
                                    </div>
                                )}
                                {ticket.Assignee && (
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {ticket.Assignee.name}
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Comments Section */}
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Comments ({comments.length})
                        </h3>

                        {loadingComments ? (
                            <div className="text-gray-500 text-sm">Loading comments...</div>
                        ) : (
                            <div className="space-y-3 mb-4">
                                {comments.map(comment => (
                                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-sm">{comment.User?.name || 'Unknown'}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleAddComment} className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
