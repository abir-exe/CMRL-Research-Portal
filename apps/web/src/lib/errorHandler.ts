import axios from 'axios';

/**
 * Friendly Error Message Translator
 * Transforms technical Firebase, Axios, and API errors into clear, friendly user feedback.
 */
export function getFriendlyErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred. Please try again.'): string {
  if (!error) return fallbackMessage;

  // Axios HTTP Response Errors
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.error?.message) {
      return error.response.data.error.message;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.status === 401) {
      return 'Invalid authentication credentials or session expired. Please sign in again.';
    }
    if (error.response?.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    if (error.response?.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.response?.status === 500) {
      return 'Server error. Our engineering team has been notified. Please try again later.';
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network connection failure. Please check your internet connection.';
    }
  }

  // Firebase Error Mapping
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email address or password. Please verify your credentials.';
      case 'auth/email-already-in-use':
        return 'An account with this email address already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact the administrator.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in popup was closed before completing.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Access disabled temporarily. Try again later.';
      case 'auth/network-request-failed':
        return 'Network connection error during authentication.';
      default:
        break;
    }
  }

  if (error instanceof Error) {
    // Prevent raw tech stack strings from leaking
    if (error.message.includes('Firebase') || error.message.includes('Axios') || error.message.includes('NetworkError')) {
      return fallbackMessage;
    }
    return error.message;
  }

  return fallbackMessage;
}
