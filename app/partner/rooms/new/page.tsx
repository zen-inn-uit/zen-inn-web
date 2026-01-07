'use client';

import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/ui/page-container';
import { CreateRoomForm } from './components/create-room-form';

export default function NewRoomPage() {
  const router = useRouter();

  return (
    <PageContainer className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Rooms
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Add New Room</h1>
          <p className="text-slate-600 mt-2">Create a new room type for your property</p>
        </div>

        <CreateRoomForm />
      </div>
    </PageContainer>
  );
}
