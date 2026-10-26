import React, { useState } from 'react';
import { TeamMember, Department, TeamRole, PracticeArea } from '../types';
import { storageService, PORTRAIT_PRESETS } from '../services/storageService';
import { validateTeamMember } from '../utils/filterUtils';
import {
  Plus,
  Edit2,
  Trash2,
  Archive,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Image as ImageIcon,
  Shield,
  X,
} from 'lucide-react';

const DEPARTMENTS: Department[] = [
  'Dispute Resolution & Arbitration',
  'Corporate & Cross-Border M&A',
  'Maritime & Admiralty',
  'Technology, IP & Regulatory',
  'Appellate & Constitutional Advocacy',
  'Legal Research & Academics',
];

const ROLES: TeamRole[] = [
  'Managing Partner',
  'Senior Advocate',
  'Associate Advocate',
  'Legal Consultant',
  'Legal Researcher',
  'Paralegal',
];

interface AdminTeamManagerProps {
  members: TeamMember[];
  practiceAreas: PracticeArea[];
  onDataChanged: () => void;
  onPreviewMember: (member: TeamMember) => void;
}

export const AdminTeamManager: React.FC<AdminTeamManagerProps> = ({
  members,
  practiceAreas,
  onDataChanged,
  onPreviewMember,
}) => {
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form field helpers
  const [qualInput, setQualInput] = useState('');
  const [langInput, setLangInput] = useState('');
  const [milestoneInput, setMilestoneInput] = useState('');
  const [publicationInput, setPublicationInput] = useState('');

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // Filter list
  const filteredList = members.filter((m) => {
    if (filterStatus === 'published' && (!m.isPublished || m.isArchived)) return false;
    if (filterStatus === 'draft' && (m.isPublished || m.isArchived)) return false;
    if (filterStatus === 'archived' && !m.isArchived) return false;
    if (filterDepartment !== 'All' && m.department !== filterDepartment) return false;
    return true;
  });

  const handleOpenAdd = () => {
    setEditingMember({
      name: '',
      designation: '',
      department: 'Dispute Resolution & Arbitration',
      role: 'Associate Advocate',
      qualifications: ['LL.M. (Distinction)'],
      barEnrollment: 'Bar of England & Wales (Inns of Court, 2018)',
      practiceAreas: [practiceAreas[0]?.title || 'International Arbitration & Dispute Resolution'],
      languages: ['English'],
      biography: '',
      yearsOfExperience: 8,
      milestones: [],
      publications: [],
      email: '',
      linkedin: '',
      officeLocation: 'London Chambers',
      imageUrl: PORTRAIT_PRESETS[0].url,
      altText: 'Professional portrait of counsel',
      order: members.length + 1,
      isFeatured: false,
      isPublished: true,
      isArchived: false,
      notableCases: [],
    });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember({ ...m });
    setFormErrors({});
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    const res = storageService.saveTeamMember(editingMember);
    if (!res.success && res.errors) {
      setFormErrors(res.errors);
      return;
    }

    setIsEditing(false);
    setEditingMember(null);
    onDataChanged();
    showNotification('Team member profile saved to database successfully.');
  };

  const handleTogglePublish = (id: string) => {
    storageService.togglePublishMember(id);
    onDataChanged();
    showNotification('Publication status updated.');
  };

  const handleToggleFeatured = (id: string) => {
    storageService.toggleFeaturedMember(id);
    onDataChanged();
    showNotification('Featured counsel status updated.');
  };

  const handleArchive = (id: string) => {
    storageService.archiveMember(id);
    onDataChanged();
    showNotification('Profile moved to chambers archives.');
  };

  const handleDelete = (id: string) => {
    storageService.deleteMember(id);
    setConfirmDeleteId(null);
    onDataChanged();
    showNotification('Profile removed from database.');
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= members.length) return;

    const reordered = [...members];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    storageService.reorderMembers(reordered.map((m) => m.id));
    onDataChanged();
  };

  const handleResetDefaults = () => {
    storageService.resetTeamToDefaults();
    setConfirmResetOpen(false);
    onDataChanged();
    showNotification('Team roster restored to verified authentic defaults.');
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 border border-[#B99A5B]/30 shadow-sm">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#101C2C]">
            Advocate & Team Roster Management
          </h2>
          <p className="text-xs text-[#101C2C]/70 mt-0.5">
            Database-backed registry of verified advocates, bar credentials, and judicial appointments.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setConfirmResetOpen(true)}
            className="px-3 py-2 text-xs border border-[#B99A5B]/40 text-[#101C2C]/80 hover:bg-[#B99A5B]/10 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to verified seed roster"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B99A5B]" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {feedbackMsg && (
        <div className="p-3 bg-[#101C2C] text-[#F7F4ED] border border-[#B99A5B] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#B99A5B]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-4 border border-[#B99A5B]/25 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#101C2C] uppercase tracking-wider text-[11px]">
            Department:
          </span>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-[#F7F4ED] border border-[#B99A5B]/40 p-1.5 text-xs text-[#101C2C] rounded focus:outline-none focus:border-[#B99A5B]"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Status segmented controls */}
        <div className="flex items-center gap-1 bg-[#F7F4ED] p-1 border border-[#B99A5B]/30 rounded">
          {(['all', 'published', 'draft', 'archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 uppercase text-[10px] tracking-wider font-semibold rounded transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-[#101C2C] text-[#F7F4ED]'
                  : 'text-[#101C2C]/70 hover:text-[#101C2C]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-[#B99A5B]/30 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#101C2C] text-[#F7F4ED] border-b border-[#B99A5B]/30 text-[10px] uppercase tracking-wider">
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Counsel Profile</th>
              <th className="py-3 px-4">Department & Role</th>
              <th className="py-3 px-4">Verified Bar Admission</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B99A5B]/15">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-[#101C2C]/60 italic">
                  No advocates or team members match the selected filter criteria.
                </td>
              </tr>
            ) : (
              filteredList.map((m, idx) => (
                <tr key={m.id} className="hover:bg-[#F7F4ED]/60 transition-colors">
                  {/* Order Controls */}
                  <td className="py-3 px-4 font-mono text-[11px] text-[#101C2C]/70 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="w-5 text-center font-bold text-[#101C2C]">{m.order}</span>
                      <button
                        onClick={() => handleMoveOrder(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 text-[#101C2C]/50 hover:text-[#101C2C] disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(idx, 'down')}
                        disabled={idx === filteredList.length - 1}
                        className="p-1 text-[#101C2C]/50 hover:text-[#101C2C] disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Profile info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.imageUrl}
                        alt={m.altText || m.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover object-top border border-[#B99A5B]/30 shrink-0"
                      />
                      <div className="truncate max-w-xs">
                        <div className="font-bold text-[#101C2C] flex items-center gap-1.5 truncate">
                          <span>{m.name}</span>
                          {m.isFeatured && (
                            <Star className="w-3.5 h-3.5 text-[#B99A5B] fill-[#B99A5B]" />
                          )}
                        </div>
                        <div className="text-[11px] text-[#101C2C]/70 truncate">
                          {m.designation}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#101C2C]">{m.department}</div>
                    <div className="text-[11px] text-[#101C2C]/65">{m.role}</div>
                  </td>

                  {/* Bar Admission */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="truncate text-[11px] text-[#101C2C]/80" title={m.barEnrollment}>
                      {m.barEnrollment}
                    </div>
                    <div className="text-[10px] text-[#101C2C]/60 truncate">
                      {m.qualifications.join(' · ')}
                    </div>
                  </td>

                  {/* Status indicators - clean text without noisy pills */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {m.isArchived ? (
                      <span className="text-[11px] text-gray-500 font-medium">Archived</span>
                    ) : m.isPublished ? (
                      <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Published
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-medium">Draft / Hidden</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreviewMember(m)}
                        className="p-1.5 text-[#101C2C]/70 hover:text-[#101C2C] hover:bg-[#B99A5B]/15 rounded transition-colors cursor-pointer"
                        title="Preview Public Profile"
                      >
                        <Eye className="w-4 h-4 text-[#101C2C]" />
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(m.id)}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          m.isFeatured
                            ? 'text-[#B99A5B] bg-[#B99A5B]/10'
                            : 'text-[#101C2C]/40 hover:text-[#B99A5B]'
                        }`}
                        title={m.isFeatured ? 'Remove from Featured' : 'Mark as Featured Counsel'}
                      >
                        <Star className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTogglePublish(m.id)}
                        className="p-1.5 text-[#101C2C]/70 hover:text-[#101C2C] rounded transition-colors cursor-pointer"
                        title={m.isPublished ? 'Unpublish Profile' : 'Publish Profile'}
                      >
                        {m.isPublished ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4 text-emerald-700" />
                        )}
                      </button>

                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 text-[#101C2C]/80 hover:text-[#B99A5B] rounded transition-colors cursor-pointer"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {!m.isArchived && (
                        <button
                          onClick={() => handleArchive(m.id)}
                          className="p-1.5 text-[#101C2C]/50 hover:text-amber-700 rounded transition-colors cursor-pointer"
                          title="Archive Profile"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => setConfirmDeleteId(m.id)}
                        className="p-1.5 text-[#101C2C]/40 hover:text-red-700 rounded transition-colors cursor-pointer"
                        title="Delete Profile Permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Member Modal Form */}
      {isEditing && editingMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#101C2C]/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0" onClick={() => setIsEditing(false)} />

          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F7F4ED] text-[#101C2C] border border-[#B99A5B]/40 shadow-2xl z-10 flex flex-col">
            {/* Header */}
            <div className="bg-[#101C2C] text-[#F7F4ED] p-5 sm:p-6 border-b border-[#B99A5B]/30 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-semibold text-[#B99A5B] tracking-widest">
                  Chambers Administration
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5 text-[#F7F4ED]">
                  {editingMember.id ? 'Edit Advocate Profile' : 'Register New Team Member'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-[#F7F4ED]/70 hover:text-[#F7F4ED] rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="p-6 sm:p-8 space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Full Legal Name & Honour *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.name || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    placeholder="e.g. Dame Eleanor Vance KC"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Official Chambers Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.designation || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                    placeholder="e.g. Senior Advocate & Head of Admiralty Chambers"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {formErrors.designation && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.designation}</p>
                  )}
                </div>
              </div>

              {/* Department & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Department *
                  </label>
                  <select
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value as any })}
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Role Category *
                  </label>
                  <select
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value as any })}
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Years of Practice *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={editingMember.yearsOfExperience || 0}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, yearsOfExperience: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                </div>
              </div>

              {/* Bar Admission & Office Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Verified Bar Enrollment / Regulatory Body *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.barEnrollment || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, barEnrollment: e.target.value })}
                    placeholder="e.g. Bar of England & Wales (Middle Temple, 2004)"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                  {formErrors.barEnrollment && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.barEnrollment}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Chambers Primary Location
                  </label>
                  <input
                    type="text"
                    value={editingMember.officeLocation || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, officeLocation: e.target.value })}
                    placeholder="e.g. London & Geneva Chambers"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                  Verified Academic Qualifications (Degrees, Honours) *
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={qualInput}
                    onChange={(e) => setQualInput(e.target.value)}
                    placeholder="e.g. LL.M. (Harvard), B.C.L. (Oxon)"
                    className="flex-1 bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (qualInput.trim()) {
                        setEditingMember({
                          ...editingMember,
                          qualifications: [...(editingMember.qualifications || []), qualInput.trim()],
                        });
                        setQualInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-[#101C2C] text-[#F7F4ED] text-xs rounded cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {editingMember.qualifications?.map((q, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#B99A5B]/40 text-[#101C2C]"
                    >
                      {q}
                      <button
                        type="button"
                        onClick={() =>
                          setEditingMember({
                            ...editingMember,
                            qualifications: editingMember.qualifications?.filter((_, idx) => idx !== i),
                          })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {formErrors.qualifications && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.qualifications}</p>
                )}
              </div>

              {/* Practice Areas Assignment */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1.5">
                  Assigned Practice Jurisdictions *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 border border-[#B99A5B]/30 max-h-40 overflow-y-auto">
                  {practiceAreas.map((pa) => {
                    const isChecked = editingMember.practiceAreas?.includes(pa.title);
                    return (
                      <label key={pa.id} className="flex items-center gap-2 text-xs text-[#101C2C] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const current = editingMember.practiceAreas || [];
                            if (e.target.checked) {
                              setEditingMember({ ...editingMember, practiceAreas: [...current, pa.title] });
                            } else {
                              setEditingMember({
                                ...editingMember,
                                practiceAreas: current.filter((x) => x !== pa.title),
                              });
                            }
                          }}
                          className="rounded border-[#B99A5B] text-[#101C2C] focus:ring-[#B99A5B]"
                        />
                        <span>{pa.title}</span>
                      </label>
                    );
                  })}
                </div>
                {formErrors.practiceAreas && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.practiceAreas}</p>
                )}
              </div>

              {/* Biography */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                  Professional Biography *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingMember.biography || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, biography: e.target.value })}
                  placeholder="Detail years of practice, court appearances, arbitral tribunals, specialization, and professional background..."
                  className="w-full bg-white border border-[#B99A5B]/40 p-2.5 text-xs sm:text-sm text-[#101C2C] focus:outline-none focus:border-[#B99A5B] rounded"
                />
                {formErrors.biography && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.biography}</p>
                )}
              </div>

              {/* Photo & Accessibility */}
              <div className="bg-white p-4 border border-[#B99A5B]/30 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#101C2C]">
                  Profile Photography & Accessibility
                </div>

                {/* Preset Selector */}
                <div>
                  <span className="block text-[11px] text-[#101C2C]/70 mb-1.5 font-medium">
                    Select Verified Portrait Preset:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PORTRAIT_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() =>
                          setEditingMember({
                            ...editingMember,
                            imageUrl: preset.url,
                            altText: `Professional portrait of ${editingMember.name || 'Advocate'}`,
                          })
                        }
                        className={`p-2 text-left border rounded flex items-center gap-2 cursor-pointer transition-colors ${
                          editingMember.imageUrl === preset.url
                            ? 'bg-[#101C2C] text-[#F7F4ED] border-[#B99A5B]'
                            : 'bg-[#F7F4ED] text-[#101C2C] border-[#B99A5B]/25 hover:border-[#B99A5B]'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt="preview"
                          referrerPolicy="no-referrer"
                          className="w-9 h-11 object-cover shrink-0"
                        />
                        <div className="truncate text-[10px]">
                          <div className="font-semibold truncate">{preset.roleHint}</div>
                          <div className="opacity-70 truncate">{preset.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] text-[#101C2C]/70 mb-1 font-medium">
                      Image URL or Asset Path *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMember.imageUrl || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, imageUrl: e.target.value })}
                      placeholder="/src/assets/images/portrait_..."
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#101C2C]/70 mb-1 font-medium">
                      Accessibility Description (Alt Text) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMember.altText || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, altText: e.target.value })}
                      placeholder="e.g. Portrait of Dame Eleanor Vance KC, Managing Partner"
                      className="w-full bg-[#F7F4ED] border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] rounded"
                    />
                    {formErrors.altText && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.altText}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Public Contact & Publishing Flags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Chambers Public Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={editingMember.email || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    placeholder="e.g. e.vance@lexglobaladvocacy.com"
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] rounded"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101C2C] mb-1">
                    Public LinkedIn URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingMember.linkedin || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white border border-[#B99A5B]/40 p-2 text-xs text-[#101C2C] rounded"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#B99A5B]/20 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMember.isPublished}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, isPublished: e.target.checked })
                    }
                    className="rounded border-[#B99A5B] text-[#101C2C] focus:ring-[#B99A5B]"
                  />
                  <span className="font-semibold text-[#101C2C]">Publish Immediately</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMember.isFeatured}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, isFeatured: e.target.checked })
                    }
                    className="rounded border-[#B99A5B] text-[#101C2C] focus:ring-[#B99A5B]"
                  />
                  <span className="font-semibold text-[#101C2C]">Feature on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#B99A5B]/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-[#B99A5B]/40 text-[#101C2C] text-xs font-semibold uppercase rounded hover:bg-[#B99A5B]/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B99A5B] text-[#101C2C] hover:bg-[#D4BA83] text-xs font-semibold uppercase tracking-wider rounded shadow cursor-pointer"
                >
                  Save Profile to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Permanent Deletion */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101C2C]/80 backdrop-blur-sm">
          <div className="bg-[#F7F4ED] border border-red-400 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold">Confirm Permanent Deletion</h3>
            </div>
            <p className="text-xs text-[#101C2C]/80 leading-relaxed">
              Are you sure you wish to delete this advocate record from the chambers database? This action is irreversible. For temporary withdrawal, use <strong>Archive</strong> or <strong>Unpublish</strong> instead.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-1.5 text-xs border border-[#B99A5B]/40 rounded hover:bg-[#B99A5B]/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-1.5 text-xs bg-red-700 text-white rounded hover:bg-red-800 font-semibold cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Resetting Defaults */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101C2C]/80 backdrop-blur-sm">
          <div className="bg-[#F7F4ED] border border-[#B99A5B] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#101C2C]">
              <RotateCcw className="w-6 h-6 text-[#B99A5B] shrink-0" />
              <h3 className="font-serif text-lg font-bold">Restore Verified Roster</h3>
            </div>
            <p className="text-xs text-[#101C2C]/80 leading-relaxed">
              This will reset the team roster back to the verified senior advocate chambers profiles (Elena Vance KC, Marcus Sterling, Tariq Al-Mansoor, Amara Chen, Dr. Sofia Hernandez, Julian Ross).
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-1.5 text-xs border border-[#B99A5B]/40 rounded hover:bg-[#B99A5B]/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-1.5 text-xs bg-[#101C2C] text-[#F7F4ED] rounded hover:bg-[#1A2A40] font-semibold cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
