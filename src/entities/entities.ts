export interface IDocument {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface IUser extends IDocument {
    name: string;
    phone?: string;
    profilePicture?: string | null;
    isActive: boolean;
    password?: string;
    fcmToken?: string | null;
}