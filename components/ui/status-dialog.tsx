'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type DialogType = 'success' | 'error' | 'info' | 'warning';

interface StatusDialogProps {
  isOpen: boolean;
  type: DialogType;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose?: () => void;
}

export const StatusDialog = ({
  isOpen,
  type,
  title,
  message,
  confirmText = 'Đồng ý',
  onConfirm,
  onClose,
}: StatusDialogProps) => {
  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 size={48} color="#22C55E" />,
          buttonBg: '#6B5B3D',
          iconBg: '#F0FDF4',
        };
      case 'error':
        return {
          icon: <XCircle size={48} color="#EF4444" />,
          buttonBg: '#EF4444',
          iconBg: '#FEF2F2',
        };
      case 'warning':
        return {
          icon: <AlertCircle size={48} color="#F59E0B" />,
          buttonBg: '#F59E0B',
          iconBg: '#FFFBEB',
        };
      default:
        return {
          icon: <Info size={48} color="#3B82F6" />,
          buttonBg: '#3B82F6',
          iconBg: '#EFF6FF',
        };
    }
  };

  const config = getConfig();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)',
    }}>
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 32px 32px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          animation: 'dialogPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {onClose && (
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9CA3AF',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        )}

        <div style={{
          width: '80px',
          height: '80px',
          background: config.iconBg,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          {config.icon}
        </div>

        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '12px',
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          lineHeight: '1.5',
          marginBottom: '32px',
        }}>
          {message}
        </p>

        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            padding: '14px',
            background: config.buttonBg,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {confirmText}
        </button>
      </div>

      <style jsx>{`
        @keyframes dialogPop {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
