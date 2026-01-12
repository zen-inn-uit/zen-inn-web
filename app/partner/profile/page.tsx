'use client';

import { useEffect, useState } from 'react';
import { partnerAPI } from '@/lib/api/partner-api';
import StatusBadge from '@/components/partner/status-badge';
import type { Partner, KycDocument } from '@/lib/api/types';

export default function ProfilePage() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [kycDocs, setKycDocs] = useState<KycDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docKind, setDocKind] = useState('business_license');
  const [docUrl, setDocUrl] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [profileData, docsData] = await Promise.all([
        partnerAPI.getPartnerProfile(),
        partnerAPI.listKycDocuments(),
      ]);
      setPartner(profileData);
      setCompany(profileData.company || '');
      setKycDocs(docsData);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await partnerAPI.upsertPartnerProfile({ company });
      setPartner(updated);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      await partnerAPI.uploadKycDocument({ kind: docKind, url: docUrl });
      setDocKind('business_license');
      setDocUrl('');
      await loadProfile();
      alert('Document uploaded successfully!');
    } catch (error) {
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Profile & KYC</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Partner Information</h2>
          
          {partner && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-600">KYC Status:</span>
                <StatusBadge status={partner.kycStatus} />
              </div>
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">User ID:</span> {partner.userId}</p>
                {partner.user && (
                  <p className="mt-1"><span className="font-medium">Email:</span> {partner.user.email}</p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="Your company name"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">KYC Documents</h2>
          
          <form onSubmit={handleUploadDocument} className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                value={docKind}
                onChange={(e) => setDocKind(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              >
                <option value="business_license">Business License</option>
                <option value="id_card">ID Card</option>
                <option value="tax_certificate">Tax Certificate</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document URL
              </label>
              <input
                type="url"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                placeholder="https://example.com/document.pdf"
                required
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Uploaded Documents</h3>
            {kycDocs.length === 0 ? (
              <p className="text-sm text-gray-500">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {kycDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{doc.kind}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:text-brand/80 text-sm"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
