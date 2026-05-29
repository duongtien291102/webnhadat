import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CheckCircle2, Circle, Mail, Inbox, FileSpreadsheet, PlusCircle, Sparkles } from 'lucide-react';
import { Inquiry } from '../types';

interface ClientRequestsInboxProps {
  inquiries: Inquiry[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteInquiry: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onAddNote: (id: string, note: string) => void;
}

export default function ClientRequestsInbox({
  inquiries,
  isOpen,
  onClose,
  onDeleteInquiry,
  onToggleStatus,
  onAddNote
}: ClientRequestsInboxProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'DONE'>('ALL');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState('');

  if (!isOpen) return null;

  // Sync internal private client notes from localStorage
  const getNotesForId = (id: string) => {
    return localStorage.getItem(`note-${id}`) || '';
  };

  const saveNoteText = (id: string) => {
    onAddNote(id, tempNoteText);
    setEditingNotesId(null);
    setTempNoteText('');
  };

  const handleStartEditing = (id: string) => {
    setEditingNotesId(id);
    setTempNoteText(getNotesForId(id));
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (activeTab === 'PENDING') return inq.status === 'Chờ xử lý';
    if (activeTab === 'DONE') return inq.status === 'Đã liên hệ';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-end">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>

      {/* Inbox Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-xl bg-brand-surface min-h-screen shadow-2xl z-20 flex flex-col justify-between"
      >
        {/* Scrollable Main Area */}
        <div className="overflow-y-auto flex-1">
          {/* Header */}
          <div className="sticky top-0 bg-brand-surface border-b border-brand-concrete-grey h-20 px-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <Inbox size={20} className="text-brand-secondary animate-pulse" />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-secondary block">Lịch sử tư vấn</span>
                <h3 className="text-sm font-sans font-bold tracking-wider uppercase text-brand-primary">HỘP THƯ TRONG NƯỚC ({inquiries.length})</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 border border-brand-concrete-grey flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick tab controls */}
          <div className="px-6 py-4 border-b border-brand-concrete-grey/60 flex gap-2">
            {[
              { id: 'ALL', label: 'Tất cả' },
              { id: 'PENDING', label: 'Chờ xử lý' },
              { id: 'DONE', label: 'Đã xử lý' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-surface-low text-brand-on-surface hover:bg-brand-surface-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Client Inquiries */}
          <div className="p-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredInquiries.map((inq) => {
                const isPending = inq.status === 'Chờ xử lý';
                const hasNote = !!getNotesForId(inq.id);

                return (
                  <motion.div
                    key={inq.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="border border-brand-concrete-grey bg-white p-5 space-y-4 hover:shadow-md transition-shadow relative"
                  >
                    {/* Top strip */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-brand-on-surface-variant font-semibold tracking-wider bg-brand-surface-low px-2 py-0.5 uppercase">
                          {inq.projectType}
                        </span>
                        <div className="text-[10px] font-mono text-brand-on-surface-variant/70 mt-1">
                          {inq.createdAt}
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleStatus(inq.id)}
                          className={`p-1.5 border rounded-none transition-colors ${
                            !isPending
                              ? 'border-green-200 text-green-600 bg-green-50 hover:bg-green-100'
                              : 'border-brand-concrete-grey text-brand-on-surface-variant/60 hover:text-green-600 hover:border-green-300'
                          }`}
                          title={isPending ? "Đánh dấu đã liên hệ" : "Hoàn tác thành chờ xử lý"}
                        >
                          {isPending ? <Circle size={14} /> : <CheckCircle2 size={14} />}
                        </button>
                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-1.5 border border-brand-concrete-grey text-brand-on-surface-variant/60 hover:text-red-600 hover:border-red-300 transition-colors"
                          title="Xóa yêu cầu"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Customer details */}
                    <div>
                      <h4 className="text-sm font-sans font-semibold text-brand-primary">{inq.clientName}</h4>
                      <div className="text-xs font-mono text-brand-on-surface-variant flex items-center gap-1.5 mt-0.5">
                        <Mail size={10} />
                        <span>{inq.email}</span>
                      </div>
                    </div>

                    {/* Messages */}
                    {inq.message && (
                      <p className="text-xs font-light text-brand-on-surface-variant/90 leading-relaxed bg-brand-surface-low/50 p-3 border-l-2 border-brand-concrete-grey italic">
                        "{inq.message}"
                      </p>
                    )}

                    {/* Interactive notes panel inside card */}
                    <div className="pt-3 border-t border-brand-concrete-grey/40 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-brand-secondary">GHI CHÚ NỘI BỘ KIẾN TRÚC SƯ</span>
                        {editingNotesId !== inq.id && (
                          <button
                            onClick={() => handleStartEditing(inq.id)}
                            className="text-[9px] font-bold uppercase text-brand-primary hover:text-brand-secondary flex items-center gap-1"
                          >
                            <PlusCircle size={10} />
                            <span>{hasNote ? 'Sửa ghi chú' : 'Thêm ghi chú'}</span>
                          </button>
                        )}
                      </div>

                      {editingNotesId === inq.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={tempNoteText}
                            onChange={(e) => setTempNoteText(e.target.value)}
                            placeholder="Nhập ghi chú riêng tư về kích thước, nhu cầu chất liệu hoặc lịch hẹn..."
                            rows={2}
                            className="w-full text-xs bg-brand-surface-low border border-brand-concrete-grey focus:border-brand-primary p-2 focus:ring-0 placeholder:text-brand-concrete-grey"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-1 text-[9px] font-bold border border-brand-concrete-grey uppercase text-brand-primary"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => saveNoteText(inq.id)}
                              className="px-3 py-1 text-[9px] font-bold bg-brand-primary text-white uppercase"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      ) : (
                        hasNote ? (
                          <p className="text-[11px] text-brand-secondary leading-relaxed bg-brand-secondary-container/10 p-2.5 border-l border-brand-secondary">
                            {getNotesForId(inq.id)}
                          </p>
                        ) : (
                          <p className="text-[10px] text-brand-on-surface-variant/50 font-light italic">Chưa có ghi chú nội bộ.</p>
                        )
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredInquiries.length === 0 && (
              <div className="py-24 text-center space-y-3">
                <FileSpreadsheet size={32} className="mx-auto text-brand-concrete-grey" />
                <p className="text-xs text-brand-on-surface-variant font-light">Không có thư yêu cầu tư vấn nào được tìm thấy ở bộ lọc này.</p>
              </div>
            )}
          </div>
        </div>

        {/* Closing actions footer */}
        <div className="border-t border-brand-concrete-grey p-6 bg-brand-surface-low flex justify-between items-center">
          <span className="text-[10px] text-brand-on-surface-variant font-light flex items-center gap-1">
            <Sparkles size={11} className="text-brand-secondary animate-spin" />
            <span>Dữ liệu lưu an toàn trên máy khách</span>
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-brand-primary text-brand-primary text-[10px] font-semibold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-colors duration-300"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
}
