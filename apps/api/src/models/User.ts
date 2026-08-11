import { Schema, model, Document } from 'mongoose';

export type UserRole = 'STUDENT' | 'SUPERVISOR' | 'ADMIN';
export type AccountStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
export type StudentRank = 'NEWBIE' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | 'LEGEND';

export interface IUserProfile {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  photoUrl?: string;
  dateOfBirth?: Date;
  gender?: string;
  university?: string;
  department?: string;
  batch?: string;
  email: string;
  mobile?: string;
}

export interface IResearchProfile {
  researchInterests?: string[];
  bio?: string;
  skills?: string[];
  software?: string[];
  programmingLanguages?: string[];
}

export interface IExternalProfiles {
  linkedin?: string;
  github?: string;
  orcid?: string;
  researchGate?: string;
  googleScholar?: string;
}

export interface IPrivacySettings {
  showDateOfBirth?: boolean;
  showGender?: boolean;
  showMobile?: boolean;
  showEmail?: boolean;
}

export interface IUser extends Document {
  firebaseUid: string;
  userId: string;
  role: UserRole;
  accountStatus: AccountStatus;
  rank: StudentRank;
  profile: IUserProfile;
  researchProfile?: IResearchProfile;
  externalProfiles?: IExternalProfiles;
  privacy?: IPrivacySettings;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['STUDENT', 'SUPERVISOR', 'ADMIN'],
      default: 'STUDENT',
      required: true,
    },
    accountStatus: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE'],
      default: 'PENDING',
      required: true,
    },
    rank: {
      type: String,
      enum: ['NEWBIE', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', 'LEGEND'],
      default: 'NEWBIE',
      required: true,
    },
    profile: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      fullName: { type: String, default: '' },
      photoUrl: { type: String, default: '' },
      dateOfBirth: { type: Date },
      gender: { type: String, default: '' },
      university: { type: String, default: '' },
      department: { type: String, default: '' },
      batch: { type: String, default: '' },
      email: { type: String, required: true },
      mobile: { type: String, default: '' },
    },
    researchProfile: {
      researchInterests: { type: [String], default: [] },
      bio: { type: String, default: '' },
      skills: { type: [String], default: [] },
      software: { type: [String], default: [] },
      programmingLanguages: { type: [String], default: [] },
    },
    externalProfiles: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      orcid: { type: String, default: '' },
      researchGate: { type: String, default: '' },
      googleScholar: { type: String, default: '' },
    },
    privacy: {
      showDateOfBirth: { type: Boolean, default: false },
      showGender: { type: Boolean, default: false },
      showMobile: { type: Boolean, default: false },
      showEmail: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', UserSchema);
