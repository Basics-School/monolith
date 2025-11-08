"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { PlusIcon, XIcon } from "lucide-react";

interface OnboardingInviteProps {
    onNext: () => void;
    onSkip: () => void;
}

export function OnboardingInvite({ onNext, onSkip }: OnboardingInviteProps) {
    const [invites, setInvites] = useState(["", ""]);

    const addInvite = () => {
        setInvites([...invites, ""]);
    };

    const removeInvite = (index: number) => {
        if (invites.length > 1) {
            setInvites(invites.filter((_, i) => i !== index));
        }
    };

    const updateInvite = (index: number, value: string) => {
        const newInvites = [...invites];
        newInvites[index] = value;
        setInvites(newInvites);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validEmails = invites.filter((email) => email.trim() !== "");
        if (validEmails.length > 0) {
            // TODO: Send invitations
            console.log("Sending invites to:", validEmails);
        }
        onNext();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-primary">
                        <svg
                            className="size-8 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={ 2 }
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">
                        Optional: Invite your teammates
                    </h1>
                </div>

                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div className="space-y-3">
                        { invites.map((email, index) => (
                            <div key={ index } className="relative">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={ email }
                                    onChange={ (e) =>
                                        updateInvite(index, e.target.value)
                                    }
                                />
                                { invites.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={ () => removeInvite(index) }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <XIcon className="size-4" />
                                    </button>
                                ) }
                            </div>
                        )) }
                    </div>

                    <button
                        type="button"
                        onClick={ addInvite }
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                        <PlusIcon className="size-4" />
                        Add more
                    </button>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={ onSkip }
                            className="flex-1"
                        >
                            Skip this step
                        </Button>
                        <Button type="submit" className="flex-1">
                            Invite teammates
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
