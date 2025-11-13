/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { X, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useDeleteNotiMutation, useGetNotiFicationQuery } from '@/redux/api/admin/repost.api';
import Loader from '../shared/Loader';
import { useEffect } from 'react';
import { toast } from 'sonner';



const Notification = () => {
    const { data: noti, isLoading, refetch } = useGetNotiFicationQuery('')
    const [deleteNoti] = useDeleteNotiMutation()
    console.log(noti?.data)


    // Format date to readable format
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };


    useEffect(() => {
        refetch()
    }, [])

    const handleDelete = async (id: string) => {
        const res = await deleteNoti(id)
        console.log(res)
        if (res?.data) {
            toast.success("Notification deleted successfully!")
            refetch()
        } else {
            toast.error("Something went wrong!")
        }
    }


    if (isLoading) {
        return <Loader></Loader>
    }


    // Get notification icon based on title/content
    const getNotificationIcon = (title: any, body: any) => {
        const lowerTitle = title.toLowerCase();
        const lowerBody = body.toLowerCase();

        if (lowerTitle.includes('warning') || lowerBody.includes('warning')) {
            return <AlertCircle className="w-5 h-5 text-amber-500" />;
        }
        if (lowerTitle.includes('active') || lowerTitle.includes('success')) {
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        }
        return <Info className="w-5 h-5 text-blue-500" />;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-full">
            {/* Notifications List */}
            {
                noti?.data?.length ? <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="divide-y divide-gray-100">
                        {noti?.data?.map((notification: any) => (
                            <div
                                key={notification.id}
                                className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(notification.title, notification.body)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'
                                                    }`}>
                                                    {notification.title}
                                                </h3>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                                )}
                                            </div>
                                            <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'
                                                } mb-3`}>
                                                {notification.body}
                                            </p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <span>{formatDate(notification.createdAt)}</span>
                                                <span>•</span>
                                                <span>{new Date(notification.createdAt).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={() => handleDelete(notification?.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Remove notification"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : <div className='h-screen flex justify-center items-center'><h1>No notification for you</h1></div>
            }
        </div>
    );
};

export default Notification;