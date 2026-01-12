"use client";

import { useState } from "react";

interface PersonalDetailsCardProps {
    user: {
        name: string;
        displayName: string;
        email: string;
        verified: boolean;
        phone: string;
        dateOfBirth: string;
        nationality: string;
        gender: string;
        address: string;
        passportDetails: string;
    };
    onUpdate: (field: string, value: string) => void;
}

type EditableField = "name" | "displayName" | "email" | "phone" | "dateOfBirth" | "nationality" | "gender" | "address" | "passport" | null;

const NATIONALITIES = ["Vietnam", "Japan", "Indonesia", "USA"];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export default function PersonalDetailsCard({ user, onUpdate }: PersonalDetailsCardProps) {
    const [editingField, setEditingField] = useState<EditableField>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [passportData, setPassportData] = useState({
        number: "",
        country: "",
        expiry: ""
    });

    const handleEdit = (field: string, currentValue: string) => {
        setEditingField(field as EditableField);
        setEditValue(currentValue === "Not provided" ? "" : currentValue);
        if (field === "passport") {
            setPassportData({ number: "", country: "", expiry: "" });
        }
    };

    const handleSave = (field: string) => {
        if (field === "passport") {
            const passportValue = passportData.number 
                ? `${passportData.number} (${passportData.country}, Exp: ${passportData.expiry})`
                : "Not provided";
            onUpdate("passportDetails", passportValue);
        } else {
            onUpdate(field, editValue || "Not provided");
        }
        setEditingField(null);
        setEditValue("");
    };

    const handleCancel = () => {
        setEditingField(null);
        setEditValue("");
        setPassportData({ number: "", country: "", expiry: "" });
    };

    const fields = [
        { key: "name", label: "Name", value: user.name, action: "Edit" },
        { key: "displayName", label: "Display name", value: user.displayName, action: "Edit" },
        { key: "email", label: "Email address", value: user.email, verified: user.verified, action: "Edit" },
        { key: "phone", label: "Phone number", value: user.phone, action: "Edit" },
        { key: "dateOfBirth", label: "Date of birth", value: user.dateOfBirth, action: "Edit" },
        { key: "nationality", label: "Nationality", value: user.nationality, action: "Edit" },
        { key: "gender", label: "Gender", value: user.gender, action: "Edit" },
        { key: "address", label: "Address", value: user.address, action: "Edit" },
        { key: "passport", label: "Passport details", value: user.passportDetails, action: user.passportDetails === "Not provided" ? "Add passport" : "Edit" },
    ];

    const renderInput = (field: string) => {
        const inputBaseClass = "w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";
        const inputStyle = { fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)' };

        switch (field) {
            case "dateOfBirth":
                return (
                    <input
                        type="date"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={inputBaseClass}
                        style={inputStyle}
                    />
                );
            case "nationality":
                return (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={inputBaseClass}
                        style={inputStyle}
                    >
                        <option value="">Select nationality</option>
                        {NATIONALITIES.map((nat) => (
                            <option key={nat} value={nat}>{nat}</option>
                        ))}
                    </select>
                );
            case "gender":
                return (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={inputBaseClass}
                        style={inputStyle}
                    >
                        <option value="">Select gender</option>
                        {GENDERS.map((gen) => (
                            <option key={gen} value={gen}>{gen}</option>
                        ))}
                    </select>
                );
            case "address":
                return (
                    <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={2}
                        className={inputBaseClass}
                        style={inputStyle}
                    />
                );
            case "passport":
                return (
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Passport number"
                            value={passportData.number}
                            onChange={(e) => setPassportData(prev => ({ ...prev, number: e.target.value }))}
                            className={inputBaseClass}
                            style={inputStyle}
                        />
                        <select
                            value={passportData.country}
                            onChange={(e) => setPassportData(prev => ({ ...prev, country: e.target.value }))}
                            className={inputBaseClass}
                            style={inputStyle}
                        >
                            <option value="">Select country</option>
                            {NATIONALITIES.map((nat) => (
                                <option key={nat} value={nat}>{nat}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            placeholder="Expiry date"
                            value={passportData.expiry}
                            onChange={(e) => setPassportData(prev => ({ ...prev, expiry: e.target.value }))}
                            className={inputBaseClass}
                            style={inputStyle}
                        />
                    </div>
                );
            default:
                return (
                    <input
                        type={field === "email" ? "email" : "text"}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        disabled={field === "email"}
                        className={`${inputBaseClass} ${field === "email" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        style={inputStyle}
                    />
                );
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm p-6 md:p-8" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                    Personal details
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-h5)' }}>
                    Update your information and find out how it's used.
                </p>
            </div>

            <div className="space-y-0">
                {fields.map((field, index) => {
                    const isEditing = editingField === field.key;
                    
                    return (
                        <div
                            key={field.key}
                            className={`py-5 ${index !== fields.length - 1 ? "border-b border-gray-300/30" : ""}`}
                        >
                            <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 ${isEditing && field.key === "passport" ? "items-start" : "items-center"}`}>
                                {/* Label column */}
                                <div className="md:col-span-3">
                                    <span className="text-sm font-normal text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
                                        {field.label}
                                    </span>
                                </div>

                                {/* Value/Input column */}
                                <div className={`md:col-span-7 flex gap-2 ${isEditing && field.key === "passport" ? "items-start flex-col" : "items-center"}`}>
                                    {isEditing ? (
                                        <div className="flex-1 w-full">
                                            {renderInput(field.key)}
                                        </div>
                                    ) : (
                                        <>
                                            <span className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>
                                                {field.value}
                                            </span>
                                            {field.verified && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100/80 text-green-700 border border-green-200/50">
                                                    Verified
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Action column */}
                                <div className={`md:col-span-2 flex gap-2 ${isEditing && field.key === "passport" ? "justify-end items-start" : "justify-end"}`}>
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleSave(field.key)}
                                                className="px-3 py-1 text-sm rounded-md text-white font-medium hover:opacity-90 transition-colors"
                                                style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--color-form)' }}
                                                aria-label={`Save ${field.label.toLowerCase()}`}
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                                style={{ fontFamily: 'var(--font-body)' }}
                                                aria-label={`Cancel editing ${field.label.toLowerCase()}`}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(field.key, field.value)}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-accent/20 hover:border-accent/50 transition-colors"
                                            style={{ fontFamily: 'var(--font-body)' }}
                                            aria-label={`Edit ${field.label.toLowerCase()}`}
                                        >
                                            {field.action}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
